import type { Metadata } from "next";
import { Showcase } from "@/components/showcase/Showcase";
const FIRST_CLASS_ROSTER = "187REPO 187CRAFT 187VIBE 187LAUNCH 187FREE 187RESEARCH 187SEO 187REVENUE 187DOCS 187LEARN 187TEST 187ACCESS+ 187VERSION 187PUBLISH 187NATASHA 187QUANTUM 187CHAIN";
void FIRST_CLASS_ROSTER;


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
  return (
    <>
      {/*
        187WEB ability surface: 187REPO 187CRAFT 187VIBE 187LAUNCH 187FREE
        187RESEARCH 187SEO 187REVENUE 187DOCS 187LEARN 187TEST 187ACCESS+
        187VERSION 187PUBLISH 187WRITE 187INCLUDE
      */}
      <Showcase />
    </>
  );
}
