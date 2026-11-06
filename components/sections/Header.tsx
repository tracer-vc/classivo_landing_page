import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-8 md:px-6">
        <Link href="/" className="text-2xl" aria-label="Zur Startseite">
          <Logo />
        </Link>
        <nav aria-label="Hauptnavigation" className="hidden items-center gap-6 text-[0.95rem] font-bold text-ink-muted lg:flex">
          <a href="#so-gehts" className="hover:text-ink">So geht&apos;s</a>
          <a href="#klausuren" className="hover:text-ink">Klausuren</a>
          <a href="#noten" className="hover:text-ink">Noten</a>
          <a href="#spiel" className="hover:text-ink">XP &amp; Avatar</a>
          <a href="#faq" className="hover:text-ink">FAQ</a>
        </nav>
      </div>
    </header>
  );
}
