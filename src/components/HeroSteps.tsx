// src/components/HeroSteps.tsx
"use client";

import React, { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";

// Use static imports so Vercel bundles them (no path/caching misses).
// Relative path from src/components → ../../public/assets/*
import smokeImg from "../../public/assets/hero-smoke.png";
import brainImg from "../../public/assets/hero-brain.png";

type Phase = 0 | 1 | 2;

type HeroStepsProps = {
  titleA?: string;
  titleB?: string;
  smokeSrc?: string;      // optional override
  brainSrc?: string;      // optional override
  dwellMs?: number;
  fadeMs?: number;
  finalBrainOpacity?: number; // e.g. 0.28
  heightClamp?: string;       // e.g. "clamp(480px,56vh,760px)"
};

/**
 * 3-step hero motion:
 * 0) Smoke + Headline
 * 1) Brain (full) + Sub-line only
 * 2) Smoke main + Brain at ~30–40% + Headline + Sub-line (final)
 */
export default function HeroSteps({
  titleA = "Imagination is more important than knowledge.",
  titleB = "— because knowledge has its limits.",
  smokeSrc,
  brainSrc,
  dwellMs = 2200,
  fadeMs = 700,
  finalBrainOpacity = 0.28,
  heightClamp = "clamp(540px,62vh,820px)",
}: HeroStepsProps) {
  const [phase, setPhase] = useState<Phase>(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase(1), dwellMs);
    const t2 = window.setTimeout(() => setPhase(2), dwellMs + fadeMs + dwellMs);
    timers.current.push(t1, t2);
    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const smokeOpacity = phase === 0 ? 1 : phase === 1 ? 0.18 : 1;
  const brainOpacity =
    phase === 0 ? 0 : phase === 1 ? 1 : Math.max(0, Math.min(1, finalBrainOpacity));

  const transitionStyle: CSSProperties = {
    transition: `opacity ${fadeMs}ms cubic-bezier(.22,.61,.36,1)`,
  };

  const smokeSrcFinal = smokeSrc ?? smokeImg;
  const brainSrcFinal = brainSrc ?? brainImg;

  return (
    <section aria-label="Intro" className="relative isolate leading-[0] m-0 p-0">
      <div
        className="relative w-full overflow-hidden"
        style={{ height: heightClamp, minHeight: "540px", maxHeight: "880px" }}
      >
        {/* Safety backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,31,42,1)_0%,rgba(11,31,42,0.55)_38%,rgba(11,31,42,0.35)_70%,rgba(11,31,42,0.12)_100%)]" />

        {/* Smoke base */}
        <Image
          src={smokeSrcFinal}
          alt=""
          fill
          priority
          sizes="100vw"
          className="pointer-events-none block object-cover"
          style={{ ...transitionStyle, opacity: smokeOpacity }}
        />

        {/* Brain overlay */}
        <Image
          src={brainSrcFinal}
          alt=""
          fill
          priority
          sizes="100vw"
          className="pointer-events-none block object-cover"
          style={{ ...transitionStyle, opacity: brainOpacity }}
        />

        {/* Top scrim for nav contrast */}
        <div className="absolute inset-x-0 top-0 h-24 md:h-28 bg-gradient-to-b from-[rgba(11,31,42,0.85)] to-transparent" />

        {/* Phase-0 headline cloud */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`pointer-events-none rounded-[9999px] blur-2xl
                        bg-[radial-gradient(ellipse_at_center,rgba(11,31,42,0.55)_0%,rgba(11,31,42,0.45)_26%,rgba(11,31,42,0.25)_48%,rgba(11,31,42,0.12)_66%,transparent_76%)]
                        w-[68vw] max-w-[1100px] h-[26vh] md:h-[28vh] -translate-y-[2vh] z-[5]
                        ${phase === 0 ? "opacity-100" : "opacity-0"}`}
            style={transitionStyle}
          />
        </div>

        {/* Copy */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-center px-6 text-center">
          <div className="w-full">
            <h1
              style={transitionStyle}
              className={`mx-auto max-w-6xl text-3xl md:text-6xl font-semibold leading-tight text-white drop-shadow
                          ${phase === 1 ? "opacity-0" : "opacity-100"}`}
            >
              {titleA}
            </h1>
            <p
              style={transitionStyle}
              className={`mx-auto mt-4 max-w-3xl text-lg md:text-2xl text-white/90
                          ${phase === 0 ? "opacity-0" : "opacity-100"}`}
            >
              {titleB}
            </p>
          </div>
        </div>
      </div>

      {/* seam killer */}
      <div aria-hidden={true} className="pointer-events-none h-0 w-full" />
    </section>
  );
}
