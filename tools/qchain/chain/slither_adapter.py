"""Slither adapter stub — preflight only."""

def available() -> bool:
    import shutil

    return shutil.which("slither") is not None
