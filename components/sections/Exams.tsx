import { PhoneFrame } from "@/components/device/DeviceFrames";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { exams } from "@/config/content";
import { mockups } from "@/lib/mockups";

// Weiße Buchstaben auf kräftiger Farbe wie im Prototyp-Zeitstrahl (Grün / Blau von dort übernommen)
const letterColors = ["bg-accent text-white", "bg-[#3a8a45] text-white", "bg-[#2f55c4] text-white"];

export function Exams() {
  return (
    <section id="klausuren" aria-labelledby="exams-title" className="mx-auto max-w-6xl px-8 py-20 md:px-6 md:py-28">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="md:order-2">
          <SectionHeading id="exams-title" eyebrow={exams.eyebrow} title={exams.title}>
            <p>{exams.text}</p>
          </SectionHeading>
          <ol className="mt-7 space-y-3">
            {exams.phases.map((p, i) => (
              <li key={p.letter} className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-3.5">
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-lg font-extrabold ${letterColors[i]}`}>{p.letter}</span>
                <div>
                  <p className="font-extrabold">{p.title}</p>
                  <p className="text-sm text-ink-muted">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 rounded-2xl border border-reward-line bg-reward-soft px-4 py-3 text-sm font-bold text-[#7a5200]">🏁 {exams.finishDay}</p>
        </div>

        <div className="flex items-start justify-center gap-4 md:order-1">
          <PhoneFrame mockup={mockups.zeitstrahl} className="w-[72%] max-w-[17rem] md:w-[48%] md:max-w-[15rem] md:-rotate-2" sizes="(min-width: 768px) 240px, 72vw" />
          <PhoneFrame mockup={mockups.klausurDetail} className="hidden md:block md:w-[48%] md:max-w-[15rem] md:rotate-2 md:mt-10" sizes="240px" />
        </div>
      </div>
    </section>
  );
}
