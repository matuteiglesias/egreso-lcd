import type { Journey } from "@/lib/knowledge/schema";

export type ResolverQuestionNode = {
  kind: "question";
  id: string;
  stage: string;
  question: string;
  answerKeys: string[];
  claimIds: string[];
};

export type ResolverResultNode = {
  kind: "result";
  id: string;
  stage: string;
  headline: string;
  nextAction: string;
  claimIds: string[];
};

export type ResolverNode = ResolverQuestionNode | ResolverResultNode;

export type ResolverSession = {
  schemaVersion: 1;
  graphVersion: string;
  triageId?: string;
  currentStateId: string | null;
  history: Array<string | null>;
  answers: Record<string, string>;
  updatedAt: string;
};

const SESSION_SCHEMA_VERSION = 1;

/**
 * Safety adapters for the frozen v1.0 graph.
 *
 * The acceptance contract requires that nobody reach "ready to file diploma" while
 * academic completion or plan regularization is unknown. The v1.0 broad diploma entry
 * assumes those historic gates. We deliberately re-check them here without mutating the
 * frozen YAML. See docs/CONTRACT_NOTES.md.
 */
const SAFE_TRIAGE_ENTRY_OVERRIDES: Record<string, string> = {
  E: "S30_ACADEMIC_CLOSE_CHECK",
};

const SAFE_AUTOMATIC_TRANSITION_OVERRIDES: Record<string, string> = {
  S45_RESOLUTION_READY: "S30_ACADEMIC_CLOSE_CHECK",
};

function findOutput(
  journey: Journey,
  id: string,
): { stage: string; output: { headline: string; next_action: string; claims: string[] } } | null {
  for (const state of Object.values(journey.states)) {
    const output = state.outputs?.[id];
    if (output) return { stage: state.stage, output };
  }
  return null;
}

function followAutomatic(journey: Journey, id: string): string {
  const seen = new Set<string>();
  let current = id;

  while (journey.states[current]?.automatic_transition) {
    if (seen.has(current)) {
      throw new Error(`Ciclo automático detectado en ${current}`);
    }
    seen.add(current);
    current =
      SAFE_AUTOMATIC_TRANSITION_OVERRIDES[current] ??
      journey.states[current].automatic_transition!;
  }

  return current;
}

export function getResolverNode(
  journey: Journey,
  stateId: string,
): ResolverNode {
  const output = findOutput(journey, stateId);
  if (output) {
    return {
      kind: "result",
      id: stateId,
      stage: output.stage,
      headline: output.output.headline,
      nextAction: output.output.next_action,
      claimIds: output.output.claims,
    };
  }

  const state = journey.states[stateId];
  if (!state) throw new Error(`Estado desconocido: ${stateId}`);

  if (state.question && state.transitions) {
    return {
      kind: "question",
      id: stateId,
      stage: state.stage,
      question: state.question,
      answerKeys: Object.keys(state.transitions),
      claimIds: state.claims ?? [],
    };
  }

  if (state.headline && state.next_action) {
    return {
      kind: "result",
      id: stateId,
      stage: state.stage,
      headline: state.headline,
      nextAction: state.next_action,
      claimIds: state.claims ?? [],
    };
  }

  throw new Error(
    `El estado ${stateId} no es una pregunta ni un resultado utilizable`,
  );
}

export function getTriageOptions(journey: Journey) {
  return journey.top_level_triage.map((option) => ({
    id: option.id,
    label: option.label,
  }));
}

export function startTriage(journey: Journey, triageId: string): string {
  const option = journey.top_level_triage.find((item) => item.id === triageId);
  if (!option) throw new Error(`Opción de triage desconocida: ${triageId}`);

  return followAutomatic(
    journey,
    SAFE_TRIAGE_ENTRY_OVERRIDES[triageId] ?? option.entry_state,
  );
}

export function answerResolverQuestion(
  journey: Journey,
  stateId: string,
  answerKey: string,
): string {
  const state = journey.states[stateId];
  if (!state?.question || !state.transitions) {
    throw new Error(`El estado ${stateId} no acepta respuestas`);
  }

  const target = state.transitions[answerKey];
  if (!target) {
    throw new Error(`Respuesta inválida ${answerKey} para ${stateId}`);
  }

  return followAutomatic(journey, target);
}

export function createResolverSession(journey: Journey): ResolverSession {
  return {
    schemaVersion: SESSION_SCHEMA_VERSION,
    graphVersion: journey.version,
    currentStateId: null,
    history: [],
    answers: {},
    updatedAt: new Date().toISOString(),
  };
}

export function isResolverSessionCompatible(
  session: unknown,
  journey: Journey,
): session is ResolverSession {
  if (!session || typeof session !== "object") return false;
  const value = session as Partial<ResolverSession>;

  if (
    value.schemaVersion !== SESSION_SCHEMA_VERSION ||
    value.graphVersion !== journey.version ||
    !Array.isArray(value.history) ||
    !value.answers ||
    typeof value.answers !== "object"
  ) {
    return false;
  }

  if (value.currentStateId === null) return true;
  if (typeof value.currentStateId !== "string") return false;

  try {
    getResolverNode(journey, value.currentStateId);
    return true;
  } catch {
    return false;
  }
}

export function getReachableStateIds(journey: Journey) {
  const realStateIds = new Set(Object.keys(journey.states));
  const visited = new Set<string>();
  const queue: string[] = [];

  for (const option of journey.top_level_triage) {
    queue.push(SAFE_TRIAGE_ENTRY_OVERRIDES[option.id] ?? option.entry_state);
  }

  while (queue.length) {
    const id = queue.shift()!;
    if (visited.has(id)) continue;
    visited.add(id);

    const state = journey.states[id];
    if (!state) continue;

    for (const target of Object.values(state.transitions ?? {})) {
      if (realStateIds.has(target)) queue.push(target);
    }

    const auto =
      SAFE_AUTOMATIC_TRANSITION_OVERRIDES[id] ?? state.automatic_transition;
    if (auto && realStateIds.has(auto)) queue.push(auto);
  }

  for (const transition of journey.special_transitions ?? []) {
    if (visited.has(transition.from)) queue.push(transition.to);
  }

  while (queue.length) {
    const id = queue.shift()!;
    if (visited.has(id)) continue;
    visited.add(id);
    const state = journey.states[id];
    if (!state) continue;
    Object.values(state.transitions ?? {}).forEach((target) => {
      if (realStateIds.has(target)) queue.push(target);
    });
    const auto =
      SAFE_AUTOMATIC_TRANSITION_OVERRIDES[id] ?? state.automatic_transition;
    if (auto && realStateIds.has(auto)) queue.push(auto);
  }

  return visited;
}
