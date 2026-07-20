"""Authorization scope helper."""
from __future__ import annotations


def require_scope(auth: str | None, public: bool) -> None:
    if public:
        return
    if not auth or not auth.strip():
        raise PermissionError(
            "Authorization scope required for non-public defensive review"
        )
