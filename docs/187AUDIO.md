# 187audio — Public Skill Doc

> **Canonical skill:** [`.claude/skills/187audio/SKILL.md`](.claude/skills/187audio/SKILL.md)

## Identity

187AUDIO builds Web Audio and Three.js geometry that reacts to frequency data, beats, and microphone input in real time.

## Triggers

### Manual

- `/187audio`
- `187AUDIO`
- `audio reactive`
- `music visualizer`
- `frequency mesh`
- `mic input`
- `audio three.js`

### Automatic

- Any request mentioning audio-reactive visuals, music visualizer, frequency mesh, or mic-driven motion.

## When to use

- Building audio-reactive mesh or particle systems.
- Syncing visuals to frequency bands or beat detection.
- Adding microphone-driven motion with permission handling.

## Output contract

1. **Audio node graph** — source → analyzer → gain → output.
2. **Frequency-band mapping** — which bands drive which geometry/material properties.
3. **Geometry reactivity spec** — scale, position, color, emissive, or morph targets.
4. **Permission and performance notes** — autoplay policy, mic consent, throttling.
5. **Next actions** — concrete, assignable steps.

## Templates

| Template | When to use |
|---|---|
| `templates/audio-reactive-spec.md` | Building a music-reactive scene. |
| `templates/frequency-mapping.md` | Mapping audio bands to geometry. |

## Acceptance tests

1. Prompt: "Make a sphere react to music." → Expected: node graph + band mapping.
2. Prompt: "Use microphone input to drive particles." → Expected: permission notes + reactivity spec.
3. Prompt: "Avoid audio auto-play issues." → Expected: user-gesture handling plan.

## Routes

- **Skill source:** `.claude/skills/187audio/SKILL.md`
- **Docs:** `docs/187AUDIO.md`
- **Page:** `/187audio`
