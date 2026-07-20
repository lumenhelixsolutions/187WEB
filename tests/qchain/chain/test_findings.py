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
