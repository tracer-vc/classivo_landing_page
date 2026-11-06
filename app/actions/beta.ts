"use server";

import { headers } from "next/headers";
import { consentText } from "@/config/content";
import { rateLimit } from "@/lib/rate-limit";
import { signupSchema, surveySchema } from "@/lib/schema";
import { addSignup, saveSurvey as storeSurvey } from "@/lib/signups";
import { createToken, verifyToken } from "@/lib/token";

export type SignupState =
  | { status: "idle" }
  | { status: "error"; message?: string; fieldErrors?: Record<string, string>; values?: Record<string, string> }
  | { status: "success"; token: string; parentConsent: boolean }
  | { status: "duplicate" };

export type SurveyState = { status: "idle" } | { status: "error"; message: string } | { status: "success" };

const MIN_FILL_MS = 2500; // schneller ausgefüllt = sehr wahrscheinlich ein Bot

async function clientIp() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

export async function joinBeta(_prev: SignupState, formData: FormData): Promise<SignupState> {
  const raw = Object.fromEntries(
    ["email", "ageGroup", "parentEmail", "consent", "source"].map((k) => [k, formData.get(k) ?? undefined]),
  ) as Record<string, string | undefined>;
  const values = {
    email: raw.email ?? "",
    ageGroup: raw.ageGroup ?? "",
    parentEmail: raw.parentEmail ?? "",
  };

  // Spam-Schutz: Honeypot + Mindest-Ausfüllzeit. Bots bekommen eine Schein-Erfolgsmeldung.
  const honeypot = formData.get("website");
  const startedAt = Number(formData.get("startedAt"));
  if (honeypot || (startedAt && Date.now() - startedAt < MIN_FILL_MS)) {
    return { status: "success", token: "", parentConsent: false };
  }

  if (!rateLimit(`signup:${await clientIp()}`)) {
    return { status: "error", message: "Zu viele Versuche. Probier es in ein paar Minuten nochmal.", values };
  }

  const parsed = signupSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return { status: "error", fieldErrors, values };
  }

  const d = parsed.data;
  const result = await addSignup({
    email: d.email,
    ageGroup: d.ageGroup,
    parentEmail: d.parentEmail,
    source: d.source || undefined,
    consentText,
  });

  if (!result.ok) {
    return { status: "error", message: "Da ist was schiefgelaufen. Bitte versuch es gleich nochmal.", values };
  }
  if ("duplicate" in result) {
    return { status: "duplicate" };
  }

  return { status: "success", token: createToken(result.id), parentConsent: d.ageGroup === "unter16" };
}

export async function saveSurvey(_prev: SurveyState, formData: FormData): Promise<SurveyState> {
  const parsed = surveySchema.safeParse({
    token: formData.get("token"),
    grade: formData.get("grade") || undefined,
    state: formData.get("state") || undefined,
    devices: formData.getAll("devices"),
    mdm: formData.get("mdm") || undefined,
    problem: formData.get("problem") || undefined,
  });

  // Leeres Token = Bot-Pfad aus Schritt 1 → still „erfolgreich“
  if (formData.get("token") === "") return { status: "success" };
  if (!parsed.success) return { status: "error", message: "Bitte überprüf deine Angaben." };

  const signupId = verifyToken(parsed.data.token);
  if (!signupId) return { status: "error", message: "Die Sitzung ist abgelaufen. Deine Anmeldung ist aber gespeichert!" };

  if (!rateLimit(`survey:${await clientIp()}`)) {
    return { status: "error", message: "Zu viele Versuche. Probier es gleich nochmal." };
  }

  const { token: _token, ...answers } = parsed.data;
  void _token;
  const ok = await storeSurvey(signupId, answers);
  return ok ? { status: "success" } : { status: "error", message: "Konnte nicht gespeichert werden. Trotzdem danke!" };
}
