// src/app/page.tsx
import Link from "next/link";
import Section from "../components/Section";
import HeroSteps from "../components/HeroSteps";

export default function Home() {
  return (
    <main className="flex-1 pt-0 md:pt-0 overflow-x-clip">
      {/* HERO — first child, full-bleed handled inside the component */}
      <HeroSteps
  titleA="Imagination is more important than knowledge."
  titleB="—because knowledge has its limits."
  dwellMs={2200}
  fadeMs={700}
  finalOverlayOpacity={0.65}
      />


      {/* WORK */}
      <Section id="work" className="mt-8 scroll-mt-36">
        <div className="gy-card p-6">
          <p className="text-gy-800">
            If this text looks slate-ish (not pure black), your `gy` palette is active.
          </p>
          <div className="mt-3 flex gap-3">
            <button className="gy-btn">Primary</button>
            <button className="gy-btn gy-btn--ghost">Ghost</button>
            <Link className="gy-link" href="#work">Link sample</Link>
          </div>
        </div>
      </Section>

      {/* ABOUT */}
      <Section id="about" className="py-20 md:py-28 scroll-mt-36">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gy-900">About</h2>
        <p className="mt-3 text-gy-700 max-w-2xl">
          Short section placeholder. Replace with your story when ready.
        </p>
      </Section>

      {/* CONTACT */}
      <Section id="contact" className="py-20 md:py-28 min-h-[70vh] scroll-mt-36">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gy-900">Contact</h2>
        <p className="mt-3 text-gy-700 max-w-2xl">
          Short section placeholder. Add your preferred contact method here.
        </p>
      </Section>
    </main>
  );
}
