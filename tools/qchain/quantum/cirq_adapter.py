"""Cirq adapter — planned compatibility stub."""

def available() -> bool:
    try:
        import cirq  # noqa: F401

        return True
    except Exception:
        return False
