"""Invariant catalog helpers."""


def default_defi_invariants() -> list[str]:
    return [
        "totalAssets >= totalShares * sharePrice_floor",
        "only authorized roles mint/burn",
        "oracle stale threshold enforced",
    ]
