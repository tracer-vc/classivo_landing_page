/**
 * Registry der Prototyp-Screens (optimierte Kopien aus docs/konzeptpapier/images,
 * erzeugt mit `npm run mockups`). Alt-Texte basieren auf den Beschreibungen im Konzeptpapier.
 */
export type Mockup = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

const phone = (name: string, alt: string): Mockup => ({
  src: `/mockups/${name}.webp`,
  width: 780,
  height: 1688,
  alt,
});

const tablet = (name: string, alt: string): Mockup => ({
  src: `/mockups/${name}.webp`,
  width: 1600,
  height: 1112,
  alt,
});

export const mockups = {
  willkommen: phone(
    "onboarding-01-willkommen",
    "Willkommens-Screen der App mit zwei Avataren und dem Claim „Mach Schule zum Spiel.“",
  ),
  ergebnis: phone(
    "stundenende-03-ergebnis",
    "Startseite in der Schule: Mitteilung „Geschichte endet um 13:10 – Was ist auf?“ über dem Stundenplan, darunter die heute eingetragenen Hausaufgaben mit geplanter Uhrzeit.",
  ),
  eintragen: phone(
    "stundenende-02-eintragen",
    "Hausaufgabe direkt aus der Mitteilung eintragen: Text „S. 112 Nr. 4“, geschätzte Dauer 30 Minuten, Button „Eintragen · +5 XP Bonus“.",
  ),
  nachDerSchule: phone(
    "startseite-01-nach-der-schule",
    "Startseite nach der Schule: Hausaufgaben-Check, Tagesquest mit Truhe und die geplanten Lernzeiten mit Start-Button.",
  ),
  profil: phone(
    "gamification-01-profil",
    "Profil mit Avatar, Level 2, Streak-Woche, Kleiderschrank mit freischaltbaren Outfits und Erfolgen.",
  ),
  avatarBauen: phone(
    "onboarding-02-avatar",
    "Avatar erstellen: „Bau dich selbst, Lena!“ – Mädchen oder Junge, Hautfarbe und Haarfarbe auswählen.",
  ),
  zeitstrahl: phone(
    "klausuren-01-zeitstrahl",
    "Klausuren-Zeitstrahl: alle Lerneinheiten Tag für Tag, farbig nach Fach, mit Zusammenfassen, Lernen, Anwenden und Finish Day.",
  ),
  klausurDetail: phone(
    "klausuren-02-detail",
    "Lernplan für einen Biologie-Test: Tag für Tag Zusammenfassen, Lernen und Anwenden mit Uhrzeit, am Ende ein Erfolg mit +20 XP.",
  ),
  notenUebersicht: phone(
    "noten-01-uebersicht",
    "Notenübersicht: kommende Prüfungen mit der benötigten Note, Notenschnitt und erreichte Ziele.",
  ),
  fachDetail: phone(
    "noten-02-fach-detail",
    "Notenplaner Biologie: aktuell 2,7, Ziel 2,0 – im nächsten Test wird eine 1 gebraucht, Status „wird knapp“.",
  ),
  stundenplanCheck: phone(
    "onboarding-07-stundenplan-check",
    "Stundenplan per Foto erkannt: die App fragt nur unsichere Kürzel nach, z. B. „Ph = Physik, passt?“.",
  ),
  plan: phone(
    "onboarding-11-persoenlicher-plan",
    "Persönlicher Plan nach dem Onboarding: Ziel, Erinnerung, Lernzeit, Klausuren-System, Streak-Ziel und XP-Prognose.",
  ),
  ipadSchule: tablet(
    "ipad-01-in-der-schule",
    "iPad-Ansicht in der Schule: Mitteilung zum Stundenende oben, Stundenplan links, eingetragene Hausaufgaben und erste Schritte rechts.",
  ),
  ipadKlausuren: tablet(
    "ipad-03-klausuren",
    "iPad-Ansicht Klausuren: der ganze Zeitstrahl auf einen Blick.",
  ),
} satisfies Record<string, Mockup>;
