"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Journey, Registry } from "@/lib/knowledge/schema";
import {
  answerResolverQuestion,
  createResolverSession,
  getResolverNode,
  getTriageOptions,
  isResolverSessionCompatible,
  startTriage,
  type ResolverResultNode,
  type ResolverSession,
} from "@/lib/resolver";
import {
  answerLooksCompleted,
  getAnswerLabel,
  getStageLabel,
} from "@/lib/resolver/ui";
import {
  getChecklistForResolverStage,
  RESOLVER_STAGE_TO_SLUG,
  STAGE_ORDER,
} from "@/lib/content";
import { Checklist } from "@/components/checklist";
import { StageProgress } from "@/components/journey-progress";

const STORAGE_KEY = "egreso-lcd:resolver:v1";

const claimLabels: Record<string, string> = {
  official_requirement: "Requisito oficial",
  official_process: "Proceso oficial",
  official_timing: "Tiempo informado por la institución",
  recommendation_official: "Recomendación oficial",
  community_expectation: "Tiempo orientativo",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function newSession(journey: Journey) {
  return createResolverSession(journey);
}

export function ResolverClient({
  journey,
  registry,
}: {
  journey: Journey;
  registry: Registry;
}) {
  const [session, setSession] = useState<ResolverSession>(() =>
    newSession(journey),
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as unknown;
        if (isResolverSessionCompatible(parsed, journey)) {
          setSession(parsed);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, [journey]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }, [hydrated, session]);

  const node = session.currentStateId
    ? getResolverNode(journey, session.currentStateId)
    : null;

  function stamp(next: ResolverSession): ResolverSession {
    return { ...next, updatedAt: new Date().toISOString() };
  }

  function selectTriage(triageId: string) {
    const nextId = startTriage(journey, triageId);
    setSession(
      stamp({
        ...newSession(journey),
        triageId,
        currentStateId: nextId,
        history: [null],
      }),
    );
  }

  function answer(answerKey: string) {
    if (!node || node.kind !== "question") return;
    const nextId = answerResolverQuestion(journey, node.id, answerKey);
    setSession((current) =>
      stamp({
        ...current,
        currentStateId: nextId,
        history: [...current.history, node.id],
        answers: { ...current.answers, [node.id]: answerKey },
      }),
    );
  }

  function back() {
    setSession((current) => {
      if (!current.history.length) return current;
      const history = [...current.history];
      const previous = history.pop() ?? null;
      const answers = { ...current.answers };
      if (previous) delete answers[previous];

      return stamp({
        ...current,
        currentStateId: previous,
        history,
        answers,
        triageId: previous === null ? undefined : current.triageId,
      });
    });
  }

  function reset() {
    localStorage.removeItem(STORAGE_KEY);
    setSession(stamp(newSession(journey)));
  }

  if (!node) {
    return (
      <section className="resolver-shell">
        <div className="resolver-head">
          <p className="eyebrow">Primer paso: ubicar la etapa</p>
          <h1>¿En qué parte del recorrido estás?</h1>
          <p className="lead">
            Elegí la opción que mejor describe tu situación actual. Después
            hacemos sólo las preguntas necesarias dentro de esa rama.
          </p>
        </div>

        <div className="triage-grid">
          {getTriageOptions(journey).map((option, index) => (
            <button
              className="triage-card"
              type="button"
              onClick={() => selectTriage(option.id)}
              key={option.id}
            >
              <span className="triage-number">{index + 1}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>

        <p className="resolver-privacy">
          El orientador no pide nombre, DNI ni número de expediente. Si guardás
          progreso, queda sólo en este navegador.
        </p>
      </section>
    );
  }

  const currentSlug = RESOLVER_STAGE_TO_SLUG[node.stage];

  return (
    <section className="resolver-shell">
      <div className="resolver-toolbar">
        <button className="text-button" type="button" onClick={back}>
          ← Atrás
        </button>
        <button className="text-button" type="button" onClick={reset}>
          Empezar de nuevo
        </button>
      </div>

      {currentSlug ? <StageProgress currentSlug={currentSlug} /> : null}

      {node.kind === "question" ? (
        <div className="resolver-question">
          <p className="eyebrow">{getStageLabel(node.stage)}</p>
          <h1>{node.question}</h1>
          <div className="answer-list">
            {node.answerKeys.map((key) => (
              <button
                className="answer-button"
                type="button"
                onClick={() => answer(key)}
                key={key}
              >
                {getAnswerLabel(key, node.answerKeys)}
              </button>
            ))}
          </div>
          {currentSlug ? (
            <p className="meta">
              ¿Necesitás contexto antes de responder?{" "}
              <Link className="source" href={`/etapas/${currentSlug}`}>
                Ver la guía de esta etapa
              </Link>
              .
            </p>
          ) : null}
        </div>
      ) : (
        <ResolverResult
          result={node}
          session={session}
          journey={journey}
          registry={registry}
          onReset={reset}
        />
      )}
    </section>
  );
}

function ResolverResult({
  result,
  session,
  journey,
  registry,
  onReset,
}: {
  result: ResolverResultNode;
  session: ResolverSession;
  journey: Journey;
  registry: Registry;
  onReset: () => void;
}) {
  const claims = result.claimIds
    .map((id) => registry.claims.find((claim) => claim.id === id))
    .filter((claim): claim is Registry["claims"][number] => Boolean(claim));

  const blockers = claims.filter((claim) => claim.blocking);
  const timings = claims.filter(
    (claim) =>
      claim.type === "official_timing" ||
      claim.type === "community_expectation",
  );

  const completed = useMemo(
    () =>
      Object.entries(session.answers)
        .filter(([, answer]) => answerLooksCompleted(answer))
        .map(([stateId]) => {
          const state = journey.states[stateId];
          return state?.question;
        })
        .filter((question): question is string => Boolean(question)),
    [journey, session.answers],
  );

  const checklist = getChecklistForResolverStage(result.stage);
  const stageSlug = RESOLVER_STAGE_TO_SLUG[result.stage];
  const stageIndex = STAGE_ORDER.findIndex((stage) => stage.slug === stageSlug);
  const nextStage =
    stageIndex >= 0 && stageIndex < STAGE_ORDER.length - 1
      ? STAGE_ORDER[stageIndex + 1]
      : undefined;
  const urgent = result.id === "S55_SUBSANACION";

  return (
    <div className={`resolver-result ${urgent ? "resolver-result-urgent" : ""}`}>
      <p className="eyebrow">Tu situación</p>
      <p className="result-stage">{getStageLabel(result.stage)}</p>
      <h1>{result.headline}</h1>
      <div className="next-action">
        <span>Qué hacer ahora</span>
        <strong>{result.nextAction}</strong>
      </div>

      {completed.length ? (
        <section className="result-section">
          <h2>Lo que ya confirmaste</h2>
          <ul className="completed-list">
            {completed.slice(-5).map((question) => (
              <li key={question}>✓ {question}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {blockers.length ? (
        <section className="result-section">
          <h2>{urgent ? "Atención inmediata" : "Bloqueo o condición relevante"}</h2>
          <div className="result-evidence">
            {blockers.map((claim) => (
              <ClientClaim
                claim={claim}
                registry={registry}
                key={claim.id}
                urgent={urgent}
              />
            ))}
          </div>
        </section>
      ) : null}

      {timings.length ? (
        <section className="result-section">
          <h2>Tiempos para planificar</h2>
          <div className="result-evidence">
            {timings.map((claim) => (
              <ClientClaim claim={claim} registry={registry} key={claim.id} />
            ))}
          </div>
        </section>
      ) : null}

      {claims.filter((claim) => !blockers.includes(claim) && !timings.includes(claim))
        .length ? (
        <section className="result-section">
          <h2>Información útil para este paso</h2>
          <div className="result-evidence">
            {claims
              .filter(
                (claim) =>
                  !blockers.includes(claim) && !timings.includes(claim),
              )
              .map((claim) => (
                <ClientClaim claim={claim} registry={registry} key={claim.id} />
              ))}
          </div>
        </section>
      ) : null}

      {checklist.length ? (
        <Checklist
          title="Checklist relacionado"
          items={checklist}
          storageKey={`resolver:${stageSlug ?? result.stage}`}
        />
      ) : null}

      <div className="result-actions">
        {stageSlug ? (
          <Link className="button" href={`/etapas/${stageSlug}`}>
            Ver guía completa de esta etapa
          </Link>
        ) : null}
        <button className="button button-secondary" type="button" onClick={onReset}>
          Revisar otra situación
        </button>
      </div>

      {nextStage ? (
        <div className="next-step-card">
          <p className="eyebrow">Después</p>
          <Link className="source" href={`/etapas/${nextStage.slug}`}>
            {nextStage.label} →
          </Link>
        </div>
      ) : null}
    </div>
  );
}

function ClientClaim({
  claim,
  registry,
  urgent = false,
}: {
  claim: Registry["claims"][number];
  registry: Registry;
  urgent?: boolean;
}) {
  const source = registry.sources[claim.source];
  const expectation = claim.type === "community_expectation";

  return (
    <article className={`client-claim ${urgent ? "client-claim-urgent" : ""}`}>
      <span className="evidence-label">
        {claimLabels[claim.type] ?? claim.type}
      </span>
      <p>
        <strong>{claim.claim}</strong>
      </p>
      {expectation ? (
        <p className="meta">Es una referencia para planificar, no una garantía.</p>
      ) : null}
      <p className="meta">
        {source.title} · Revisada: {formatDate(claim.verified_at)}.
      </p>
      {source.url ? (
        <a
          className="source"
          href={source.url}
          target="_blank"
          rel="noreferrer"
        >
          Ver fuente oficial ↗
        </a>
      ) : null}
    </article>
  );
}
