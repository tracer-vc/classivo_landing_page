import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { brand } from "@/config/brand";

export const metadata: Metadata = { title: "Du bist dabei!", robots: { index: false, follow: false } };

/** Ziel-Seite nach Klick auf den Double-Opt-in-Link */
export default function Bestaetigt() {
  return (
    <main className="grid min-h-dvh place-items-center px-8 py-16">
      <div className="w-full max-w-md text-center">
        <Logo className="text-2xl" />
        <Image src="/mockups/avatars.webp" alt="" aria-hidden width={464} height={283} className="mx-auto mt-10 w-48 animate-float" />
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight">Du bist dabei! 🎉</h1>
        <p className="mt-3 text-lg text-ink-muted">
          Deine Anmeldung ist bestätigt. Sobald dein Beta-Platz frei ist, bekommst du eine Einladung per Mail.
        </p>
        <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-reward-line bg-reward-soft px-4 py-2 font-extrabold text-[#8a5a00]">
          ⭐ +50 XP Startbonus reserviert
        </div>
        <p className="mt-8 text-sm font-semibold text-ink-muted">
          Bis dahin: Folg uns auf{" "}
          <a href={brand.instagram.url} target="_blank" rel="noopener noreferrer" className="font-extrabold text-accent">
            @{brand.instagram.handle}
          </a>
        </p>
        <ButtonLink href="/" variant="secondary" className="mt-8">
          Zur Startseite
        </ButtonLink>
      </div>
    </main>
  );
}
