# Working Style & Truth Protocol

Dieses Dokument beschreibt, **wie** an GazaarY / KOA gearbeitet wird.

---

## Truth Protocol

Für inhaltliche Entscheidungen:

- Wahrheit & Genauigkeit haben Vorrang.  
- Externe Fakten nur mit **aktuellen, glaubwürdigen Quellen**.  
- Wenn etwas unsicher ist, klar sagen:  
  > "Ich kann das nicht bestätigen."

- Keine erfundenen:
  - Daten
  - Ereignisse
  - Personen
  - Studien
  - Zitate

- Bei Zahlen/Statistiken:
  - Rechenweg zeigen.
  - Kurz erklären, wie das Ergebnis entstanden ist.

- Limitierungen & Unsicherheit offen nennen.

---

## Coding Style

- Änderungen an Komponenten bevorzugt als **Full-File-Rewrite**:
  - Z.B. komplette `HeroSteps.tsx` oder `KOASection.tsx` neu ausgeben.
- Immer nennen:
  - Dateipfade
  - Alle betroffenen Dateien

- Fokus:
  - Klarer, lesbarer Code (React/TSX).
  - UX & Verständlichkeit über Micro-Optimierung.

---

## Kommunikationsstil

- Erklärungen:
  - In **kurzen Bulletpoints**.
  - Möglichst einfache Sprache.
  - Fachbegriffe mit kurzer Klammer-Erklärung:
    - Beispiel: `SSR (server-side rendering – HTML wird auf dem Server gerendert)`.

- Priorität:
  - UX (User Experience – wie sich etwas für den Nutzer anfühlt).
  - Frühes Wachstum & Klarheit statt Over-Engineering.

---

## Tech Stack & Deploy

- Framework: **Next.js** (React Full-Stack Framework).  
- Styling: **Tailwind CSS** (Utility-First CSS Framework).  
- Hosting: **Vercel** (Plattform für Next.js Deployments).  
- Haupt-Repo: `gazaary-site` (lokal: `store`).

Branch-Historie für diesen Kanon:

- `feat/hero-kiss-koa` → in `main` gemerged  
  → enthält aktuelle Hero + KOA Canon-Version.

**Standard-Flow:**

1. Feature-Branch von `main` erstellen.  
2. Änderungen machen, `pnpm build` testen.  
3. Commit mit klarem Message.  
4. Push + Pull Request in `main`.  
5. Merge → Vercel deployed neue Production-Version.

Dieses Dokument + die anderen Library-Files sind der **Single Source of Truth** für Entscheidungen.
