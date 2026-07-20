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
