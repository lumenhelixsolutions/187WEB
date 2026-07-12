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
