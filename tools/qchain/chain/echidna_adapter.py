"""Echidna adapter stub."""
import shutil


def available() -> bool:
    return shutil.which("echidna-test") is not None or shutil.which("echidna") is not None
