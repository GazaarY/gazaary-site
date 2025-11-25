// src/components/KOASection.tsx
"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

type Mode = "benefits" | "features";

/** Allow CSS custom props on style objects (for --spin) */
type CSSVars = CSSProperties & Record<`--${string}`, string | undefined>;

/**
 * KOA Section
 * - Left: copy + CTAs
 * - Right: Smart Surface™ Lazy Susan with GazaarY Core Logo
 */
export default function KOASection() {
  const [mode, setMode] = useState<Mode>("benefits");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const labels = useMemo(
    () =>
      mode === "benefits"
        ? [
            "Service-Taktung\nim Griff",
            "Mise-en-Place\nauf Sterneniveau",
            "Nur Klick –\nkein Tippen im Service",
            "3-Phasen-\nPass-Flow",
            "Saubere Übergabe\nam Pass",
            "Brigade-Klarheit\nam Pass",
          ]
        : [
            "Posten-Karten,\nPrep & Lieferanten",
            "1-Klick-Status\nmit Service-Limits",
            "Mise-en-Place-\nVorlagen & SOPs",
            "Service-\nTimeline & Log",
            "Pass-Book &\nExport (PDF)",
            "Brigade-\nRechte & Rollen",
          ],
    [mode]
  );

  // unique descriptions (Bestätigung, nicht Zufall)
  const benefitDescs = [
    "Service-Takt\nbleibt stabil –\nkein Warten,\nkein Stau am Pass.",
    "Mise-en-Place\nsteht rechtzeitig –\nder Pass bleibt\nbis zum Dessert ruhig.",
    "Nur Klicks,\nkeine Zettel –\npräziser Service,\nkeine Tippfehler.",
    "Vom Eingang\nüber Prep bis\nan den Pass –\nFlow ohne Brüche.",
    "Übergaben\nlaufen wie ein\nsauberes Chef-Log –\nalles nachvollziehbar.",
    "Die Brigade\nweiß jederzeit,\nwer was übernimmt –\nChef-Entlastung pur.",
  ];

  const featureDescs = [
    "Karten für\njeden Posten,\nPrep-Listen & Lieferanten –\nalles mise-en-place-fähig.",
    "1-Klick-Status\nmit Service-Limits –\nÜberlast stoppt,\nbevor Tickets brennen.",
    "Vorlagen,\nChecklisten und SOPs –\nSignature-Gerichte\nlaufen immer gleich.",
    "Service-Timeline\nmit Commit Log –\nwer hat was\nwann umgestellt.",
    "Exports als\nPDF oder Link –\nPass-Briefing,\nShift-Report, Chef-Update.",
    // micro-typography: balanced 4 lines, no awkward orphan
    "Fein granulierte Rollen\n& Rechte – Chef, Sous,\nChef de Partie sehen\njeweils das Richtige.",
  ];

  const details = useMemo(() => {
    const clean = (s: string) => s.replace(/\n/g, " ");
    const badge = mode === "benefits" ? "Benefit" : "Feature";
    const descs = mode === "benefits" ? benefitDescs : featureDescs;
    const fallback =
      mode === "benefits"
        ? "Direkter Nutzen im 3-Sterne-Alltag – KOA reduziert Reibung am Pass und bringt Ruhe in die Brigade."
        : "Konkrete KOA-Funktion – wie ein digitales Chef-Tool, klar im Ablauf, schnell im Service.";
    return labels.map((lab, i) => ({
      badge,
      title: clean(lab),
      desc: descs[i] ?? fallback,
    }));
  }, [labels, mode]);

  return (
    <section
      id="koa"
      className="relative isolate w-full overflow-hidden bg-gradient-to-br from-gy-50 to-gy-100 scroll-mt-24"
    >
      {/* background rays */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-50 opacity-30 md:opacity-40 [mask-image:radial-gradient(60%_60%_at_70%_50%,black,transparent)]"
      >
        <Rays />
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-32 md:pt-28 md:pb-44">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* LEFT: copy + CTAs */}
          <div className="relative z-10">
            <h2 className="text-4xl font-semibold tracking-tight text-gy-900 md:text-5xl">
              KitchenOpsAtelier
            </h2>

            <p className="mt-4 max-w-prose text-lg leading-relaxed text-gy-700">
              Klarheit. Ordnung. Aktion. Dein Mise-en-Place für saubere Abläufe,
              ruhigen Pass und konstante Lieferung im Service.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {/* Primary: Setup starten */}
              <Link
                href="/koa/get-setup"
                className="inline-flex items-center justify-center rounded-full bg-[rgb(16,95,70)] px-7 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-900/30 transition-transform duration-150 ease-out hover:scale-[1.02] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(16,95,70)] focus-visible:ring-offset-2 md:text-base"
                aria-label="Setup für KOA starten"
                prefetch={false}
              >
                Setup starten
              </Link>

              {/* Secondary: Demo testen */}
              <Link
                href="/play/lazy-susan"
                className="inline-flex items-center justify-center rounded-full border border-emerald-900/20 bg-white px-7 py-3 text-sm font-semibold text-gy-900 shadow-sm backdrop-blur transition-all duration-150 ease-out hover:border-emerald-900/60 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(16,95,70)] focus-visible:ring-offset-2 md:text-base"
                aria-label="KOA Lazy Susan Demo testen"
                prefetch={false}
              >
                Demo testen
              </Link>

              {/* Tertiary: Video ansehen */}
              <Link
                href="/#watch-video"
                className="inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-[rgb(21,32,45)] px-7 py-3 text-sm font-semibold text-white shadow-md shadow-slate-900/40 transition-all duration-150 ease-out hover:bg-[rgb(18,28,40)] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(16,95,70)] focus-visible:ring-offset-2 md:text-base"
                aria-label="KOA Überblicks-Video ansehen"
                prefetch={false}
              >
                Video ansehen
              </Link>
            </div>
          </div>

          {/* RIGHT: Smart Surface™ Lazy Susan */}
          <div className="relative z-20">
            <Table
              mode={mode}
              setMode={setMode}
              labels={labels}
              details={details}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Table --------------------------------- */

function Table({
  mode,
  setMode,
  labels,
  details,
  openIndex,
  setOpenIndex,
}: {
  mode: Mode;
  setMode: (m: Mode) => void;
  labels: string[];
  details: { badge: string; title: string; desc: string }[];
  openIndex: number | null;
  setOpenIndex: (i: number | null) => void;
}) {
  const BASE_SIZE = 640;
  const [size, setSize] = useState(BASE_SIZE);

  // responsive: shrink table on small screens so booklets don't get cut off
  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setSize(380);
      } else if (w < 768) {
        setSize(460);
      } else if (w < 1024) {
        setSize(560);
      } else {
        setSize(BASE_SIZE);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const RING = 0.44 * size;
  const startAngle = -90;

  const angles = useMemo(
    () => labels.map((_, i) => startAngle + (360 / labels.length) * i),
    [labels]
  );

  // rotation only for the orbit of plates (NOT the surface) → no roulette
  const [spinDeg, setSpinDeg] = useState(0);
  const prevMode = useRef<Mode>("benefits");

  const reduceMotionRef = useRef(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      reduceMotionRef.current = window
        .matchMedia("(prefers-reduced-motion: reduce)")
        .matches;
    }
  }, []);

  useEffect(() => {
    if (prevMode.current !== mode) {
      if (!reduceMotionRef.current) {
        // small, confident rotation – Bestätigung, kein Glücksspiel
        setSpinDeg((d) => d + (mode === "benefits" ? 18 : -18));
      }
      prevMode.current = mode;
    }
  }, [mode]);

  // Esc / outside → close booklet; arrows toggle mode when closed
  const shellRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (
        openIndex === null &&
        (e.key === "ArrowLeft" || e.key === "ArrowRight")
      ) {
        setMode(mode === "benefits" ? "features" : "benefits");
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!shellRef.current) return;
      if (!shellRef.current.contains(e.target as Node)) setOpenIndex(null);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [mode, openIndex, setMode, setOpenIndex]);

  return (
    <div
      className="relative mx-auto aspect-square w-[82vw] max-w-[680px] md:w-auto motion-reduce:[&_*]:!transition-none"
      ref={shellRef}
      style={{ ["--spin"]: `${spinDeg}deg` } as CSSVars}
    >
      {/* SMART SURFACE — calm tray */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_60px_120px_rgba(0,0,0,0.45)]"
        style={{
          width: size,
          height: size,
          background: [
            // base: dark slate / teal
            "radial-gradient(70% 70% at 50% 32%, rgba(15,118,110,0.26), rgba(15,23,42,0.98))",
            "radial-gradient(100% 100% at 50% 100%, rgba(15,23,42,1), rgba(15,23,42,1))",
          ].join(","),
        }}
      >
        {/* inner tray surface */}
        <div
          className="absolute inset-[10%] rounded-full"
          style={{
            background: [
              "radial-gradient(60% 60% at 50% 28%, rgba(255,255,255,0.06), transparent 60%)",
              "radial-gradient(80% 80% at 50% 72%, rgba(15,23,42,0.98), rgba(0,0,0,1))",
            ].join(","),
            boxShadow:
              "inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 22px 40px rgba(0,0,0,0.7)",
          }}
        />

        {/* soft confirmation halo – continuous ring, no segments */}
        <div
          className="absolute inset-[16%] rounded-full opacity-25 md:opacity-40"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(148,233,213,0.18), transparent 72%)",
            boxShadow:
              "0 0 0 1px rgba(148,233,213,0.18), 0 0 40px rgba(15,23,42,0.9)",
            maskImage:
              "radial-gradient(circle at 50% 50%, transparent 32%, black 80%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 50%, transparent 32%, black 80%)",
          }}
        />

        {/* inner confirmation ring */}
        <div
          className="absolute inset-[26%] rounded-full"
          style={{
            background:
              "radial-gradient(65% 65% at 50% 35%, rgba(34,197,154,0.18), rgba(15,23,42,0.96))",
            boxShadow:
              "0 0 0 1px rgba(148,233,213,0.35), inset 0 0 30px rgba(34,197,154,0.32)",
          }}
        />
      </div>

      {/* Center: GazaarY Core Logo + mode pills */}
      <CenterCore mode={mode} setMode={setMode} />

      {/* orbit plates / booklet (orbit rotates with --spin; cards counter-rotate) */}
      {labels.map((label, i) => {
        const angleDeg = angles[i];
        const rad = (angleDeg * Math.PI) / 180;

        const xRaw = Math.cos(rad) * RING;
        const y = Math.sin(rad) * RING;
        const active = openIndex === i;

        // normal orbit for plates
        const orbitTransform = `translate(calc(-50% + ${xRaw}px), calc(-50% + ${y}px)) rotate(var(--spin))`;
        const upright = { transform: "rotate(calc(var(--spin) * -1))" };

        // booklet positioning:
        // clamp symmetrically on both sides so opposite plates mirror each other
        let bookX = xRaw;
        const maxAbs = RING * 0.7; // same limit left/right
        if (Math.abs(bookX) > maxAbs) {
          bookX = Math.sign(bookX) * maxAbs;
        }

        const bookTransform = `translate(calc(-50% + ${bookX}px), calc(-50% + ${y}px)) rotate(var(--spin))`;

        return active ? (
          <div
            key={`book-${mode}-${i}`}
            className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
            style={{ transform: bookTransform }}
          >
            <BookAtPlate
              badge={details[i].badge}
              title={details[i].title}
              desc={details[i].desc}
              onClose={() => setOpenIndex(null)}
              uprightStyle={upright}
            />
          </div>
        ) : (
          <Plate
            key={`plate-${mode}-${i}`}
            label={label}
            orbitTransform={orbitTransform}
            uprightStyle={upright}
            active={active}
            onClick={() => setOpenIndex(i)}
            ariaLabel={`Open ${details[i].badge} ${details[i].title}`}
          />
        );
      })}
    </div>
  );
}

