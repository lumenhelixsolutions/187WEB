import type { ActiveAgents, CompilePayload, ManifestPrompt, SubAgent } from "./types";

/** Folder → swarm-mind persona + suggested sub-agent pool (swarm-mind + MANIFEST.xml). */
const FOLDER_ROUTES: Record<
  string,
  { persona: string; primarySkill: string; subAgentIds: string[] }
> = {
  "/MachineLearning": {
    persona: "alpha-architect",
    primarySkill: "swarm-mind",
    subAgentIds: ["ml-systems-architect", "llm-deployment-architect"],
  },
  "/RAG": {
    persona: "rag-weaver",
    primarySkill: "swarm-mind",
    subAgentIds: ["llm-deployment-architect", "document-summarization"],
  },
  "/Design": {
    persona: "ui-spinner",
    primarySkill: "swarm-mind",
    subAgentIds: ["a11y-linting-agent", "ui-aesthetic-auditor", "multimodal-agent-designer"],
  },
  "/Security": {
    persona: "red-team-widow",
    primarySkill: "swarm-mind",
    subAgentIds: ["xss-vulnerability-scanner", "ai-ethics-reviewer"],
  },
  "/Hardware": {
    persona: "edge-venom",
    primarySkill: "swarm-mind",
    subAgentIds: ["edge-ai-deployment-specialist", "npu-performance-linter"],
  },
  "/Infrastructure": {
    persona: "sysop-widow",
    primarySkill: "swarm-mind",
    subAgentIds: ["state-machine-generator", "auto-doc-generator"],
  },
};

export function matchFolderRoute(cwd: string | undefined) {
  if (!cwd) return null;
  // Match whole path segments — a substring test would route "/Designer" or
  // "/RAGtime" to the wrong persona.
  const segments = new Set(cwd.replace(/\\/g, "/").split("/"));
  for (const [path, route] of Object.entries(FOLDER_ROUTES)) {
    if (segments.has(path.slice(1))) return route;
  }
  return null;
}

export function buildActiveAgents(
  compile: CompilePayload | null,
  manifestIndex: ManifestPrompt[],
): ActiveAgents {
  const route = matchFolderRoute(compile?.cwd);
  const primarySkill = compile?.skill ?? route?.primarySkill ?? "widow-weaver";
  const primaryPersona = compile?.persona ?? route?.persona ?? "";

  const activePromptId = compile?.prompt_id;
  const poolIds = new Set<string>();
  if (activePromptId) poolIds.add(activePromptId);
  route?.subAgentIds.forEach((id) => poolIds.add(id));

  const sub_agents: SubAgent[] = Array.from(poolIds).map((id) => {
    const meta = manifestIndex.find((p) => p.id === id);
    return {
      id,
      alias: meta?.alias,
      persona: meta?.persona,
      status: id === activePromptId ? "running" : "idle",
      nested: id !== activePromptId && activePromptId !== undefined,
    };
  });

  return {
    primary_skill: primarySkill,
    primary_persona: primaryPersona || undefined,
    sub_agents,
  };
}

export function defaultObservabilityFromEnv(): CompilePayload["observability_profile"] {
  const raw = (process.env.E187WEB_OBSERVABILITY ?? "off").toLowerCase();
  const mode = raw === "minimal" || raw === "full" ? raw : "off";
  return {
    mode,
    content_capture: false,
    eval: mode === "full",
    security: mode !== "off",
    charlotte_crawl: false,
  };
}