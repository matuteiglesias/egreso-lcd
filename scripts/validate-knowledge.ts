import { validateKnowledge } from "../lib/knowledge";
const { registry, journey } = validateKnowledge();
console.log(`Knowledge válido: ${registry.claims.length} claims, ${Object.keys(registry.sources).length} fuentes y ${Object.keys(journey.states).length} estados.`);
