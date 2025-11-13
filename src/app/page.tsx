// src/app/page.tsx
import Section from "../components/Section";
import HeroSteps from "../components/HeroSteps";
import KOASection from "../components/KOASection";

export default function Home() {
  return (
    // was: pt-10 md:pt-14 → kill the white strip under the header
    <main className="flex-1 pt-0">
      {/* HERO */}
      <section aria-label="Intro">
        <HeroSteps
          titleA="Imagination is more important than knowledge."
          titleB="— because knowledge has its limits."
          dwellMs={2200}
          fadeMs={700}
          finalBrainOpacity={0.28}
          // Optional: make the hero even shorter, e.g.:
          // heightClamp="clamp(480px,56vh,760px)"
        />
      </section>

      {/* KOA directly under hero */}
      <section id="koa" className="scroll-mt-36">
        <KOASection />
      </section>

      {/* ABOUT */}
      <Section id="about" className="py-20 md:py-28 scroll-mt-36">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-semibold">About</h2>
          <p className="mt-3 text-base text-gray-600">
            KOA is a pragmatic toolkit for chefs and owners—menu costing, supplier tracking, prep lists, and calm workflows.
          </p>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" className="py-16 md:py-24 scroll-mt-36">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-semibold">Contact</h2>
          <p className="mt-3 text-base text-gray-600">
            Let’s build your kitchen ops system together.
          </p>
        </div>
      </Section>
    </main>
  );
}
