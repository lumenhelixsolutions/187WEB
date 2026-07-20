import { Reveal } from "@/components/Reveal";

function IconArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function IconRocket({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function IconTerminal({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" y2="19" />
    </svg>
  );
}

function IconSearchCheck({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m8 11 2 2 4-4" />
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function IconFlask({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 2v8L4.5 20A2 2 0 0 0 6.28 22h11.44a2 2 0 0 0 1.78-2L14 10V2" />
      <path d="M8.5 2h7" />
      <path d="M12 15v2" />
    </svg>
  );
}

const icons = {
  launchSite: IconRocket,
  freeStack: IconTerminal,
  researchLab: IconFlask,
  publishGate: IconSearchCheck,
} as const;

const scenarios = [
  {
    id: "launch-site",
    icon: "launchSite",
    title: "Launch a landing page this afternoon",
    steps: ["187craft design landing-page", "187seo audit brief", "187launch plan ph"],
    artifact: {
      title: "Launch day checklist",
      lines: [
        "✓ Hero + CTA drafted (187CRAFT)",
        "✓ SEO / AEO / GEO audit passed (187SEO)",
        "✓ Product Hunt timeline + assets (187LAUNCH)",
        "→ Publish gate pending (187PUBLISH)",
      ],
    },
  },
  {
    id: "free-stack",
    icon: "freeStack",
    title: "Find a free stack for my MVP",
    steps: ["187free mvp hosting", "187repo init --web", "187kit apply landing"],
    artifact: {
      title: "Free stack recipe",
      lines: [
        "Primary: Next.js + Tailwind + Vercel free tier",
        "Backup: Astro + Cloudflare Pages",
        "Local-first: SQLite / jsonl for data",
        "Upgrade path: PostgreSQL when > 1k rows",
      ],
    },
  },
  {
    id: "research-lab",
    icon: "researchLab",
    title: "Ship a reproducible research lab",
    steps: ["187research climate-models deep", "187labs protocol", "187crate release packet"],
    artifact: {
      title: "Research Release Packet",
      lines: [
        "CLAIMS.md — proved / modeled / speculative",
        "METHODS.md + notebooks/",
        "DATASET-CARD.md with FAIR metadata",
        "ro-crate-metadata.json ready for deposit",
      ],
    },
  },
  {
    id: "publish-gate",
    icon: "publishGate",
    title: "Audit a page before publish",
    steps: ["187scan page /pricing", "187standard pre-ship", "187access-plus audit", "187publish gate"],
    artifact: {
      title: "Publish gate report",
      lines: [
        "Scan: 0 critical, 2 warnings (187SCAN)",
        "Standard score: 47/50 (187STANDARD)",
        "Access: focus ring + alt text OK (187ACCESS+)",
        "Go/no-go: GO with 2 fixes",
      ],
    },
  },
];

export function ScenarioDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {scenarios.map((scenario, i) => {
        const ScenarioIcon = icons[scenario.icon as keyof typeof icons];
        return (
        <Reveal key={scenario.id} delay={i * 100}>
          <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-[#0A0C14] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#39FF14]/10 text-[#39FF14]">
                <ScenarioIcon className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-bold text-white">{scenario.title}</h3>
            </div>

            <div className="mt-5 space-y-2">
              {scenario.steps.map((step) => (
                <code
                  key={step}
                  className="flex items-center gap-2 rounded-lg bg-black/30 px-3 py-2 text-sm text-[#39FF14]"
                >
                  <IconArrowRight className="h-3.5 w-3.5 text-white/40" />
                  {step}
                </code>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-[#05060A] p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#39FF14]">{scenario.artifact.title}</p>
              <ul className="mt-3 space-y-2">
                {scenario.artifact.lines.map((line) => (
                  <li key={line} className="text-sm leading-relaxed text-white/70">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      );})}
    </div>
  );
}
