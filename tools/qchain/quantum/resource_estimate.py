"""Naive resource estimate."""
from __future__ import annotations


def estimate(n_qubits: int, depth: int, two_q: int) -> dict:
    return {
        "n_qubits": n_qubits,
        "depth": depth,
        "two_qubit_gates": two_q,
        "note": "naive estimate; not hardware-calibrated",
    }
