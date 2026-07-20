---
name: 187quantum
description: >-
  Use for quantum algorithm selection, circuit design, optimization,
  resource estimation, and claim-disciplined audits (no unsupported advantage claims).
suite: 187SKILLS
skill_version: 1.0.0
contract_version: 2.0.0
last_updated: 2026-07-12
last_verified: 2026-07-12
status: active
replaces: none
deprecated: false
compatible_with:
  - 187webdesign >=0.2.0
requires:
  - docs/SKILL-CONTRACT.md
---

# 187QUANTUM

NATASHA domain skill for quantum algorithms and circuits. Qiskit is V1 baseline.

## Manual triggers

`/187 quantum design|circuit|optimize|map|verify|benchmark|estimate|audit`

## When to use

Algorithm choice, circuit specs, transpilation metrics, resource estimates, paper claim audit.

## When not to use

Unsupported quantum advantage, crypto-break, or scalability claims without evidence.

## Output contract

1. Objective & classical baseline (when performance discussed)
2. Circuit / algorithm spec
3. Metrics before/after (qubits, depth, 2q gates)
4. Equivalence or distribution evidence
5. Seeds, versions, limitations, non-claims

## Safety

No fabricated hardware results. Label simulations. Record seeds and software versions.

## Runtime

`tools/qchain/quantum/` — metrics, adapters, equivalence, estimates.

## Acceptance tests

1. Bell fixture metrics reported.
2. Advantage claim without evidence → refuse / non-claim.
