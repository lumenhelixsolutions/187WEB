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
