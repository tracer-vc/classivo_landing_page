import { PhoneFrame } from "@/components/device/DeviceFrames";
import { Pill } from "@/components/ui/Pill";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { grades } from "@/config/content";
import { mockups } from "@/lib/mockups";

export function Grades() {
  return (
    <section id="noten" aria-labelledby="grades-title" className="bg-surface">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-8 py-20 md:grid-cols-2 md:gap-16 md:px-6 md:py-28">
        <div>
          <SectionHeading id="grades-title" eyebrow={grades.eyebrow} title={grades.title}>
            <p>{grades.text}</p>
          </SectionHeading>

          {/* Beispielrechnung im Karten-Look der App */}
          <div className="mt-7 rounded-3xl border border-line bg-bg p-5">
            <p className="font-extrabold">🧬 Biologie</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-line bg-surface p-3">
                <p className="text-xs font-bold text-ink-muted">Aktuell</p>
                <p className="text-3xl font-extrabold">2,7</p>
              </div>
              <div className="rounded-2xl border-2 border-accent/40 bg-surface p-3">
                <p className="text-xs font-bold text-ink-muted">Ziel Halbjahr</p>
                <p className="text-3xl font-extrabold text-accent">2,0</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-reward-line bg-reward-soft p-3">
              <div>
                <p className="text-xs font-bold text-[#7a5200]">Nächster Test · in 7 Tagen</p>
                <p className="text-sm font-extrabold">Du brauchst eine</p>
              </div>
              <div className="text-right">
                <p className="text-3xl leading-none font-extrabold">1</p>
                <p className="text-[10px] font-extrabold uppercase text-[#b07400]">wird knapp</p>
              </div>
            </div>
            <p className="mt-3 text-sm font-semibold text-ink-muted">💡 Tipp: Gib im Test alles und hol mündlich auf.</p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {grades.statuses.map((s) => (
              <Pill key={s.label} tone={s.tone}>{s.label}</Pill>
            ))}
          </div>
          <p className="mt-3 text-sm text-ink-muted">{grades.note}</p>
        </div>

        <div className="flex items-start justify-center gap-4">
          <PhoneFrame mockup={mockups.notenUebersicht} className="w-[72%] max-w-[17rem] md:w-[48%] md:max-w-[15rem] md:-rotate-2 md:mt-10" sizes="(min-width: 768px) 240px, 72vw" />
          <PhoneFrame mockup={mockups.fachDetail} className="hidden md:block md:w-[48%] md:max-w-[15rem] md:rotate-2" sizes="240px" />
        </div>
      </div>
    </section>
  );
}
