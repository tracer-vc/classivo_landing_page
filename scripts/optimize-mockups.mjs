// Wandelt die Original-Screens aus docs/konzeptpapier/images in schlanke WebP-Dateien
// für die Website um (public/mockups). Aufruf: npm run mockups
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const srcDir = path.join(root, "docs", "konzeptpapier", "images");
const outDir = path.join(root, "public", "mockups");

await mkdir(outDir, { recursive: true });
const files = (await readdir(srcDir)).filter((f) => f.endsWith(".png"));

for (const file of files) {
  const isTablet = file.startsWith("ipad-");
  const out = path.join(outDir, file.replace(/\.png$/, ".webp"));
  const info = await sharp(path.join(srcDir, file))
    .resize({ width: isTablet ? 1600 : 780, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(out);
  console.log(`${file} → ${path.basename(out)} (${info.width}×${info.height}, ${Math.round(info.size / 1024)} KB)`);
}

// Avatare aus dem Willkommens-Screen freistellen (Hintergrund #FBF8F5 → transparent)
const { data, info } = await sharp(path.join(srcDir, "onboarding-01-willkommen.png"))
  .extract({ left: 140, top: 85, width: 500, height: 300 })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
for (let i = 0; i < data.length; i += 4) {
  const d = Math.abs(data[i] - 251) + Math.abs(data[i + 1] - 248) + Math.abs(data[i + 2] - 245);
  if (d < 10) data[i + 3] = 0;
  else if (d < 18) data[i + 3] = Math.round((255 * (d - 10)) / 8);
}
const avatars = sharp(data, { raw: info }).trim();
await avatars.clone().webp({ quality: 90 }).toFile(path.join(outDir, "avatars.webp"));
// PNG-Variante für das OG-Bild (Satori kann kein WebP)
await avatars.clone().png().toFile(path.join(root, "app", "og-avatars.png"));
console.log("avatars.webp + app/og-avatars.png erzeugt");
