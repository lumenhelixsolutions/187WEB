"""Benchmark matrix helper."""
from __future__ import annotations

from .metrics import summarize


def bell_fixture() -> dict:
    gates = [("h", 0), ("cx", 0, 1)]
    layers = [["h0"], ["cx0_1"]]
    return {"name": "bell", **summarize(2, gates, layers)}
