import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { brand } from "@/config/brand";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface pb-28 md:pb-0">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-8 py-10 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <Logo className="text-xl" />
          <p className="mt-1 text-sm font-semibold text-ink-muted">{brand.claim}</p>
        </div>
        <nav aria-label="Rechtliches" className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-ink-muted">
          <a href={brand.instagram.url} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
            Instagram
          </a>
          <a href={`mailto:${brand.contactEmail}`} className="hover:text-ink">
            Kontakt
          </a>
          <Link href="/impressum" className="hover:text-ink">
            Impressum
          </Link>
          <Link href="/datenschutz" className="hover:text-ink">
            Datenschutz
          </Link>
        </nav>
      </div>
    </footer>
  );
}