/* --------------------- Center: GazaarY Core + Pills --------------------- */

function CenterCore({
  mode,
  setMode,
}: {
  mode: Mode;
  setMode: (m: Mode) => void;
}) {
  const isBenefits = mode === "benefits";

  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
      aria-label="KOA mode"
      role="tablist"
    >
      {/* soft inner disc behind the logo */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: [
            "radial-gradient(60% 60% at 50% 28%, rgba(255,255,255,0.16), rgba(15,23,42,0.98))",
            "radial-gradient(80% 80% at 50% 80%, rgba(0,0,0,1), rgba(0,0,0,0.92))",
          ].join(","),
          boxShadow:
            "0 20px 40px rgba(0,0,0,0.7), inset 0 2px 0 rgba(255,255,255,0.24), inset 0 -12px 20px rgba(0,0,0,0.85)",
        }}
      />

      {/* faint pulse halo (GazaarY alive, but calm) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(34,197,154,0.15), transparent 60%)",
          opacity: 0.45,
          animation: "gazaarYPulse 7s ease-in-out infinite",
        }}
      />

      {/* GazaarY Core Logo */}
      <GazaarYLogoCore mode={mode} />

      {/* mode pills – same family as CTAs */}
      <div className="relative z-20 flex items-center justify-center">
        <div className="inline-flex items-center gap-0 rounded-full border border-white/35 bg-white/90 px-1.5 py-1 shadow-[0_0_0_1px_rgba(0,0,0,0.35)] backdrop-blur">
          <button
            type="button"
            role="tab"
            aria-selected={isBenefits}
            onClick={() => setMode("benefits")}
            className={
              "relative min-w-[112px] rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:text-base " +
              (isBenefits
                ? "bg-[rgb(16,95,70)] text-white shadow-[0_10px_22px_rgba(0,0,0,0.55)]"
                : "text-gy-900/85 hover:-translate-y-[1px] hover:text-gy-900")
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
              "relative min-w-[112px] rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:text-base " +
              (!isBenefits
                ? "bg-[rgb(16,95,70)] text-white shadow-[0_10px_22px_rgba(0,0,0,0.55)]"
                : "text-gy-900/85 hover:-translate-y-[1px] hover:text-gy-900")
            }
          >
            Features
          </button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------- GazaarY Logo Core ---------------------- */

