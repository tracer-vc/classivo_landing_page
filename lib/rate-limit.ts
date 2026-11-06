import "server-only";

/**
 * Einfaches In-Memory-Rate-Limit pro IP (gilt pro Server-Instanz).
 * Reicht als erster Schutz; für mehrere Instanzen später z. B. Upstash/Vercel KV nehmen.
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 10_000) hits.clear(); // Speicher begrenzen
  return true;
}
