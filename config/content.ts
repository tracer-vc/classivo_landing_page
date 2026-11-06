/**
 * Alle Texte der Landing Page an einem Ort, damit sie ohne Code-Wissen angepasst werden können.
 * Quelle: docs/konzeptpapier/konzeptpapier.md
 *
 * Achtung: Die Zahlen auf den Reaktions-Screens im Prototyp (z. B. „0,6 Noten besser“)
 * sind Platzhalter und dürfen hier NICHT verwendet werden.
 */

export const hero = {
  title: "Mach Schule zum Spiel.",
  subtitle:
    "Die App, die deine Hausaufgaben für dich plant. Eintragen in 5 Sekunden, XP für alles, was du schaffst.",
  cta: "Beta-Platz sichern",
  secondaryCta: "So funktioniert's",
  badges: ["Kostenlos", "Keine Werbung"],
};

/** Zahlen im „powered by“-Streifen unter dem Hero */
export const stats = [
  { value: "310.000", label: "folgen schule.tipps" },
  { value: "5 Sek.", label: "zum Eintragen" },
];

export const loop = {
  eyebrow: "So funktioniert's",
  title: "Einmal einrichten. Dann plant die App für dich.",
  steps: [
    {
      emoji: "✏️",
      title: "Eintragen",
      text: "Hausaufgabe oder Klausur rein, ein Tipp reicht. Kurz vor Ende jeder Stunde fragt die App von selbst.",
    },
    {
      emoji: "🗓️",
      title: "Die App plant",
      text: "Alles landet automatisch in deinen freien Lernzeiten, rechtzeitig vor der nächsten Stunde oder Klausur. Klappt was nicht, plant sie um.",
    },
    {
      emoji: "⚡",
      title: "Erledigen und leveln",
      text: "Abhaken, XP sammeln, Streak halten. Dein Avatar wächst mit, von der 5. Klasse bis zum Abschluss.",
    },
  ],
};

export const lessonEnd = {
  eyebrow: "Das Herzstück",
  title: "3 Minuten vor Stundenende fragt die App: Was ist auf?",
  text: "Du trägst die Hausaufgabe ein, solange sie noch an der Tafel steht. Die App plant sie sofort in deine nächste freie Lernzeit. Probier's aus:",
  bullets: [
    "Bei Doppelstunden nur eine Mitteilung, am Ende des Blocks",
    "„Nichts auf“ zählt auch, ein Tipp und fertig",
    "Fächer wie Sport kannst du stummschalten",
    "Nach der Schule fragt die App nach, falls noch was fehlt",
  ],
};

export const exams = {
  eyebrow: "Klausuren",
  title: "Klausur eintragen. Lernplan steht.",
  text: "Für jede Klausur bekommst du automatisch einen Lernplan nach dem ZLA-System aus der schule.tipps-Masterclass, verteilt auf 7 Lerntage und abgestimmt aufs Fach.",
  phases: [
    { letter: "Z", title: "Zusammenfassen", text: "Den Stoff auf das Wichtigste bringen." },
    { letter: "L", title: "Lernen", text: "Active Recall und Brain Dumps statt stumpf Lesen." },
    { letter: "A", title: "Anwenden", text: "Übungsaufgaben und Altklausuren." },
  ],
  finishDay: "Am Tag vor der Klausur: Finish Day. Fest eingeplant.",
};

export const grades = {
  eyebrow: "Notenplaner",
  title: "Setz dir ein Ziel. Die App sagt dir, was du brauchst.",
  text: "Pro Fach ein Ziel fürs Halbjahr. Die App rechnet aus, welche Note du in der nächsten Prüfung brauchst, und gibt dir einen Tipp, wenn's knapp wird.",
  statuses: [
    { label: "machbar", tone: "success" },
    { label: "wird knapp", tone: "reward" },
    { label: "nicht mehr erreichbar", tone: "muted" },
  ] as const,
  note: "Noten 1–6 oder Punkte 0–15, je nach Bundesland und Klasse.",
};

