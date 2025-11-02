// src/components/KOASection.tsx
"use client";

import { useMemo, useState } from "react";

type Mode = "benefits" | "features";

export default function KOASection() {
  const [mode, setMode] = useState<Mode>("benefits");

  // Center content (book text) swaps with mode
  const center = useMemo(
    () =>
      mode === "benefits"
        ? {
            badge: "Benefit",
            title: "Schneller Klarblick",
            desc: "KOA ordnet deine nächsten Schritte in 60 Sekunden.",
          }
        : {
            badge: "Feature",
            title: "3-Phasen Board",
            desc: "Eingang → Mise-en-Place → Service. Klarer Flow ohne Overhead.",
          },
    [mode]
  );

  // Ring labels per mode
  const labels = useMemo(() => {
    return mode === "benefits"
      ? [
          "Konstante\nLieferung",
          "Ruhiger\nKopf",
          "Click-only\nCarousel",
          "3-Phasen-\nFlow",
          "Saubere\nHandover",
          "Chef-tauglich",
        ]
      : [
          "Karten: Tasks,\nPrep, Supplier",
          "1-Klick Status\n(WIP Limits)",
          "Vorlagen &\nChecklisten",
          "Timeline &\nCommit Log",
          "Export/Share\nPDF",
          "Rollen &\nBerechtigung",
        ];
  }, [mode]);

  return (
    <section
      id="koa"
      className="relative isolate w-full overflow-hidden bg-gradient-to-br from-gy-50 to-gy-100 scroll-mt-24"
    >
      {/* soft background rays */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-50 opacity-30 md:opacity-35 [mask-image:radial-gradient(60%_60%_at_70%_50%,black,transparent)]"
      >
        <Rays />
      </div>

      {/* slight extra bottom padding so KOA holds longer on screen */}
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-32 md:pt-28 md:pb-44">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* LEFT: headline + CTAs + toggle */}
          <div className="relative z-10">
            <h2 className="text-4xl font-semibold tracking-tight text-gy-900 md:text-5xl">
              KitchenOpsAtelier
            </h2>

            <p className="mt-4 max-w-prose text-lg leading-relaxed text-gy-700">
              Klar. Ordnung. Aktion. Dein Mise-en-Place für saubere Abläufe,
              ruhigen Kopf und konstante Lieferung.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#get-setup"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-base font-medium text-white shadow-sm transition hover:shadow md:px-6"
                style={{ backgroundColor: "rgb(21 64 72)" }}
              >
                Get setup
              </a>
              <a
                href="#watch-video"
                className="inline-flex items-center justify-center rounded-xl border px-5 py-3 text-base font-medium text-gy-900/80 backdrop-blur transition hover:bg-white md:px-6"
              >
                Watch video
              </a>

              <ModeToggle mode={mode} setMode={setMode} />
            </div>
          </div>

          {/* RIGHT: table (platter + book + symmetric plates) */}
          <div className="relative z-20">
            <Table
              mode={mode}
              centerBadge={center.badge}
              centerTitle={center.title}
              centerDesc={center.desc}
              labels={labels}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Mode Toggle ------------------------------ */

function ModeToggle({
  mode,
  setMode,
}: {
  mode: Mode;
  setMode: (m: Mode) => void;
}) {
  const isBenefits = mode === "benefits";
  return (
    <div
      className="ml-1 inline-flex select-none items-center rounded-2xl border border-black/10 bg-white/95 p-1 shadow-sm backdrop-blur"
      role="tablist"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault();
          setMode(isBenefits ? "features" : "benefits");
        }
      }}
    >
      <button
        type="button"
        role="tab"
        onClick={() => setMode("benefits")}
        className={
          "rounded-xl px-3.5 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gy-400 " +
          (isBenefits ? "bg-gy-200/80 text-gy-900" : "text-gy-700 hover:bg-gy-50")
        }
        aria-selected={isBenefits}
      >
        Benefits
      </button>
      <button
        type="button"
        role="tab"
        onClick={() => setMode("features")}
        className={
          "rounded-xl px-3.5 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gy-400 " +
          (!isBenefits ? "bg-gy-200/80 text-gy-900" : "text-gy-700 hover:bg-gy-50")
        }
        aria-selected={!isBenefits}
      >
        Features
      </button>
    </div>
  );
}

/* -------------------------------- Table --------------------------------- */

