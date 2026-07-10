# 187test — Public Skill Doc

> **Canonical skill:** [`.claude/skills/187test/SKILL.md`](.claude/skills/187test/SKILL.md)  
> **CLI:** `187repo.sh test`

## Identity

187TEST builds quizzes, tests, polls, surveys, rubrics, question banks, practice tests, placement tests, knowledge checks, course feedback forms, user feedback forms, validation surveys, and assessment analytics. Every public-facing instrument is reviewed for bias, accessibility, and appropriate use before it ships.

## Triggers

### Manual

- `/187test`
- `187TEST`
- `quiz builder`
- `test builder`
- `poll builder`
- `survey builder`
- `rubric builder`
- `question bank`
- `practice test`
- `placement test`
- `knowledge check`
- `course feedback`
- `user feedback`
- `validation survey`

### Automatic

-

## When to use

- Creating quizzes, tests, or knowledge checks for a course.
- Building polls or surveys for research, product feedback, or validation.
- Writing rubrics for projects, workshops, or peer review.
- Generating question banks for adaptive practice.
- Analyzing poll results or test performance.

## Output contract

1. **Mode** — which 187TEST mode is active.
2. **Assessment purpose** — what decision the results support.
3. **Audience and stakes** — low-stakes check vs. high-stakes evaluation.
4. **Item list** — questions, options, correct answers, and explanations.
5. **Rubric** — scoring criteria and levels for open-ended or project work.
6. **Bias review** — flagged language, stereotypes, or construct gaps.
7. **Accessibility review** — screen-reader compatibility, timing, plain language.
8. **Data-use statement** — what is collected, how long it is kept, who sees it.
9. **Analytics plan** — how to interpret results and iterate.
10. **Export plan** — QTI, markdown, CSV, or API format.
11. **Human-review gate** — required for high-stakes or sensitive contexts.
12. **Next actions** — items to finalize, reviews to schedule, integrations to wire.

## Templates

| Template | When to use |
|---|---|
| `templates/quiz.md`](templates/quiz.md` | Multiple-choice, checkbox, or short-answer quiz with answers and explanations. |
| `templates/survey.md`](templates/survey.md` | Feedback or validation survey with purpose and data-use statement. |
| `templates/rubric.md`](templates/rubric.md` | Scoring guide for projects, essays, workshops, or peer review. |
| `templates/poll.md`](templates/poll.md` | Quick single-question poll with results interpretation. |

## Acceptance tests

1. Prompt: "187TEST create a 25-question quiz with rubric and feedback." → Expected: question bank, answers, rubric, feedback, bias review, accessibility review, optional QTI export plan.
2. Prompt: "Build a course feedback survey." → Expected: 187TEST survey with purpose statement, data-use note, accessible layout, and analytics plan.
3. Prompt: "Create a placement test for a React workshop." → Expected: 187TEST placement test with difficulty tiers, scoring guide, and 187ACCESS+ review.
4. Prompt: "Analyze the poll results from our launch page." → Expected: 187TEST poll analysis with interpretation and 187RESEARCH-backed recommendation.

## Routes

- **Skill source:** `.claude/skills/187test/SKILL.md`
- **Docs:** `docs/187TEST.md`
- **CLI:** `187repo.sh test`
