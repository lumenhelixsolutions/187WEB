"""Finding model: severity independent of confidence."""
from __future__ import annotations

from dataclasses import dataclass


@dataclass
class Finding:
    title: str
    severity: str  # critical|high|medium|low|info
    confidence: str  # confirmed|likely|possible|tool-only
    description: str
    source: str = "manual"

    def to_dict(self) -> dict:
        return {
            "title": self.title,
            "severity": self.severity,
            "confidence": self.confidence,
            "description": self.description,
            "source": self.source,
        }
