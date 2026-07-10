#!/usr/bin/env python3
"""Validate every canonical .claude/skills/<name>/SKILL.md against the universal
skill contract defined in docs/SKILL-CONTRACT.md.
"""
import re
import sys
from pathlib import Path

from yaml import safe_load

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / ".claude/skills"

REQUIRED_SCALAR_FRONTMATTER = [
    "name",
    "description",
    "suite",
    "skill_version",
    "contract_version",
    "last_updated",
    "last_verified",
    "status",
]

REQUIRED_SECTIONS = [
    "Identity",
    "Manual triggers",
    "Automatic triggers",
    "When to use",
    "When not to use",
    "Input contract",
    "Output contract",
    "Routing rules",
    "Safety / ethics guardrails",
    "Integration points",
    "Templates",
    "Acceptance tests",
]

PUBLIC_NAMES = {
    "187REPO", "187CRAFT", "187VIBE", "187LAUNCH",
    "187FREE", "187RESEARCH", "187SEO", "187REVENUE",
    "187DOCS", "187WRITE", "187LEARN", "187TEST",
    "187ACCESS+", "187INCLUDE", "187VERSION", "187PUBLISH",
}


def parse_skill(path: Path):
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        raise ValueError("missing frontmatter")
    _, rest = text.split("---", 1)
    fm_text, body = rest.split("---", 1)
    frontmatter = safe_load(fm_text)
    return frontmatter, body.lstrip("\n")


def has_section(body: str, heading: str) -> bool:
    return re.search(rf"^##\s+{re.escape(heading)}\s*$", body, re.MULTILINE) is not None


def main():
    errors = 0
    if not SOURCE.is_dir():
        print(f"missing skills dir: {SOURCE}", file=sys.stderr)
        sys.exit(1)

    dirs = [d for d in SOURCE.iterdir() if d.is_dir()]

    for skill_dir in dirs:
        src = skill_dir / "SKILL.md"
        if not src.is_file():
            print(f"[FAIL] {skill_dir.name}: missing SKILL.md", file=sys.stderr)
            errors += 1
            continue

        try:
            fm, body = parse_skill(src)
        except Exception as e:
            print(f"[FAIL] {skill_dir.name}: {e}", file=sys.stderr)
            errors += 1
            continue

        if not isinstance(fm, dict):
            print(f"[FAIL] {skill_dir.name}: frontmatter is not a mapping", file=sys.stderr)
            errors += 1
            continue

        name = fm.get("name")
        keys_to_check = REQUIRED_SCALAR_FRONTMATTER if name in PUBLIC_NAMES else ["name", "description"]

        for key in keys_to_check:
            if fm.get(key) is None:
                print(f"[FAIL] {skill_dir.name}: missing frontmatter key: {key}", file=sys.stderr)
                errors += 1

        if name is None:
            continue
        if name in PUBLIC_NAMES:
            for section in REQUIRED_SECTIONS:
                if not has_section(body, section):
                    print(f"[FAIL] {skill_dir.name}: missing section: {section}", file=sys.stderr)
                    errors += 1

    if errors:
        print(f"\n{errors} skill validation error(s)", file=sys.stderr)
        sys.exit(1)

    print(f"[OK] {len(dirs)} canonical skills validated")


if __name__ == "__main__":
    main()
