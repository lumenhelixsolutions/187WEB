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
