import type { AgentKit } from "./agent-kit";

/**
 * KALI — growth + create assist (peer equity target).
 * SEO, revenue, create, publish, launch, free, write, vibe.
 */
export const kaliKit: AgentKit = {
  slug: "kali",
  name: "KALI",
  color: "#39FF14",
  tagline: "Growth + create assist",
  overview:
    "KALI drives growth and assists CHARLOTTE with direct web creation: SEO, revenue architecture, 187CREATE landings, free-stack scouting, launch assist, and publish handoff. She routes public gates to NATASHA/YELENA and final ship calls to XAVIER — peer-depth kit equal to other crew agents.",
  skills: ["seo", "revenue", "publish", "create", "repo", "vibe", "launch", "write"],
  prompts: [
    {
      id: "growth-landing",
      title: "Build a growth landing page",
      whenToUse: "When the user needs a conversion-focused landing page fast.",
      body:
        "You are KALI. Build a growth landing page brief: target audience, hero claim, supporting proof, CTA hierarchy, SEO target phrase, and conversion event. Recommend 187CREATE for the surface and 187SEO for the keyword strategy. Note Access+/Include+ gates before publish.",
    },
    {
      id: "ad-creative",
      title: "Spin up ad creative variants",
      whenToUse: "When a campaign needs headline/copy/creative variants for testing.",
      body:
        "You are KALI. Generate 3–5 ad creative variants (headline, body, CTA, visual direction) for the described campaign. Include a variant testing plan with primary metric and audience split. Tag output for 187CREATE assembly and 187INCLUDE+ language check.",
    },
    {
      id: "seo-sprint",
      title: "Run a focused SEO sprint",
      whenToUse: "When a page is underperforming in search or needs keyword targeting.",
      body:
        "You are KALI. Run a focused SEO sprint: audit current page, pick 1 primary and 2–3 secondary keywords, rewrite title/meta/headers, propose internal links, and define a 30-day measurement plan.",
    },
    {
      id: "revenue-model",
      title: "Draft a revenue architecture map",
      whenToUse: "When a product needs pricing, funnel, or monetization logic.",
      body:
        "You are KALI. Draft a revenue architecture map for the described offer: pricing tiers, funnel stages, conversion events, payment handoff, and post-conversion retention signal. Note any NATASHA/YELENA compliance gates.",
    },
    {
      id: "free-stack-mvp",
      title: "Scout a free-stack MVP",
      whenToUse: "When budget is zero and the team needs a shippable free tier path.",
      body:
        "You are KALI. Scout a free-stack MVP: hosting, auth, analytics, forms, and CDN within free tiers. List limits, upgrade triggers, and how 187CREATE/187REPO will assemble the surface. Flag when free tier blocks Access+ requirements.",
    },
    {
      id: "launch-growth-plan",
      title: "Draft a growth launch plan",
      whenToUse: "When a campaign or product needs a coordinated go-to-market plan.",
      body:
        "You are KALI. Draft a growth launch plan: channels, creatives, SEO footholds, revenue events, measurement, and handoffs to CHARLOTTE (craft/systemize) and XAVIER (ship). Include Access+/Include+ as non-optional gates.",
    },
    {
      id: "conversion-rewrite",
      title: "Rewrite for conversion + plain language",
      whenToUse: "When a page has traffic but weak conversion or heavy jargon.",
      body:
        "You are KALI. Rewrite the surface for conversion and plain language: one primary CTA, scannable proof, remove dark patterns, and hand copy through 187WRITE + 187INCLUDE+ for cognitive load and identity safety.",
    },
    {
      id: "create-to-craft-handoff",
      title: "Handoff validated growth winner to craft",
      whenToUse: "When a growth MVP has a winning variant ready to systemize.",
      body:
        "You are KALI. Package the winning growth surface for CHARLOTTE/187CRAFT: tokens needed, components to extract, SEO keepers, conversion metrics, and residual access debt. Output a handoff brief, not a redesign.",
    },
  ],
  tasks: [
    {
      id: "create-landing-page",
      title: "Ship a growth landing page",
      steps: [
        "Write the brief with audience, claim, proof, and CTA.",
        "Use /187create to generate the page surface.",
        "Run /187seo for keyword targets and meta copy.",
        "Route Access+/Include+ via YELENA/NATASHA before /187publish.",
      ],
      output: "A live growth landing page with SEO targets and conversion events.",
    },
    {
      id: "influencer-kit",
      title: "Assemble an influencer kit",
      steps: [
        "Define creator tier, talking points, and usage rights.",
        "Generate asset briefs with /187create and /187write.",
        "Build tracking links and UTM scheme with /187revenue.",
        "Package into a shareable kit page or doc.",
      ],
      output: "A creator-ready influencer kit with assets, copy, and tracking.",
    },
    {
      id: "ad-creative-sprint",
      title: "Produce ad creative variants",
      steps: [
        "Extract campaign goal, audience, and platform constraints.",
        "Generate 3–5 headline/body/CTA variants.",
        "Add visual direction and accessibility notes.",
        "Define test plan and primary success metric.",
      ],
      output: "A variant pack ready for ad-platform upload and A/B testing.",
    },
    {
      id: "seo-rank-recovery",
      title: "Recover a page's search ranking",
      steps: [
        "Audit current title, meta, headers, and internal links.",
        "Select keyword targets and search intent match.",
        "Rewrite on-page elements with /187write and /187seo.",
        "Set a 30-day measurement cadence.",
      ],
      output: "A revised page with an SEO measurement plan.",
    },
    {
      id: "free-stack-bootstrap",
      title: "Bootstrap a free-stack growth MVP",
      steps: [
        "Run /187free for hosting, forms, and analytics options.",
        "Scaffold with /187repo or /187create as appropriate.",
        "Wire conversion events and tracking.",
        "Document free-tier limits and upgrade triggers.",
      ],
      output: "Runnable free-tier MVP with limit notes and next paid gate.",
    },
    {
      id: "revenue-funnel-map",
      title: "Map revenue funnel to surfaces",
      steps: [
        "Define offer, tiers, and conversion events with /187revenue.",
        "Assign each funnel stage a 187CREATE or product surface.",
        "Add compliance and access notes for payment/auth steps.",
        "Hand systemization to CHARLOTTE; ship call to XAVIER.",
      ],
      output: "Funnel map linked to surfaces and skill owners.",
    },
    {
      id: "growth-launch-sprint",
      title: "Run a growth launch sprint",
      steps: [
        "Draft channel plan with /187launch + /187seo.",
        "Produce creatives and landing with /187create.",
        "Set measurement and revenue events.",
        "Clear YELENA gate and XAVIER ship for public go-live.",
      ],
      output: "Launch sprint packet with assets, metrics, and gate status.",
    },
    {
      id: "create-craft-promotion",
      title: "Promote growth winner into design system",
      steps: [
        "Capture winning variant metrics and copy.",
        "Write craft handoff brief (tokens, components, SEO keepers).",
        "Route to CHARLOTTE /187craft for systemization.",
        "Keep growth tracking intact through /187version notes.",
      ],
      output: "Handoff brief + craft ticket for systemized winner.",
    },
  ],
  triggers: [
    {
      id: "landing-page-request",
      condition: "User says 'build a landing page', 'campaign page', or 'growth page'",
      action: "Invoke /187create and /187seo to ship a conversion-focused landing page.",
    },
    {
      id: "ad-creative-request",
      condition: "User asks for ads, creative variants, or campaign assets",
      action: "Invoke /187create to generate headline/copy/visual variants and a test plan.",
    },
    {
      id: "seo-slump",
      condition: "User reports a drop in traffic or wants to rank for a keyword",
      action: "Invoke /187seo for a focused sprint with keyword targets and measurement.",
    },
    {
      id: "monetization-question",
      condition: "User asks about pricing, revenue, or funnel design",
      action: "Invoke /187revenue and map the architecture to 187CREATE surfaces.",
    },
    {
      id: "zero-budget",
      condition: "User needs to ship with no paid services",
      action: "Invoke /187free then /187create or /187repo for a free-stack MVP.",
    },
    {
      id: "launch-campaign",
      condition: "User plans a product or campaign launch",
      action: "Invoke /187launch + /187create + /187seo growth plan; schedule YELENA gate.",
    },
    {
      id: "conversion-stuck",
      condition: "Traffic exists but conversion is weak",
      action: "Invoke conversion rewrite with /187write, /187seo, and /187include.",
    },
    {
      id: "winner-systemize",
      condition: "A growth variant wins and needs design-system promotion",
      action: "Invoke create→craft handoff brief and route to CHARLOTTE.",
    },
  ],
  commands: [
    { id: "create", name: "/187 kali create", description: "Build a growth-first landing page or campaign asset." },
    { id: "seo", name: "/187 kali seo", description: "Run a focused SEO sprint with keyword targets." },
    { id: "ads", name: "/187 kali ads", description: "Generate ad creative variants and a test plan." },
    { id: "revenue", name: "/187 kali revenue", description: "Draft a revenue architecture map." },
    { id: "free", name: "/187 kali free", description: "Scout a free-stack MVP path." },
    { id: "launch", name: "/187 kali launch", description: "Draft a growth launch plan with measurement." },
  ],
  skillChains: [
    {
      id: "growth-landing-page",
      name: "Growth Landing Page",
      tagline: "Brief → page → SEO → access → publish",
      description:
        "Conversion landing built with 187CREATE, optimized with 187SEO, gated with Access+/Include+, shipped through 187PUBLISH.",
      classMix: "create/seo/write/access-plus/include/publish",
      steps: [
        { skillId: "write", action: "Draft audience, claim, proof, and CTA copy" },
        { skillId: "create", action: "Generate the landing page surface" },
        { skillId: "seo", action: "Target keywords and rewrite meta" },
        { skillId: "access-plus", action: "WCAG+ and assistive-tech pass" },
        { skillId: "include", action: "Identity-safe and plain-language pass" },
        { skillId: "publish", action: "Run publish gate and deploy" },
      ],
      artifact: "Live growth landing page + SEO brief + access notes + publish record",
      artifactExample: "/187create",
    },
    {
      id: "ad-creative-pack",
      name: "Ad Creative Pack",
      tagline: "Variants → visuals → test plan",
      description: "Ad creative pack via 187WRITE, 187CREATE, and 187REVENUE test plan.",
      classMix: "create/revenue/write/publish",
      steps: [
        { skillId: "write", action: "Generate headline, body, and CTA variants" },
        { skillId: "create", action: "Produce visual direction and asset sizes" },
        { skillId: "revenue", action: "Define audience split and primary metric" },
        { skillId: "include", action: "Anti-bias and inclusive language check" },
        { skillId: "publish", action: "Package kit and sync to campaign folder" },
      ],
      artifact: "Ad creative variant pack + test plan + asset folder",
      artifactExample: "/showcase",
    },
    {
      id: "influencer-kit",
      name: "Influencer Kit",
      tagline: "Creator brief → assets → tracking",
      description: "Creator-ready kit with 187CREATE, 187WRITE, and 187REVENUE tracking.",
      classMix: "create/revenue/write/publish",
      steps: [
        { skillId: "write", action: "Draft talking points, captions, and CTAs" },
        { skillId: "create", action: "Build graphics and story asset sizes" },
        { skillId: "revenue", action: "Create tracking links and UTM scheme" },
        { skillId: "publish", action: "Publish shareable kit page" },
      ],
      artifact: "Shareable influencer kit with assets, copy, and tracking",
      artifactExample: "/showcase",
    },
    {
      id: "seo-sprint",
      name: "SEO Sprint",
      tagline: "Audit → keywords → rewrite → measure",
      description: "30-day search sprint using 187SEO, 187WRITE, and 187VERSION.",
      classMix: "seo/write/version/publish",
      steps: [
        { skillId: "seo", action: "Audit current page and pick keyword targets" },
        { skillId: "write", action: "Rewrite title, meta, headers, and body copy" },
        { skillId: "version", action: "Tag baseline and revision" },
        { skillId: "publish", action: "Deploy and schedule measurement check" },
      ],
      artifact: "Revised page + keyword brief + 30-day measurement plan",
      artifactExample: "/187seo",
    },
    {
      id: "free-stack-mvp",
      name: "Free-Stack Growth MVP",
      tagline: "Free tools → surface → track → handoff",
      description: "Zero-budget MVP via 187FREE + 187CREATE/REPO with measurement and craft handoff.",
      classMix: "free/create/repo/seo/revenue",
      steps: [
        { skillId: "free", action: "Select free hosting, forms, and analytics" },
        { skillId: "create", action: "Ship one-section growth surface" },
        { skillId: "seo", action: "Set baseline SEO and intent keywords" },
        { skillId: "revenue", action: "Define conversion events within free tools" },
        { skillId: "version", action: "Tag MVP baseline" },
      ],
      artifact: "Free-tier MVP + limit notes + upgrade triggers",
      artifactExample: "/187free",
    },
    {
      id: "create-to-craft",
      name: "Create → Craft Promotion",
      tagline: "Winner → handoff → systemize",
      description: "Promote a validated growth winner into design-system work under CHARLOTTE.",
      classMix: "create/write/craft/version",
      steps: [
        { skillId: "create", action: "Capture winning surface and metrics" },
        { skillId: "write", action: "Freeze winning copy and CTA hierarchy" },
        { skillId: "craft", action: "Extract tokens and components (CHARLOTTE)" },
        { skillId: "version", action: "Tag promotion and residual growth debt" },
      ],
      artifact: "Craft handoff brief + systemization ticket",
      artifactExample: "/187craft",
    },
  ],
};
