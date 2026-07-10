import { COMMANDS, COMMAND_CATEGORIES, COMMAND_GRAMMAR } from "./command-data";

export function CommandReference() {
  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-[#0A0C14] p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Canonical grammar</p>
        <code className="mt-4 block overflow-x-auto rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-[#39FF14]">{COMMAND_GRAMMAR}</code>
        <p className="mt-4 text-sm leading-6 text-white/60">Default behavior is standalone-first: a named command runs solo and brief. Use assist, flow, release, report, or deep only when needed.</p>
      </div>

      {COMMAND_CATEGORIES.map((category) => (
        <div key={category} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-white">{category}</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.16em] text-white/40">
                <tr><th className="border-b border-white/10 py-3 pr-4">Command</th><th className="border-b border-white/10 py-3 pr-4">Alias</th><th className="border-b border-white/10 py-3 pr-4">ID</th><th className="border-b border-white/10 py-3 pr-4">Status</th><th className="border-b border-white/10 py-3">Purpose</th></tr>
              </thead>
              <tbody>
                {COMMANDS.filter((command) => command.category === category).map((command) => (
                  <tr key={`${command.cmd}-${command.id}`} className="text-white/70">
                    <td className="border-b border-white/5 py-3 pr-4 font-mono text-[#39FF14]">{command.cmd}</td>
                    <td className="border-b border-white/5 py-3 pr-4 font-mono">{command.alias}</td>
                    <td className="border-b border-white/5 py-3 pr-4 font-semibold text-white">{command.id}</td>
                    <td className="border-b border-white/5 py-3 pr-4">{command.status}</td>
                    <td className="border-b border-white/5 py-3">{command.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </section>
  );
}
