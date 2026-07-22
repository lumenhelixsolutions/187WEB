import type { AgentKit } from "./agent-kit";

/**
 * NATASHA — external + post-launch security (peer equity target).
 * Threat, chain, test, scan-adjacent, access, docs, version, publish awareness.
 */
export const natashaKit: AgentKit = {
  slug: "natasha",
  name: "NATASHA",
  color: "#f43f5e",
  tagline: "External + post-launch security",
  overview:
    "NATASHA handles external and post-launch security for 187WEB: threat-surface audits, chain/contract assurance, claim discipline, public access exposure, and incident escalation. She works with YELENA on internal gates and can call XAVIER for council when severity or disputes require it — peer-depth kit equal to other crew agents.",
  skills: ["natasha", "chain", "test", "access-plus", "include", "docs", "version", "research"],
  prompts: [
    {
      id: "threat-sweep",
      title: "Run a post-launch threat sweep",
      whenToUse: "After a public surface ships and needs an external security review.",
      body:
        "You are NATASHA. Run a post-launch threat sweep on the described public surface. Output: attack surface list, severity/confidence matrix, claim-discipline check, and a prioritized patch plan. Escalate to XAVIER if severity is critical.",
    },
    {
      id: "contract-audit",
      title: "Scope a contract audit",
      whenToUse: "When a smart contract or API surface needs assurance review.",
      body:
        "You are NATASHA. Scope a contract/API audit: objectives, trust assumptions, in-scope functions, known risk vectors, tool list, and responsible disclosure plan. Separate severity from confidence for each finding.",
    },
    {
      id: "bounty-triage",
      title: "Triage a public bounty report",
      whenToUse: "When a security report arrives from a public bounty program.",
      body:
        "You are NATASHA. Triage the attached bounty report: reproduce the issue, classify severity and confidence, check claim discipline, decide reward/duplicate/out-of-scope, and draft the response. Loop XAVIER for council if reward is disputed.",
    },
    {
      id: "external-access-review",
      title: "Review external access exposure",
      whenToUse: "When a public surface exposes auth, admin, or data endpoints.",
      body:
        "You are NATASHA. Review external access exposure: enumerate public endpoints, check auth/authorization gaps, verify rate limiting, scan for sensitive data leakage, and recommend YELENA for internal IAM follow-up.",
    },
    {
      id: "claim-discipline",
      title: "Enforce claim discipline on public copy",
      whenToUse: "When marketing or research claims risk overstatement.",
      body:
        "You are NATASHA. Audit public claims for evidence, confidence, and unsupported advantage language (including quantum/web3 hype). Separate severity from confidence. Route rewrites to 187WRITE; block publish if claims fail discipline.",
    },
    {
      id: "incident-response",
      title: "Open a post-launch incident response",
      whenToUse: "When a live security incident is suspected or confirmed.",
      body:
        "You are NATASHA. Open incident response: timeline, blast radius, containment options, communication plan, and council need. Coordinate with YELENA for internal access and XAVIER for public decision authority.",
    },
    {
      id: "supply-chain-signal",
      title: "Assess supply-chain trust signals",
      whenToUse: "When a dependency or third-party integration looks risky.",
      body:
        "You are NATASHA. Assess supply-chain trust: package provenance, maintainer signals, known advisories, and integration blast radius. Pair with YELENA dependency vetting; use 187CHAIN when contracts are involved.",
    },
    {
      id: "public-include-threat",
      title: "Review identity-safety threats on public forms",
      whenToUse: "When public forms handle names, pronouns, or sensitive identity data.",
      body:
        "You are NATASHA. Review identity-safety threats: enumeration, deadnaming risk, over-collection, and leakage. Partner with Include+ for language/fields and Access+ for assistive flows. Produce severity-ranked findings.",
    },
  ],
  tasks: [
    {
      id: "post-launch-threat-sweep",
      title: "Post-launch threat sweep",
      steps: [
        "Enumerate public attack surface and entry points.",
        "Run /187natasha against claims and trust boundaries.",
        "Add /187test validation for findings.",
        "Produce severity-ranked patch plan and escalate criticals.",
      ],
      output: "External threat report + patch plan + escalation log.",
    },
    {
      id: "contract-audit-chain",
      title: "Contract audit chain",
      steps: [
        "Define scope and trust assumptions.",
        "Run /187chain for static and DeFi risk analysis.",
        "Cross-check with /187natasha threat-surface review.",
        "Write findings report with severity/confidence matrix.",
      ],
      output: "Smart-contract / API audit report with disclosure notes.",
    },
    {
      id: "public-bounty-triage",
      title: "Public bounty triage",
      steps: [
        "Reproduce and classify the reported issue.",
        "Assign severity/confidence and check claim discipline.",
        "Run /187test for validation coverage.",
        "Draft response and bounty decision.",
      ],
      output: "Triage log with severity ranking and bounty decision.",
    },
    {
      id: "external-access-review",
      title: "External access review",
      steps: [
        "Map public endpoints and auth flows.",
        "Check access controls with /187natasha and /187access-plus.",
        "Scan for data leakage and misconfiguration.",
        "Hand off internal IAM gaps to YELENA.",
      ],
      output: "Public surface access audit with remediation list.",
    },
    {
      id: "claim-discipline-audit",
      title: "Claim discipline audit",
      steps: [
        "Collect public claims from copy and docs.",
        "Score evidence and confidence per claim.",
        "Route rewrites to 187WRITE; block unsupported claims.",
        "Log decisions with /187version tags if publish was gated.",
      ],
      output: "Claim matrix with rewrite or block decisions.",
    },
    {
      id: "incident-response-run",
      title: "Incident response run",
      steps: [
        "Open timeline and blast-radius assessment.",
        "Contain and coordinate with YELENA internal access.",
        "Call XAVIER council if public communication is required.",
        "Publish postmortem outline in docs.",
      ],
      output: "Incident record + containment + council decision if any.",
    },
    {
      id: "supply-chain-review",
      title: "Supply-chain review",
      steps: [
        "Inventory new or critical third parties.",
        "Assess advisories and trust signals.",
        "Pair with YELENA dependency vetting.",
        "Recommend accept, reject, or monitor.",
      ],
      output: "Supply-chain risk note with recommendation.",
    },
    {
      id: "identity-form-threat-review",
      title: "Identity form threat review",
      steps: [
        "Map identity fields and storage paths.",
        "Run threat model for enumeration and leakage.",
        "Coordinate Include+ field design and Access+ assistive paths.",
        "File findings with severity/confidence.",
      ],
      output: "Identity-form threat report + remediation list.",
    },
  ],
  triggers: [
    {
      id: "public-shipped",
      condition: "A page, API, or contract is deployed to a public URL",
      action: "Invoke /187natasha for a post-launch threat sweep.",
    },
    {
      id: "contract-deployed",
      condition: "A smart contract or external API is deployed or upgraded",
      action: "Invoke /187chain and /187natasha for an audit chain.",
    },
    {
      id: "bounty-inbound",
      condition: "A security report arrives from a public bounty channel",
      action: "Invoke /187natasha to triage severity and route to council if disputed.",
    },
    {
      id: "access-misconfig",
      condition: "Public endpoint, admin panel, or API key is suspected exposed",
      action: "Invoke /187natasha external access review and hand internal gaps to YELENA.",
    },
    {
      id: "hype-claims",
      condition: "Public copy makes strong technical or advantage claims",
      action: "Invoke claim discipline audit before /187publish.",
    },
    {
      id: "live-incident",
      condition: "Security incident is suspected or confirmed in production",
      action: "Invoke incident response; council XAVIER if public comms needed.",
    },
    {
      id: "third-party-add",
      condition: "New third-party service or critical dependency is introduced",
      action: "Invoke supply-chain review with YELENA vetting.",
    },
    {
      id: "identity-data",
      condition: "Public form collects pronouns, legal names, or sensitive identity data",
      action: "Invoke identity form threat review with Include+/Access+.",
    },
  ],
  commands: [
    { id: "sweep", name: "/187 natasha sweep", description: "Run a post-launch external threat sweep." },
    { id: "audit", name: "/187 natasha audit", description: "Scope and run a contract/API audit chain." },
    { id: "triage", name: "/187 natasha triage", description: "Triage a public bounty report." },
    { id: "claims", name: "/187 natasha claims", description: "Run claim-discipline audit on public copy." },
    { id: "incident", name: "/187 natasha incident", description: "Open post-launch incident response." },
    { id: "escalate", name: "/187 natasha escalate", description: "Escalate a critical finding to XAVIER council." },
  ],
  skillChains: [
    {
      id: "post-launch-threat-sweep",
      name: "Post-Launch Threat Sweep",
      tagline: "Shipped surface → audit → patch plan",
      description: "Post-launch external security review with NATASHA, CHAIN, TEST, VERSION.",
      classMix: "natasha/chain/test/version",
      steps: [
        { skillId: "natasha", action: "Map attack surface and trust boundaries" },
        { skillId: "chain", action: "Check contract/API risk vectors" },
        { skillId: "test", action: "Validate reproducibility of findings" },
        { skillId: "version", action: "Tag findings and patch releases" },
      ],
      artifact: "External threat report + patch plan",
      artifactExample: "/187natasha",
    },
    {
      id: "contract-audit-chain",
      name: "Contract Audit Chain",
      tagline: "Scope → static → dynamic → report",
      description: "Scoped smart-contract or API audit with CHAIN, NATASHA, TEST, DOCS.",
      classMix: "chain/natasha/test/docs",
      steps: [
        { skillId: "chain", action: "Scope the audit and run static analysis" },
        { skillId: "natasha", action: "Add threat-surface and claim-discipline review" },
        { skillId: "test", action: "Validate findings and add regression tests" },
        { skillId: "docs", action: "Write audit report and responsible disclosure notes" },
      ],
      artifact: "Smart-contract / API audit report",
      artifactExample: "/187chain",
    },
    {
      id: "public-bounty-triage",
      name: "Public Bounty Triage",
      tagline: "Report → reproduce → severity → response",
      description: "Triage bounty reports with NATASHA, TEST, VERSION.",
      classMix: "natasha/test/version",
      steps: [
        { skillId: "natasha", action: "Reproduce and classify the report" },
        { skillId: "test", action: "Validate the issue and check coverage" },
        { skillId: "version", action: "Tag triage decision and fix release" },
        { skillId: "docs", action: "Draft response packet" },
      ],
      artifact: "Triage log and severity ranking",
      artifactExample: "/187natasha",
    },
    {
      id: "external-access-review",
      name: "External Access Review",
      tagline: "Endpoints → auth → leakage → IAM handoff",
      description: "Public-surface access audit with NATASHA, ACCESS+, INCLUDE+.",
      classMix: "natasha/access-plus/include",
      steps: [
        { skillId: "natasha", action: "Map public endpoints and auth flows" },
        { skillId: "access-plus", action: "Check WCAG+ and auth control gaps" },
        { skillId: "include", action: "Review identity-safe public copy and fields" },
        { skillId: "docs", action: "Write remediation list" },
      ],
      artifact: "Public surface access audit",
      artifactExample: "/187access",
    },
    {
      id: "claim-discipline-gate",
      name: "Claim Discipline Gate",
      tagline: "Claims → evidence → rewrite or block",
      description: "Evidence discipline for public claims before publish.",
      classMix: "natasha/research/write/publish",
      steps: [
        { skillId: "natasha", action: "Score claims severity vs confidence" },
        { skillId: "research", action: "Attach sources where required" },
        { skillId: "write", action: "Rewrite unsupported language" },
        { skillId: "publish", action: "Clear or block publish gate" },
      ],
      artifact: "Claim matrix + publish decision",
      artifactExample: "/187natasha",
    },
    {
      id: "incident-to-council",
      name: "Incident → Council",
      tagline: "Contain → coordinate → decide → log",
      description: "Incident path from NATASHA containment to XAVIER council when needed.",
      classMix: "natasha/test/docs/version",
      steps: [
        { skillId: "natasha", action: "Contain and assess blast radius" },
        { skillId: "test", action: "Validate fix or mitigation" },
        { skillId: "docs", action: "Draft incident and communication notes" },
        { skillId: "version", action: "Tag incident response release" },
      ],
      artifact: "Incident record + optional council decision",
      artifactExample: "/xavier",
    },
  ],
};
