const ANSWER_LABELS: Record<string, string> = {
  yes: "Sí",
  no: "No",
  unknown: "No estoy seguro/a",
  waiting: "Todavía está en evaluación",
  corrections: "Me pidieron correcciones",
  defense_ready: "Está en condiciones de defender",
  no_defense: "No fue habilitada para defensa",
  fcen: "Materias de FCEN",
  outside_uba: "Materias externas / de otra institución",
  mobility: "Movilidad o intercambio",
  other: "Otro caso",
  tramitacion: "TRAMITACIÓN",
  subsanacion: "SUBSANACIÓN",
  guarda_temporal: "GUARDA TEMPORAL",
};

const STAGE_LABELS: Record<string, string> = {
  tutor: "Tutor/a",
  pei: "PEI",
  tesis: "Tesis",
  cierre_academico: "Cierre académico",
  regularizacion: "Regularización del plan",
  diploma: "Diploma",
  seguimiento: "Seguimiento en TAD",
  siet: "SIET / UBA",
  jura: "Entrega y jura",
  post_egreso: "Egreso completo",
};

export function getAnswerLabel(
  key: string,
  allKeys: string[],
): string {
  if (key === "no" && !allKeys.includes("unknown")) {
    return "No / no estoy seguro/a";
  }
  return ANSWER_LABELS[key] ?? key;
}

export function getStageLabel(stage: string) {
  return STAGE_LABELS[stage] ?? stage;
}

export function answerLooksCompleted(answer: string) {
  return ["yes", "defense_ready", "tramitacion"].includes(answer);
}
