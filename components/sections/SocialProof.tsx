import { brand } from "@/config/brand";
import { stats } from "@/config/content";

export function SocialProof() {
  return (
    <section aria-label="Powered by schule.tipps" className="border-y border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-8 py-6 md:flex-row md:justify-center md:gap-0 md:px-6">
        <p className="flex items-center gap-2.5">
          <span className="text-sm font-bold text-ink-muted">powered by</span>
          <a
            href={brand.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-extrabold text-ink transition-colors hover:text-accent"
          >
            @{brand.instagram.handle}
          </a>
        </p>

        <dl className="grid w-full max-w-xs grid-cols-2 divide-x divide-line md:flex md:w-auto md:max-w-none md:divide-x-0">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center px-4 md:flex-row md:gap-2 md:border-l md:border-line md:px-8 md:first:ml-8">
              <dt className="text-sm font-semibold text-ink-muted">{s.label}</dt>
              <dd className="order-first text-2xl font-extrabold tracking-tight md:text-xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
