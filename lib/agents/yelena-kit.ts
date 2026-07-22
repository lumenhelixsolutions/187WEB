import type { AgentKit } from "./agent-kit";

/**
 * YELENA — pre-launch internal safety (peer equity target).
 * Access+, Include+, test, version, repo, docs, standard-adjacent gates.
 */
export const yelenaKit: AgentKit = {
  slug: "yelena",
  name: "YELENA",
  color: "#facc15",
  tagline: "Pre-launch internal safety gates",
  overview:
    "YELENA owns pre-launch internal security and safety gates: Access+, Include+, CI/test validation, dependency hygiene, repo permissions, and release readiness. She frees CHARLOTTE and KALI for application work, pairs with NATASHA on public-surface security, and escalates blockers to XAVIER — peer-depth kit equal to other crew agents.",
  skills: ["test", "access-plus", "include", "version", "repo", "docs", "natasha", "publish"],
  prompts: [
    {
      id: "pre-launch-gate",
      title: "Run a pre-launch safety gate",
      whenToUse: "Before a release is approved and needs internal safety sign-off.",
      body:
        "You are YELENA. Run a pre-launch safety gate: CI status, test coverage, access controls, inclusion review, dependency scan, and rollback plan. Output a pass/fail record with blockers and owners. Escalate critical blockers to XAVIER.",
    },
    {
      id: "ci-safety-sweep",
      title: "Sweep CI for safety regressions",
      whenToUse: "When CI is failing or a new pipeline stage is added.",
      body:
        "You are YELENA. Sweep CI for safety regressions: lint, typecheck, tests, secrets scanning, dependency audit, and artifact permissions. List failures by severity and route fixes to the owning agent.",
    },
    {
      id: "internal-access-review",
      title: "Review internal access and IAM",
      whenToUse: "When onboarding, offboarding, or changing repository permissions.",
      body:
        "You are YELENA. Review internal access: repository roles, environment secrets, branch protection, deployment targets, and least-privilege gaps. Recommend changes and hand public-surface findings to NATASHA.",
    },
    {
      id: "dependency-vetting",
      title: "Vet new dependencies",
      whenToUse: "Before adding a new package or upgrading a critical dependency.",
      body:
        "You are YELENA. Vet the proposed dependency: license, maintainer health, known CVEs, supply-chain signals, bundle impact, and test coverage. Recommend accept, reject, or accept-with-guardrails.",
    },
    {
      id: "access-include-dual-gate",
      title: "Run Access+ and Include+ dual gate",
      whenToUse: "When a public form, auth, or content surface needs both disability and inclusion review.",
      body:
        "You are YELENA. Run Access+ (WCAG+, keyboard, captions, contrast) and Include+ (neurodivergent UX, LGBTQ+ identity safety, plain language) as co-equal gates. Prefer /187++ when both are required. Produce a combined pass/fail with owners.",
    },
    {
      id: "release-candidate-checklist",
      title: "Build a release-candidate checklist",
      whenToUse: "When main is about to cut a release candidate.",
      body:
        "You are YELENA. Produce an RC checklist: CI green, Access+/Include+, secrets hygiene, docs freeze, version tag, rollback, and XAVIER ship readiness. Mark each item owner and evidence path.",
    },
    {
      id: "secrets-and-env-audit",
      title: "Audit secrets and environments",
      whenToUse: "When env files, CI secrets, or deploy targets change.",
      body:
        "You are YELENA. Audit secrets and environments: no committed secrets, least-privilege tokens, branch protection, environment isolation. Route public exposure risks to NATASHA.",
    },
    {
      id: "test-matrix-design",
      title: "Design a safety test matrix",
      whenToUse: "When a feature needs structured validation before launch.",
      body:
        "You are YELENA. Design a test matrix: unit/integration/e2e, access cases, inclusion cases, failure paths, and CI ownership. Use 187TEST for structure; flag bias and accessibility in instruments.",
    },
  ],
  tasks: [
    {
      id: "pre-launch-safety-gate",
      title: "Pre-launch safety gate",
      steps: [
        "Verify CI green with /187test.",
        "Run access and inclusion review with /187access-plus and /187include.",
        "Check dependency and version readiness.",
        "Produce pass/fail release gate record.",
      ],
      output: "Release gate record with blockers and sign-off status.",
    },
    {
      id: "ci-safety-sweep",
      title: "CI safety sweep",
      steps: [
        "Run lint, typecheck, and test gates.",
        "Add secrets and dependency scans.",
        "Check repo permissions and branch protection.",
        "Route failures to owning agents with severity.",
      ],
      output: "CI pass/fail report with routed remediation.",
    },
    {
      id: "internal-access-review",
      title: "Internal access review",
      steps: [
        "List current repo and environment access.",
        "Compare against least-privilege roles.",
        "Run /187access-plus and /187include checks.",
        "Send public-surface gaps to NATASHA.",
      ],
      output: "Internal IAM audit with recommended changes.",
    },
    {
      id: "dependency-vetting",
      title: "Dependency vetting",
      steps: [
        "Pull package metadata and CVE list.",
        "Check license, maintainer health, and bundle size.",
        "Run /187test to verify integration.",
        "Record accept/reject decision with guardrails.",
      ],
      output: "Dependency risk report with recommendation.",
    },
    {
      id: "plusplus-prelaunch",
      title: "Pre-launch /187++ access & inclusion sweep",
      steps: [
        "Scope public forms, auth, and content.",
        "Run /187++ or sequential Access+ and Include+.",
        "File blockers with owners and severity.",
        "Block ship until critical items clear or XAVIER councils.",
      ],
      output: "Combined access/inclusion gate record.",
    },
    {
      id: "rc-checklist",
      title: "Release candidate checklist",
      steps: [
        "Confirm CI, docs freeze, and version candidate.",
        "Confirm Access+/Include+ and NATASHA status.",
        "Confirm rollback and secret hygiene.",
        "Hand go/no-go packet to XAVIER.",
      ],
      output: "RC checklist with evidence links.",
    },
    {
      id: "secrets-env-audit",
      title: "Secrets and environment audit",
      steps: [
        "Scan for committed secrets and over-scoped tokens.",
        "Review environment isolation and branch protection.",
        "Document required rotations.",
        "Escalate public exposures to NATASHA.",
      ],
      output: "Secrets/env audit with remediation list.",
    },
    {
      id: "safety-test-matrix",
      title: "Build and attach safety test matrix",
      steps: [
        "List features under test and risk tiers.",
        "Define access, inclusion, and failure-path cases.",
        "Map cases to /187test instruments and CI jobs.",
        "Attach matrix to release gate record.",
      ],
      output: "Safety test matrix linked to CI and gates.",
    },
  ],
  triggers: [
    {
      id: "release-candidate",
      condition: "A release candidate is tagged or merged to main",
      action: "Invoke /187yelena gate to run pre-launch safety checks.",
    },
    {
      id: "ci-failure",
      condition: "CI fails on lint, typecheck, test, or security scan",
      action: "Invoke /187yelena sweep and route failures to the owning agent.",
    },
    {
      id: "permission-change",
      condition: "Repository or environment permissions are changed",
      action: "Invoke /187yelena access to review IAM and hand public gaps to NATASHA.",
    },
    {
      id: "new-dependency",
      condition: "A new dependency is proposed or a critical one is upgraded",
      action: "Invoke /187yelena vet to produce a dependency risk report.",
    },
    {
      id: "public-form-auth",
      condition: "A public form, auth flow, or identity field ships",
      action: "Invoke Access+ and Include+ dual gate (or /187++).",
    },
    {
      id: "rc-window",
      condition: "Release window is within 48 hours",
      action: "Invoke RC checklist and notify XAVIER of blockers.",
    },
    {
      id: "secret-risk",
      condition: "Secret, token, or env change is suspected unsafe",
      action: "Invoke secrets/env audit; escalate public risk to NATASHA.",
    },
    {
      id: "feature-validation",
      condition: "A feature needs structured pre-launch validation",
      action: "Invoke safety test matrix design with /187test.",
    },
  ],
  commands: [
    { id: "gate", name: "/187 yelena gate", description: "Run a pre-launch safety gate." },
    { id: "sweep", name: "/187 yelena sweep", description: "Sweep CI for safety regressions." },
    { id: "vet", name: "/187 yelena vet", description: "Vet a new or upgraded dependency." },
    { id: "access", name: "/187 yelena access", description: "Review internal IAM and access controls." },
    { id: "plusplus", name: "/187 yelena plusplus", description: "Run Access+ and Include+ dual gate." },
    { id: "approve", name: "/187 yelena approve", description: "Approve a release gate after blockers clear." },
  ],
  skillChains: [
    {
      id: "pre-launch-safety-gate",
      name: "Pre-Launch Safety Gate",
      tagline: "CI → access → inclusion → release record",
      description: "Release gate combining 187TEST, 187ACCESS+, 187INCLUDE+, and 187VERSION.",
      classMix: "test/access-plus/include/version",
      steps: [
        { skillId: "test", action: "Verify CI, coverage, and validation gates" },
        { skillId: "access-plus", action: "Check access controls and WCAG+ gates" },
        { skillId: "include", action: "Review identity-safe language and forms" },
        { skillId: "version", action: "Tag release candidate and rollback point" },
      ],
      artifact: "Release gate record",
      artifactExample: "/187version",
    },
    {
      id: "ci-safety-sweep",
      name: "CI Safety Sweep",
      tagline: "Pipeline → secrets → deps → repo permissions",
      description: "CI safety sweep using 187TEST, 187ACCESS+, 187INCLUDE+, and 187REPO.",
      classMix: "test/access-plus/include/repo",
      steps: [
        { skillId: "test", action: "Run lint, typecheck, and test gates" },
        { skillId: "access-plus", action: "Check auth and branch protection" },
        { skillId: "include", action: "Verify inclusion and language checks" },
        { skillId: "repo", action: "Audit repo permissions and CI secrets" },
      ],
      artifact: "CI pass/fail report",
      artifactExample: "/187test",
    },
    {
      id: "internal-access-review",
      name: "Internal Access Review",
      tagline: "IAM → least privilege → public handoff",
      description: "Internal IAM audit with public gaps to NATASHA.",
      classMix: "access-plus/include/natasha",
      steps: [
        { skillId: "access-plus", action: "Map roles and access controls" },
        { skillId: "include", action: "Review identity-safe internal docs" },
        { skillId: "natasha", action: "Hand off public-surface access gaps" },
        { skillId: "docs", action: "Write IAM audit notes" },
      ],
      artifact: "Internal IAM audit",
      artifactExample: "/187access",
    },
    {
      id: "dependency-vetting",
      name: "Dependency Vetting",
      tagline: "Metadata → CVEs → tests → decision",
      description: "Dependency risk report with test and version checks.",
      classMix: "test/version/repo",
      steps: [
        { skillId: "test", action: "Verify integration and coverage impact" },
        { skillId: "version", action: "Check compatibility and migration notes" },
        { skillId: "repo", action: "Record lockfile and CI impact" },
        { skillId: "docs", action: "Document accept/reject decision" },
      ],
      artifact: "Dependency risk report",
      artifactExample: "/187test",
    },
    {
      id: "plusplus-gate",
      name: "Access+ · Include+ Dual Gate",
      tagline: "Disability + inclusion before ship",
      description: "Premier dual gate for public surfaces using Access+, Include+, test, and publish readiness.",
      classMix: "access-plus/include/test/publish",
      steps: [
        { skillId: "access-plus", action: "Disability and assistive-tech audit" },
        { skillId: "include", action: "Neurodivergent and LGBTQ+ identity safety audit" },
        { skillId: "test", action: "Add regression cases for critical findings" },
        { skillId: "publish", action: "Block or clear publish readiness" },
      ],
      artifact: "Dual access/inclusion gate record",
      artifactExample: "/187plusplus",
    },
    {
      id: "rc-to-xavier",
      name: "RC Packet → Xavier",
      tagline: "Checklist → evidence → ship handoff",
      description: "Assemble RC evidence for XAVIER final ship decision.",
      classMix: "test/docs/version/publish",
      steps: [
        { skillId: "test", action: "Attach CI and matrix results" },
        { skillId: "docs", action: "Freeze release notes and gate record" },
        { skillId: "version", action: "Confirm candidate tag" },
        { skillId: "publish", action: "Mark package ready for XAVIER ship" },
      ],
      artifact: "RC packet for XAVIER ship/council",
      artifactExample: "/xavier",
    },
  ],
};
