import { describe, expect, it } from "vitest";
import { loadJourney, loadRegistry, validateKnowledge } from "../lib/knowledge";

describe("contratos de conocimiento", () => {
  it("parsea ambos YAML y valida sus schemas", () => { expect(loadRegistry().claims.length).toBeGreaterThan(0); expect(Object.keys(loadJourney().states).length).toBeGreaterThan(0); });
  it("mantiene IDs de claims únicos", () => { const ids = loadRegistry().claims.map(({ id }) => id); expect(new Set(ids).size).toBe(ids.length); });
  it("valida fuentes, transiciones y claims del journey", () => { expect(() => validateKnowledge()).not.toThrow(); });
  it("rechaza una referencia de fuente inválida", () => { const registry = structuredClone(loadRegistry()); registry.claims[0].source = "NO_EXISTE"; expect(() => validateKnowledge(registry, loadJourney())).toThrow(/Fuente inexistente/); });
  it("rechaza una transición inválida", () => { const journey = structuredClone(loadJourney()); journey.states.S10_TUTOR_CHECK.transitions = { yes: "NO_EXISTE" }; expect(() => validateKnowledge(loadRegistry(), journey)).toThrow(/Estado inexistente/); });
  it("rechaza un claim del journey inválido", () => { const journey = structuredClone(loadJourney()); journey.states.S14_THIRD_CYCLE_ACTIVE.claims = ["NO-01"]; expect(() => validateKnowledge(loadRegistry(), journey)).toThrow(/Claim inexistente/); });
});
