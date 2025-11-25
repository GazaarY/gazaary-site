# KOA Section – Canon Document

**Component:** `src/components/KOASection.tsx`  
**Status:** Canon (nur ändern, wenn dieses Dokument aktualisiert wird)  
**Origin:** Branch `feat/hero-kiss-koa` → in `main` gemerged

---

## Zweck

Die KOA Section:

- Positioniert **KitchenOpsAtelier (KOA)** als ernstzunehmendes digitales Werkzeug.  
- Verbindet:
  - Klare Copy links (Headline + Subline + 3 CTAs)
  - Interaktiven “Smart Surface” Tisch rechts (Lazy Susan mit Y-Core)

Sie soll sich anfühlen wie ein **ruhiges 3-Sterne-Kontrollpult**, nicht wie ein Spiel-Gimmick.

---

## Aufbau

### Linke Seite (Text)

- Heading: `KitchenOpsAtelier`
- Subline (DE):

  > Klarheit. Ordnung. Aktion. Dein Mise-en-Place für saubere Abläufe,  
  > ruhigen Pass und konstante Lieferung im Service.

- 3 CTAs:

  - **Setup starten** → `/koa/get-setup`  
  - **Demo testen** → `/play/lazy-susan`  
  - **Video ansehen** → `/#watch-video`

### Rechte Seite (Smart Surface)

- Kreistisch mit mehreren Ringen (Lazy Susan).
- Zentrum: GazaarY **Y-Core Logo** + Mode-Pills.
- Orbit: 6 “Plates” mit kurzen Labels.
- Klick auf Plate → öffnet **Booklet** (zweiseitige Karte) an dieser Position.

---

## Verhalten

- **Modes:**
  - `Benefits` und `Features`
  - Umschalten über Pills in der Mitte
  - Beim Wechsel: Orbit rotiert leicht um **±18°**
    - Bestätigung, kein Glücksspiel-Effekt

- **Booklets:**
  - Zwei Seiten:
    - Linke Seite: Badge (Benefit/Feature) + Titel
    - Rechte Seite: Beschreibung
  - Animation klappt nach außen auf, bleibt aber:
    - Gut lesbar
    - Klar verankert am Tisch

- **Symmetrie:**
  - Linke und rechte Booklets sind **spiegelbildlich**:
    - Gleicher Abstand vom Zentrum
    - Kein Booklet ragt in den Hero-Textbereich hinein.

- **Responsives Verhalten:**
  - Auf kleineren Screens:
    - Tisch wird kleiner skaliert.
    - Äußere Halo-Intensität leicht reduziert.
    - Booklets bleiben vollständig sichtbar und lesbar.

---

## Copy-Canon

- Sprache: **Deutsch**, mit Küchen- / Brigade-Vokabular.
- Ziele:
  - Echte Begriffe aus Küche und Service (Pass, Brigade, Mise-en-Place, Service-Limits, etc.).
  - Ton: wie eine Chef-Anweisung, nicht wie generische SaaS-Werbung.

Beim Ändern der Texte:

- Plate-Labels kurz halten (max. 2–3 Zeilen).
- In Booklets auf **schöne Zeilenumbrüche** achten:
  - Möglichst 3–4 Zeilen ähnlicher Länge.
  - Keine einzelnen Wörter allein in letzter Zeile, wenn vermeidbar.

---

## Visuelle Grenzen (nicht brechen)

Beibehalten:

- Y-Core Logo im Zentrum.
- **Glatte**, durchgehende Halo-Ringe (keine Segmente).
- Ruhige, dunkle Farbwelt (Nachtküche, nicht Spielhalle).
- 6 Plates gleichmäßig im Orbit.

Vermeiden:

- Tri-Lobe / Segment-Muster, die an Hazard/Biohazard erinnern.
- Starke, zufällige Rotation der gesamten Tischfläche.
- Zu grelle/neonartige Farben.

---

## Integration mit dem Hero

- KOA sitzt **direkt** unter der Hero Section.
- Booklets dürfen nicht in die linke Hero-Textzone hineinwandern.
- Visuelles Gewicht:
  - Tisch wirkt wichtig, aber nicht schwerer als der Hero.
  - Gefühl: “nächste Stufe” des gleichen Systems.

---

## Test-Checkliste vor Deploy

- [ ] Alle 3 CTAs verlinken korrekt.  
- [ ] Benefits/Features Toggle funktioniert, Orbit rotiert leicht.  
- [ ] Alle 6 Plates öffnen ein Booklet, Esc/Outside-Klick schließt es.  
- [ ] Linke/rechte Booklets wirken gespiegelt und sauber platziert.  
- [ ] Auf Mobile wird nichts abgeschnitten, Text bleibt gut lesbar.  
