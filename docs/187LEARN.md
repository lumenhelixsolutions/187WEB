# 187learn — Public Skill Doc

> **Canonical skill:** [`.claude/skills/187learn/SKILL.md`](.claude/skills/187learn/SKILL.md)  
> **CLI:** `187repo.sh learn`

## Identity

187LEARN designs courses, study plans, curricula, lessons, workshops, microlearning, project-based learning, instructor guides, student guides, and accessible learning experiences for 187WEB projects. It translates knowledge into sequenced, measurable, learner-centered artifacts that can feed docs, SEO, revenue, and testing workflows.

## Triggers

### Manual

- `/187learn`
- `187LEARN`
- `course architect`
- `study plan`
- `lesson plan`
- `syllabus`
- `workshop`
- `learning path`
- `curriculum`
- `microlearning`
- `instructor guide`
- `student guide`
- `accessible course design`

### Automatic

-

## When to use

- Building a new course, workshop, or tutorial series.
- Sequencing lessons into a study plan or learning path.
- Writing instructor and learner guides.
- Designing project-based or microlearning experiences.
- Converting documentation into teachable content.
- Planning course metadata, landing copy, and quiz integration.

## Output contract

1. **Mode** — which 187LEARN mode is active.
2. **Learning outcomes** — observable, measurable objectives.
3. **Audience profile** — prior knowledge, context, and access needs.
4. **Sequence / scope** — modules, lessons, timing, prerequisites.
5. **Lesson plans** — objectives, activities, materials, checks.
6. **Assessments** — knowledge checks, practice tasks, 187TEST integration points.
7. **Materials list** — slides, handouts, demos, reading links.
8. **Accessibility plan** — captions, transcripts, alt text, pacing, formats.
9. **Delivery notes** — sync vs async, instructor vs self-paced.
10. **Downstream hooks** — docs routes, SEO metadata, revenue options, 187TEST items.
11. **Next actions** — drafts to produce, reviews to schedule.

## Templates

| Template | When to use |
|---|---|
| `templates/course-outline.md`](templates/course-outline.md` | Full course map with modules, outcomes, and logistics. |
| `templates/lesson-plan.md`](templates/lesson-plan.md` | Single lesson with objectives, activities, and checks. |
| `templates/study-plan.md`](templates/study-plan.md` | Self-paced learner schedule over days or weeks. |
| `templates/workshop-runbook.md`](templates/workshop-runbook.md` | Facilitator guide for live or async workshops. |

## Acceptance tests

1. Prompt: "187LEARN turn promptPACK into a 4-week course." → Expected: course outline, study plan, lessons, exercises, 187TEST quiz integration, 187ACCESS+ learning access review, optional 187REVENUE monetization plan.
2. Prompt: "Build a 1-hour workshop on accessible color contrast." → Expected: 187LEARN workshop runbook with objectives, activities, handouts, 187TEST knowledge check, and 187ACCESS+ review.
3. Prompt: "Create a learning path from beginner HTML to deploying a landing page." → Expected: sequenced modules, prerequisites, practice tasks, linked docs, and 187TEST placement check.
4. Prompt: "Convert the README into a microlearning series." → Expected: 187LEARN microlearning map plus 187DOCS sync plan.

## Routes

- **Skill source:** `.claude/skills/187learn/SKILL.md`
- **Docs:** `docs/187LEARN.md`
- **CLI:** `187repo.sh learn`
