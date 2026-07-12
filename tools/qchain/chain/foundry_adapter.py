"""Foundry adapter stub."""
import shutil


def available() -> bool:
    return shutil.which("forge") is not None
