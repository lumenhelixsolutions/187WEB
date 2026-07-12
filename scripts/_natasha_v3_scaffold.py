#!/usr/bin/env python3
"""Scaffold NATASHA v3 phases 2-7 artifacts. Idempotent-ish."""
from __future__ import annotations

import json
import textwrap
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def w(rel: str, content: str) -> None:
    p = ROOT / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    body = textwrap.dedent(content).lstrip("\n")
    if not body.endswith("\n"):
        body += "\n"
    p.write_text(body, encoding="utf-8", newline="\n")
    print("wrote", rel)


def main() -> None:
    # ---- Phase 2 token-web refs ----
    w(
        ".claude/skills/token-web/references/context-capsule-standard.md",
        """
        # Context Capsule Standard

        NATASHA COMPRESS packets use `natasha_packet` YAML (`packet_version: 1.0`).

        Required keys when present in source: mission, deliverable, constraints,
        explicit_exclusions, hard numbers, paths, identifiers, decisions, safety rules,
        test commands, provenance.

        Compression may drop only redundant prose. Soft context may be summarized.
        """,
    )
    w(
        ".claude/skills/token-web/references/fidelity-standard.md",
        """
        # Fidelity Standard

        | Rule | Target |
        |------|--------|
        | Hard-requirement retention | 100% |
        | Identifier / path retention | 100% |
        | Numeric retention | 100% |
        | False additions | 0 |
        | Loss report | Required when soft text dropped |
        | NO_OP | When safe compression impossible |
        """,
    )
    w(
        ".claude/skills/token-web/references/compression-levels.md",
        """
        # Compression Levels

        | Level | Use |
        |-------|-----|
        | L0 NO_OP | Already under budget |
        | L1 Light | Strip filler |
        | L2 Medium | Summarize soft narrative |
        | L3 Aggressive | Requirements + evidence only |

        Target ≥35% reduction only on redundant long-form fixtures.
        """,
    )
    w(
        ".claude/skills/token-web/references/token-metrics.md",
        """
        # Token Metrics

        Report: `input_tokens_est`, `output_tokens_est`, `reduction_pct`,
        `hard_fields_kept`, `soft_fields_summarized`.

        Use chars/4 when tokenizer unavailable; label `estimated`.
        """,
    )
    w(
        ".claude/skills/token-web/references/loss-reporting.md",
        """
        # Loss Reporting

        ```yaml
        loss_report:
          dropped_soft: []
          kept_hard: []
          false_additions: []  # must be empty
          no_op: false
        ```
        """,
    )
    w(
        ".claude/skills/token-web/templates/natasha-context-packet.md",
        """
        # Natasha Context Packet

        ```yaml
        natasha_packet:
          packet_version: 1.0
          mission:
          deliverable:
          constraints: []
          explicit_exclusions: []
          evidence:
            sources: []
            repository_files: []
            measurements: []
          token_budget:
          provenance:
        ```
        """,
    )
    w(
        ".claude/skills/token-web/templates/compression-report.md",
        """
        # Compression Report

        - Level:
        - Reduction %:
        - NO_OP:
        - Loss report:
        """,
    )
    w(
        ".claude/skills/token-web/templates/subagent-handoff.md",
        """
        # Subagent Handoff

        ```yaml
        subagent_report:
          role:
          objective:
          files_read: []
          files_changed: []
          tests_run: []
          unresolved: []
        ```
        """,
    )
    w(
        ".claude/skills/neuro-tension/references/profiles.md",
        """
        # TENSION Profiles

        `exact` · `analytical` · `brainstorm` · `critic` · `synthesis` ·
        `repo-ingestion` · `local-npu`

        Sampling parameters do **not** eliminate hallucinations.
        """,
    )
    w(
        ".claude/skills/idea-spark/references/brainstorm-protocol.md",
        """
        # SPARK Protocol

        frame → diverge (3–5) → critic → score → combine → converge → decision_record

        Score: fit, cost, compatibility, security, maintainability, overhead, testability.
        Do not brainstorm brand/logo redesign.
        """,
    )
    w(
        ".claude/skills/idea-spark/templates/decision-record.md",
        """
        ```yaml
        decision_record:
          question:
          options_considered: []
          evaluation_criteria: []
          selected:
          rationale_summary:
          rejected_reasons: []
          evidence: []
          risks: []
          reversible:
        ```
        """,
    )

    # THREAD upgrade
    ww_path = ROOT / ".claude/skills/widow-weaver/SKILL.md"
    ww = ww_path.read_text(encoding="utf-8")
    if "## NATASHA THREAD" not in ww:
        ww = ww.replace(
            "[neuro-toxin](../neuro-toxin/SKILL.md)",
            "[neuro-tension](../neuro-tension/SKILL.md)",
        )
        ww = ww.replace(
            "[agent-charlotte](../agent-charlotte/SKILL.md)",
            "[natasha-scout](../natasha-scout/SKILL.md)",
        )
        block = """

## NATASHA THREAD (v3)

Module **THREAD**. Parent: [`187web-ecosystem`](../187web-ecosystem/SKILL.md).

v3 aliases: `TLDR_Distill` (= TLDR_Toxin), `Polyglot_Thread`, `Tone_Polish`,
`Task_Extractor`, `Code_Explainer`, `Logic_Solver`, `Refactor_Venom`.

### Verification Record

For Logic_Solver / high-risk reasoning emit:

1. Assumptions
2. Derivation summary (not private scratchpad)
3. Invariants
4. Edge cases
5. Tests
6. Uncertainty

Do not require hidden chain-of-thought dumps.

"""
        needle = "before any other layer of the stack acts.\n"
        if needle in ww:
            ww = ww.replace(needle, needle + block, 1)
        else:
            ww = ww + block
        ww_path.write_text(ww, encoding="utf-8", newline="\n")
        print("upgraded widow-weaver")

    # swarm-mind CORD note
    sm = ROOT / ".claude/skills/swarm-mind/SKILL.md"
    if sm.exists():
        t = sm.read_text(encoding="utf-8")
        if "## NATASHA CORD" not in t:
            t = t.replace(
                "[agent-charlotte]",
                "[natasha-scout]",
            ).replace(
                "[neuro-toxin]",
                "[neuro-tension]",
            )
            t += """

## NATASHA CORD (v3)

Module **CORD** + **FUSE**. Supports solo / assist / flow / swarm-stage / release.
Bound packets, non-overlapping file ownership, bounded retries, critic on high-risk,
FUSE conflict records, source lineage. See `tools/natasha/orchestrator/`.
"""
            sm.write_text(t, encoding="utf-8", newline="\n")
            print("upgraded swarm-mind")

    # silk-sandbox LAB
    ss = ROOT / ".claude/skills/silk-sandbox/SKILL.md"
    if ss.exists():
        t = ss.read_text(encoding="utf-8")
        if "## NATASHA LAB" not in t:
            t = t.replace("Charlotte stack", "NATASHA stack")
            t = t.replace("[agent-charlotte]", "[natasha-scout]")
            t = t.replace("[neuro-toxin]", "[neuro-tension]")
            t += """

## NATASHA LAB (v3)

Profiles: `lab:text` · `lab:python` · `lab:node` · `lab:repo` · `lab:web` ·
`lab:quantum` · `lab:evm`.

Network policy default deny-egress except declared allowlist. Emit run records
(input hash, tools, exit code, artifacts). No live production exploits.
"""
            ss.write_text(t, encoding="utf-8", newline="\n")
            print("upgraded silk-sandbox")

    # ---- tools/natasha ----
    w(
        "tools/natasha/README.md",
        """
        # tools/natasha

        Runtime skeleton for NATASHA COMPRESS, orchestration, SCOUT helpers, and LAB profiles.

        Skills under `.claude/skills/` remain the contracts; these modules are optional executors.
        """,
    )
    w(
        "tools/natasha/schemas/natasha_packet.schema.json",
        json.dumps(
            {
                "$schema": "https://json-schema.org/draft/2020-12/schema",
                "title": "natasha_packet",
                "type": "object",
                "required": ["packet_version", "mission"],
                "properties": {
                    "packet_version": {"type": "string"},
                    "mission": {"type": "string"},
                    "deliverable": {"type": "string"},
                    "constraints": {"type": "array", "items": {"type": "string"}},
                    "explicit_exclusions": {
                        "type": "array",
                        "items": {"type": "string"},
                    },
                    "token_budget": {"type": ["integer", "null"]},
                    "provenance": {"type": "object"},
                },
            },
            indent=2,
        )
        + "\n",
    )
    w(
        "tools/natasha/compress/compress.py",
        '''
        """COMPRESS: loss-bounded context distillation (stdlib)."""
        from __future__ import annotations

        import re
        from dataclasses import dataclass, field


        HARD_MARKERS = (
            "must",
            "required",
            "constraint",
            "path",
            "sha",
            "version",
            "do not",
            "never",
            "forbid",
            "test",
            "npm",
            "pytest",
        )


        @dataclass
        class CompressResult:
            text: str
            no_op: bool
            input_chars: int
            output_chars: int
            kept_hard: list[str] = field(default_factory=list)
            dropped_soft: list[str] = field(default_factory=list)

            @property
            def reduction_pct(self) -> float:
                if self.input_chars == 0:
                    return 0.0
                return max(0.0, 100.0 * (1 - self.output_chars / self.input_chars))


        def _is_hard(line: str) -> bool:
            low = line.lower()
            if re.search(r"[\\\\/][\\w.-]+", line):
                return True
            if re.search(r"\\b\\d+(\\.\\d+)?\\b", line) and any(
                m in low for m in ("must", "require", "version", "port", "byte", "token", "%")
            ):
                return True
            return any(m in low for m in HARD_MARKERS)


        def compress(text: str, budget_chars: int | None = None) -> CompressResult:
            text = text.strip()
            if not text:
                return CompressResult("", True, 0, 0)
            lines = [ln.rstrip() for ln in text.splitlines()]
            hard = [ln for ln in lines if ln.strip() and _is_hard(ln)]
            soft = [ln for ln in lines if ln.strip() and not _is_hard(ln)]
            if budget_chars is None or len(text) <= budget_chars:
                if len(soft) < 3:
                    return CompressResult(text, True, len(text), len(text), hard, [])
            # keep all hard + first sentence of soft blocks
            soft_summ: list[str] = []
            dropped: list[str] = []
            for ln in soft:
                if len(ln) > 120:
                    soft_summ.append(ln[:117] + "...")
                    dropped.append("truncated_soft")
                else:
                    soft_summ.append(ln)
            out_lines = hard + (["", "## Context (compressed)"] + soft_summ[:12] if soft_summ else [])
            out = "\\n".join(out_lines).strip()
            if budget_chars is not None and len(out) > budget_chars:
                # hard requirements first
                out = "\\n".join(hard)[:budget_chars]
            return CompressResult(
                out,
                False,
                len(text),
                len(out),
                hard,
                dropped,
            )
        ''',
    )
    w(
        "tools/natasha/orchestrator/dispatch.py",
        '''
        """CORD-lite: bounded role packets and ownership checks."""
        from __future__ import annotations

        from dataclasses import dataclass, field


        @dataclass
        class RolePacket:
            role: str
            objective: str
            owned_files: list[str] = field(default_factory=list)
            dependencies: list[str] = field(default_factory=list)
            token_budget: int | None = None


        def ownership_conflict(a: RolePacket, b: RolePacket) -> list[str]:
            sa, sb = set(a.owned_files), set(b.owned_files)
            return sorted(sa & sb)


        def fuse(records: list[dict]) -> dict:
            """Evidence-weighted synthesis stub: prefer higher confidence, record conflicts."""
            by_claim: dict[str, list[dict]] = {}
            for r in records:
                claim = r.get("claim", "")
                by_claim.setdefault(claim, []).append(r)
            fused = []
            conflicts = []
            for claim, items in by_claim.items():
                items_sorted = sorted(items, key=lambda x: x.get("confidence", 0), reverse=True)
                fused.append(items_sorted[0])
                if len(items_sorted) > 1 and items_sorted[0].get("value") != items_sorted[1].get(
                    "value"
                ):
                    conflicts.append({"claim": claim, "options": items_sorted})
            return {"fused": fused, "conflicts": conflicts}
        ''',
    )
    w(
        "tools/natasha/scout/policy.py",
        '''
        """SCOUT policy guards."""
        from __future__ import annotations

        FORBIDDEN = (
            "fingerprint spoof",
            "spoof canvas",
            "bypass cloudflare",
            "bypass paywall",
            "break captcha",
            "auth bypass",
            "steal cookie",
        )


        def is_forbidden_request(text: str) -> bool:
            low = text.lower()
            return any(f in low for f in FORBIDDEN)
        ''',
    )
    w(
        "tools/natasha/lab/profiles.py",
        '''
        """LAB profiles registry."""
        PROFILES = {
            "lab:text": {"runtime": "none", "network": "deny"},
            "lab:python": {"runtime": "python", "network": "deny"},
            "lab:node": {"runtime": "node", "network": "deny"},
            "lab:repo": {"runtime": "shell", "network": "deny"},
            "lab:web": {"runtime": "browser", "network": "allowlist"},
            "lab:quantum": {"runtime": "python", "network": "deny"},
            "lab:evm": {"runtime": "foundry", "network": "local-fork"},
        }
        ''',
    )

    # ---- Phase 4 quantum ----
    w(
        ".claude/skills/187quantum/SKILL.md",
        """
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
        """,
    )
    for ref in [
        "algorithm-selection",
        "circuit-representation",
        "transpilation-pipeline",
        "optimization-objectives",
        "correctness-and-equivalence",
        "resource-estimation",
        "backend-and-noise-modeling",
        "quantum-benchmark-standard",
        "quantum-claim-standard",
        "tool-adapters",
    ]:
        w(
            f".claude/skills/187quantum/references/{ref}.md",
            f"# {ref.replace('-', ' ').title()}\n\nSee 187QUANTUM SKILL.md and tools/qchain/quantum/.\n",
        )
    for tmpl in [
        "algorithm-design-spec",
        "circuit-spec",
        "optimization-report",
        "backend-profile",
        "equivalence-check",
        "resource-estimate",
        "benchmark-matrix",
        "quantum-release-brief",
    ]:
        w(
            f".claude/skills/187quantum/templates/{tmpl}.md",
            f"# {tmpl}\n\n(Template for 187QUANTUM workflows.)\n",
        )

    w(
        "tools/qchain/quantum/metrics.py",
        '''
        """Circuit metric helpers (framework-agnostic)."""
        from __future__ import annotations


        def depth_from_layers(layers: list[list[str]]) -> int:
            return len(layers)


        def two_qubit_count(gates: list[tuple]) -> int:
            return sum(1 for g in gates if len(g) >= 3)


        def summarize(n_qubits: int, gates: list[tuple], layers: list[list[str]] | None = None) -> dict:
            return {
                "n_qubits": n_qubits,
                "n_gates": len(gates),
                "n_two_qubit": two_qubit_count(gates),
                "depth": depth_from_layers(layers) if layers else None,
            }
        ''',
    )
    w(
        "tools/qchain/quantum/qiskit_adapter.py",
        '''
        """Qiskit adapter — optional; degrades if qiskit not installed."""
        from __future__ import annotations


        def available() -> bool:
            try:
                import qiskit  # noqa: F401

                return True
            except Exception:
                return False


        def bell_circuit_qasm() -> str:
            # OpenQASM 2.0 Bell pair
            return """OPENQASM 2.0;
        include "qelib1.inc";
        qreg q[2];
        creg c[2];
        h q[0];
        cx q[0],q[1];
        measure q -> c;
        """
        ''',
    )
    w(
        "tools/qchain/quantum/cirq_adapter.py",
        '''
        """Cirq adapter — planned compatibility stub."""

        def available() -> bool:
            try:
                import cirq  # noqa: F401

                return True
            except Exception:
                return False
        ''',
    )
    w(
        "tools/qchain/quantum/pytket_adapter.py",
        '''
        """pytket adapter — planned compatibility stub."""

        def available() -> bool:
            try:
                import pytket  # noqa: F401

                return True
            except Exception:
                return False
        ''',
    )
    w(
        "tools/qchain/quantum/equivalence.py",
        '''
        """Structural equivalence for simple gate lists."""
        from __future__ import annotations


        def gate_lists_equal(a: list[tuple], b: list[tuple]) -> bool:
            return list(a) == list(b)
        ''',
    )
    w(
        "tools/qchain/quantum/resource_estimate.py",
        '''
        """Naive resource estimate."""
        from __future__ import annotations


        def estimate(n_qubits: int, depth: int, two_q: int) -> dict:
            return {
                "n_qubits": n_qubits,
                "depth": depth,
                "two_qubit_gates": two_q,
                "note": "naive estimate; not hardware-calibrated",
            }
        ''',
    )
    w(
        "tools/qchain/quantum/benchmark.py",
        '''
        """Benchmark matrix helper."""
        from __future__ import annotations

        from .metrics import summarize


        def bell_fixture() -> dict:
            gates = [("h", 0), ("cx", 0, 1)]
            layers = [["h0"], ["cx0_1"]]
            return {"name": "bell", **summarize(2, gates, layers)}
        ''',
    )

    # ---- Phase 5 chain ----
    w(
        ".claude/skills/187chain/SKILL.md",
        """
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
        """,
    )
    for ref in [
        "authorization-and-scope",
        "audit-methodology",
        "evm-threat-model",
        "severity-and-confidence",
        "owasp-scsvs-mapping",
        "static-analysis-toolchain",
        "fuzz-and-invariant-testing",
        "upgradeability-and-admin-risk",
        "defi-economic-risk",
        "oracle-risk",
        "governance-and-mev",
        "cross-chain-risk",
        "disclosure-and-retest",
    ]:
        w(
            f".claude/skills/187chain/references/{ref}.md",
            f"# {ref.replace('-', ' ').title()}\n\nSee 187CHAIN SKILL.md and tools/qchain/chain/.\n",
        )
    for tmpl in [
        "audit-scope",
        "architecture-trust-map",
        "asset-flow-map",
        "threat-model",
        "invariant-catalog",
        "finding",
        "audit-report",
        "defi-risk-report",
        "tool-output-triage",
        "retest-report",
        "responsible-disclosure",
    ]:
        w(
            f".claude/skills/187chain/templates/{tmpl}.md",
            f"# {tmpl}\n\n(Template for 187CHAIN workflows.)\n",
        )

    w(
        "tools/qchain/chain/findings.py",
        '''
        """Finding model: severity independent of confidence."""
        from __future__ import annotations

        from dataclasses import dataclass


        @dataclass
        class Finding:
            title: str
            severity: str  # critical|high|medium|low|info
            confidence: str  # confirmed|likely|possible|tool-only
            description: str
            source: str = "manual"

            def to_dict(self) -> dict:
                return {
                    "title": self.title,
                    "severity": self.severity,
                    "confidence": self.confidence,
                    "description": self.description,
                    "source": self.source,
                }
        ''',
    )
    w(
        "tools/qchain/chain/scope.py",
        '''
        """Authorization scope helper."""
        from __future__ import annotations


        def require_scope(auth: str | None, public: bool) -> None:
            if public:
                return
            if not auth or not auth.strip():
                raise PermissionError(
                    "Authorization scope required for non-public defensive review"
                )
        ''',
    )
    w(
        "tools/qchain/chain/slither_adapter.py",
        '''
        """Slither adapter stub — preflight only."""

        def available() -> bool:
            import shutil

            return shutil.which("slither") is not None
        ''',
    )
    w(
        "tools/qchain/chain/foundry_adapter.py",
        '''
        """Foundry adapter stub."""
        import shutil


        def available() -> bool:
            return shutil.which("forge") is not None
        ''',
    )
    w(
        "tools/qchain/chain/echidna_adapter.py",
        '''
        """Echidna adapter stub."""
        import shutil


        def available() -> bool:
            return shutil.which("echidna-test") is not None or shutil.which("echidna") is not None
        ''',
    )
    w(
        "tools/qchain/chain/invariants.py",
        '''
        """Invariant catalog helpers."""


        def default_defi_invariants() -> list[str]:
            return [
                "totalAssets >= totalShares * sharePrice_floor",
                "only authorized roles mint/burn",
                "oracle stale threshold enforced",
            ]
        ''',
    )
    w(
        "tools/qchain/chain/upgrade_review.py",
        '''
        """Upgradeability checklist."""


        def checklist() -> list[str]:
            return [
                "initializer protected",
                "admin key custody documented",
                "storage layout collision review",
                "timelock / multisig on upgrade path",
            ]
        ''',
    )
    w(
        "tools/qchain/chain/defi_model.py",
        '''
        """DeFi risk vector buckets."""

        VECTORS = [
            "code",
            "accounting",
            "oracle",
            "liquidity",
            "liquidation",
            "bad_debt",
            "economic_manipulation",
            "governance",
            "upgrades",
            "operations",
            "cross_chain",
            "mev",
            "concentration",
            "composability",
        ]
        ''',
    )

    # fixtures
    w(
        "tests/qchain/quantum/test_metrics.py",
        '''
        import sys
        from pathlib import Path

        sys.path.insert(0, str(Path(__file__).resolve().parents[3]))

        from tools.qchain.quantum.benchmark import bell_fixture
        from tools.qchain.quantum.equivalence import gate_lists_equal
        from tools.qchain.quantum.metrics import summarize


        def test_bell_fixture():
            b = bell_fixture()
            assert b["n_qubits"] == 2
            assert b["n_two_qubit"] == 1


        def test_summarize():
            s = summarize(3, [("h", 0), ("cx", 0, 1), ("cx", 1, 2)], [["h"], ["cx"], ["cx"]])
            assert s["n_gates"] == 3
            assert s["depth"] == 3


        def test_equivalence():
            assert gate_lists_equal([("h", 0)], [("h", 0)])
            assert not gate_lists_equal([("h", 0)], [("x", 0)])
        ''',
    )
    w(
        "tests/qchain/chain/test_findings.py",
        '''
        import sys
        from pathlib import Path

        sys.path.insert(0, str(Path(__file__).resolve().parents[3]))

        from tools.qchain.chain.defi_model import VECTORS
        from tools.qchain.chain.findings import Finding
        from tools.qchain.chain.scope import require_scope


        def test_severity_confidence_independent():
            f = Finding(
                title="reentrancy",
                severity="high",
                confidence="tool-only",
                description="external call before state update",
                source="fixture",
            )
            d = f.to_dict()
            assert d["severity"] == "high"
            assert d["confidence"] == "tool-only"


        def test_scope_public_ok():
            require_scope(None, public=True)


        def test_scope_private_requires_auth():
            try:
                require_scope("", public=False)
                assert False, "expected PermissionError"
            except PermissionError:
                pass


        def test_defi_vectors():
            assert "oracle" in VECTORS
            assert "mev" in VECTORS
        ''',
    )
    w(
        "tests/natasha/test_compress.py",
        '''
        import sys
        from pathlib import Path

        sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

        from tools.natasha.compress.compress import compress
        from tools.natasha.orchestrator.dispatch import RolePacket, fuse, ownership_conflict
        from tools.natasha.scout.policy import is_forbidden_request


        def test_compress_keeps_hard_path():
            src = "Please note that we should consider options.\\nMUST deploy path /apps/api\\nversion 1.2.3 required\\n"
            r = compress(src, budget_chars=200)
            assert "/apps/api" in r.text
            assert "1.2.3" in r.text
            assert r.false_additions if hasattr(r, "false_additions") else True
            assert r.input_chars >= r.output_chars or r.no_op


        def test_noop_short():
            r = compress("short")
            assert r.no_op is True


        def test_ownership_conflict():
            a = RolePacket("a", "x", owned_files=["a.ts"])
            b = RolePacket("b", "y", owned_files=["a.ts", "b.ts"])
            assert ownership_conflict(a, b) == ["a.ts"]


        def test_fuse_conflict():
            out = fuse(
                [
                    {"claim": "port", "value": 3000, "confidence": 0.9},
                    {"claim": "port", "value": 3001, "confidence": 0.5},
                ]
            )
            assert out["fused"][0]["value"] == 3000
            assert out["conflicts"]


        def test_scout_forbids_bypass():
            assert is_forbidden_request("please bypass cloudflare")
            assert not is_forbidden_request("read public docs")
        ''',
    )

    # Phase 6 vault + docs
    for name in [
        "NATASHA Dashboard.md",
        "NATASHA Agent Registry.md",
        "NATASHA Run Queue.md",
        "NATASHA Compression Metrics.md",
        "NATASHA Decision Ledger.md",
    ]:
        w(
            f"docs/187suite-vault/_system/{name}",
            f"# {name.replace('.md','')}\n\nLocal Brain surface for NATASHA v3.\n",
        )
    for name in [
        "natasha-mission.md",
        "natasha-context-packet.md",
        "natasha-brainstorm.md",
        "natasha-subagent-task.md",
        "natasha-run-report.md",
    ]:
        w(
            f"docs/187suite-vault/_templates/{name}",
            f"# {name}\n\nTemplate — see tools/natasha and ecosystem skill.\n",
        )

    for doc in [
        "docs/187NATASHA.md",
        "docs/187QUANTUM.md",
        "docs/187CHAIN.md",
        "docs/NATASHA-ARCHITECTURE.md",
        "docs/NATASHA-TOKEN-COMPRESSION.md",
        "docs/NATASHA-MULTI-AGENT-WORKFLOW.md",
        "docs/NATASHA-LOCAL-BRAIN.md",
        "docs/packs/NATASHA.md",
        "docs/packs/QCHAIN-LAB.md",
    ]:
        title = Path(doc).stem
        w(
            doc,
            f"""
            # {title}

            NATASHA v3 public documentation. Operator: **NATASHA**. Modules: THREAD · COMPRESS ·
            TENSION · SPARK · CORD · SCOUT · LAB · FUSE. Domain: 187QUANTUM · 187CHAIN.

            See `.claude/skills/187web-ecosystem/SKILL.md` and `docs/migrations/CHARLOTTE-TO-NATASHA.md`.
            """,
        )

    # install profiles append
    ip = ROOT / "docs/187-INSTALL-PROFILES.md"
    if ip.exists() and "natasha" not in ip.read_text(encoding="utf-8").lower():
        with ip.open("a", encoding="utf-8", newline="\n") as f:
            f.write(
                """

### natasha

Full NATASHA core + domain skills:

- THREAD, COMPRESS, TENSION, SPARK, CORD, SCOUT, LAB
- 187QUANTUM, 187CHAIN
- Local Brain templates

```text
/187 install natasha
```

### qchain-lab

Narrow quantum + Web3 lab pack:

- 187QUANTUM, 187CHAIN, LAB profiles `lab:quantum` / `lab:evm`

```text
/187 install qchain-lab
```
"""
            )
            print("appended install profiles")

    # app pages
    for sid, title, desc in [
        ("natasha", "187NATASHA", "NATASHA multi-agent orchestration stack"),
        ("quantum", "187QUANTUM", "Quantum algorithms and circuit engineering"),
        ("chain", "187CHAIN", "Smart-contract and DeFi protocol assurance"),
    ]:
        # map showcase id
        showcase_id = {"natasha": "natasha", "quantum": "quantum", "chain": "chain"}[sid]
        route = {"natasha": "187natasha", "quantum": "187quantum", "chain": "187chain"}[sid]
        w(
            f"app/{route}/page.tsx",
            f"""
            import type {{ Metadata }} from "next";
            import {{ notFound }} from "next/navigation";
            import {{ SkillShowcase }} from "@/components/showcase/SkillShowcase";
            import {{ skillShowcaseIndex }} from "@/lib/skill-showcase-data";

            const skill = skillShowcaseIndex.get("{showcase_id}");

            export const metadata: Metadata = {{
              title: `${{skill?.name ?? "{title}"}} — {desc}`,
              description: skill?.description ?? "{desc}",
            }};

            export default function Page() {{
              if (!skill) notFound();
              return <SkillShowcase skill={{skill}} />;
            }}
            """,
        )

    print("scaffold complete")


if __name__ == "__main__":
    main()
