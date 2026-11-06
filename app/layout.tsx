import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { brand } from "@/config/brand";
import "./globals.css";

// Wird beim Build selbst gehostet (kein Request an Google beim Besucher → DSGVO-freundlich)
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: brand.seo.title,
    template: `%s · ${brand.name}`,
  },
  description: brand.description,
  applicationName: brand.name,
  keywords: [...brand.seo.keywords],
  authors: [{ name: brand.name, url: brand.url }],
  creator: brand.name,
  publisher: brand.name,
  category: "education",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/",
    siteName: brand.name,
    title: `${brand.name} – ${brand.claim}`,
    description: brand.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} – ${brand.claim}`,
    description: brand.description,
  },
  appleWebApp: { title: brand.name, capable: true, statusBarStyle: "default" },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#fbf8f5",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${nunito.variable} antialiased`}>
      <body className="min-h-dvh font-sans text-[1.0625rem] font-medium">{children}</body>
    </html>
  );
}
