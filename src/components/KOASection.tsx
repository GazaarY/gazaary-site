// src/components/KOASection.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Mode = "benefits" | "features";

/** Allow CSS custom props on style objects (for --spin) */
type CSSVars = React.CSSProperties & { ["--spin"]?: string };

/**
 * KOA Section
 * - Center pills remain.
 * - Clicking a plate opens a two-page booklet **at that plate's position**.
 * - Booklet is smaller so it doesn't touch other plates.
 * - Left page: centered Badge + Title
 * - Right page: centered Description (unique per plate; supports hard line breaks)
 */
export default function KOASection() {
  const [mode, setMode] = useState<Mode>("benefits");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const labels = useMemo(
    () =>
      mode === "benefits"
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
          ],
    [mode]
  );

  // unique descriptions (with requested hard line breaks for some items)
  const benefitDescs = [
    "KOA hält\nLieferungen\ngleichmäßig –\nweniger Stress im Service.",
    "Klarer Kopf durch klare Prioritäten – weniger Feuerwehreinsatz.",
    "Nur klicken, kein Tippen – schneller, weniger Fehler.",
    "Eingang →\nMise-en-Place →\nService:\nFluss ohne Staus.",
    "Übergaben\nsind sauber\ndokumentiert –\nnichts fällt runter.",
    "Standard für\nProfiküchen –\nrobust im Alltag.",
  ];

  const featureDescs = [
    "Karten für\nAufgaben, Prep und Lieferanten – alles an einem Ort.",
    "Status per 1-Klick mit WIP Limits – Überlast stoppt automatisch.",
    "Vorlagen und Checklisten\nbeschleunigen wiederkehrende Arbeit.",
    "Zeitlinie &\nCommit Log – wer hat was wann geändert.",
    "Export als PDF oder Link – raus aus KOA, rein ins Team.",
    "Rollen & Rechte – wer sieht/ändert was, granular steuerbar.",
  ];

  const details = useMemo(() => {
    const clean = (s: string) => s.replace(/\n/g, " ");
    const badge = mode === "benefits" ? "Benefit" : "Feature";
    const descs = mode === "benefits" ? benefitDescs : featureDescs;
    const fallback =
      mode === "benefits"
        ? "Direkter Nutzen im Alltag – KOA reduziert Reibung und bringt Ruhe in den Service."
        : "Konkrete Funktion in KOA – leicht zu bedienen, klar im Ablauf.";
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
        className="pointer-events-none absolute inset-0 -z-50 opacity-30 md:opacity-35 [mask-image:radial-gradient(60%_60%_at_70%_50%,black,transparent)]"
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
            </div>
          </div>

          {/* RIGHT: platter + center pills + orbit plates (booklet opens IN PLACE) */}
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
  const SIZE = 600;
  const RING = 0.45 * SIZE;
  const startAngle = -90;

  const angles = useMemo(
    () => labels.map((_, i) => startAngle + (360 / labels.length) * i),
    [labels]
  );

  // ── Rotation state (in degrees) ──────────────────────────────────────────
  const [spinDeg, setSpinDeg] = useState(0);
  const prevMode = useRef<Mode>("benefits");

  useEffect(() => {
    if (prevMode.current !== mode) {
      // Benefits => rotate +180°  (clockwise half-turn)
      // Features  => rotate -180° (counter-clockwise half-turn)
      setSpinDeg((d) => d + (mode === "benefits" ? 120 : -120));
      prevMode.current = mode;
    }
  }, [mode]);

  // Esc / outside close; arrows toggle mode when closed
  const shellRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (openIndex === null && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
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
      className="relative mx-auto aspect-square w-[82vw] max-w-[660px] md:w-auto"
      ref={shellRef}
      style={{ ["--spin"]: `${spinDeg}deg` } as CSSVars}
    >
      {/* SMART ROUND LAZY SUSAN — visual layers only (rotates with --spin) */}
      <div
        className="absolute left-1/2 top-1/2 -z-10 transition-transform duration-900 ease-[cubic-bezier(.22,.8,.2,1)]"
        style={{ transform: "translate(-50%,-50%) rotate(var(--spin))" }}
      >
        {/* Drop shadow to sit on page */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: SIZE * 1.02,
            height: SIZE * 1.02,
            boxShadow: "0 60px 120px rgba(0,0,0,0.18)",
          }}
        />

        {/* OUTER DISK — dark slate wood with subtle grain */}
        <div
          className="rounded-full"
          style={{
            width: SIZE,
            height: SIZE,
            background: [
              "repeating-conic-gradient(from 0deg, rgba(10,34,38,0.10) 0deg 4deg, transparent 4deg 8deg)",
              "radial-gradient(75% 75% at 50% 45%, rgba(13,42,48,0.96), rgba(13,42,48,0.92) 55%, rgba(13,42,48,0.86) 75%, rgba(0,0,0,0.70))",
            ].join(","),
            boxShadow:
              "inset 0 2px 0 rgba(255,255,255,0.15), inset 0 -14px 28px rgba(0,0,0,0.28)",
          }}
        />

        {/* OUTER METAL INLAY (thin ring) */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: SIZE * 0.92,
            height: SIZE * 0.92,
            background:
              "conic-gradient(#ffffff 0 0) padding-box, linear-gradient(90deg, #9fb9bf, #e7f2f4, #9fb9bf) border-box",
            border: "3px solid transparent",
            maskImage:
              "radial-gradient(closest-side, transparent 48%, black 49%, black 51%, transparent 52%)",
            WebkitMaskImage:
              "radial-gradient(closest-side, transparent 48%, black 49%, black 51%, transparent 52%)",
            opacity: 0.9,
          }}
        />

        {/* INNER RAISED DISK — slightly lighter slate wood */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: SIZE * 0.58,
            height: SIZE * 0.58,
            background: [
              "repeating-conic-gradient(from 0deg, rgba(255,255,255,0.04) 0deg 5deg, rgba(255,255,255,0) 5deg 10deg)",
              "radial-gradient(70% 70% at 50% 45%, rgba(29,74,82,0.95), rgba(29,74,82,0.88) 55%, rgba(0,0,0,0.6))",
            ].join(","),
            boxShadow:
              "0 14px 28px rgba(0,0,0,0.25), inset 0 2px 0 rgba(255,255,255,0.18), inset 0 -10px 18px rgba(0,0,0,0.24)",
          }}
        />

        {/* INNER METAL INLAY (thin ring on small disk) */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: SIZE * 0.44,
            height: SIZE * 0.44,
            background:
              "conic-gradient(#ffffff 0 0) padding-box, linear-gradient(90deg, #9fb9bf, #e7f2f4, #9fb9bf) border-box",
            border: "3px solid transparent",
            maskImage:
              "radial-gradient(closest-side, transparent 48%, black 49%, black 51%, transparent 52%)",
            WebkitMaskImage:
              "radial-gradient(closest-side, transparent 48%, black 49%, black 51%, transparent 52%)",
            opacity: 0.95,
          }}
        />
      </div>

      {/* center pills */}
      <CenterPills mode={mode} setMode={setMode} />

      {/* orbit plates / booklet (orbit rotates with --spin; cards counter-rotate) */}
      {labels.map((label, i) => {
        const angleDeg = angles[i];
        const rad = (angleDeg * Math.PI) / 180;
        const x = Math.cos(rad) * RING;
        const y = Math.sin(rad) * RING;
        const active = openIndex === i;

        // position + follow the orbit rotation
        const orbitTransform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(var(--spin))`;
        // keep card upright
        const upright = { transform: "rotate(calc(var(--spin) * -1))" as any };

        return active ? (
          <div
            key={`book-${mode}-${i}`}
            className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
            style={{ transform: orbitTransform }}
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

/* ------------------------ Center: Pills ------------------- */

function CenterPills({
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
      <div className="inline-flex items-center gap-0 rounded-full border border-black/10 bg-white/90 p-1.5 shadow-sm backdrop-blur">
        <button
          type="button"
          role="tab"
          aria-selected={isBenefits}
          onClick={() => setMode("benefits")}
          className={
            "rounded-full px-5 py-2.5 text-base font-medium transition-colors duration-200 min-w-[112px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white " +
            (isBenefits
              ? "bg-[rgb(21_64_72)] text-white ring-1 ring-white/80 shadow-sm"
              : "text-gy-900/90 hover:bg-white/70")
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
            "rounded-full px-5 py-2.5 text-base font-medium transition-colors duration-200 min-w-[112px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white " +
            (!isBenefits
              ? "bg-[rgb(21_64_72)] text-white ring-1 ring-white/80 shadow-sm"
              : "text-gy-900/90 hover:bg-white/70")
          }
        >
          Features
        </button>
      </div>
    </div>
  );
}

/* ----------------------- Plate → Book --------------------- */

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
  uprightStyle: React.CSSProperties;
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
          <div className="h-full w-full px-3.5 py-3 flex flex-col items-center justify-center text-center">
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
          className="relative z-10 ml-[50%] h-full w-1/2 px-3.5 py-3 opacity-0 transition-opacity duration-200 delay-[80ms] flex items-center justify-center text-center"
          style={{ opacity: open ? 1 : 0 }}
        >
          <p
            lang="de"
            className="
              mx-auto max-w-[260px]
              text-[15.5px] md:text-[16px]
              leading-[1.6]
              text-gy-800
              tracking-[0.003em]
              hyphens-auto
              whitespace-pre-line
              [overflow-wrap:anywhere]
              [word-break:normal]
              antialiased
            "
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

/* -------------------------------- Plates -------------------------------- */

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
  uprightStyle: React.CSSProperties;
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
        className="transition-transform duration-150 ease-out hover:scale-[1.02]"
        style={uprightStyle}
      >
        <div
          className={
            "min-w-[148px] max-w-[190px] select-none rounded-2xl bg-white px-4 py-3 text-center text-gy-900 ring-1 " +
            (active ? "ring-gy-600/40" : "ring-black/5")
          }
          style={{ filter: "drop-shadow(0 10px 16px rgba(0,0,0,0.16))" }}
        >
          <span className="whitespace-pre-line text-sm font-medium leading-snug">
            {label}
          </span>
        </div>
      </button>
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
