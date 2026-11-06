// Erzeugt alle Favicons/App-Icons aus assets/icon.svg. Aufruf: npm run icons
//   app/icon.svg          → modernes Favicon (Browser-Tab, scharf in jeder Größe)
//   app/favicon.ico       → Fallback für ältere Browser (16/32/48 px)
//   app/apple-icon.png    → iOS-Homescreen (180 px, randlos – iOS rundet selbst ab)
//   public/icons/*.png    → Web-App-Manifest (192/512 px + "maskable" für Android)
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const src = path.join(root, "assets", "icon.svg");
const svg = await readFile(src, "utf8");

// Randlose Variante (ohne abgerundete Ecken) für iOS und Android
const fullBleed = svg.replace(/rx="[\d.]+"/, 'rx="0"');
// Maskable: Motiv auf 80 % verkleinert, damit Android es beim Zuschneiden nicht anschneidet
const maskable = fullBleed.replace(
  /(<rect[^>]*\/>)([\s\S]*)(<\/svg>)/,
  '$1<g transform="translate(6.4 6.4) scale(0.8)">$2</g>$3',
);

const png = (markup, size) =>
  sharp(Buffer.from(markup), { density: Math.max(72, size * 6) }).resize(size, size).png().toBuffer();

await mkdir(path.join(root, "public", "icons"), { recursive: true });

await copyFile(src, path.join(root, "app", "icon.svg"));
await writeFile(path.join(root, "app", "apple-icon.png"), await png(fullBleed, 180));
await writeFile(path.join(root, "public", "icons", "icon-192.png"), await png(svg, 192));
await writeFile(path.join(root, "public", "icons", "icon-512.png"), await png(svg, 512));
await writeFile(path.join(root, "public", "icons", "icon-maskable-512.png"), await png(maskable, 512));

// favicon.ico mit PNG-Einträgen (von allen aktuellen Browsern unterstützt)
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((s) => png(svg, s)));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserviert
header.writeUInt16LE(1, 2); // Typ: Icon
header.writeUInt16LE(images.length, 4);
const entries = [];
let offset = 6 + 16 * images.length;
images.forEach((img, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(sizes[i], 0); // Breite
  e.writeUInt8(sizes[i], 1); // Höhe
  e.writeUInt8(0, 2); // Palette
  e.writeUInt8(0, 3); // reserviert
  e.writeUInt16LE(1, 4); // Farbebenen
  e.writeUInt16LE(32, 6); // Bit pro Pixel
  e.writeUInt32LE(img.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += img.length;
  entries.push(e);
});
await writeFile(path.join(root, "app", "favicon.ico"), Buffer.concat([header, ...entries, ...images]));

console.log("Icons erzeugt: app/icon.svg, app/favicon.ico, app/apple-icon.png, public/icons/*.png");
