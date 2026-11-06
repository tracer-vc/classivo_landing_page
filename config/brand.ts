/**
 * Zentrale Marken-Konfiguration. Ein Rebrand soll nur diese Datei (+ Assets) betreffen.
 * Name: Classivo (vorher Arbeitstitel „schule.app“).
 */
export const brand = {
  /** Vollständiger Name, z. B. für Titel und Texte */
  name: "Classivo",
  /** Logo in zwei Teilen: zweiter Teil wird in der Akzentfarbe gesetzt */
  logo: { main: "classivo", accent: "." },
  /** App-Icon-Buchstabe (wie in den Mitteilungen im Prototyp) */
  iconLetter: "c.",
  claim: "Mach Schule zum Spiel.",
  description:
    "Die gamifizierte Orga-App für Schüler: Hausaufgaben in 5 Sekunden eintragen, die App plant deine Lernzeiten, du sammelst XP. Jetzt Beta-Platz sichern.",
  /** Nur für Suchmaschinen (Browser-Tab-Titel, Google-Ergebnis) – nicht sichtbar auf der Seite */
  seo: {
    title: "Classivo – Hausaufgaben-App für Schüler: Mach Schule zum Spiel",
    keywords: [
      "Classivo",
      "Hausaufgaben App",
      "Hausaufgabenplaner",
      "Schul-App",
      "Lernplan Klausur",
      "Notenrechner",
      "Lern-App für Schüler",
      "Stundenplan App",
      "Gamification Lernen",
      "schule.tipps",
    ],
  },
  /** Öffentliche URL – über NEXT_PUBLIC_SITE_URL überschreibbar (z. B. für Preview-Deployments) */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://classivo.de",
  instagram: { handle: "schule.tipps", url: "https://www.instagram.com/schule.tipps/" },
  /** Vorläufig private Adresse – TODO: durch Firmen-Adresse ersetzen (siehe docs/TODO.md) */
  contactEmail: "jannistreiber@gmail.com",
  /** Anbieter laut Impressum (§ 5 DDG) und Verantwortlicher (DSGVO) – vorläufig Privatperson, später ggf. Firma */
  legal: {
    name: "Jannis Treiber",
    street: "Dammweg 88",
    zipCity: "69123 Heidelberg",
    country: "Deutschland",
  },
} as const;
