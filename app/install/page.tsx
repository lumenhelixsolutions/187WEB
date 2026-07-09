import type { Metadata } from "next";
import { EcosystemFooter, EcosystemHeader } from "@/components/ecosystem/Chrome";
import { InstallCommand } from "@/components/install/InstallCommand";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Install 187web — cross-platform CLI installer",
  description:
    "Install the 187web ecosystem on Windows, Linux, or macOS in one command. Manifest, compiler, shell hook, and 16 short-name 187SKILLS — wired to your environment.",
};

const nav = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#docs", label: "Docs" },
  { href: "#env", label: "Environment" },
];

const features = [
  {
    title: "16 short-name skills, one menu",
    body: "Run 187repo full to surface every skill from 187free and 187research to 187publish and 187version — or call each by name.",
  },
  {
    title: "Hardware-aware routing",
    body: "The compiler reads CPU cores, battery state, and GPU presence to pick the right persona for high or low-power sessions.",
  },
  {
    title: "Windows + Linux + macOS",
    body: "Native PowerShell and bash installers. No WSL required on Windows; Git Bash is supported for the POSIX path.",
  },
  {
    title: "Safe and reversible",
    body: "Installers only touch ~/.187web and your shell profile. Uninstall scripts remove hooks and PATH entries cleanly.",
  },
];

