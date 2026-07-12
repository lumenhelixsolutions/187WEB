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
    if re.search(r"[\\/][\w.-]+", line):
        return True
    if re.search(r"\b\d+(\.\d+)?\b", line) and any(
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
    out = "\n".join(out_lines).strip()
    if budget_chars is not None and len(out) > budget_chars:
        # hard requirements first
        out = "\n".join(hard)[:budget_chars]
    return CompressResult(
        out,
        False,
        len(text),
        len(out),
        hard,
        dropped,
    )
