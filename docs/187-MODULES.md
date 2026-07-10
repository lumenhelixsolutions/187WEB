# 187WEB Modules — THREAD / TUNE / CORD / CHAR / LAB

The five modules are cross-cutting capabilities. They do not replace the 187SKILLS suite; they sharpen how any skill thinks, tunes, routes, scouts, and executes.

| Module | Full name | What it does |
|---|---|---|
| **THREAD** | Prompt + intent thread | Prompt shaping, intent extraction, rewrite, refactor |
| **TUNE** | Inference tuner | Model behavior, output profile, inference settings |
| **CORD** | Coordinated role dispatch | Expert persona routing, multi-skill orchestration |
| **CHAR** | Shared scout | Web/source/context helper, research, reference harvesting |
| **LAB** | Local action box | Isolated execution and test workspace |

## THREAD

THREAD turns messy input into a clean, scoped directive. Use it before any skill acts when the request is vague, long, or contains conflicting instructions.

- Extract the real intent.
- Restate the task in one bounded sentence.
- Strip decoration and hedging.
- Hand off to the matched skill with a clean prompt.

## TUNE

TUNE sets the inference profile for the job. It does not change the model; it changes how the model is asked to respond.

- Output length and density.
- Tone: executive, technical, plain language, or marketing.
- Reasoning depth: quick, structured, or exploratory.
- Safety and evidence standards.

## CORD

CORD routes work to the right expert persona or skill. It is the coordination layer, not the execution layer.

### CORD compact role card template

```markdown
- **Role codename:**
- **Domain:**
- **Activation trigger:**
- **Input contract:**
- **Output contract:**
- **Safety guardrails:**
- **Handoff to:**
```

Use one card per persona or skill in a flow. Keep each card to seven lines. CORD reads the cards, picks the right one, and passes the scoped task.

## CHAR

CHAR is the shared scout. It gathers context from the web, source repositories, or internal notes and threads the findings back into the active workspace.

### CHAR compact check template

```markdown
- **Target / question:**
- **Source scope:**
- **Confidence:**
- **Key finding:**
- **Source URL / citation:**
- **Related note:**
- **Next action:**
```

Use CHAR when the work needs external research, competitive intelligence, reference harvesting, or live data extraction. CHAR always cites sources and never bypasses authentication or paywalls.

## LAB

LAB is the isolated execution and test workspace. It runs generated code, commands, or experiments in a bounded environment with logging and rollback.

- Execute only within the approved scope.
- Capture stdout, stderr, and exit codes.
- Verify before handing results back.
- Never modify production systems without explicit authorization.

## Default behavior

The default invocation is **solo + brief**: one skill, concise output, minimal coordination. Modules join only when they add clear value.
