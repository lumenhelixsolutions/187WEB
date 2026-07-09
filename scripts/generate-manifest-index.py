#!/usr/bin/env python3
"""Generate public/187ai-eye/manifest-index.json from MANIFEST.xml."""
from __future__ import annotations

import json
import xml.etree.ElementTree as ET
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
MANIFEST = REPO / ".claude/skills/187web-manifest/references/MANIFEST.xml"
OUT = REPO / "public/187ai-eye/manifest-index.json"


def main() -> None:
    tree = ET.parse(MANIFEST)
    root = tree.getroot()
    prompts = []
    for layer in root.findall("layer"):
        lid = layer.attrib.get("id", "")
        lname = layer.attrib.get("name", "")
        lskill = layer.attrib.get("skill", "")
        for p in layer.findall("prompt"):
            pid = p.attrib.get("id")
            if not pid:
                continue
            prompts.append(
                {
                    "id": pid,
                    "alias": p.attrib.get("alias") or None,
                    "layer": lid,
                    "layer_name": lname,
                    "skill": p.attrib.get("skill")
                    or p.attrib.get("skill_ref")
                    or lskill
                    or None,
                    "persona": p.attrib.get("persona") or None,
                    "power": p.attrib.get("power", "any"),
                }
            )
    OUT.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "ecosystem": "187WEB",
        "product": "187aiEYE",
        "manifest_version": root.attrib.get("version", "2.0"),
        "prompt_count": len(prompts),
        "prompts": prompts,
    }
    OUT.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {OUT} ({len(prompts)} prompts)")


if __name__ == "__main__":
    main()