import { TechBootLoader } from "@/components/motion/TechBootLoader";

/** Route-level technical boot sequence (187GSAP) — reserved layout, no blank flash. */
export default function Loading() {
  return (
    <div className="min-h-screen bg-[#050608] pt-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <TechBootLoader label="Loading 187WEB surface" />
      </div>
    </div>
  );
}
