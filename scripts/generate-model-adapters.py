#!/usr/bin/env python3
"""Generate model-specific adaptations of the 187web skill library.

Reads canonical skills from .claude/skills/ and emits Gemini, Kimi, ChatGPT,
Grok, Ollama, and Hermes adapters.
"""
import re
import sys
from pathlib import Path
from yaml import safe_load

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / ".claude/skills"
OUT_ROOTS = {
    "gemini": ROOT / ".gemini/skills",
    "kimi": ROOT / ".kimi/skills",
    "chatgpt": ROOT / ".chatgpt/skills",
    "grok": ROOT / ".grok/skills",
    "ollama": ROOT / ".ollama/modelfiles",
    "herme": ROOT / ".herme/agents",
}

def parse_skill(path: Path):
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        raise ValueError(f"{path}: missing frontmatter")
    _, rest = text.split("---", 1)
    fm_text, body = rest.split("---", 1)
    return safe_load(fm_text), body.lstrip("\n")

def extract_system_prompt(body: str, default_name: str) -> str:
    m = re.search(r"## Directive\s*\n\n*(>.*(?:\n>.*)*)", body, re.IGNORECASE)
    if m:
        return "\n".join(line.lstrip("> ").strip() for line in m.group(1).splitlines())
    m = re.search(r"> \*\*Strict developer directive\.\*\*\s*(.*(?:\n> .*)*)", body)
    if m:
        return "\n".join(line.lstrip("> ").strip() for line in m.group(0).splitlines())
    for para in body.split("\n\n"):
        lines = [l.strip() for l in para.splitlines() if l.strip()]
        if not lines:
            continue
        if lines[0].startswith("#") or lines[0].startswith("[") or lines[0].startswith("**Suite:**"):
            continue
        return " ".join(lines)
    return f"You are the {default_name} skill in the 187web Ecosystem."

def temperature_from_body(body: str) -> float:
    text = body.lower()
    if re.search(r"lethality[^\n]*max", text):
        return 0.2
    if re.search(r"lethality[^\n]*medium", text):
        return 0.5
    if re.search(r"lethality[^\n]*low", text):
        return 0.8
    return 0.6

def folded(text: str) -> str:
    return text.replace("\n", "\n  ")

def markdown_adapter(name: str, desc: str, body: str, adapter: str, note: str) -> str:
    return f"""---
name: {name}
description: >-
  {folded(desc)}
model_adapter: {adapter}
---

> **{note}** Canonical source: [`../../.claude/skills/{name}/SKILL.md`](../../.claude/skills/{name}/SKILL.md).

{body}
"""

def ollama_file(name: str, system: str, temp: float) -> str:
    return f'''# Modelfile for {name}
# Source: ../../.claude/skills/{name}/SKILL.md
FROM <base-model>

SYSTEM """
You are the {name} skill in the 187web Ecosystem.

{system}
"""

PARAMETER temperature {temp}
PARAMETER top_p 0.9
'''

def herme_system_file(name: str, system: str) -> str:
    return f"""<|im_start|>system
You are the {name} agent in the 187web Ecosystem.

{system}
<|im_end|>
"""

def main():
    counts = {k: 0 for k in OUT_ROOTS}
    errors = 0
    for skill_dir in sorted(SOURCE.iterdir()):
        src = skill_dir / "SKILL.md"
        if not src.is_file():
            continue
        try:
            fm, body = parse_skill(src)
        except Exception as exc:
            print(f"skip {skill_dir.name}: {exc}", file=sys.stderr)
            errors += 1
            continue
        name = fm.get("name", skill_dir.name)
        desc = fm.get("description", f"Use when working with the {name} skill.")
        system = extract_system_prompt(body, name)
        temp = temperature_from_body(body)

        adapters = {
            "gemini": "Gemini adapter: load as a system instruction.",
            "kimi": "Kimi adapter: load via the Kimi Skill tool or skills directory.",
            "chatgpt": "ChatGPT adapter: use as custom GPT or system instructions.",
            "grok": "Grok adapter: load as repository skill instructions.",
        }
        for adapter, note in adapters.items():
            out = OUT_ROOTS[adapter] / name / "SKILL.md"
            out.parent.mkdir(parents=True, exist_ok=True)
            out.write_text(markdown_adapter(name, desc, body, adapter, note), encoding="utf-8")
            counts[adapter] += 1

        out = OUT_ROOTS["ollama"] / name / "Modelfile"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(ollama_file(name, system, temp), encoding="utf-8")
        counts["ollama"] += 1

        agent_dir = OUT_ROOTS["herme"] / name
        agent_dir.mkdir(parents=True, exist_ok=True)
        (agent_dir / "system.md").write_text(herme_system_file(name, system), encoding="utf-8")
        (agent_dir / "SKILL.md").write_text(
            markdown_adapter(name, desc, body, "hermes", "Hermes adapter: use system.md as the system message."),
            encoding="utf-8",
        )
        counts["herme"] += 1

    print("Generated model adapters:")
    for key, value in counts.items():
        print(f"  {key}: {value}")
    if errors:
        print(f"{errors} errors", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
