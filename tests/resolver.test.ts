import { describe, expect, it } from "vitest";
import { loadJourney } from "../lib/knowledge";
import {
  answerResolverQuestion,
  getReachableStateIds,
  getResolverNode,
  isResolverSessionCompatible,
  startTriage,
} from "../lib/resolver";

const journey = loadJourney();

function walk(
  triage: string,
  answers: Array<[string, string]>,
) {
  let stateId = startTriage(journey, triage);

  for (const [expectedState, answer] of answers) {
    expect(stateId).toBe(expectedState);
    stateId = answerResolverQuestion(journey, stateId, answer);
  }

  return getResolverNode(journey, stateId);
}

describe("resolver determinista", () => {
  it("entra por triage amplio y sólo después hace preguntas de rama", () => {
    expect(startTriage(journey, "A")).toBe("S10_TUTOR_CHECK");
    expect(startTriage(journey, "B")).toBe("S20_THESIS_CHECK");
    expect(startTriage(journey, "F")).toBe("S60_SIET_CHECK");
  });

  it("no deja que unknown apruebe la tutoría", () => {
    const node = walk("A", [
      ["S10_TUTOR_CHECK", "unknown"],
      ["S11_TUTOR_STATUS", "no"],
    ]);
    expect(node.kind).toBe("result");
    expect(node.id).toBe("S11A_TUTOR_TO_DO");
  });

  it("distingue tutor aprobado de PEI pendiente", () => {
    const node = walk("A", [
      ["S10_TUTOR_CHECK", "yes"],
      ["S12_PEI_CHECK", "no"],
      ["S13_PEI_STATUS", "yes"],
    ]);
    expect(node.kind).toBe("result");
    expect(node.id).toBe("S13B_PEI_PENDING");
  });

  it("mantiene profundidad suficiente en la tesis", () => {
    const node = walk("B", [
      ["S20_THESIS_CHECK", "yes"],
      ["S22_THESIS_PROGRESS", "yes"],
      ["S23_JURY_STATUS", "defense_ready"],
      ["S25_DEFENSE_READY", "yes"],
      ["S26_SIU_THESIS_CHECK", "no"],
    ]);
    expect(node.kind).toBe("result");
    expect(node.id).toBe("S26A_WAIT_SIU");
  });

  it("no habilita diploma si hay regularización pendiente", () => {
    const node = walk("C", [
      ["S30_ACADEMIC_CLOSE_CHECK", "yes"],
      ["S32_REGULARIZATION_NEEDED", "yes"],
      ["S40_REGULARIZATION_CHECK", "yes"],
      ["S44_REGULARIZATION_PENDING", "no"],
    ]);
    expect(node.kind).toBe("result");
    expect(node.id).toBe("S44A_WAIT_RESOLUTION");
  });

  it("revalida cierre académico al entrar por la rama diploma", () => {
    expect(startTriage(journey, "E")).toBe("S30_ACADEMIC_CLOSE_CHECK");

    const blocked = walk("E", [["S30_ACADEMIC_CLOSE_CHECK", "no"]]);
    expect(blocked.kind).toBe("result");
    expect(blocked.id).toBe("S31_SIU_ISSUE");
  });

  it("revalida cierre académico después de recibir una resolución", () => {
    const state = walk("D", [
      ["S40_REGULARIZATION_CHECK", "yes"],
      ["S44_REGULARIZATION_PENDING", "yes"],
    ]);
    expect(state.kind).toBe("question");
    expect(state.id).toBe("S30_ACADEMIC_CLOSE_CHECK");
  });

  it("llega a ready-to-file sólo después de gates explícitos", () => {
    const node = walk("E", [
      ["S30_ACADEMIC_CLOSE_CHECK", "yes"],
      ["S32_REGULARIZATION_NEEDED", "no"],
      ["S50_DIPLOMA_CHECK", "no"],
      ["S51_SECONDARY_CHECK", "yes"],
      ["S52_DOCS_CHECK", "yes"],
    ]);
    expect(node.kind).toBe("result");
    expect(node.id).toBe("S53_READY_TO_FILE");
  });

  it("trata secundario desconocido como bloqueo", () => {
    const node = walk("E", [
      ["S30_ACADEMIC_CLOSE_CHECK", "yes"],
      ["S32_REGULARIZATION_NEEDED", "no"],
      ["S50_DIPLOMA_CHECK", "no"],
      ["S51_SECONDARY_CHECK", "unknown"],
    ]);
    expect(node.kind).toBe("result");
    expect(node.id).toBe("S51A_LEGALIZATION_BLOCK");
  });

  it("decodifica SUBSANACIÓN como acción urgente", () => {
    const node = walk("E", [
      ["S30_ACADEMIC_CLOSE_CHECK", "yes"],
      ["S32_REGULARIZATION_NEEDED", "no"],
      ["S50_DIPLOMA_CHECK", "yes"],
      ["S54_TAD_STATUS", "subsanacion"],
    ]);
    expect(node.kind).toBe("result");
    expect(node.id).toBe("S55_SUBSANACION");
    expect(node.claimIds).toContain("TRK-04");
  });

  it("no confunde TRAMITACIÓN con SIET", () => {
    const node = walk("E", [
      ["S30_ACADEMIC_CLOSE_CHECK", "yes"],
      ["S32_REGULARIZATION_NEEDED", "no"],
      ["S50_DIPLOMA_CHECK", "yes"],
      ["S54_TAD_STATUS", "tramitacion"],
    ]);
    expect(node.kind).toBe("result");
    expect(node.id).toBe("S57_TRAMITACION");
  });

  it("maneja SIET y entrega como etapas separadas", () => {
    const siet = walk("F", [
      ["S60_SIET_CHECK", "yes"],
      ["S61_SIET_CONFIRM", "yes"],
    ]);
    expect(siet.kind).toBe("result");
    expect(siet.id).toBe("S62_TITLE_IN_PROCESS");

    const waiting = walk("G", [["S70_DELIVERY_CHECK", "no"]]);
    expect(waiting.kind).toBe("result");
    expect(waiting.id).toBe("S70A_WAIT_DELIVERY");

    const ready = walk("G", [["S70_DELIVERY_CHECK", "yes"]]);
    expect(ready.kind).toBe("result");
    expect(ready.id).toBe("S71_JURA_READY");
  });

  it("mantiene todos los estados reales alcanzables, incluyendo transiciones especiales", () => {
    const reachable = getReachableStateIds(journey);
    const all = Object.keys(journey.states);
    const missing = all.filter((id) => !reachable.has(id));
    expect(missing).toEqual([]);
  });

  it("descarta persistencia incompatible o con estado desconocido", () => {
    expect(
      isResolverSessionCompatible(
        {
          schemaVersion: 1,
          graphVersion: journey.version,
          currentStateId: "NO_EXISTE",
          history: [],
          answers: {},
          updatedAt: new Date().toISOString(),
        },
        journey,
      ),
    ).toBe(false);

    expect(
      isResolverSessionCompatible(
        {
          schemaVersion: 1,
          graphVersion: "otra-version",
          currentStateId: null,
          history: [],
          answers: {},
          updatedAt: new Date().toISOString(),
        },
        journey,
      ),
    ).toBe(false);
  });
});
