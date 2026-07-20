import type { Metadata } from "next";
import { LaunchPage } from "@/components/launch/LaunchPage";

export const metadata: Metadata = {
  title: "187WEB — Type one command. Ship the whole surface.",
  description:
    "187WEB is a command-driven web suite for building public pages, launching with standards, and shipping research-grade artifacts with AI-assisted skills.",
  openGraph: {
    title: "187WEB — Type one command. Ship the whole surface.",
    description: "Build public pages, launch with standards, and ship research-grade artifacts using the 187 command surface.",
  },
};

export default function HomePage() {
  return <LaunchPage />;
}
