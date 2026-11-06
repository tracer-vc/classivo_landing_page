import { PhoneFrame } from "@/components/device/DeviceFrames";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gamification } from "@/config/content";
import { mockups } from "@/lib/mockups";

export function Gamification() {
  return (
    <section id="spiel" aria-labelledby="game-title" className="mx-auto max-w-6xl px-8 py-20 md:px-6 md:py-28">
      <SectionHeading id="game-title" eyebrow={gamification.eyebrow} title={gamification.title} align="center" />

      <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
        {gamification.features.map((f) => (
          <li key={f.title} className="flex items-start gap-3.5 rounded-3xl border border-line bg-surface p-4 sm:block md:p-6">
            <p className="shrink-0 text-2xl leading-none sm:leading-normal" aria-hidden>{f.emoji}</p>
            <div>
              <h3 className="text-lg leading-tight font-extrabold sm:mt-2 sm:leading-normal">{f.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{f.text}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Level-Leiste */}
      <div className="mt-10 rounded-3xl border border-reward-line bg-reward-soft p-5 md:p-7">
        <h3 className="font-extrabold">⭐ Level hoch, Outfits frei</h3>
        <ol className="no-scrollbar -mx-1 mt-4 flex snap-x gap-3 overflow-x-auto px-1 pb-1">
          {gamification.levels.map((l) => (
            <li key={l.level} className="min-w-[8.5rem] flex-1 snap-start rounded-2xl border border-reward-line bg-surface p-4 text-center">
              <p className="text-3xl" aria-hidden>{l.emoji}</p>
              <p className="mt-1 font-extrabold">Level {l.level}</p>
              <p className="text-sm font-semibold text-ink-muted">{l.unlock}</p>
              <p className="mt-2 inline-block rounded-full bg-reward-soft px-2.5 py-0.5 text-xs font-extrabold text-[#8a5a00]">ab {l.xp} XP</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Avatar: personalisieren, leveln, ausrüsten */}
      <div className="mt-16 grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h3 className="text-2xl leading-tight font-extrabold text-balance md:text-3xl">{gamification.avatar.title}</h3>
          <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-muted">{gamification.avatar.text}</p>
          <ul className="mt-6 space-y-3">
            {gamification.avatar.points.map((p) => (
              <li key={p.title} className="flex items-start gap-3.5 rounded-2xl border border-line bg-surface p-4">
                <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-reward-soft text-xl">
                  {p.emoji}
                </span>
                <div>
                  <p className="font-extrabold">{p.title}</p>
                  <p className="text-sm leading-relaxed text-ink-muted">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-start justify-center gap-4">
          <PhoneFrame mockup={mockups.profil} className="w-[72%] max-w-[17rem] md:w-[48%] md:max-w-[15rem] md:-rotate-2" sizes="(min-width: 768px) 240px, 72vw" />
          <PhoneFrame mockup={mockups.avatarBauen} className="hidden md:block md:w-[48%] md:max-w-[15rem] md:rotate-2 md:mt-10" sizes="240px" />
        </div>
      </div>
    </section>
  );
}
