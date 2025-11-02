// src/app/page.tsx
import Section from "../components/Section";
import HeroSteps from "../components/HeroSteps";
import KOASection from "../components/KOASection";

export default function Home() {
  return (
    <main className="flex-1 pt-0 md:pt-0 overflow-x-clip">
      {/* HERO (animated) */}
      <HeroSteps
        titleA="Imagination is more important than knowledge."
        titleB="—because knowledge has its limits."
        dwellMs={2200}
        fadeMs={700}
        finalOverlayOpacity={0.65}
      />

      {/* KOA directly under the hero */}
      <KOASection />

      {/* ABOUT */}
      <Section id="about" className="py-20 md:py-28 scroll-mt-36">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gy-900">
          About
        </h2>
        <p className="mt-3 text-gy-700 max-w-2xl">
          Short section placeholder. Replace with your story when ready.
        </p>
      </Section>

      {/* CONTACT */}
      <Section id="contact" className="py-20 md:py-28 min-h-[70vh] scroll-mt-36">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gy-900">
          Contact
        </h2>
        <p className="mt-3 text-gy-700 max-w-2xl">
          Short section placeholder. Add your preferred contact method here.
        </p>
      </Section>
    </main>
  );
}
