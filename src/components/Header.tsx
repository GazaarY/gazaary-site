// src/components/Header.tsx 
"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import Link from "next/link";
import { useActiveSection } from "../hooks/useActiveSection";

const NAV = [
  { id: "work", label: "Work", href: "/#work" },
  { id: "about", label: "About", href: "/#about" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

// How long the very first-dark state should linger before switching to light
// Increase/decrease to taste (this does not affect scrolling behavior).
const FIRST_DARK_DELAY_MS = 2200;

export default function Header() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const activeId = useActiveSection(NAV.map((n) => n.id));

  // --- GUARANTEE: First frame dark, then flip to light (after a short delay) and keep it light thereafter ---
  useLayoutEffect(() => {
    const root = document.documentElement;
    // First paint: DARK
    root.setAttribute("data-hdr", "dark");
    // After a short delay: flip to LIGHT, then stay light
    const t = window.setTimeout(() => {
      root.setAttribute("data-hdr", "light");
    }, FIRST_DARK_DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  // Observe the hero to control header transparency and section muting
  // (We do NOT change ink color here.)
  useEffect(() => {
    const root = document.documentElement;
    const hero = document.querySelector<HTMLElement>('section[aria-label="Intro"]');
    if (!hero) return;

    const onHero = () => {
      root.removeAttribute("data-header-solid"); // transparent on hero
      root.removeAttribute("data-muted");        // unmute on hero
    };
    const offHero = () => {
      root.setAttribute("data-header-solid", "true"); // solid below hero
      root.setAttribute("data-muted", "true");        // mute body sections
    };

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? onHero() : offHero()),
      { threshold: 0.05 }
    );

    io.observe(hero);

    // initial pass (top vs mid-page refresh)
    const r = hero.getBoundingClientRect();
    const inView = r.bottom > 0 && r.top < window.innerHeight;
    inView ? onHero() : offHero();

    return () => io.disconnect();
  }, []);

  // Close mobile on ESC / outside click
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!open) return;
      const t = e.target as Node;
      if (
        panelRef.current && !panelRef.current.contains(t) &&
        btnRef.current && !btnRef.current.contains(t)
      ) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  // Simple focus trap for the mobile sheet
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const nodes = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>('a,button,[tabindex]:not([tabindex="-1"])')
    );
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    const onTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || nodes.length === 0) return;
      const active = document.activeElement;
      if (e.shiftKey && active === first) { e.preventDefault(); last?.focus(); }
      else if (!e.shiftKey && active === last) { e.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", onTab);
    first?.focus();
    return () => document.removeEventListener("keydown", onTab);
  }, [open]);

  // Deep-link highlight
  const [hashId, setHashId] = useState("");
  useEffect(() => {
    const onHash = () => setHashId(window.location.hash.replace("#", ""));
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const currentId = hashId || activeId || "";
  const isCurrent = (href: string) =>
    href.replace("/#", "").replace("#", "") === currentId ? "page" : undefined;

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 rounded-md";

  return (
    <>
      {/* Force VERY first paint to DARK ink before hydration/paint */}
      <script
        dangerouslySetInnerHTML={{
          __html: "document.documentElement.setAttribute('data-hdr','dark');",
        }}
      />

      <style jsx global>{`
        /* Ink (brand + nav) switches with data-hdr */
        html[data-hdr="light"] .hdr-ink { 
          color:#fff; 
          text-shadow:0 1px 2px rgba(0,0,0,.35);
        }
        html[data-hdr="dark"] .hdr-ink { 
          color: rgb(17 24 39); /* gy-900 */
          text-shadow:none;
        }

        /* Make hero always crisp, and mute body once past hero */
        section[aria-label="Intro"] { filter:none !important; opacity:1 !important; }
        main, main section { transition: filter .25s ease, opacity .25s ease; }
        html[data-muted] main section:not([aria-label="Intro"]) {
          filter: saturate(0.85) contrast(0.98);
          opacity: 0.92;
        }

        /* Header transparency vs solid */
        .gy-header {
          background-color: transparent;
          border-bottom: 1px solid transparent;
          transition: background-color .25s ease, border-color .25s ease, backdrop-filter .25s ease;
        }
        html[data-header-solid="true"] .gy-header {
          background-color: rgba(15, 23, 42, 0.85); /* slate-900/85 */
          -webkit-backdrop-filter: saturate(1) blur(8px);
          backdrop-filter: saturate(1) blur(8px);
          border-bottom-color: rgba(255,255,255,0.1);
        }

        /* Nav states tuned for contrast on both backgrounds */
        .hdr-link { 
          text-decoration: none; 
          underline-offset: 4px; 
          transition: opacity .2s ease, color .2s ease, text-shadow .2s ease; 
        }
        html[data-hdr="light"] .hdr-link:hover { opacity: .9; text-decoration: underline; }
        html[data-hdr="dark"]  .hdr-link:hover  { color: rgb(17 24 39 / .80); text-decoration: underline; }
        .hdr-link[aria-current="page"] { font-weight: 600; text-decoration: underline; }
      `}</style>

      {/* Transparent over hero, solid from Work down */}
      <header ref={headerRef} role="banner" className="gy-header fixed top-0 left-0 right-0 z-50">
        <div className="gy-container flex h-16 items-center justify-between">
          <Link
            href="/"
            className={`gy-brand hdr-ink ${focusRing}`}
            aria-label="Go to homepage"
          >
            GazaarY
          </Link>

          <nav className="hidden sm:flex items-center gap-8 text-sm" aria-label="Primary">
            {NAV.map((item) => {
              const current = isCurrent(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={["hdr-ink hdr-link", focusRing].join(" ")}
                  aria-current={current}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile toggle */}
          <button
            ref={btnRef}
            type="button"
            aria-label="Toggle menu"
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={[
              "sm:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border transition",
              "hdr-ink border-white/40 hover:bg-white/10",
              focusRing,
              "overflow-hidden p-2 relative",
            ].join(" ")}
          >
            {/* burger */}
            <svg width="24" height="16" viewBox="0 0 24 16" aria-hidden="true"
              className={`${open ? "opacity-0" : "opacity-100"} transition-opacity duration-150 block`}>
              <path d="M2 3H22 M2 8H22 M2 13H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {/* close */}
            <svg width="24" height="16" viewBox="0 0 24 16" aria-hidden="true"
              className={`${open ? "opacity-100" : "opacity-0"} transition-opacity duration-150 absolute inset-0 m-auto block`}>
              <path d="M5 3 L19 13 M19 3 L5 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Mobile panel */}
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal={open ? "true" : undefined}
          className={`sm:hidden overflow-hidden transition-[max-height,opacity] duration-200 ${
            open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
        >
          <nav className="py-3" aria-label="Primary mobile">
            <div className="gy-container flex flex-col gap-3 text-sm">
              {NAV.map((item) => {
                const current = isCurrent(item.href);
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={["hdr-ink hdr-link", focusRing].join(" ")}
                    aria-current={current}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
