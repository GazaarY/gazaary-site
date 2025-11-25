# HeroSteps – Canon Document

**Component:** `src/components/HeroSteps.tsx`  
**Status:** Canon (nur ändern, wenn dieses Dokument aktualisiert wird)  
**Origin:** Branch `feat/hero-kiss-koa` → in `main` gemerged

---

## Zweck

Die Hero Section ist:

- Der **Einstieg** in GazaarY / KitchenOpsAtelier.  
- Die Bühne, die den Blick weiter zur KOA Section führt.  
- Dein stabiler Referenzpunkt für Portfolio und Kundenprojekte.

---

## Kernverhalten

- **3-Step Motion:**
  1. Step 1: Haupt-Headline + “Smoke” / Atmosphäre.
  2. Step 2: Brain-Fokus + zweite Zeile.
  3. Step 3: Finale Mischung (Smoke + Brain) mit stabilem Text.

- **“Kiss” in die KOA Section:**
  - Unter dem Hero beginnt direkt die KOA Section.
  - Kein Card-Seam / keine große Lücke dazwischen.
  - Hero + KOA wirken wie ein zusammenhängender Abschnitt.

- **Header-Verhalten:**
  - Navigation bleibt **immer hell**.
  - Kontrast wird über einen Top-Scrim/Gradient im Hero gesichert.
  - Keine alten “muting” / Farbwechsel-Experimente mehr.

---

## Design-Grenzen (nicht brechen)

Beibehalten:

- 3 Schritte der Animation (nicht auf ein statisches Bild reduzieren).
- Höhe ca. 62–82vh (min ~540px, max ~880px).
- Der “Kiss” zur KOA (keine sichtbare Lücke, kein Überlappen).

Erlaubt:

- Text-Copy anpassen.
- Timings leicht feinjustieren.
- Bild-Assets austauschen, solange:
  - Text gut lesbar bleibt.
  - Komposition ruhig und hochwertig wirkt.

Vermeiden:

- Neue Karten / Container zwischen Hero und KOA einbauen.
- Header-Logik komplizierter machen.
- Den Hero mit zu vielen CTA-Buttons überladen (KOA übernimmt unten).

---

## Assets

- Hero-Bilder liegen unter `public/assets/...`  
  (Dateinamen dürfen geändert werden, müssen dann in `HeroSteps.tsx` angepasst werden.)

---

## Test-Checkliste vor Deploy

- [ ] Desktop: 3-Step Sequenz läuft flüssig.
- [ ] Mobile: Höhe wirkt angenehm, nicht erdrückend.
- [ ] Scroll von Hero → KOA fühlt sich natürlich an.
- [ ] Header bleibt während der ganzen Hero-Sequenz gut lesbar.
