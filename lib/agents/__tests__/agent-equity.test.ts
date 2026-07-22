import { describe, it, expect } from "vitest";
import { AGENT_EQUITY } from "../agent-kit";
import { charlotteKit } from "../charlotte-kit";
import { kaliKit } from "../kali-kit";
import { natashaKit } from "../natasha-kit";
import { yelenaKit } from "../yelena-kit";
import { xavierKit } from "../xavier-kit";
import type { AgentKit } from "../agent-kit";

function counts(kit: AgentKit) {
  return {
    skills: kit.skills.length,
    prompts: kit.prompts.length,
    tasks: kit.tasks.length,
    triggers: kit.triggers.length,
    commands: kit.commands.length,
    skillChains: kit.skillChains?.length ?? 0,
  };
}

function expectAtLeast(
  actual: ReturnType<typeof counts>,
  target: { skills: number; prompts: number; tasks: number; triggers: number; commands: number; skillChains: number }
) {
  expect(actual.skills).toBeGreaterThanOrEqual(target.skills);
  expect(actual.prompts).toBeGreaterThanOrEqual(target.prompts);
  expect(actual.tasks).toBeGreaterThanOrEqual(target.tasks);
  expect(actual.triggers).toBeGreaterThanOrEqual(target.triggers);
  expect(actual.commands).toBeGreaterThanOrEqual(target.commands);
  expect(actual.skillChains).toBeGreaterThanOrEqual(target.skillChains);
}

describe("agent equity", () => {
  const peers = [charlotteKit, kaliKit, natashaKit, yelenaKit];

  it("peers meet equity floor", () => {
    for (const kit of peers) {
      expectAtLeast(counts(kit), AGENT_EQUITY.peer);
    }
  });

  it("xavier is roughly 2× peer floor and owns spider-sense", () => {
    const x = counts(xavierKit);
    expectAtLeast(x, AGENT_EQUITY.xavier);
    expect(xavierKit.skills).toContain("spider-sense");
    expect(xavierKit.commands.some((c) => c.id === "aura" || c.id === "hitl")).toBe(true);
    expect(xavierKit.skillChains?.some((c) => c.id.includes("spider-sense"))).toBe(true);
  });

  it("xavier depth is greater than each peer on core dimensions", () => {
    const x = counts(xavierKit);
    for (const kit of peers) {
      const p = counts(kit);
      expect(x.prompts).toBeGreaterThan(p.prompts);
      expect(x.tasks).toBeGreaterThan(p.tasks);
      expect(x.skillChains).toBeGreaterThan(p.skillChains);
    }
  });

  it("kali routes growth skills including create and seo", () => {
    expect(kaliKit.skills).toEqual(
      expect.arrayContaining(["create", "seo", "revenue", "publish", "write", "launch"])
    );
    expect(kaliKit.skillChains?.length).toBeGreaterThanOrEqual(AGENT_EQUITY.peer.skillChains);
  });
});
