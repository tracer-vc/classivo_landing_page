import { PhoneFrame } from "@/components/device/DeviceFrames";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { loop } from "@/config/content";
import { mockups } from "@/lib/mockups";

const screens = [mockups.eintragen, mockups.nachDerSchule, mockups.profil];

export function Loop() {
  return (
    <section id="so-gehts" aria-labelledby="loop-title" className="mx-auto max-w-6xl px-8 py-20 md:px-6 md:py-28">
      <SectionHeading id="loop-title" eyebrow={loop.eyebrow} title={loop.title} align="center" />

      <ol className="mt-12 grid gap-14 md:grid-cols-3 md:gap-8">
        {loop.steps.map((step, i) => (
          <li key={step.title} className="flex flex-col items-center text-center">
            <div className="flex items-center gap-3">
              <span className="grid aspect-square h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-lg font-extrabold text-white">
                {i + 1}
              </span>
              <h3 className="text-xl font-extrabold">
                <span aria-hidden className="mr-1">{step.emoji}</span>
                {step.title}
              </h3>
            </div>
            <p className="mt-3 max-w-sm leading-relaxed text-ink-muted md:mb-8">{step.text}</p>
            <PhoneFrame mockup={screens[i]} className="mt-8 w-[68%] max-w-[15rem] md:mt-auto md:w-[80%]" sizes="(min-width: 768px) 240px, 60vw" />
          </li>
        ))}
      </ol>
    </section>
  );
}
