import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/ui/Logo";
import { Footer } from "@/components/sections/Footer";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <header className="border-b border-line bg-bg">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-8 md:px-6">
          <Link href="/" className="text-2xl" aria-label="Zur Startseite">
            <Logo />
          </Link>
          <Link href="/" className="text-sm font-extrabold text-accent">
            ← Zurück
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-8 py-12 md:px-6 md:py-16">
        <h1 className="text-4xl font-extrabold tracking-tight">{title}</h1>
        <div className="mt-8 space-y-4 leading-relaxed text-ink-muted [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-ink [&_li]:pl-1 [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}

/** Deutlich sichtbarer Platzhalter für noch fehlende Pflichtangaben */
export function Todo({ children }: { children: ReactNode }) {
  return <mark className="rounded bg-reward-soft px-1.5 py-0.5 font-bold text-[#8a5a00]">[TODO: {children}]</mark>;
}
