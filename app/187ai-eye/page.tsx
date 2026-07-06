import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { EyeShell } from "@/components/187ai-eye/EyeShell";
import { ManifestPromptSchema } from "@/lib/187ai-eye/types";

export const metadata: Metadata = {
  title: "187aiEYE — Local Brain Command",
  description:
    "Standalone 187web command surface for Obsidian-driven multi-agent orchestration and hyper-skilled manifest sub-agents.",
};

function loadManifestIndex() {
  try {
    const path = join(process.cwd(), "public/187ai-eye/manifest-index.json");
    const raw = JSON.parse(readFileSync(path, "utf8")) as { prompts?: unknown[] };
    const prompts = (raw.prompts ?? [])
      .map((p) => ManifestPromptSchema.safeParse(p))
      .filter((r) => r.success)
      .map((r) => r.data);
    return prompts;
  } catch {
    return [];
  }
}

export default function AiEyePage() {
  const manifestIndex = loadManifestIndex();
  const relay = process.env.NEXT_PUBLIC_E187WEB_RELAY_URL ?? "http://localhost:18780";

  return <EyeShell manifestIndex={manifestIndex} initialRelay={relay} />;
}