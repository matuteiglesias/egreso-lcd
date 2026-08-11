import { readFileSync } from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import {
  journeySchema,
  registrySchema,
  type Claim,
  type Registry,
  type Journey,
} from "./schema";

const KNOWLEDGE = path.join(process.cwd(), "knowledge");

export function loadRegistry(
  file = path.join(
    KNOWLEDGE,
    "egreso-lcd-content-evidence-registry-v1.0.yaml",
  ),
): Registry {
  return registrySchema.parse(parse(readFileSync(file, "utf8")));
}

export function loadJourney(
  file = path.join(
    KNOWLEDGE,
    "egreso-lcd-state-journey-graph-v1.0.yaml",
  ),
): Journey {
  return journeySchema.parse(parse(readFileSync(file, "utf8")));
}

export function validateKnowledge(
  registry = loadRegistry(),
  journey = loadJourney(),
) {
  const errors: string[] = [];
  const ids = new Set<string>();

  for (const claim of registry.claims) {
    if (ids.has(claim.id)) errors.push(`Claim duplicado: ${claim.id}`);
    ids.add(claim.id);
    if (!registry.sources[claim.source]) {
      errors.push(`Fuente inexistente ${claim.source} en ${claim.id}`);
    }
  }

  const stateIds = new Set(Object.keys(journey.states));
  const outputIds = new Set(
    Object.values(journey.states).flatMap((state) =>
      Object.keys(state.outputs ?? {}),
    ),
  );
  const transitionTargets = new Set([...stateIds, ...outputIds]);

  const checkState = (target: string, context: string) => {
    if (!transitionTargets.has(target)) {
      errors.push(`Estado inexistente ${target} (${context})`);
    }
  };

  for (const triage of journey.top_level_triage) {
    checkState(triage.entry_state, `triage ${triage.id}`);
  }

  for (const [id, state] of Object.entries(journey.states)) {
    Object.values(state.transitions ?? {}).forEach((target) =>
      checkState(target, id),
    );
    if (state.automatic_transition) {
      checkState(state.automatic_transition, id);
    }

    const claimIds = [
      ...(state.claims ?? []),
      ...Object.values(state.outputs ?? {}).flatMap((output) => output.claims),
    ];

    claimIds.forEach((claimId) => {
      if (!ids.has(claimId)) {
        errors.push(`Claim inexistente ${claimId} en ${id}`);
      }
    });
  }

  for (const transition of journey.special_transitions ?? []) {
    if (!stateIds.has(transition.from)) {
      errors.push(
        `Estado inexistente ${transition.from} (special transition ${transition.event})`,
      );
    }
    if (!stateIds.has(transition.to)) {
      errors.push(
        `Estado inexistente ${transition.to} (special transition ${transition.event})`,
      );
    }
  }

  Object.entries(journey.global_gates).forEach(([gate, claimIds]) =>
    claimIds.forEach((id) => {
      if (!ids.has(id)) errors.push(`Claim inexistente ${id} en ${gate}`);
    }),
  );

  if (errors.length) {
    throw new Error(
      `Contratos de conocimiento inválidos:\n- ${errors.join("\n- ")}`,
    );
  }

  return { registry, journey };
}

export function getClaim(
  id: string,
): Claim & { sourceDetail: Registry["sources"][string] } {
  const registry = loadRegistry();
  const claim = registry.claims.find((item) => item.id === id);
  if (!claim) throw new Error(`Claim desconocido: ${id}`);

  return {
    ...claim,
    sourceDetail: registry.sources[claim.source],
  };
}

export function getClaims(ids: string[]) {
  const registry = loadRegistry();
  const byId = new Map(registry.claims.map((claim) => [claim.id, claim]));
  return ids.map((id) => {
    const claim = byId.get(id);
    if (!claim) throw new Error(`Claim desconocido: ${id}`);
    return {
      ...claim,
      sourceDetail: registry.sources[claim.source],
    };
  });
}

export function getClaimsForStage(stage: string) {
  return loadRegistry().claims.filter((claim) => claim.stage === stage);
}

export function getSource(id: string) {
  const source = loadRegistry().sources[id];
  if (!source) throw new Error(`Fuente desconocida: ${id}`);
  return source;
}

export function getNavigationTarget(id: string) {
  const target = loadRegistry().navigation_targets[id];
  if (!target) throw new Error(`Destino de navegación desconocido: ${id}`);
  return target;
}
