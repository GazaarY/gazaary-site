// src/components/KOASection.tsx
"use client";

import { useMemo, useState } from "react";

type Mode = "benefits" | "features";

export default function KOASection() {
  const [mode, setMode] = useState<Mode>("benefits");

  // Ring labels per mode (unverändert)
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

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-32 md:pt-28 md:pb-44">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* LEFT: headline + CTAs (Toggle ENTFERNT um Duplikat zu vermeiden) */}
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
              {/* kein ModeToggle hier */}
            </div>
          </div>

          {/* RIGHT: platter + zentrales Toggle + orbiting plates */}
          <div className="relative z-20">
            <Table mode={mode} labels={labels} setMode={setMode} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Table --------------------------------- */

function Table({
  mode,
  labels,
  setMode,
}: {
  mode: Mode;
  labels: string[];
  setMode: (m: Mode) => void;
}) {
  const SIZE = 600;          // platter diameter
  const RING = 0.45 * SIZE;  // orbit radius
  const startAngle = -90;    // 12 o’clock

  const angles = useMemo(
    () => labels.map((_, i) => startAngle + (360 / labels.length) * i),
    [labels]
  );

  return (
    <div className="relative mx-auto aspect-square w-[82vw] max-w-[660px] md:w-auto">
      {/* LAYERED PLATTER */}
      <div
        className="absolute left-1/2 top-1/2 -z-10"
        style={{ transform: "translate(-50%,-50%)" }}
      >
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

      {/* CENTER: exakt wie Screenshot 2 – reine Pill-Gruppe, kein Kartenrahmen */}
      <CenterPills mode={mode} setMode={setMode} />

      {/* ORBIT PLATES */}
      {labels.map((label, i) => {
        const rad = (angles[i] * Math.PI) / 180;
        const x = Math.cos(rad) * RING;
        const y = Math.sin(rad) * RING;
        return <Plate key={`${mode}-${i}`} label={label} x={x} y={y} />;
      })}
    </div>
  );
}

/* ------------------------ Center: Screenshot-2 Pills --------------------- */

function CenterPills({
  mode,
  setMode,
}: {
  mode: "benefits" | "features";
  setMode: (m: "benefits" | "features") => void;
}) {
  const isBenefits = mode === "benefits";
  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
      aria-label="KOA mode"
      role="tablist"
    >
      <div className="inline-flex items-center gap-0 rounded-full border border-black/10 bg-white/90 p-1.5 shadow-sm backdrop-blur">
        <button
          type="button"
          role="tab"
          aria-selected={isBenefits}
          onClick={() => setMode("benefits")}
          className={
            "rounded-full px-5 py-2.5 text-base font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gy-400 min-w-[112px] " +
            (isBenefits ? "bg-gy-200/70 text-gy-900" : "text-gy-800 hover:bg-gy-50")
          }
        >
          Benefits
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={!isBenefits}
          onClick={() => setMode("features")}
          className={
            "rounded-full px-5 py-2.5 text-base font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gy-400 min-w-[112px] " +
            (!isBenefits ? "bg-gy-200/70 text-gy-900" : "text-gy-800 hover:bg-gy-50")
          }
        >
          Features
        </button>
      </div>
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
        style={{ filter: "drop-shadow(0 10px 16px rgba(0,0,0,0.16))" }}
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
