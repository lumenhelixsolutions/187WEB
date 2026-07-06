import { z } from "zod";

export const ObservabilityModeSchema = z.enum(["off", "minimal", "full"]);
export type ObservabilityMode = z.infer<typeof ObservabilityModeSchema>;

export const ObservabilityProfileSchema = z.object({
  mode: ObservabilityModeSchema.default("off"),
  content_capture: z.boolean().default(false),
  eval: z.boolean().default(false),
  security: z.boolean().default(false),
  charlotte_crawl: z.boolean().default(false),
});

export type ObservabilityProfile = z.infer<typeof ObservabilityProfileSchema>;

export const AgentStatusSchema = z.enum(["idle", "running", "done", "blocked"]);
export type AgentStatus = z.infer<typeof AgentStatusSchema>;

export const SubAgentSchema = z.object({
  id: z.string(),
  alias: z.string().optional(),
  persona: z.string().optional(),
  status: AgentStatusSchema.default("idle"),
  nested: z.boolean().optional(),
});

export type SubAgent = z.infer<typeof SubAgentSchema>;

export const ActiveAgentsSchema = z.object({
  primary_skill: z.string().optional(),
  primary_persona: z.string().optional(),
  sub_agents: z.array(SubAgentSchema).default([]),
});

export type ActiveAgents = z.infer<typeof ActiveAgentsSchema>;

export const CompilePayloadSchema = z.object({
  ecosystem: z.string().optional(),
  manifest_version: z.string().optional(),
  power_mode: z.string().optional(),
  cwd: z.string().optional(),
  prompt_id: z.string().optional(),
  alias: z.string().optional(),
  layer: z.string().optional(),
  layer_name: z.string().optional(),
  skill: z.string().optional(),
  persona: z.string().optional(),
  directive: z.string().optional(),
  vars: z.array(z.string()).optional(),
  neuro_toxin: z
    .object({
      toxicity: z.union([z.string(), z.number()]).optional(),
      lethality: z.string().optional(),
    })
    .optional(),
  observability_profile: ObservabilityProfileSchema.optional(),
  active_agents: ActiveAgentsSchema.optional(),
  compiler: z.string().optional(),
  compiled_at: z.string().optional(),
  trace_id: z.string().optional(),
});

export type CompilePayload = z.infer<typeof CompilePayloadSchema>;

export const ModuleTogglesSchema = z.object({
  observability: ObservabilityModeSchema.default("off"),
  sandbox: z.boolean().default(true),
  charlotte_crawl: z.boolean().default(false),
  eval: z.boolean().default(false),
});

export type ModuleToggles = z.infer<typeof ModuleTogglesSchema>;

export const ManifestPromptSchema = z.object({
  id: z.string(),
  alias: z.string().optional(),
  layer: z.string().optional(),
  layer_name: z.string().optional(),
  skill: z.string().optional(),
  persona: z.string().optional(),
  power: z.string().optional(),
});

export type ManifestPrompt = z.infer<typeof ManifestPromptSchema>;