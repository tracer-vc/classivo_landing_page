import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { brand } from "@/config/brand";

export const alt = `${brand.name} – ${brand.claim}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Vorschaubild für Instagram, WhatsApp & Co. – wird beim Build erzeugt */
export default async function OpengraphImage() {
  // Satori kann kein WebP → PNG-Variante (erzeugt von `npm run mockups`) als Data-URI einbetten
  const avatars = await readFile(join(process.cwd(), "app/og-avatars.png"));
  const avatarsSrc = `data:image/png;base64,${avatars.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", background: "#fbf8f5", padding: 80, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 800, color: "#2a2726" }}>
            {brand.logo.main}
            <span style={{ color: "#e8564f" }}>{brand.logo.accent}</span>
          </div>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 800, color: "#2a2726", lineHeight: 1.05, marginTop: 28, letterSpacing: -2 }}>
            {brand.claim}
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#6e6964", marginTop: 24 }}>Hausaufgaben planen, XP sammeln, leveln.</div>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              marginTop: 40,
              background: "#e8564f",
              color: "white",
              fontSize: 32,
              fontWeight: 800,
              padding: "18px 36px",
              borderRadius: 24,
              boxShadow: "0 6px 0 #b83f39",
            }}
          >
            Jetzt Beta-Tester werden →
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={avatarsSrc} width={380} height={232} alt="" />
      </div>
    ),
    size,
  );
}
