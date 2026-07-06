"use client";

type ChromeBarProps = {
  connected: boolean;
  relayUrl: string;
};

export function ChromeBar({ connected, relayUrl }: ChromeBarProps) {
  return (
    <div className="flex items-center gap-2 border-b border-[#4a4a4a] bg-[#1a1a1a] px-4 py-3">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff0000]" aria-hidden />
      <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" aria-hidden />
      <span className="h-2.5 w-2.5 rounded-full bg-[#39ff14]" aria-hidden />
      <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#4a4a4a]">
        187aiEYE · Local Brain Command
      </span>
      <span className="ml-auto flex items-center gap-2 font-mono text-xs">
        <span
          className={`inline-block h-2 w-2 rounded-full ${connected ? "bg-[#39ff14] shadow-[0_0_8px_#39ff14]" : "bg-[#ff0000]"}`}
          aria-hidden
        />
        <span className={connected ? "text-[#39ff14]" : "text-[#ff0000]"}>
          {connected ? "live" : "disconnected"}
        </span>
        <span className="hidden text-[#4a4a4a] sm:inline">{relayUrl}/events</span>
      </span>
    </div>
  );
}