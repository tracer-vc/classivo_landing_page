import Image from "next/image";
import { BetaForm } from "@/components/beta-form/BetaForm";
import { beta } from "@/config/content";

export function BetaSection() {
  return (
    <section id="beta" aria-labelledby="beta-title" className="relative overflow-hidden bg-accent-soft/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-8 py-20 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:px-6 md:py-28">
        <div>
          <p className="text-sm font-extrabold text-accent">{beta.eyebrow}</p>
          <h2 id="beta-title" className="mt-2 text-[2rem] leading-[1.1] font-extrabold tracking-tight text-balance md:text-5xl">
            {beta.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">{beta.text}</p>
          <ul className="mt-6 space-y-3">
            {beta.perks.map((p) => (
              <li key={p} className="flex gap-3 font-bold">
                <span aria-hidden className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-xs text-white">✓</span>
                {p}
              </li>
            ))}
          </ul>
          <Image src="/mockups/avatars.webp" alt="" aria-hidden width={464} height={283} className="mt-10 hidden w-56 md:block" />
        </div>

        <div className="relative self-start rounded-3xl border border-line bg-surface p-5 shadow-[0_30px_60px_-30px_rgba(80,50,30,0.35)] sm:rounded-[2rem] sm:p-8">
          <BetaForm />
        </div>
      </div>
    </section>
  );
}
