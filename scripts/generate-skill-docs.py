#!/usr/bin/env python3
"""Generate public skill docs from canonical .claude/skills definitions.

Emits one docs/187<NAME>.md file per skill in the public suite. The doc is a
condensed, human-readable landing page that points back to the canonical skill.
"""
import re
import sys
from pathlib import Path

from yaml import safe_load

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / ".claude/skills"
DOCS = ROOT / "docs"

# Public first-class skills + suite-wide subskills that need a docs/ page.
PUBLIC_DOCS = {
    "187free": "187FREE",
    "187research": "187RESEARCH",
    "187seo": "187SEO",
    "187revenue": "187REVENUE",
    "187docs": "187DOCS",
    "187write": "187WRITE",
    "187learn": "187LEARN",
    "187test": "187TEST",
    "187access-plus": "187ACCESS",
    "187include": "187INCLUDE",
    "187version": "187VERSION",
    "187publish": "187PUBLISH",
}


def parse_skill(path: Path):
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        raise ValueError(f"{path}: missing frontmatter")
    _, rest = text.split("---", 1)
    fm_text, body = rest.split("---", 1)
    frontmatter = safe_load(fm_text)
    return frontmatter, body.lstrip("\n")


def extract_sections(body: str):
    sections = {}
    current = None
    buffer = []
    for line in body.splitlines():
        m = re.match(r"^##\s+(.+)$", line)
        if m:
            if current:
                sections[current] = "\n".join(buffer).strip()
            current = m.group(1).strip().lower()
            buffer = []
        elif current is not None:
            buffer.append(line)
    if current:
        sections[current] = "\n".join(buffer).strip()
    return sections


def clean_list(text: str) -> list[str]:
    items = []
    for line in text.splitlines():
        line = line.strip()
        if line.startswith("-") or line.startswith("*"):
            items.append(line.lstrip("-* ").strip())
        elif re.match(r"^\d+\.", line):
            items.append(re.sub(r"^\d+\.\s*", "", line).strip())
    return items


def format_list(items: list[str]) -> str:
    return "\n".join(f"- {item}" for item in items) if items else "-"


def format_numbered(items: list[str]) -> str:
    return "\n".join(f"{i + 1}. {item}" for i, item in enumerate(items)) if items else "1."


def extract_templates(section: str) -> list[tuple[str, str]]:
    rows = []
    in_table = False
    for line in section.splitlines():
        if line.strip().startswith("|") and "---" not in line:
            cells = [c.strip() for c in line.split("|")][1:-1]
            if len(cells) >= 2 and cells[0] not in ("Template", "---"):
                template = cells[0].strip("`[]()")
                when = cells[1]
                rows.append((template, when))
        elif line.strip().startswith("-"):
            text = line.strip().lstrip("- ")
            if "`" in text:
                template = re.search(r"`([^`]+)`", text)
                if template:
                    rows.append((template.group(1), text))
    return rows


def format_templates(rows: list[tuple[str, str]]) -> str:
    if not rows:
        return "No templates listed."
    lines = ["| Template | When to use |", "|---|---|"]
    for template, when in rows:
        lines.append(f"| `{template}` | {when} |")
    return "\n".join(lines)


def first_para(text: str) -> str:
    paras = [p.strip() for p in text.split("\n\n") if p.strip()]
    return paras[0] if paras else ""


def cli_route(name: str) -> str:
    base = name.lower().replace("187", "")
    if base == "access-plus":
        return "187repo.sh access"
    return f"187repo.sh {base}"


def docs_file(name: str) -> str:
    key = name.lower().replace("187", "").replace("-plus", "")
    return f"docs/187{key.upper()}.md"


def render_doc(fm: dict, sections: dict) -> str:
    name = fm.get("name", "")
    title = name.replace("-plus", "+")
    identity = first_para(sections.get("identity", ""))
    manual = clean_list(sections.get("manual triggers", ""))
    automatic = clean_list(sections.get("automatic triggers", ""))
    when_use = clean_list(sections.get("when to use", ""))
    outputs = clean_list(sections.get("output contract", ""))
    templates = format_templates(extract_templates(sections.get("templates", "")))
    acceptance = clean_list(sections.get("acceptance tests", ""))

    return f"""# {title} — Public Skill Doc

> **Canonical skill:** [`.claude/skills/{name}/SKILL.md`](.claude/skills/{name}/SKILL.md)  
> **CLI:** `{cli_route(name)}`

## Identity

{identity}

## Triggers

### Manual

{format_list(manual)}

### Automatic

{format_list(automatic)}

## When to use

{format_list(when_use)}

## Output contract

{format_numbered(outputs)}

## Templates

{templates}

## Acceptance tests

{format_numbered(acceptance)}

## Routes

- **Skill source:** `.claude/skills/{name}/SKILL.md`
- **Docs:** `{docs_file(name)}`
- **CLI:** `{cli_route(name)}`
"""


def main():
    errors = 0
    for skill_dir_name, doc_stem in PUBLIC_DOCS.items():
        src = SOURCE / skill_dir_name / "SKILL.md"
        out = DOCS / f"{doc_stem}.md"
        if not src.is_file():
            print(f"missing canonical skill: {src}", file=sys.stderr)
            errors += 1
            continue
        try:
            fm, body = parse_skill(src)
            sections = extract_sections(body)
            out.write_text(render_doc(fm, sections), encoding="utf-8")
            print(f"generated {out}")
        except Exception as e:
            print(f"failed {skill_dir_name}: {e}", file=sys.stderr)
            errors += 1

    if errors:
        sys.exit(1)


if __name__ == "__main__":
    main()
