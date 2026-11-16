# liv-learn

Lern-App für Klausuren: kurze Sessions mit Karten, Swipe statt Tippen, Leitner-Wiederholung (6 Boxen).
Läuft komplett statisch (auch als PWA aufs Handy), kein Server, keine KI-Aufrufe.
Der Lernstand liegt pro Gerät; Umziehen über **Mehr → Einstellungen → Export**.

## Start

```bash
npm install
npm run dev      # http://127.0.0.1:5180
npm run build    # apps/web/dist
npm test         # Vitest
```

## Inhalt hinzufügen

- Karten: `inhalt/karten/<track>/<thema-slug>.json` (Felder: id, track, thema, stufe 1–3, frage, antwort, quelle). id beginnt mit `<track>-`.
- Lernpfad: `inhalt/roadmap/<track>.json` (jedes Thema braucht Karten und umgekehrt).
- Themenbild (optional): `inhalt/bilder/themen/<track>-<thema-slug>.webp`, 4:3.
- Danach `npm run pruefen`. Tracks stehen in `packages/karten-kern/src/typen.ts` (`TRACKS`).

## Deployment (Vercel)

Repo auf vercel.com importieren. `vercel.json` setzt Build (`npm run build`) und Ausgabe (`apps/web/dist`) selbst.

## Lernstand

Kein Login. Der Lernstand liegt im Browser des Geräts (IndexedDB). Auf dem iPhone: Link in Safari öffnen, Teilen → **Zum Home-Bildschirm**,
dann bleibt der Stand dauerhaft erhalten (Safari löscht Webdaten im normalen Tab nach 7 Tagen ohne Nutzung, die Home-Bildschirm-App nicht).
Geräte-Wechsel oder Backup: Mehr → Einstellungen → Export/Import.
