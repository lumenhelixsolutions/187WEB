---
name: 187chain
description: >-
  Use for EVM-first smart-contract assurance, DeFi economic risk analysis,
  severity/confidence separation, and responsible disclosure (no live keys or exploits).
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

# 187CHAIN

NATASHA domain skill for smart-contract and DeFi protocol assurance.

## Manual triggers

`/187 chain scope|map|audit|static|fuzz|invariants|upgrade|oracle|defi|governance|retest`

## When to use

Authorized audits, public defensive review, local fork analysis, DeFi risk reports.

## When not to use

Live signing, private keys, live exploits, investment advice, claiming absence of bugs.

## Output contract

1. Authorization / scope statement
2. Architecture & asset flow
3. Findings with **severity** and **confidence** separate
4. DeFi vectors as distinct sections when relevant
5. Retest / disclosure notes

## Safety

Isolated LAB only. No real funds movement. Tool-only signals are not confirmed findings.

## Runtime

`tools/qchain/chain/`

## Acceptance tests

1. Reentrancy fixture produces finding with severity+confidence.
2. Live exploit request → refuse.
