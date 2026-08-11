import { z } from "zod";

const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const sourceSchema = z
  .object({
    title: z.string().min(1),
    authority: z.string().min(1),
    kind: z.string().min(1),
    url: z.url().optional(),
    local_reference: z.string().min(1).optional(),
    verified_at: date,
    note: z.string().optional(),
  })
  .refine(
    (source) =>
      source.url ||
      source.local_reference ||
      source.kind === "curated_experience",
    "Una fuente necesita url o local_reference",
  );

export const claimSchema = z.object({
  id: z.string().min(1),
  claim: z.string().min(1),
  type: z.string().min(1),
  stage: z.string().min(1),
  source: z.string().min(1),
  verified_at: date,
  volatility: z.enum(["low", "medium", "high"]),
  resolver_role: z.string().min(1),
  blocking: z.boolean(),
});

export const registrySchema = z.object({
  artifact: z.string(),
  version: z.string(),
  status: z.string(),
  frozen_at: date,
  purpose: z.string(),
  policy: z.record(z.string(), z.unknown()),
  claim_types: z.record(z.string(), z.string()),
  sources: z.record(z.string(), sourceSchema),
  navigation_targets: z.record(z.string(), z.string()),
  claims: z.array(claimSchema).min(1),
});

export const navigationOverlaySchema = z.object({
  artifact: z.string().min(1),
  version: z.string().min(1),
  status: z.string().min(1),
  base_registry_version: z.string().min(1),
  verified_at: date,
  purpose: z.string().min(1),
  verification_notes: z.record(z.string(), z.string()).optional(),
  navigation_targets: z.record(z.string(), z.string().min(1)),
});

const outputSchema = z.object({
  headline: z.string(),
  next_action: z.string(),
  claims: z.array(z.string()),
});

const stateSchema = z.object({
  stage: z.string(),
  question: z.string().optional(),
  transitions: z.record(z.string(), z.string()).optional(),
  automatic_transition: z.string().optional(),
  terminal_for_triage: z.boolean().optional(),
  headline: z.string().optional(),
  next_action: z.string().optional(),
  claims: z.array(z.string()).optional(),
  outputs: z.record(z.string(), outputSchema).optional(),
});

const specialTransitionSchema = z.object({
  from: z.string(),
  event: z.string(),
  to: z.string(),
});

export const journeySchema = z.object({
  artifact: z.string(),
  version: z.string(),
  status: z.string(),
  frozen_at: date,
  objective: z.string(),
  resolver_principles: z.array(z.string()),
  top_level_triage: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      entry_state: z.string(),
    }),
  ),
  global_gates: z.record(z.string(), z.array(z.string())),
  states: z.record(z.string(), stateSchema),
  special_transitions: z.array(specialTransitionSchema).optional(),
  resolver_output_contract: z.unknown().optional(),
  mermaid: z.string().optional(),
});

export type Registry = z.infer<typeof registrySchema>;
export type Claim = z.infer<typeof claimSchema>;
export type Source = z.infer<typeof sourceSchema>;
export type Journey = z.infer<typeof journeySchema>;
export type NavigationOverlay = z.infer<typeof navigationOverlaySchema>;
