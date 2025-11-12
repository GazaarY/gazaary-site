// src/components/Header.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [solid, setSolid] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('section[aria-label="Intro"]');
    if (!hero) return;

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        // solid when hero is NOT intersecting
        setSolid(!e.isIntersecting);
      },
      { rootMargin: "-35% 0px 0px 0px", threshold: 0.2 }
    );
    observerRef.current.observe(hero);

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <header
      data-header-solid={solid ? "true" : "false"}
      className={[
        "fixed inset-x-0 top-0 z-50",
        "transition-colors duration-300",
        solid
          ? "bg-[#0b1f2a]/90 backdrop-blur shadow-sm"
          : "bg-transparent shadow-none",
      ].join(" ")}
      aria-label="Site navigation"
    >
      <nav className="mx-auto flex h-14 md:h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-white/90 hover:text-white font-semibold">
          GazaarY
        </Link>

        <ul className="flex items-center gap-6">
          <li>
            <a
              href="#koa"
              className={[
                "text-sm md:text-base",
                "text-white/85 hover:text-white underline-offset-8",
                solid ? "hover:underline" : "no-underline",
              ].join(" ")}
            >
              KOA
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={[
                "text-sm md:text-base",
                "text-white/85 hover:text-white underline-offset-8",
                solid ? "hover:underline" : "no-underline",
              ].join(" ")}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={[
                "text-sm md:text-base",
                "text-white/85 hover:text-white underline-offset-8",
                solid ? "hover:underline" : "no-underline",
              ].join(" ")}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
