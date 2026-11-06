import { SectionHeading } from "@/components/ui/SectionHeading";
import { faq } from "@/config/content";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="mx-auto max-w-3xl px-8 py-20 md:px-6 md:py-28">
      <SectionHeading id="faq-title" eyebrow="FAQ" title="Fragen? Antworten." align="center" />
      <div className="mt-10 space-y-3">
        {faq.map((item) => (
          <details key={item.q} className="group rounded-3xl border border-line bg-surface open:shadow-sm">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-extrabold [&::-webkit-details-marker]:hidden">
              {item.q}
              <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent-soft text-accent transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="px-5 pb-5 leading-relaxed text-ink-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
