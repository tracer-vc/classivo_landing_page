import "server-only";
import type { SignupInput, SurveyInput } from "@/lib/schema";

/**
 * Speichert Beta-Anmeldungen in Supabase (Tabelle public.beta_sign_ups).
 * Benötigt SUPABASE_URL + SUPABASE_SECRET_KEY. Fehlen sie, schlägt das Speichern sichtbar fehl.
 * Die Tabelle hat RLS ohne Policies: Nur der Secret Key (serverseitig) darf schreiben.
 */

export type NewSignup = {
  email: string;
  ageGroup: SignupInput["ageGroup"];
  parentEmail?: string;
  source?: string;
  consentText: string;
};

export type SurveyAnswers = Omit<SurveyInput, "token">;

export type AddResult = { ok: true; id: string } | { ok: true; duplicate: true } | { ok: false };

interface Store {
  add(s: NewSignup): Promise<AddResult>;
  saveSurvey(id: string, a: SurveyAnswers): Promise<boolean>;
}

/* ---------- Supabase (PostgREST) ---------- */

function supabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  return url && key ? { url: url.replace(/\/$/, ""), key } : null;
}

function supabaseStore(cfg: { url: string; key: string }): Store {
  // Neue Keys (sb_secret_…) gehören nur in den apikey-Header, nicht in Authorization.
  const headers = { apikey: cfg.key, "content-type": "application/json", accept: "application/json" };
  const table = `${cfg.url}/rest/v1/beta_sign_ups`;

  return {
    async add(s) {
      const res = await fetch(`${table}?on_conflict=email&select=id`, {
        method: "POST",
        headers: { ...headers, prefer: "return=representation,resolution=ignore-duplicates" },
        body: JSON.stringify({
          email: s.email,
          age_group: s.ageGroup,
          parent_email: s.parentEmail ?? null,
          source: s.source ?? null,
          consent_text: s.consentText,
        }),
        cache: "no-store",
      });
      if (!res.ok) {
        console.error("[beta] Supabase insert fehlgeschlagen", res.status, await res.text());
        return { ok: false };
      }
      const rows = (await res.json()) as { id: string }[];
      // Leeres Ergebnis = E-Mail existiert schon (ignore-duplicates)
      return rows[0] ? { ok: true, id: rows[0].id } : { ok: true, duplicate: true };
    },

    async saveSurvey(id, a) {
      const res = await fetch(`${table}?id=eq.${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { ...headers, prefer: "return=minimal" },
        body: JSON.stringify({
          grade: a.grade ?? null,
          state: a.state ?? null,
          devices: a.devices,
          mdm: a.mdm ?? null,
          problem: a.problem ?? null,
          survey_at: new Date().toISOString(),
        }),
        cache: "no-store",
      });
      if (!res.ok) console.error("[beta] Supabase update fehlgeschlagen", res.status, await res.text());
      return res.ok;
    },
  };
}

/* ---------- Auswahl ---------- */

function store(): Store | null {
  const cfg = supabaseConfig();
  if (cfg) return supabaseStore(cfg);
  console.error("[beta] SUPABASE_URL / SUPABASE_SECRET_KEY fehlen (.env.local bzw. Vercel) – Anmeldung wurde NICHT gespeichert");
  return null;
}

export async function addSignup(s: NewSignup): Promise<AddResult> {
  return (await store()?.add(s)) ?? { ok: false };
}

export async function saveSurvey(id: string, a: SurveyAnswers): Promise<boolean> {
  return (await store()?.saveSurvey(id, a)) ?? false;
}
