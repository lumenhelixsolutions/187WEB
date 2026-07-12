"""Structural equivalence for simple gate lists."""
from __future__ import annotations


def gate_lists_equal(a: list[tuple], b: list[tuple]) -> bool:
    return list(a) == list(b)