function GazaarYLogoCore({ mode }: { mode: Mode }) {
  // tiny tilt depending on mode – like the Y is “leaning” into the focus
  const tilt = mode === "benefits" ? -4 : 4;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
    >
      <div
        className="relative h-28 w-28"
        style={{
          transform: `rotate(${tilt}deg)`,
          transition: "transform 420ms cubic-bezier(.22,.8,.2,1)",
        }}
      >
        {/* inner badge behind the Y */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, rgba(148,233,213,0.25), rgba(15,23,42,1))",
            boxShadow:
              "0 0 0 1px rgba(148,233,213,0.45), 0 12px 24px rgba(0,0,0,0.7), inset 0 -6px 14px rgba(0,0,0,0.85)",
          }}
        />

        {/* subtle inner ring */}
        <div className="absolute inset-3 rounded-full border border-white/12" />

        {/* GazaarY “Y” mark */}
        <svg viewBox="-20 -20 40 40" className="absolute inset-0 m-auto h-14 w-14">
          <defs>
            <linearGradient
              id="gazaarY-stroke"
              x1="0"
              y1="20"
              x2="0"
              y2="-20"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#0f766e" stopOpacity="0.1" />
              <stop offset="0.4" stopColor="#22c55e" stopOpacity="0.9" />
              <stop offset="1" stopColor="#bbf7d0" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* stem */}
          <path
            d="M 0 10 L 0 -4"
            fill="none"
            stroke="url(#gazaarY-stroke)"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
          {/* left arm */}
          <path
            d="M 0 -4 L -9 -16"
            fill="none"
            stroke="url(#gazaarY-stroke)"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
          {/* right arm */}
          <path
            d="M 0 -4 L 9 -16"
            fill="none"
            stroke="url(#gazaarY-stroke)"
            strokeWidth={2.5}
            strokeLinecap="round"
          />

          {/* center joint */}
          <circle
            cx={0}
            cy={-4}
            r={2.6}
            fill="#ecfdf5"
            className="drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]"
          />
        </svg>
      </div>
    </div>
  );
}

