// src/components/HeroSteps.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * One-time hero sequence:
 * 0: show A + titleA (light background)  -> header text = dark
 * 1: crossfade to B + show titleB        -> header text flips to white mid-fade
 * 2: final composite (A base + B semi-opaque) with both lines visible -> white header
 */

type Props = {
  srcA?: string;
  srcB?: string;
  titleA?: string;
  titleB?: string;
  dwellMs?: number;
  fadeMs?: number;
  finalOverlayOpacity?: number;
};

export default function HeroSteps({
  srcA = "/image/hero-Imagination.png",
  srcB = "/image/hero-Knowledge.png",
  titleA = "Imagination is more important than knowledge.",
  titleB = "—because knowledge has its limits.",
  dwellMs = 2200,
  fadeMs = 700,
  finalOverlayOpacity = 0.65,
}: Props) {
  const reduceMotion = usePrefersReducedMotion();

  // phases: 0=A, 1=crossfade to B, 2=final composite
  const [phase, setPhase] = useState<0 | 1 | 2>(reduceMotion ? 2 : 0);

  useEffect(() => {
    if (reduceMotion) return;
    const toPhase1 = window.setTimeout(() => setPhase(1), dwellMs);
    const toPhase2 = window.setTimeout(
      () => setPhase(2),
      dwellMs + fadeMs + dwellMs
    );
    return () => {
      window.clearTimeout(toPhase1);
      window.clearTimeout(toPhase2);
    };
  }, [reduceMotion, dwellMs, fadeMs]);

  // Header color (dark during phase 0, light from mid-fade onward)
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-hdr", "dark");
    if (reduceMotion) {
      root.setAttribute("data-hdr", "light");
      return;
    }
    const switchAt = dwellMs + Math.max(0, Math.floor(fadeMs / 2));
    const tFlip = window.setTimeout(
      () => root.setAttribute("data-hdr", "light"),
      switchAt
    );
    return () => window.clearTimeout(tFlip);
  }, [reduceMotion, dwellMs, fadeMs]);

  const showB = phase >= 1;
  const final = phase === 2;

  const opacityA = 1;
  const opacityB = final ? finalOverlayOpacity : showB ? 1 : 0;

  const showTitleA = phase === 0 || phase === 2;
  const showTitleB = phase >= 1;

  // >>> Only change: headline color on the very first image (phase 0) <<<
  const titleAColor = final
    ? "text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.65)]" // phase 2
    : phase === 0
    ? "text-[#094047]" // phase 0 (slightly deeper ink for contrast)
    : "text-[#032834]"; // phase 1 (your original)

  return (
    <section
      aria-label="Intro"
      className={[
        "relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen",
        "min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh]",
        "flex items-center overflow-x-clip",
      ].join(" ")}
    >
      {/* Base image A */}
      <Image
        src={srcA}
        alt=""
        fill
        priority={false}
        className="object-cover -z-10 transition-opacity duration-700 ease-in-out"
        style={{ opacity: opacityA }}
      />

      {/* Overlay image B */}
      <Image
        src={srcB}
        alt=""
        fill
        priority={false}
        className="object-cover -z-10 transition-opacity duration-700 ease-in-out"
        style={{ opacity: opacityB }}
      />

      {/* Copy */}
      <div className="relative z-10 gy-container px-4 md:px-6 text-right">
        {/* Title A */}
        <h1
          className={[
            "text-3xl md:text-5xl font-semibold tracking-tight leading-tight",
            "motion-safe:transition-opacity motion-safe:duration-500",
            showTitleA ? "opacity-100" : "opacity-0",
            titleAColor,
          ].join(" ")}
        >
          {titleA}
        </h1>

        {/* Title B */}
        <p
          className={[
            "mt-3 md:mt-4 max-w-3xl text-lg md:text-xl",
            "motion-safe:transition-opacity motion-safe:duration-500",
            showTitleB ? "opacity-100" : "opacity-0",
            "text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.65)]",
          ].join(" ")}
        >
          {titleB}
        </p>
      </div>
    </section>
  );
}

/** prefers-reduced-motion */
function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);
  const mq = useRef<MediaQueryList | null>(null);

  type LegacyMQL = MediaQueryList & {
    addListener: (listener: (e: MediaQueryListEvent) => void) => void;
    removeListener: (listener: (e: MediaQueryListEvent) => void) => void;
  };

  // Removed `any` by narrowing to LegacyMQL for the property check
  const isLegacy = (m: MediaQueryList): m is LegacyMQL =>
    "addListener" in m && typeof (m as LegacyMQL).addListener === "function";

  useEffect(() => {
    if (typeof window === "undefined") return;
    mq.current = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mql = mq.current;
    const update = (e?: MediaQueryListEvent) =>
      setPrefers(typeof e?.matches === "boolean" ? e.matches : mql.matches);
    update();
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    }
    if (isLegacy(mql)) {
      mql.addListener(update);
      return () => mql.removeListener(update);
    }
  }, []);

  return prefers;
}
