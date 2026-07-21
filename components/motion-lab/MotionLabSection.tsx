"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { demos } from "./index";

function LazyDemoCard({
  title,
  description,
  Component,
}: {
  title: string;
  description: string;
  Component: React.ComponentType;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "200px", threshold: 0 },
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="sc-glass flex flex-col overflow-hidden rounded-2xl transition hover:-translate-y-1 hover:border-white/20"
    >
      <div className="p-5">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="mt-1 text-sm text-white/60">{description}</p>
      </div>
      <div className="relative mt-auto min-h-[18rem] w-full">
        {visible ? <Component /> : <div className="h-full w-full bg-[#050608]" />}
      </div>
    </div>
  );
}

export function MotionLabSection() {
  return (
    <section id="motion-lab" className="relative border-y border-white/10 bg-[#080808]/80 px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Motion Lab</p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            R3F + GSAP <span className="sc-grad-text">showcase scenes</span>
          </h2>
          <p className="mt-4 text-white/60">
            Seven self-contained procedural demos: immersive heroes, kinetic type, product viewers,
            scroll narratives, audio reactivity, network graphs, and reusable motion hooks.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {demos.map((demo) => (
            <Reveal key={demo.id}>
              <LazyDemoCard title={demo.title} description={demo.description} Component={demo.component} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
