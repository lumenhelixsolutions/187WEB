export type Prompt = {
  id: string;
  title: string;
  body: string;
  whenToUse: string;
};

export type Task = {
  id: string;
  title: string;
  steps: string[];
  output: string;
};

export type Trigger = {
  id: string;
  condition: string;
  action: string;
};

export type Command = {
  id: string;
  name: string;
  description: string;
  args?: string;
  premium?: boolean;
};

export type SkillChainStep = {
  skillId: string;
  action: string;
};

export type SkillChain = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  classMix: string;
  steps: SkillChainStep[];
  artifact: string;
  artifactExample: string;
};

export type AgentKit = {
  slug: string;
  name: string;
  color: string;
  tagline: string;
  overview: string;
  /** Routed skill ids (first-class + subskills). Peer agents aim for parity; XAVIER ~2×. */
  skills: string[];
  prompts: Prompt[];
  tasks: Task[];
  triggers: Trigger[];
  commands: Command[];
  skillChains?: SkillChain[];
};

/** Peer crew target counts (CHARLOTTE · KALI · NATASHA · YELENA). XAVIER ≈ 2×. */
export const AGENT_EQUITY = {
  peer: { skills: 8, prompts: 8, tasks: 8, triggers: 8, commands: 6, skillChains: 6 },
  xavier: { skills: 14, prompts: 14, tasks: 14, triggers: 14, commands: 10, skillChains: 11 },
} as const;
