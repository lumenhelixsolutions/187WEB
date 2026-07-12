"""SCOUT policy guards."""
from __future__ import annotations

FORBIDDEN = (
    "fingerprint spoof",
    "spoof canvas",
    "bypass cloudflare",
    "bypass paywall",
    "break captcha",
    "auth bypass",
    "steal cookie",
)


def is_forbidden_request(text: str) -> bool:
    low = text.lower()
    return any(f in low for f in FORBIDDEN)
