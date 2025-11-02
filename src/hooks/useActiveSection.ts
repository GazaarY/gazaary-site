// src/hooks/useActiveSection.ts
"use client";

import { useEffect, useRef, useState } from "react";

export function useActiveSection(
  sectionIds: string[],
  // keep current section active longer; switch later to the next:
  rootMargin = "-62% 0px -28% 0px"
) {
  const [active, setActive] = useState<string>(sectionIds[0] ?? "");
  const activeRef = useRef(active);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    if (!sectionIds || sectionIds.length === 0) return;

    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (els.length === 0) return;

    const visible = new Map<string, IntersectionObserverEntry>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = (e.target as HTMLElement).id;
          if (e.isIntersecting) visible.set(id, e);
          else visible.delete(id);
        }
        if (visible.size === 0) return;

        const top = [...visible.values()].sort((a, b) => {
          const diff = b.intersectionRatio - a.intersectionRatio;
          if (diff !== 0) return diff;
          const aIdx = sectionIds.indexOf((a.target as HTMLElement).id);
          const bIdx = sectionIds.indexOf((b.target as HTMLElement).id);
          return aIdx - bIdx;
        })[0];

        const topId = (top.target as HTMLElement).id;
        if (topId && topId !== activeRef.current) {
          activeRef.current = topId;
          setActive(topId);
        }
      },
      {
        // slightly denser thresholds smooths ratio changes
        threshold: [0, 0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
        root: null,
        rootMargin,
      }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sectionIds.join("|"), rootMargin]);

  return active;
}