const docs = [
  {
    id: "windows",
    title: "Install on Windows",
    content: (
      <>
        <p className="mb-4">
          Open PowerShell and run the three commands below. The installer copies the manifest, the
          compiler, and the hook helper into <code className="rounded bg-white/5 px-1.5 py-0.5">%USERPROFILE%\.187web\bin</code>{" "}
          and adds that folder to your user PATH.
        </p>
        <ol className="list-decimal space-y-2 pl-5 marker:text-[#39FF14]">
          <li>Clone the repository.</li>
          <li>Change into the project directory.</li>
          <li>Run <code className="rounded bg-white/5 px-1.5 py-0.5">.\install.ps1</code>.</li>
          <li>Run <code className="rounded bg-white/5 px-1.5 py-0.5">.\install-compiler-hook.ps1</code> to enable the cd hook.</li>
        </ol>
      </>
    ),
  },
  {
    id: "linux",
    title: "Install on Linux / macOS",
    content: (
      <>
        <p className="mb-4">
          In a terminal, run the three commands below. The installer creates{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5">~/.187web/bin</code> and{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5">~/.187web/prompts</code>, copies the
          manifest and scripts, and appends the bin folder to your PATH in <code className="rounded bg-white/5 px-1.5 py-0.5">.bashrc</code>{" "}
          or <code className="rounded bg-white/5 px-1.5 py-0.5">.zshrc</code>.
        </p>
        <ol className="list-decimal space-y-2 pl-5 marker:text-[#39FF14]">
          <li>Clone the repository.</li>
          <li>Change into the project directory.</li>
          <li>Run <code className="rounded bg-white/5 px-1.5 py-0.5">./install.sh</code>.</li>
          <li>Reload your shell and run <code className="rounded bg-white/5 px-1.5 py-0.5">install-compiler-hook.sh</code>.</li>
        </ol>
      </>
    ),
  },
  {
    id: "what",
    title: "What gets installed",
    content: (
      <>
        <ul className="list-disc space-y-2 pl-5 marker:text-[#39FF14]">
          <li>
            <strong>Manifest registry</strong> —{" "}
            <code className="rounded bg-white/5 px-1.5 py-0.5">MANIFEST.xml</code> with 27 prompt
            definitions.
          </li>
          <li>
            <strong>187web-compiler</strong> — command-line compiler for bash and PowerShell.
          </li>
          <li>
            <strong>Shell hook installer</strong> — adds a lightweight cd hook that recompiles the
            active prompt when you change directories.
          </li>
          <li>
            <strong>187repo short-name menu</strong> — orchestrates the 16-skill 187SKILLS suite
            from one command.
          </li>
          <li>
            <strong>PATH entry</strong> — makes the compiler and short-name tools available from any
            terminal.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "suite",
    title: "Short-name suite",
    content: (
      <>
        <p className="mb-4">
          After install, <code className="rounded bg-white/5 px-1.5 py-0.5">187repo</code> is the
          entry point for the full 187SKILLS suite. Run{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5">187repo.sh full</code> or{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5">.\187repo.ps1 full</code> to print
          every skill back-to-back.
        </p>
        <div className="grid gap-2 text-sm text-[#d6deeb]/70 sm:grid-cols-2">
          {[
            ["repo", "orchestration + manifest"],
            ["craft", "design + frontend"],
            ["vibe", "delight + community"],
            ["launch", "go-to-market"],
            ["free", "no-cost stack"],
            ["research", "source-backed research"],
            ["seo", "ethical search"],
            ["revenue", "ethical monetization"],
            ["docs", "living documentation"],
            ["write", "drafting assistant"],
            ["learn", "curriculum"],
            ["test", "QA + eval gates"],
            ["access", "accessibility"],
            ["include", "inclusive language"],
            ["version", "tagging + metadata"],
            ["publish", "release sync"],
          ].map(([cmd, desc]) => (
            <div key={cmd} className="flex items-center gap-2">
              <code className="rounded bg-white/5 px-1.5 py-0.5 text-[#39FF14]">{cmd}</code>
              <span>— {desc}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "update",
    title: "Updating",
    content: (
      <>
        <p className="mb-4">
          Pull the latest repository changes, then rerun the installer. It overwrites the manifest
          and scripts in <code className="rounded bg-white/5 px-1.5 py-0.5">~/.187web</code> but
          preserves your PATH entry and hook configuration.
        </p>
        <pre className="overflow-x-auto rounded-lg bg-[#0A0C14] p-4 font-mono text-sm text-[#d6deeb]">
          <code>git pull
./install.sh</code>
        </pre>
      </>
    ),
  },
  {
    id: "uninstall",
    title: "Uninstalling",
    content: (
      <>
        <p className="mb-4">
          Remove the installed files and, if you enabled it, the shell hook. On Windows, remove{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5">%USERPROFILE%\.187web</code> from your
          user PATH. On Linux/macOS, delete the 187web block from your shell rc file.
        </p>
        <pre className="overflow-x-auto rounded-lg bg-[#0A0C14] p-4 font-mono text-sm text-[#d6deeb]">
          <code>rm -rf ~/.187web</code>
        </pre>
      </>
    ),
  },
];

const envVars = [
  { name: "E187WEB_POWER_MODE", values: "high | low | standard", desc: "Override hardware-based power-mode detection." },
  { name: "E187WEB_CWD", values: "path", desc: "Override the working directory used for folder routing." },
  { name: "E187WEB_RELAY_URL", values: "URL", desc: "Telemetry relay endpoint (default: http://localhost:18780)." },
];

export default function InstallPage() {
  return (
    <div className="min-h-screen bg-[#05060A] font-sans text-[#d6deeb]">
      <EcosystemHeader navLabel="Installer" nav={nav} cta={{ href: "#install", label: "Install" }} />

      <section
        id="install"
        className="relative overflow-hidden border-b border-white/10 px-6 pb-20 pt-16 sm:pb-28 sm:pt-24"
      >
        {/* Blueprint grid signature */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(57,255,20,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.12) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(115% 85% at 50% 0%, #000 38%, transparent 82%)",
          }}
          aria-hidden="true"
        />

        <div className="container-x relative">
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
              <span className="h-px w-6 bg-[#39FF14]" />
              187web CLI installer
            </p>
            <h1 className="mt-6 text-[clamp(2.5rem,1.5rem+5vw,5rem)] font-bold leading-[0.98] tracking-tight text-white">
              Install the 187web ecosystem in{" "}
              <span className="text-[#39FF14]">one command.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#d6deeb]/70">
              A cross-platform installer for Windows, Linux, and macOS that wires the manifest,
              compiler, shell hook, and 16 short-name 187SKILLS into your environment — so the
              right persona is always one directory away.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <InstallCommand />
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-[#d6deeb]/50">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-[#39FF14]" />
                Windows 10/11
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-[#39FF14]" />
                Linux
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-[#39FF14]" />
                macOS
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-[#39FF14]" />
                Git Bash
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-14 max-w-prose text-center">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
              <span className="h-px w-6 bg-[#39FF14]" />
              Why 187web
            </p>
            <h2 className="mt-4 text-headline font-semibold tracking-tight text-white">
              Built for long-run agentic sessions
            </h2>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="h-full rounded-xl border border-white/10 bg-[#0A0C14] p-6 transition hover:border-[#39FF14]/30 hover:bg-[#0A0C14]/80">
                  <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#d6deeb]/60">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-y border-white/10 bg-[#0A0C14] px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-14 max-w-prose text-center">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
              <span className="h-px w-6 bg-[#39FF14]" />
              How it works
            </p>
            <h2 className="mt-4 text-headline font-semibold tracking-tight text-white">
              Three steps to an always-on persona
            </h2>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                n: "01",
                title: "Run the installer",
                body: "Clone the repo and run ./install.sh or .\\install.ps1. The manifest, compiler, and hook land in ~/.187web.",
              },
              {
                n: "02",
                title: "Enable the hook",
                body: "Run install-compiler-hook.sh or .\\install-compiler-hook.ps1. Every cd now recompiles the active prompt.",
              },
              {
                n: "03",
                title: "Work in context",
                body: "Call skills by short name — craft, research, seo, revenue, learn, test, access, version, publish — or let the cd hook load the right persona from your folder.",
              },
            ].map((step, i) => (
              <Reveal key={step.title} delay={i * 100}>
                <div className="relative h-full rounded-xl border border-white/10 bg-[#05060A] p-8">
                  <span className="text-4xl font-bold text-[#39FF14]/20">{step.n}</span>
                  <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-[#d6deeb]/60">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="docs" className="px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-14 max-w-prose text-center">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
              <span className="h-px w-6 bg-[#39FF14]" />
              Documentation
            </p>
            <h2 className="mt-4 text-headline font-semibold tracking-tight text-white">
              Everything you need to run it
            </h2>
          </Reveal>

          <div className="mx-auto max-w-3xl space-y-6">
            {docs.map((doc, i) => (
              <Reveal key={doc.id} delay={i * 60}>
                <article
                  id={doc.id}
                  className="scroll-mt-24 rounded-xl border border-white/10 bg-[#0A0C14] p-6 sm:p-8"
                >
                  <h3 className="text-title font-semibold text-white">{doc.title}</h3>
                  <div className="mt-4 leading-relaxed text-[#d6deeb]/70">{doc.content}</div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="env" className="border-y border-white/10 bg-[#0A0C14] px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-14 max-w-prose text-center">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
              <span className="h-px w-6 bg-[#39FF14]" />
              Environment variables
            </p>
            <h2 className="mt-4 text-headline font-semibold tracking-tight text-white">
              Override the compiler when you need to
            </h2>
          </Reveal>

          <Reveal>
            <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-[#d6deeb]">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Variable</th>
                    <th className="px-5 py-3 font-semibold">Values</th>
                    <th className="px-5 py-3 font-semibold">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {envVars.map((v) => (
                    <tr key={v.name} className="text-[#d6deeb]/70">
                      <td className="px-5 py-4 font-mono text-[#39FF14]">{v.name}</td>
                      <td className="px-5 py-4">{v.values}</td>
                      <td className="px-5 py-4">{v.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl rounded-2xl border border-[#39FF14]/20 bg-[#39FF14]/5 p-8 text-center sm:p-12">
            <h2 className="text-headline font-semibold tracking-tight text-white">
              Ready to wire your vault?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[#d6deeb]/70">
              Install the CLI, open your Obsidian vault, and let the right specialist meet you in
              the right folder.
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href="#install"
                className="inline-flex h-14 items-center justify-center rounded bg-[#39FF14] px-8 text-base font-semibold text-[#05060A] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39FF14]/50"
              >
                Get 187web
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <EcosystemFooter secondary={{ href: "/", label: "187web home" }} />
    </div>
  );
}
