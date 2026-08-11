import { describe, expect, it } from "vitest";
import { PROBLEM_PAGES, STAGE_PAGES } from "../lib/content";
import { loadRegistry } from "../lib/knowledge";

const registry = loadRegistry();
const claimIds = new Set(registry.claims.map((claim) => claim.id));
const sourceIds = new Set(Object.keys(registry.sources));
const targetIds = new Set(Object.keys(registry.navigation_targets));

describe("contenido curado", () => {
  it("referencia únicamente claims existentes", () => {
    const references = [
      ...Object.values(STAGE_PAGES).flatMap((page) => [
        ...page.claimIds,
        ...page.checklist.flatMap((item) => (item.claimId ? [item.claimId] : [])),
        ...page.sections.flatMap((section) => section.claimIds ?? []),
      ]),
      ...Object.values(PROBLEM_PAGES).flatMap((page) => page.claimIds),
    ];

    const missing = [...new Set(references)].filter((id) => !claimIds.has(id));
    expect(missing).toEqual([]);
  });

  it("referencia únicamente fuentes y destinos de navegación registrados", () => {
    const actions = [
      ...Object.values(STAGE_PAGES).flatMap((page) =>
        page.sections.flatMap((section) => section.actions ?? []),
      ),
      ...Object.values(PROBLEM_PAGES).flatMap((page) => page.actions ?? []),
    ];

    const missingSources = actions
      .flatMap((action) => (action.sourceId ? [action.sourceId] : []))
      .filter((id) => !sourceIds.has(id));
    const missingTargets = actions
      .flatMap((action) => (action.targetId ? [action.targetId] : []))
      .filter((id) => !targetIds.has(id));

    expect([...new Set(missingSources)]).toEqual([]);
    expect([...new Set(missingTargets)]).toEqual([]);
  });

  it("cubre las siete etapas del producto", () => {
    expect(Object.keys(STAGE_PAGES)).toEqual([
      "tutor-y-pei",
      "tesis",
      "cierre-academico",
      "regularizacion",
      "diploma",
      "seguimiento",
      "jura-y-entrega",
    ]);
  });

  it("incluye los problemas mínimos de la especificación", () => {
    for (const slug of [
      "notas-en-siu",
      "secundario-sin-legalizar",
      "tutor-pendiente",
      "pei-pendiente",
      "subsanacion",
      "guarda-temporal",
      "equivalencias",
      "no-aparece-siet",
      "constancia-titulo-en-tramite",
      "diploma-listo",
    ]) {
      expect(PROBLEM_PAGES[slug]).toBeDefined();
    }
  });
});
