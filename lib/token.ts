import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Signiertes Token mit der ID der eben angelegten Anmeldung. So kann Schritt 2 (Zusatzfragen)
 * nur genau diese Zeile ergänzen – ohne eine ID vom Client ungeprüft zu übernehmen.
 */
function secret() {
  const s = process.env.SIGNUP_SECRET;
  if (!s && process.env.NODE_ENV === "production") {
    throw new Error("SIGNUP_SECRET fehlt (siehe .env.example)");
  }
  return s ?? "dev-only-secret";
}

const sign = (payload: string) => createHmac("sha256", secret()).update(payload).digest("base64url");

export function createToken(signupId: string) {
  const payload = Buffer.from(JSON.stringify({ i: signupId, t: Date.now() })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

const MAX_AGE_MS = 1000 * 60 * 60 * 24; // 24 h

/** Gibt die Anmelde-ID zurück oder null, wenn das Token ungültig/abgelaufen ist */
export function verifyToken(token: string): string | null {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const { i, t } = JSON.parse(Buffer.from(payload, "base64url").toString()) as { i: string; t: number };
    if (typeof i !== "string" || Date.now() - t > MAX_AGE_MS) return null;
    return i;
  } catch {
    return null;
  }
}
