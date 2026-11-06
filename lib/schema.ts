import { z } from "zod";

export const STATES = [
  "Baden-Württemberg", "Bayern", "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hessen",
  "Mecklenburg-Vorpommern", "Niedersachsen", "Nordrhein-Westfalen", "Rheinland-Pfalz",
  "Saarland", "Sachsen", "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen",
  "Österreich", "Schweiz", "Anderes Land",
] as const;

export const GRADES = ["5", "6", "7", "8", "9", "10", "11", "12", "13"] as const;

export const DEVICES = ["iPad", "iPhone", "Android-Handy", "Android-Tablet", "Laptop", "Keins"] as const;

export const MDM_OPTIONS = {
  verwaltet: "Ja, die Schule installiert die Apps",
  eigenes: "Nein, ist mein eigenes",
  weiss_nicht: "Weiß nicht",
  kein_ipad: "Ich hab kein iPad",
} as const;

export const PROBLEMS = {
  vergessen: "Hausaufgaben vergessen",
  klausuren: "Klausuren zu spät lernen",
  handy: "Handy lenkt ab",
  noten: "Noten",
  anderes: "Anderes",
} as const;

const emailMsg = "Bitte gib eine gültige E-Mail-Adresse ein.";
/** erst normalisieren (Leerzeichen, Großschreibung), dann prüfen */
const email = () => z.string(emailMsg).trim().toLowerCase().max(254, emailMsg).pipe(z.email(emailMsg));

const keys = <T extends Record<string, string>>(o: T) => Object.keys(o) as [keyof T & string, ...(keyof T & string)[]];

/** „Bist du 16 oder älter?“ – ab16 = ja, unter16 = nein (dann Eltern-E-Mail, DSGVO Art. 8) */
export const AGE_GROUPS = ["ab16", "unter16"] as const;
export type AgeGroup = (typeof AGE_GROUPS)[number];

const isAgeGroup = (v: unknown): v is AgeGroup => AGE_GROUPS.includes(v as AgeGroup);

/**
 * Schritt 1: Anmeldung (Pflicht).
 * Alle Felder werden in superRefine geprüft, damit sämtliche Fehler gleichzeitig angezeigt werden
 * (bei Basis-Fehlern würde zod die Querprüfungen sonst überspringen).
 */
export const signupSchema = z
  .object({
    email: z.string().optional(),
    ageGroup: z.string().optional(),
    parentEmail: z.string().optional(),
    consent: z.string().optional(),
    source: z.string().trim().max(64).optional(),
  })
  .superRefine((d, ctx) => {
    const own = email().safeParse(d.email ?? "");
    if (!own.success) ctx.addIssue({ code: "custom", path: ["email"], message: emailMsg });
    if (!isAgeGroup(d.ageGroup)) ctx.addIssue({ code: "custom", path: ["ageGroup"], message: "Bitte beantworte die Frage." });
    if (d.ageGroup === "unter16") {
      const parent = email().safeParse(d.parentEmail ?? "");
      if (!d.parentEmail) {
        ctx.addIssue({ code: "custom", path: ["parentEmail"], message: "Unter 16 brauchen wir die E-Mail eines Elternteils." });
      } else if (!parent.success) {
        ctx.addIssue({ code: "custom", path: ["parentEmail"], message: emailMsg });
      } else if (own.success && parent.data === own.data) {
        ctx.addIssue({ code: "custom", path: ["parentEmail"], message: "Das muss eine andere Adresse als deine sein." });
      }
    }
    if (d.consent !== "on") ctx.addIssue({ code: "custom", path: ["consent"], message: "Bitte bestätige die Einwilligung." });
  })
  .transform((d) => ({
    email: email().parse(d.email),
    ageGroup: d.ageGroup as AgeGroup,
    parentEmail: d.ageGroup === "unter16" ? email().parse(d.parentEmail) : undefined,
    source: d.source,
  }));

export type SignupInput = z.output<typeof signupSchema>;

/** Schritt 2: freiwillige Zusatzfragen */
export const surveySchema = z.object({
  token: z.string().min(10).max(600),
  grade: z.enum(GRADES).optional(),
  state: z.enum(STATES).optional(),
  devices: z.array(z.enum(DEVICES)).max(DEVICES.length).default([]),
  mdm: z.enum(keys(MDM_OPTIONS)).optional(),
  problem: z.enum(keys(PROBLEMS)).optional(),
});

export type SurveyInput = z.infer<typeof surveySchema>;
