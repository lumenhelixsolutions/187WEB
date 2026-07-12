#!/usr/bin/env python3
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]


def main() -> None:
    # suite constants
    sc = ROOT / "scripts/lib/suite-constants.mjs"
    t = sc.read_text(encoding="utf-8")
    if "natasha" not in t:
        t = t.replace(
            '  { id: "publish", name: "187PUBLISH", route: "publish", docs: "187PUBLISH" },\n];',
            '  { id: "publish", name: "187PUBLISH", route: "publish", docs: "187PUBLISH" },\n'
            '  { id: "natasha", name: "187NATASHA", route: "natasha", docs: "187NATASHA" },\n'
            '  { id: "quantum", name: "187QUANTUM", route: "quantum", docs: "187QUANTUM" },\n'
            '  { id: "chain", name: "187CHAIN", route: "chain", docs: "187CHAIN" },\n'
            "];",
        )
        sc.write_text(t, encoding="utf-8", newline="\n")
        print("suite-constants ok")

    # package version
    pj = ROOT / "package.json"
    pkg = json.loads(pj.read_text(encoding="utf-8"))
    pkg["version"] = "0.3.0"
    pj.write_text(json.dumps(pkg, indent=2) + "\n", encoding="utf-8", newline="\n")
    print("package", pkg["version"])

    # showcase
    sp = ROOT / "lib/skill-showcase-data.ts"
    st = sp.read_text(encoding="utf-8")
    if 'id: "natasha"' not in st:
        block = """
  {
    id: "natasha",
    name: "187NATASHA",
    tagline: "Multi-agent operator stack",
    color: "#39FF14",
    description:
      "NATASHA orchestrates THREAD, COMPRESS, TENSION, SPARK, CORD, SCOUT, LAB, and FUSE with bounded subagents and evidence-weighted synthesis.",
    triggers: ["/187natasha", "NATASHA", "natasha stack", "multi-agent"],
    useCases: [
      "Multi-stage agentic workflows with ownership and retries",
      "Context compression before specialist dispatch",
      "Compliant research + isolated verification",
    ],
    outputs: [
      "NATASHA context packet",
      "Subagent handoffs",
      "FUSE synthesis record",
      "Provenance / run lineage",
    ],
    routesTo: [
      { name: "187QUANTUM", when: "circuit or algorithm work" },
      { name: "187CHAIN", when: "contract or DeFi assurance" },
    ],
    templates: [
      { name: "natasha-context-packet.md", when: "Compressing a mission" },
      { name: "natasha-subagent-task.md", when: "Dispatching a role" },
    ],
    related: ["quantum", "chain", "repo"],
  },
  {
    id: "quantum",
    name: "187QUANTUM",
    tagline: "Quantum circuits with claim discipline",
    color: "#a78bfa",
    description:
      "Algorithm selection, circuit specs, optimization metrics, resource estimates, and non-claims for unsupported advantage.",
    triggers: ["/187 quantum", "187QUANTUM", "qiskit", "circuit optimize"],
    useCases: ["Design a circuit", "Benchmark depth/2q gates", "Audit a quantum claim"],
    outputs: ["Circuit metrics", "Equivalence notes", "Resource estimate", "Non-claims"],
    related: ["natasha", "chain"],
  },
  {
    id: "chain",
    name: "187CHAIN",
    tagline: "EVM and DeFi assurance",
    color: "#f59e0b",
    description:
      "Scoped smart-contract review with separate severity and confidence, DeFi risk vectors, and responsible disclosure — no live keys or exploits.",
    triggers: ["/187 chain", "187CHAIN", "solidity audit", "defi risk"],
    useCases: ["Scope an audit", "Map DeFi risks", "Retest findings"],
    outputs: ["Findings", "Severity/confidence", "DeFi vector report", "Disclosure notes"],
    related: ["natasha", "quantum"],
  },
"""
        st = st.replace(
            "export const skillShowcases: SkillShowcaseData[] = [",
            "export const skillShowcases: SkillShowcaseData[] = [" + block,
        )
        sp.write_text(st, encoding="utf-8", newline="\n")
        print("showcase ok")

    # CHANGELOG
    cl = ROOT / "CHANGELOG.md"
    entry = """# Changelog

## [0.3.0] - 2026-07-12

### Added
- **NATASHA v3** multi-agent architecture (THREAD, COMPRESS, TENSION, SPARK, CORD, SCOUT, LAB, FUSE)
- Skills: `natasha-scout`, `neuro-tension`, `token-web`, `idea-spark`, `187quantum`, `187chain`
- Runtime skeletons: `tools/natasha/`, `tools/qchain/`
- Packs: `natasha`, `qchain-lab` install profiles
- Public routes: `/187natasha`, `/187quantum`, `/187chain`
- Local Brain NATASHA dashboards and templates
- Migration: `docs/migrations/CHARLOTTE-TO-NATASHA.md`
- CI: `reserved-names:check`

### Changed
- Ecosystem skill **3.0.0** — operator **NATASHA** (Charlotte reserved)
- `agent-charlotte` / `neuro-toxin` deprecated routers
- Package version **0.3.0**

### Security
- SCOUT forbids fingerprint spoofing, auth/paywall bypass
- CHAIN forbids live keys, live exploits, investment advice

"""
    if cl.exists():
        old = cl.read_text(encoding="utf-8")
        if "0.3.0" not in old[:500]:
            cl.write_text(entry + "\n" + old, encoding="utf-8", newline="\n")
    else:
        cl.write_text(entry, encoding="utf-8", newline="\n")
    print("changelog ok")

    # validation report stub
    report = ROOT / "docs/reports/natasha-v3-validation-report.md"
    report.parent.mkdir(parents=True, exist_ok=True)
    report.write_text(
        """# NATASHA v3 Validation Report

**Branch:** `feat/natasha-v3-qchain`  
**Package:** 0.3.0  
**Date:** 2026-07-12

Commands are re-run at release packaging; fill results from orchestrator gate output.

| Command | Result | Notes |
|---------|--------|-------|
| npm run skills:validate | pending | |
| npm run reserved-names:check | pending | |
| npm test | pending | includes tests/natasha |
| python -m pytest tests/qchain tests/natasha | pending | |
| npm run typecheck | pending | |
| npm run build | pending | |
| npm run release:validate | pending | may need doc/adapter sync |

## Known limitations
- Cirq/pytket adapters are stubs
- Slither/Foundry/Echidna adapters are preflight stubs
- Grok adapters need `npm run adapters:generate`
- Full public CHAR doc pages still transitional allowlist
""",
        encoding="utf-8",
        newline="\n",
    )
    print("report stub ok")


if __name__ == "__main__":
    main()
