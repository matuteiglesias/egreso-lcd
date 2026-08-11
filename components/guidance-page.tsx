import Link from "next/link";
import {
  getNavigationTarget,
  getSource,
} from "@/lib/knowledge";
import type {
  ContentAction,
  StagePage,
  ProblemPage,
} from "@/lib/content";
import { Checklist } from "@/components/checklist";
import { EvidenceGroup } from "@/components/evidence";
import { StageProgress } from "@/components/journey-progress";

function resolveAction(action: ContentAction) {
  if (action.targetId) {
    return { href: getNavigationTarget(action.targetId), external: true };
  }
  if (action.sourceId) {
    const source = getSource(action.sourceId);
    if (!source.url) {
      throw new Error(`La fuente ${action.sourceId} no tiene URL pública`);
    }
    return { href: source.url, external: true };
  }
  if (action.href) {
    return {
      href: action.href,
      external:
        action.href.startsWith("http://") ||
        action.href.startsWith("https://") ||
        action.href.startsWith("mailto:"),
    };
  }
  throw new Error(`Acción sin destino: ${action.label}`);
}

function ActionLinks({ actions }: { actions?: ContentAction[] }) {
  if (!actions?.length) return null;

  return (
    <div className="action-row">
      {actions.map((action) => {
        const resolved = resolveAction(action);
        return resolved.external ? (
          <a
            className="button button-secondary"
            href={resolved.href}
            target={resolved.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={resolved.href.startsWith("mailto:") ? undefined : "noreferrer"}
            key={action.label}
          >
            {action.label}
          </a>
        ) : (
          <Link
            className="button button-secondary"
            href={resolved.href}
            key={action.label}
          >
            {action.label}
          </Link>
        );
      })}
    </div>
  );
}

export function StageGuidance({ page }: { page: StagePage }) {
  return (
    <>
      <div className="container page page-wide">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p className="lead">{page.intro}</p>
      </div>

      <div className="container">
        <StageProgress currentSlug={page.slug} />
      </div>

      <div className="container content-layout">
        <article className="guide-content">
          {page.sections.map((section) => (
            <section className="guide-section" key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets?.length ? (
                <ul className="plain-list">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
              <ActionLinks actions={section.actions} />
              {section.claimIds?.length ? (
                <EvidenceGroup claimIds={section.claimIds} />
              ) : null}
            </section>
          ))}

          {page.nextSlug ? (
            <div className="next-step-card">
              <p className="eyebrow">Cuando cierres esta etapa</p>
              <Link className="source" href={`/etapas/${page.nextSlug}`}>
                Ver qué viene después →
              </Link>
            </div>
          ) : null}
        </article>

        <aside className="guide-sidebar">
          <Checklist
            items={page.checklist}
            storageKey={`stage:${page.slug}`}
          />
          <Link className="button resolver-cta" href="/orientador">
            Revisar mi situación
          </Link>
        </aside>
      </div>
    </>
  );
}

export function ProblemGuidance({ page }: { page: ProblemPage }) {
  return (
    <div className="container page page-wide">
      <p className="eyebrow">Resolver un problema</p>
      <h1>{page.title}</h1>
      <p className="lead">{page.intro}</p>

      {page.note ? <div className="urgent-note">{page.note}</div> : null}

      <section className="problem-steps">
        <h2>Qué hacer ahora</h2>
        <ol>
          {page.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <ActionLinks actions={page.actions} />

      <section className="guide-section">
        <h2>En qué se basa esta orientación</h2>
        <EvidenceGroup claimIds={page.claimIds} />
      </section>

      <div className="next-step-card">
        <Link className="source" href={`/etapas/${page.stageSlug}`}>
          Ver la etapa completa →
        </Link>
        <Link className="source" href="/orientador">
          Revisar mi situación en el orientador →
        </Link>
      </div>
    </div>
  );
}