export const gamification = {
  eyebrow: "Gamification",
  title: "Belohnt wird, was du tust. Nicht nur die Note.",
  features: [
    { emoji: "⚡", title: "XP", text: "Für jede erledigte Hausaufgabe und Lernsession. Direkt in der Schule eingetragen? +5 XP Sofort-Bonus." },
    { emoji: "🔥", title: "Streaks", text: "Wie bei Snapchat. Setz dir ein Ziel: 7, 14 oder 30 Tage am Stück." },
    { emoji: "🌱", title: "Fokus-Sessions", text: "Doppelte XP. Wer die App verlässt, verliert die XP der Session." },
    { emoji: "🏆", title: "Achievements", text: "Für geknackte Notenziele, durchgezogene Lernpläne und erste Schritte." },
    { emoji: "🎁", title: "Truhen", text: "Schaff deine Tagesquest und knack die Truhe. Drin: Outfits wie Mütze oder Schal." },
    { emoji: "🧑", title: "Avatar", text: "Wächst mit dir, von der 5. Klasse bis zum Abschluss. Jeder Erfolg macht ihn ein Stück mehr zu deinem." },
  ],
  levels: [
    { level: 2, xp: "100", unlock: "Brille", emoji: "👓" },
    { level: 3, xp: "300", unlock: "Kopfhörer", emoji: "🎧" },
    { level: 4, xp: "600", unlock: "Jacke", emoji: "🧥" },
    { level: 5, xp: "1.000", unlock: "Abi-Hut", emoji: "🎓" },
  ],
  avatar: {
    title: "Dein Avatar wächst mit dir.",
    text: "Kein Profilbild, sondern ein Charakter, der zu dir gehört. Alles, was du für die Schule schaffst, macht ihn stärker.",
    points: [
      { emoji: "🎨", title: "Bau ihn wie dich", text: "Aussehen, Haare, Style: Dein Avatar soll sich nach dir anfühlen." },
      { emoji: "⚡", title: "Level ihn hoch", text: "Jede erledigte Aufgabe bringt XP. Mit jedem Level wird er stärker." },
      { emoji: "🎒", title: "Rüste ihn aus", text: "Schalte Brille, Kopfhörer, Jacke oder Abi-Hut frei und zieh ihm an, was du dir verdient hast." },
      { emoji: "🌱", title: "Bleibt bei dir", text: "Von der 5. Klasse bis zum Abschluss. Er begleitet dich durch die ganze Schulzeit." },
    ],
  },
};

export const screenTime = {
  eyebrow: "Fokus",
  title: "Wie viel Zeit frisst dein Handy?",
  text: "Zieh den Regler auf deine Bildschirmzeit pro Tag.",
  outro: "Mit Fokus-Sessions holst du dir Zeit zurück und bekommst doppelte XP dafür.",
};

export const devices = {
  eyebrow: "iPad & iPhone",
  title: "In der Schule aufs iPad. Zuhause aufs iPhone.",
  text: "Im Unterricht liegt das iPad auf dem Tisch, das iPhone oft im Rucksack. Du trägst auf dem iPad ein und lernst zuhause am iPhone. Alles bleibt synchron.",
  more: "Android kommt später. Trag dich trotzdem ein, dann sagen wir dir Bescheid.",
};

/** Wortlaut der Einwilligung – wird so im Formular angezeigt UND mit jeder Anmeldung gespeichert (Nachweis). */
export const consentText = "Ich möchte Infos und die Einladung zur Beta per E-Mail bekommen. Abmelden geht jederzeit.";

export const beta = {
  eyebrow: "Beta",
  title: "Werde einer der ersten Beta-Tester.",
  text: "Wir bauen die App Schritt für Schritt, gemeinsam mit euch. Trag dich ein und wir schicken dir eine Einladung, sobald dein Platz frei ist.",
  perks: [
    "Als Erste·r testen, bevor's alle haben",
    "Mitbestimmen, welche Features als Nächstes kommen",
  ],
};

export const faq = [
  {
    q: "Was kostet die App?",
    a: "In der Beta ist die App komplett kostenlos, mit allen Funktionen.",
  },
  {
    q: "Wann geht's los?",
    a: "Wir laden die Beta-Tester in Wellen ein, Level für Level. Wer sich einträgt, bekommt eine E-Mail, sobald sein Platz frei ist.",
  },
  {
    q: "Gibt's die App auch für Android?",
    a: "Ja! iPhone und iPad sind zuerst dran, aber Android folgt kurz danach. Lange warten musst du also nicht. Trag dich am besten jetzt schon ein: Als Beta-Tester hilfst du uns direkt dabei, die Android-Version so zu bauen, dass sie wirklich zu dir passt.",
  },
  {
    q: "Funktioniert das auf meinem Schul-iPad?",
    a: "Das hängt von deiner Schule ab: Manche Schul-iPads sind verwaltet, dann kann man Apps nicht selbst installieren. Genau das wollen wir mit euch herausfinden.",
  },
  {
    q: "Was passiert mit meinen Daten?",
    a: "Wir nutzen deine E-Mail nur, um dich zur Beta einzuladen und dir Infos dazu zu schicken. Keine Werbung, keine Weitergabe. Abmelden geht jederzeit mit einem Klick.",
  },
];
