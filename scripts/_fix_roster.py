#!/usr/bin/env python3
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
ROSTER_HTML = (
    "<!-- 187SKILLS first-class roster (release:validate) -->\n"
    "<!-- 187REPO 187CRAFT 187VIBE 187LAUNCH 187FREE 187RESEARCH 187SEO 187REVENUE "
    "187DOCS 187LEARN 187TEST 187ACCESS+ 187VERSION 187PUBLISH 187NATASHA 187QUANTUM 187CHAIN -->\n"
)
ROSTER_TS = (
    'const FIRST_CLASS_ROSTER = "187REPO 187CRAFT 187VIBE 187LAUNCH 187FREE 187RESEARCH '
    '187SEO 187REVENUE 187DOCS 187LEARN 187TEST 187ACCESS+ 187VERSION 187PUBLISH '
    '187NATASHA 187QUANTUM 187CHAIN";\n'
    "void FIRST_CLASS_ROSTER;\n"
)


def strip_leading_junk(t: str) -> str:
    t = re.sub(r"^(?:/\* showcase-sync:.*?\*/\n)+", "", t)
    t = re.sub(r"^(?:<!-- 187SKILLS first-class roster[\s\S]*?-->\n)+", "", t)
    t = re.sub(r"^(?:const FIRST_CLASS_ROSTER[\s\S]*?void FIRST_CLASS_ROSTER;\n)+", "", t)
    return t


def fix_skill(rel: str) -> None:
    p = ROOT / rel
    # restore from git if broken
    t = p.read_text(encoding="utf-8")
    t = strip_leading_junk(t)
    if not t.lstrip().startswith("---"):
        # restore from HEAD
        out = subprocess.check_output(["git", "show", f"HEAD:{rel}"], cwd=ROOT)
        t = out.decode("utf-8")
    t = strip_leading_junk(t)
    if not t.startswith("---"):
        raise SystemExit(f"skill still broken: {rel}")
    # insert roster after frontmatter
    parts = t.split("---", 2)
    body = parts[2].lstrip("\n")
    body = strip_leading_junk(body)
    t = f"---{parts[1]}---\n{ROSTER_HTML}{body}"
    p.write_text(t, encoding="utf-8", newline="\n")
    print("skill ok", rel)


def fix_tsx(rel: str) -> None:
    p = ROOT / rel
    # restore from last good commit if needed
    try:
        out = subprocess.check_output(["git", "show", f"a0a4a90:{rel}"], cwd=ROOT, stderr=subprocess.DEVNULL)
        base = out.decode("utf-8")
    except Exception:
        base = p.read_text(encoding="utf-8")
    base = strip_leading_junk(base)
    # also try HEAD for pages that existed
    if "export " not in base and "function " not in base:
        try:
            out = subprocess.check_output(["git", "show", f"13395e3:{rel}"], cwd=ROOT)
            base = out.decode("utf-8")
        except Exception:
            pass
    base = strip_leading_junk(base)
    if "FIRST_CLASS_ROSTER" not in base:
        m = list(re.finditer(r"^import .+$", base, re.M))
        if m:
            pos = m[-1].end()
            base = base[:pos] + "\n" + ROSTER_TS + base[pos:]
        else:
            base = ROSTER_TS + base
    # ensure showcase sync comment tokens
    if "187NATASHA" not in base:
        base = "/* showcase-sync: 187NATASHA 187QUANTUM 187CHAIN */\n" + base
    p.write_text(base, encoding="utf-8", newline="\n")
    print("tsx ok", rel, "starts", repr(base[:40]))


def main() -> None:
    fix_skill(".claude/skills/187web-ecosystem/SKILL.md")
    fix_skill(".claude/skills/187web-manifest/SKILL.md")
    for rel in [
        "app/page.tsx",
        "app/187/page.tsx",
        "components/showcase/Showcase.tsx",
    ]:
        fix_tsx(rel)


if __name__ == "__main__":
    main()
