/**
 * Data source for the 187SKILLS showcase pages (Phase 5).
 * Keep this file in sync with .claude/skills/<name>/SKILL.md and
 * scripts/187repo.sh / 187repo.ps1 command lists.
 */

export type SkillTemplate = {
  name: string;
  when: string;
};

export type SkillRoute = {
  name: string;
  when: string;
};

export type SkillShowcaseData = {
  id: string;
  name: string;
  tagline: string;
  color: string;
  description: string;
  triggers: string[];
  useCases: string[];
  outputs: string[];
  routesTo?: SkillRoute[];
  templates?: SkillTemplate[];
  related: string[];
};

export const skillShowcases: SkillShowcaseData[] = [
  {
    id: "free",
    name: "187FREE",
    tagline: "No-cost stack engine",
    color: "#10b981",
    description:
      "Finds practical free, free-tier, open-source, local-first, public-API, and low-cost bootstrap solutions for software, research, civic tech, education, and client-budget projects.",
    triggers: ["/187free", "187FREE", "free stack", "free solution", "cheapest way", "no-cost option"],
    useCases: [
      "No-cost stack for a landing page, MVP, demo, or client project",
      "Open-source or local-first alternatives to paid tools",
      "Free public APIs, datasets, or hosting tiers",
    ],
    outputs: [
      "Restated need",
      "Best free pick with justification",
      "Two backup options",
      "Complete free stack recipe",
      "Privacy / sensitivity review",
      "Upgrade path when limits hit",
    ],
    routesTo: [
      { name: "187research", when: "building a research lab or public demo with free hosting" },
      { name: "187repo + 187craft", when: "compliance, enterprise SLA, or regulated data" },
    ],
    templates: [
      { name: "free-stack-recipe.md", when: "A common recipe matches the need" },
      { name: "tool-review.md", when: "Comparing and vetting a tool" },
    ],
    related: ["research", "repo", "craft"],
  },
  {
    id: "research",
    name: "187RESEARCH",
    tagline: "Research-grade lab engine",
    color: "#6366f1",
    description:
      "Routes research questions through scientific, mathematical, biomedical, software, and scholarly databases; classifies claims; builds reproducible lab artifacts; and converts findings into source-backed notes.",
    triggers: ["/187research", "187RESEARCH", "research this", "source this", "build a lab", "literature review", "claim audit"],
    useCases: [
      "Searching scholarly, biomedical, mathematical, or software sources",
      "Building a reproducible computational lab or public research page",
      "Auditing claims and separating proof from pattern",
    ],
    outputs: [
      "Research need & domain classification",
      "Best source routes & query plan",
      "Evidence ladder",
      "Lab artifact plan",
      "Reproducibility checklist",
      "Citation / source lineage",
    ],
    routesTo: [
      { name: "187free", when: "the lab needs free hosting or tooling" },
      { name: "187publish", when: "releasing findings publicly" },
    ],
    templates: [
      { name: "research-question.md", when: "Scoping a new research question" },
      { name: "literature-review.md", when: "Synthesizing multiple sources" },
      { name: "computational-lab.md", when: "Building a reproducible notebook" },
      { name: "dataset-card.md", when: "Documenting a dataset with FAIR metadata" },
      { name: "claim-audit.md", when: "Auditing claims against the evidence ladder" },
    ],
    related: ["free", "docs", "publish"],
  },
  {
    id: "seo",
    name: "187SEO",
    tagline: "Policy-aware search optimization",
    color: "#a855f7",
    description:
      "Makes 187WEB public work discoverable through traditional SEO, answer-engine optimization (AEO), generative-engine optimization (GEO), structured data, technical audits, content strategy, and search analytics.",
    triggers: ["/187seo", "187SEO", "seo audit", "technical seo", "content brief", "schema plan", "search console"],
    useCases: [
      "Technical SEO audits and page audits",
      "Content briefs and keyword-driven strategy",
      "Schema / structured-data planning",
      "Launch readiness and migration safety",
    ],
    outputs: [
      "Mode & findings",
      "Prioritized recommendations",
      "Schema / structured-data plan",
      "Content brief",
      "Risk / spam review",
      "Quick wins vs long-term bets",
    ],
    routesTo: [
      { name: "187craft", when: "recommendations require UI/component changes" },
      { name: "187launch", when: "launch-readiness and GTM alignment" },
    ],
    templates: [
      { name: "site-audit.md", when: "Full-site technical, content, and off-site audit" },
      { name: "page-audit.md", when: "Single-page on-page SEO review" },
      { name: "content-brief.md", when: "Keyword-driven content plan" },
      { name: "schema-plan.md", when: "Structured-data rollout" },
      { name: "search-console-analysis.md", when: "Interpreting Search Console / analytics" },
    ],
    related: ["craft", "launch", "access", "publish"],
  },
  {
    id: "revenue",
    name: "187REVENUE",
    tagline: "Ethical revenue architecture",
    color: "#f97316",
    description:
      "Designs, audits, and implements revenue systems: pricing models, payment integrations, subscriptions, affiliates, coupons, dropshipping, sponsorships, licensing, and commerce operations.",
    triggers: ["/187revenue", "187REVENUE", "revenue model", "pricing strategy", "payment integration", "subscription system", "affiliate system"],
    useCases: [
      "Revenue model, offer ladder, or pricing page",
      "Payment processor, subscription, or billing logic",
      "Affiliate, coupon, deal, or dropshipping systems",
      "Refund, chargeback, tax, and legal-review gates",
    ],
    outputs: [
      "Recommended model(s)",
      "Stack / integration plan",
      "Offer ladder / packaging",
      "Disclosure & compliance plan",
      "Risk & margin review",
      "187SEO / 187ACCESS+ / 187INCLUDE gates",
    ],
    routesTo: [
      { name: "187craft", when: "checkout, pricing page, or dashboard UI" },
      { name: "187launch", when: "GTM, campaign, and sponsorship timing" },
      { name: "187seo", when: "deal-page and product-page strategy" },
      { name: "187access-plus + 187include", when: "public checkout, forms, and pricing pages" },
    ],
    templates: [
      { name: "pricing-architecture.md", when: "Designing tiers and offer ladders" },
      { name: "payment-integration-plan.md", when: "Processor, webhooks, and billing logic" },
      { name: "affiliate-disclosure-plan.md", when: "Documenting affiliate relationships" },
      { name: "coupon-deal-plan.md", when: "Coupons, discounts, and deal pages" },
      { name: "dropshipping-risk-review.md", when: "Supplier, margin, and compliance risks" },
      { name: "revenue-dashboard-spec.md", when: "Metrics, sources, and reporting views" },
    ],
    related: ["craft", "launch", "seo", "access", "include", "publish"],
  },
  {
    id: "docs",
    name: "187DOCS",
    tagline: "Documentation architecture engine",
    color: "#0ea5e9",
    description:
      "Designs, writes, audits, and repairs documentation systems following the Diátaxis framework: READMEs, install guides, how-to guides, reference docs, API docs, SOPs, changelogs, and drift repair.",
    triggers: ["/187docs", "187DOCS", "docs this", "write README", "install guide", "quickstart", "how to guide", "API docs"],
    useCases: [
      "Project docs and READMEs",
      "Install guides, quickstarts, and how-to guides",
      "API docs, SOPs, and user manuals",
      "Docs drift audits and cross-surface sync",
    ],
    outputs: [
      "Audience & doc-type mapping",
      "Structure & draft content",
      "Code / command examples",
      "Cross-references",
      "Drift repair notes",
      "187WRITE polish pass",
    ],
    routesTo: [
      { name: "187write", when: "polishing public-facing copy" },
      { name: "187research", when: "docs cite papers, APIs, or datasets" },
      { name: "187access-plus + 187include", when: "publishing public docs" },
      { name: "187publish", when: "final sync across surfaces" },
    ],
    templates: [
      { name: "README.md", when: "Project landing doc" },
      { name: "install-guide.md", when: "Step-by-step environment setup" },
      { name: "quickstart.md", when: "First success in minutes" },
      { name: "how-to-guide.md", when: "Goal-oriented task instructions" },
      { name: "reference-doc.md", when: "Fact lookup, commands, schemas" },
      { name: "explanation-doc.md", when: "Conceptual background and why" },
      { name: "troubleshooting-guide.md", when: "Error diagnosis and recovery" },
      { name: "SOP.md", when: "Repeatable operational procedure" },
      { name: "API-docs.md", when: "API endpoint and schema reference" },
      { name: "changelog-entry.md", when: "Version change entry" },
    ],
    related: ["write", "research", "access", "include", "publish"],
  },
  {
    id: "learn",
    name: "187LEARN",
    tagline: "Learning experience engine",
    color: "#eab308",
    description:
      "Designs courses, curricula, lessons, workshops, microlearning, and accessible learning experiences that feed docs, SEO, revenue, and testing workflows.",
    triggers: ["/187learn", "187LEARN", "course architect", "study plan", "lesson plan", "syllabus", "workshop", "learning path"],
    useCases: [
      "Courses and tutorial series",
      "Study plans and learning paths",
      "Instructor and learner guides",
      "Docs-to-course conversion",
    ],
    outputs: [
      "Learning outcomes",
      "Audience profile",
      "Sequence / scope",
      "Lesson plans",
      "Assessments & 187TEST integration",
      "Accessibility plan",
      "Downstream hooks",
    ],
    routesTo: [
      { name: "187write", when: "polishing public course copy" },
      { name: "187test", when: "quizzes and knowledge checks" },
      { name: "187access-plus", when: "accessible learning design" },
      { name: "187seo", when: "course discoverability" },
      { name: "187revenue", when: "paid course or certification offers" },
      { name: "187publish", when: "final course surface sync" },
    ],
    templates: [
      { name: "course-outline.md", when: "Full course map" },
      { name: "lesson-plan.md", when: "Single lesson" },
      { name: "study-plan.md", when: "Self-paced learner schedule" },
      { name: "workshop-runbook.md", when: "Facilitator guide" },
    ],
    related: ["test", "access", "seo", "revenue", "docs", "publish"],
  },
  {
    id: "test",
    name: "187TEST",
    tagline: "Assessment & validation engine",
    color: "#ef4444",
    description:
      "Builds quizzes, tests, polls, surveys, rubrics, question banks, and assessment analytics with bias and accessibility review baked in.",
    triggers: ["/187test", "187TEST", "quiz builder", "test builder", "poll builder", "survey builder", "rubric builder"],
    useCases: [
      "Quizzes and knowledge checks for a course",
      "Polls and surveys for research or product feedback",
      "Rubrics and question banks",
      "Assessment analytics",
    ],
    outputs: [
      "Item list & rubric",
      "Bias review",
      "Accessibility review",
      "Data-use statement",
      "Analytics plan",
      "Export plan",
      "Human-review gate",
    ],
    routesTo: [
      { name: "187learn", when: "assessments belong inside a course" },
      { name: "187access-plus", when: "public-facing assessment" },
      { name: "187include", when: "forms collect identity data" },
      { name: "187publish", when: "final surface sync" },
    ],
    templates: [
      { name: "quiz.md", when: "Multiple-choice, checkbox, or short-answer quiz" },
      { name: "survey.md", when: "Feedback or validation survey" },
      { name: "rubric.md", when: "Scoring guide for projects or workshops" },
      { name: "poll.md", when: "Quick single-question poll" },
    ],
    related: ["learn", "access", "include", "research", "publish"],
  },
  {
    id: "access",
    name: "187ACCESS+",
    tagline: "Accessibility & inclusion engine",
    color: "#ec4899",
    description:
      "Audits and improves disability accessibility, neurodivergent access, sensory access, assistive-technology support, WCAG+, and inclusive access systems.",
    triggers: ["/187access-plus", "187ACCESS+", "a11y", "wcag", "accessibility audit", "neurodivergent access", "screen reader audit"],
    useCases: [
      "Page, app, form, checkout, course, quiz, or docs audit",
      "Screen-reader, keyboard, low-vision, Deaf/HoH, motor, and cognitive review",
      "Accommodation plans and assistive-tech scouts",
    ],
    outputs: [
      "Audit scope & profile",
      "Findings with severity & standard references",
      "Concrete recommendations",
      "Plain-language summary",
      "Accommodation plan",
      "Validation steps",
    ],
    routesTo: [
      { name: "187include", when: "forms or content touch identity" },
      { name: "187craft", when: "design-level fixes" },
      { name: "187test", when: "accessible quiz or survey review" },
      { name: "187publish", when: "gating public pages before release" },
    ],
    templates: [
      { name: "access-audit-report.md", when: "Structured findings for a page or flow" },
      { name: "accommodation-plan.md", when: "Consent-first support plan" },
      { name: "wcag-plus-checklist.md", when: "Pre-publish WCAG+ checklist" },
      { name: "assistive-tech-scout.md", when: "Tool recommendations for an access need" },
    ],
    related: ["include", "craft", "test", "docs", "publish"],
  },
  {
    id: "version",
    name: "187VERSION",
    tagline: "Version & release control engine",
    color: "#64748b",
    description:
      "Controls change across the 187WEB suite: version bumps, changelogs, migration notes, compatibility matrices, deprecations, and adapter sync.",
    triggers: ["/187version", "187VERSION", "version bump", "semver", "changelog", "release notes", "migration guide", "deprecation"],
    useCases: [
      "SemVer decisions for suite upgrades",
      "Changelog and release notes",
      "Migration guides for breaking changes",
      "Compatibility and deprecation plans",
      "Adapter version sync",
    ],
    outputs: [
      "Version decision",
      "Changelog entry",
      "Migration notes",
      "Compatibility matrix",
      "Deprecation notices",
      "Adapter sync checklist",
      "Release plan",
    ],
    routesTo: [
      { name: "187docs", when: "versioning docs, install guides, and API references" },
      { name: "187write", when: "polishing release prose" },
      { name: "187publish", when: "final synchronization gate" },
      { name: "187repo", when: "branch naming, CI, and GitHub release mechanics" },
    ],
    templates: [
      { name: "changelog-entry.md", when: "Drafting a single version block" },
      { name: "migration-guide.md", when: "Breaking-change migration steps" },
      { name: "release-notes.md", when: "Human-friendly release notes" },
      { name: "version-bump-checklist.md", when: "Verifying files before a bump" },
    ],
    related: ["docs", "write", "publish", "repo"],
  },
  {
    id: "publish",
    name: "187PUBLISH",
    tagline: "Release synchronization engine",
    color: "#14b8a6",
    description:
      "Final gate for public releases. Audits every surface for drift, synchronizes docs, READMEs, command pages, adapters, app routes, and produces a go/no-go decision.",
    triggers: ["/187publish", "187PUBLISH", "publish audit", "release sync", "docs drift", "showcase drift", "GitHub Pages sync"],
    useCases: [
      "Pre-release sync audits",
      "Docs / showcase / README drift repair",
      "GitHub Pages launch checklist",
      "SEO / accessibility / inclusion publish checks",
    ],
    outputs: [
      "Surface inventory",
      "Drift findings",
      "Sync actions",
      "Release checklist",
      "SEO publish check",
      "Accessibility publish check",
      "Final go/no-go",
    ],
    routesTo: [
      { name: "187version", when: "tag and changelog verification" },
      { name: "187craft", when: "screenshots, demos, and visual assets" },
      { name: "187launch", when: "launch-page copy and campaign alignment" },
      { name: "187repo", when: "CI status and GitHub release mechanics" },
    ],
    templates: [
      { name: "release-sync-plan.md", when: "Mapping every surface to its required update" },
      { name: "publish-gate-report.md", when: "Final go/no-go report" },
      { name: "github-pages-launch-checklist.md", when: "Updating the GitHub Pages showcase" },
      { name: "adapter-sync-checklist.md", when: "Regenerating model adapters" },
    ],
    related: ["version", "docs", "write", "access", "include", "seo", "repo", "launch"],
  },
];

export const skillShowcaseIndex = new Map(skillShowcases.map((s) => [s.id, s]));
