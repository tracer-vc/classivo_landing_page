# Classivo – Landing Page (Beta-Warteliste)

Mobile-first Landing Page zum Einsammeln von Beta-Testern. Design und Inhalte kommen aus dem Prototyp bzw. dem Konzeptpapier.

Interne Unterlagen (Konzeptpapier mit Screens, Entwicklungsplan, TODO-Liste) liegen lokal im Ordner `docs/` und sind bewusst **nicht** im Repository (siehe `.gitignore`). Bei Bedarf im Team direkt teilen.

## Loslegen

```bash
npm install
cp .env.example .env.local   # dann SUPABASE_SECRET_KEY eintragen
npm run dev                  # http://localhost:3000
```

Anmeldungen landen in der Supabase-Tabelle **`public.beta_sign_ups`** (Projekt `qffnjjmsjsamtdfufujf`). Ohne `SUPABASE_SECRET_KEY` schreibt die Seite lokal nach `.data/*.jsonl` (gitignored), in Produktion schlägt das Speichern dann fehl.

### Supabase

- Tabelle `beta_sign_ups`: RLS ist an, **ohne Policies**. Browser (Publishable Key) können nichts lesen oder schreiben. Nur der Server schreibt mit dem Secret Key.
- Doppelte E-Mails werden ignoriert (unique), der Nutzer sieht „Du bist schon auf der Liste“.
- Schritt 2 ergänzt dieselbe Zeile (`grade`, `state`, `devices`, `mdm`, `problem`, `survey_at`) über ein signiertes Token mit der Zeilen-ID.
- `confirmed_at` / `parent_confirmed_at` sind für das spätere Double-Opt-in vorbereitet, aber noch nicht umgesetzt.
- Die Supabase-MCP ist in `.mcp.json` eingetragen (nur dieses Projekt). Nach dem ersten Start mit `/mcp` einloggen.

| Befehl | Zweck |
|---|---|
| `npm run dev` | Entwicklungsserver |
| `npm run build` / `npm start` | Produktions-Build / -Server |
| `npm run lint` | ESLint |
| `npm run icons` | Favicon + App-Icons aus `assets/icon.svg` neu erzeugen |
| `npm run mockups` | Screens aus `docs/konzeptpapier/images` (nur lokal) → `public/mockups/*.webp` + Avatare freistellen. Die fertigen WebP-Dateien sind im Repo. |

## Wo ist was?

| Pfad | Inhalt |
|---|---|
| `config/brand.ts` | Name, Logo, Domain, Instagram, Kontakt. **Rebrand = nur diese Datei.** |
| `config/content.ts` | Alle Texte der Landing Page |
| `app/globals.css` | Design-Tokens (Farben, Animationen) |
| `components/sections/` | Die Abschnitte der Seite (Hero, Demo, Klausuren, Noten, …) |
| `components/sections/LessonEndDemo.tsx` | Interaktive Stundenende-Mitteilung (echte React-Komponente) |
| `components/beta-form/BetaForm.tsx` | Anmeldung (Schritt 1) + freiwillige Zusatzfragen (Schritt 2) |
| `app/actions/beta.ts` | Server Actions: Validierung, Spam-Schutz, Speichern |
| `lib/signups.ts` | Speichern in Supabase (REST, Secret Key) bzw. lokal in Dateien |
| `lib/schema.ts` | zod-Schemas + Auswahllisten (Bundesländer, Geräte, …) |
| `app/impressum`, `app/datenschutz` | **Platzhalter mit TODOs** – vor dem Livegang ausfüllen |
| `app/beta/bestaetigt` | Ziel-Seite nach dem Double-Opt-in-Link |

## Vor dem Livegang

1. Impressum und Datenschutz ausfüllen (alle `[TODO: …]`).
2. `SIGNUP_SECRET` setzen (Pflicht in Produktion).
3. `SUPABASE_URL` und `SUPABASE_SECRET_KEY` beim Hosting-Anbieter als Umgebungsvariablen setzen.
4. Bestätigungsmails (Double-Opt-in, Eltern-Einwilligung) sind noch **nicht** umgesetzt. Es geht aktuell keine E-Mail raus.
5. Domain `classivo.de` bei Vercel verbinden (`NEXT_PUBLIC_SITE_URL` ist standardmäßig `https://classivo.de`).
6. QR-Code für Events mit `?src=<quelle>` erzeugen, z. B. `https://classivo.de/?src=yfc`. Die Quelle wird mit der Anmeldung gespeichert.

## Hinweis: Laufwerk E: (exFAT)

Turbopack kann auf exFAT keine Junction-Links anlegen. Deshalb darf serverseitiger Code **keine nativen Pakete wie `sharp` importieren** (sharp wird nur im `mockups`-Skript benutzt). Das OG-Bild liest deshalb die vorab erzeugte Datei `app/og-avatars.png`.
