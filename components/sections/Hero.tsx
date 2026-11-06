import Image from "next/image";
import { PhoneFrame } from "@/components/device/DeviceFrames";
import { ButtonLink } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { hero } from "@/config/content";
import { mockups } from "@/lib/mockups";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* weiche Farbflächen im Hintergrund */}
      <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent-soft blur-3xl md:h-[28rem] md:w-[28rem]" />
      <div aria-hidden className="pointer-events-none absolute top-[28rem] -left-28 h-64 w-64 rounded-full bg-reward-soft blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-28 px-8 pt-10 pb-16 md:grid-cols-[1.1fr_0.9fr] md:gap-8 md:px-6 md:pt-20 md:pb-24">
        {/* Desktop: Text sitzt in der Mitte des sichtbaren Bildschirms statt in der Mitte des (hohen) Handys */}
        <div className="animate-fade-up md:mt-[max(0px,calc(50svh-17.5rem))] md:self-start">
          <h1 id="hero-title" className="text-[2.6rem] leading-[1.02] font-extrabold tracking-tight text-balance sm:text-5xl md:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted md:text-xl">{hero.subtitle}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#beta" size="lg" className="w-full sm:w-auto">
              {hero.cta} <span aria-hidden>→</span>
            </ButtonLink>
            <ButtonLink href="#so-gehts" variant="secondary" size="lg" className="w-full sm:w-auto">
              {hero.secondaryCta}
            </ButtonLink>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold text-ink-muted">
            {hero.badges.map((b) => (
              <li key={b} className="flex items-center gap-1.5">
                <span aria-hidden className="text-success">✓</span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[19rem] md:max-w-[18.5rem]">
          <Image
            src="/mockups/avatars.webp"
            alt=""
            width={464}
            height={283}
            aria-hidden
            className="absolute -top-[4.6rem] left-1/2 z-0 w-40 -translate-x-1/2 animate-float md:-top-[5.2rem] md:w-44"
          />
          <PhoneFrame mockup={mockups.ergebnis} priority className="z-10 rotate-[2deg]" />
          <div className="absolute top-[46%] -left-6 z-10 animate-pop [animation-delay:600ms] md:-left-14">
            <Pill tone="success" className="px-4 py-2 text-[0.95rem] shadow-lg">✏️ +5 XP Sofort-Bonus</Pill>
          </div>
          <div className="absolute -right-3 bottom-24 z-10 animate-pop [animation-delay:900ms] md:-right-10">
            <Pill tone="reward" className="px-4 py-2 text-[0.95rem] shadow-lg">🔥 14 Tage Streak</Pill>
          </div>
        </div>
      </div>
    </section>
  );
}