/* ----------------------- Book / Plate / Rays --------------------- */

function BookAtPlate({
  badge,
  title,
  desc,
  onClose,
  uprightStyle,
}: {
  badge: string;
  title: string;
  desc: string;
  onClose: () => void;
  uprightStyle: CSSProperties;
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const W = 320;
  const H = 180;

  return (
    <div style={uprightStyle}>
      <div
        className="relative origin-right rounded-xl ring-1 ring-black/5 transition-transform duration-[420ms] ease-[cubic-bezier(.2,.8,.2,1)]"
        style={{
          width: W,
          height: H,
          transform: open ? "scaleX(1)" : "scaleX(0)",
          filter: "drop-shadow(0 10px 16px rgba(0,0,0,0.14))",
          background: "transparent",
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Left page */}
        <div
          className="absolute left-0 top-0 h-full w-1/2 rounded-l-[10px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(255,255,255,0.94))",
            boxShadow: "inset -8px 0 14px rgba(0,0,0,0.06)",
          }}
        >
          <div className="flex h-full w-full flex-col items-center justify-center px-3.5 py-3 text-center">
            <span className="inline-flex items-center rounded-full bg-gy-200/60 px-2 py-0.5 text-[11.5px] font-medium text-gy-900">
              {badge}
            </span>
            <h3 className="mt-1.5 text-[16px] font-semibold leading-tight text-gy-900">
              {title}
            </h3>
          </div>
        </div>

        {/* Right page */}
        <div
          className="absolute right-0 top-0 h-full w-1/2 rounded-r-[10px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.99), rgba(255,255,255,0.95))",
            boxShadow: "inset 8px 0 14px rgba(0,0,0,0.06)",
          }}
        />
        {/* Spine */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 opacity-90"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.10), rgba(0,0,0,0.04))",
            boxShadow: "0 0 4px rgba(0,0,0,0.08)",
            filter: "blur(0.2px)",
          }}
          aria-hidden
        />
        {/* Right-page content + close */}
        <div
          className="relative z-10 ml-[50%] flex h-full w-1/2 items-center justify-center px-3.5 py-3 opacity-0 transition-opacity duration-200 delay-[80ms] text-center"
          style={{ opacity: open ? 1 : 0 }}
        >
          <p
            lang="de"
            className="mx-auto max-w-[260px] whitespace-pre-line text-[15.5px] leading-[1.6] tracking-[0.003em] text-gy-800 [overflow-wrap:anywhere] antialiased"
          >
            {desc}
          </p>

          <button
            type="button"
            onClick={onClose}
            className="absolute right-1.5 top-1.5 rounded-md px-2 py-0.5 text-[11px] text-gy-700 hover:bg-gy-100"
            aria-label="Close"
            title="Close"
          >
            Esc
          </button>
        </div>
      </div>
    </div>
  );
}

