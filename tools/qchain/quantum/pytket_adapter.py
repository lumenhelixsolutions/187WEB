"""pytket adapter — planned compatibility stub."""

def available() -> bool:
    try:
        import pytket  # noqa: F401

        return True
    except Exception:
        return False