function Table({
  mode,
  centerBadge,
  centerTitle,
  centerDesc,
  labels,
}: {
  mode: Mode;
  centerBadge: string;
  centerTitle: string;
  centerDesc: string;
  labels: string[];
}) {
  /** Geometry */
  const SIZE = 600; // platter diameter
  const RING = 0.45 * SIZE; // orbit radius (breathing room around book)
  const BOOK_W = 280; // book size (reduced for balance)
  const BOOK_H = 190;

  /** Absolutely even spacing with a 12-o’clock anchor */
  const startAngle = -90; // 12 o’clock; every plate 360/n apart
  const angles = useMemo(
    () => labels.map((_, i) => startAngle + (360 / labels.length) * i),
    [labels]
  );

  return (
    <div className="relative mx-auto aspect-square w-[82vw] max-w-[660px] md:w-auto">
      {/* LAYERED PLATTER (deeper rim + softened gloss) */}
      <div
        className="absolute left-1/2 top-1/2 -z-10"
        style={{ transform: "translate(-50%,-50%)" }}
      >
        {/* outer vignette */}
        <div
          className="rounded-full"
          style={{
            width: SIZE,
            height: SIZE,
            background:
              "radial-gradient(62% 62% at 50% 46%, rgba(255,255,255,0.75), rgba(255,255,255,0.55) 58%, rgba(0,0,0,0.06) 59%, rgba(0,0,0,0) 72%)",
            boxShadow:
              "inset 0 24px 80px rgba(0,0,0,0.10), 0 12px 36px rgba(0,0,0,0.06)",
          }}
        />
        {/* inner rim step */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: SIZE * 0.78,
            height: SIZE * 0.78,
            background:
              "radial-gradient(60% 60% at 50% 45%, rgba(255,255,255,0.90), rgba(255,255,255,0.65) 60%, rgba(0,0,0,0.08) 61%, rgba(0,0,0,0) 68%)",
            boxShadow: "inset 0 14px 36px rgba(0,0,0,0.10)",
          }}
        />
        {/* subtle gloss */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: SIZE,
            height: SIZE,
            background:
              "conic-gradient(from 20deg at 50% 50%, rgba(255,255,255,0.18) 0deg, rgba(255,255,255,0) 80deg, rgba(255,255,255,0) 300deg, rgba(255,255,255,0.18) 360deg)",
            maskImage:
              "radial-gradient(65% 65% at 50% 50%, black 40%, transparent 62%)",
            opacity: 0.6,
          }}
        />
      </div>

      {/* OPEN BOOK (center) */}
      <OpenBook
        w={BOOK_W}
        h={BOOK_H}
        badge={centerBadge}
        title={centerTitle}
        desc={centerDesc}
      />

      {/* SYMMETRIC PLATES */}
      {labels.map((label, i) => {
        const rad = (angles[i] * Math.PI) / 180;
        const x = Math.cos(rad) * RING;
        const y = Math.sin(rad) * RING;
        return <Plate key={`${mode}-${i}`} label={label} x={x} y={y} />;
      })}
    </div>
  );
}

/* --------------------------- Center: Open Book --------------------------- */

function OpenBook({
  w,
  h,
  badge,
  title,
  desc,
}: {
  w: number;
  h: number;
  badge: string;
  title: string;
  desc: string;
}) {
  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
      style={{ width: w, height: h }}
    >
      {/* Book body */}
      <div className="relative h-full w-full rounded-xl ring-1 ring-black/5 bg-transparent">
        {/* left page */}
        <div
          className="absolute left-0 top-0 h-full w-1/2 rounded-l-[12px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(255,255,255,0.94))",
            boxShadow: "inset -10px 0 18px rgba(0,0,0,0.06)",
          }}
        />
        {/* right page */}
        <div
          className="absolute right-0 top-0 h-full w-1/2 rounded-r-[12px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.99), rgba(255,255,255,0.95))",
            boxShadow: "inset 10px 0 18px rgba(0,0,0,0.06)",
          }}
        />
        {/* spine */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.05))",
            boxShadow: "0 0 6px rgba(0,0,0,0.10)",
            filter: "blur(0.2px)",
          }}
        />
        {/* content overlay */}
        <div className="relative z-10 h-full w-full px-5 py-4">
          <span className="inline-flex items-center rounded-full bg-gy-200/60 px-2.5 py-0.5 text-[12.5px] font-medium text-gy-900">
            {badge}
          </span>
          <h3 className="mt-2 text-[20px] md:text-[22px] font-semibold leading-tight text-gy-900">
            {title}
          </h3>
          <p className="mt-2 text-gy-700 text-[13.5px] md:text-sm leading-relaxed">
            {desc}
          </p>
        </div>
      </div>

      {/* lift shadow (book floats slightly) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ filter: "drop-shadow(0 8px 22px rgba(0,0,0,0.12))" }}
      />
    </div>
  );
}

/* -------------------------------- Plates -------------------------------- */

function Plate({ label, x, y }: { label: string; x: number; y: number }) {
  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
    >
      <div
        className="min-w-[148px] max-w-[190px] select-none rounded-2xl bg-white px-4 py-3 text-center text-gy-900 ring-1 ring-black/5"
        style={{
          filter: "drop-shadow(0 10px 16px rgba(0,0,0,0.16))",
        }}
      >
        <span className="whitespace-pre-line text-sm font-medium leading-snug">
          {label}
        </span>
      </div>
    </div>
  );
}

/* -------------------------------- Rays ---------------------------------- */

function Rays() {
  return (
    <svg className="h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
      <defs>
        <linearGradient id="ray" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(255,255,255,0.0)" />
          <stop offset="0.5" stopColor="rgba(255,255,255,0.8)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.0)" />
        </linearGradient>
      </defs>
      {Array.from({ length: 7 }).map((_, i) => {
        const w = 180;
        const x = 120 + i * 120;
        return (
          <rect
            key={i}
            x={x}
            y={-200}
            width={w}
            height={1200}
            fill="url(#ray)"
            transform="rotate(25 600 400)"
            opacity={0.45 - i * 0.05}
          />
        );
      })}
    </svg>
  );
}