function Plate({
  label,
  orbitTransform,
  uprightStyle,
  active,
  onClick,
  ariaLabel,
}: {
  label: string;
  orbitTransform: string;
  uprightStyle: CSSProperties;
  active: boolean;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ease-[cubic-bezier(.22,.8,.2,1)]"
      style={{ transform: orbitTransform }}
    >
      <button
        type="button"
        aria-label={ariaLabel}
        onClick={onClick}
        className="transition-transform duration-150 ease-out hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(16,95,70)] focus-visible:ring-offset-2"
        style={uprightStyle}
      >
        <div
          className={
            "min-w-[148px] max-w-[190px] select-none rounded-2xl bg-white px-4 py-3 textcenter text-gy-900 ring-1 " +
            (active ? "ring-gy-600/40" : "ring-black/5")
          }
          style={{
            filter: "drop-shadow(0 16px 26px rgba(0,0,0,0.20))",
          }}
        >
          <span className="whitespace-pre-line text-sm font-medium leadingsnug">
            {label}
          </span>
        </div>
      </button>
    </div>
  );
}

function Rays() {
  return (
    <svg className="h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
      <defs>
        <linearGradient id="ray" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
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

/* a tiny keyframe for the calm GazaarY pulse (inline so TSX compiles fine) */
// This will be picked up by Tailwind as-is in most setups; if not, it degrades gracefully.
if (typeof document !== "undefined") {
  const id = "gazaarYPulse-keyframes";
  if (!document.getElementById(id)) {
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `
      @keyframes gazaarYPulse {
        0%, 40%, 100% { opacity: 0.35; }
        50% { opacity: 0.55; }
      }
    `;
    document.head.appendChild(style);
  }
}
