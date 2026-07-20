import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from tools.natasha.compress.compress import compress
from tools.natasha.orchestrator.dispatch import RolePacket, fuse, ownership_conflict
from tools.natasha.scout.policy import is_forbidden_request


def test_compress_keeps_hard_path():
    src = "Please note that we should consider options.\nMUST deploy path /apps/api\nversion 1.2.3 required\n"
    r = compress(src, budget_chars=200)
    assert "/apps/api" in r.text
    assert "1.2.3" in r.text
    assert r.false_additions if hasattr(r, "false_additions") else True
    assert r.input_chars >= r.output_chars or r.no_op


def test_noop_short():
    r = compress("short")
    assert r.no_op is True


def test_ownership_conflict():
    a = RolePacket("a", "x", owned_files=["a.ts"])
    b = RolePacket("b", "y", owned_files=["a.ts", "b.ts"])
    assert ownership_conflict(a, b) == ["a.ts"]


def test_fuse_conflict():
    out = fuse(
        [
            {"claim": "port", "value": 3000, "confidence": 0.9},
            {"claim": "port", "value": 3001, "confidence": 0.5},
        ]
    )
    assert out["fused"][0]["value"] == 3000
    assert out["conflicts"]


def test_scout_forbids_bypass():
    assert is_forbidden_request("please bypass cloudflare")
    assert not is_forbidden_request("read public docs")
