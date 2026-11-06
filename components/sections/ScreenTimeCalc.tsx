"use client";

import { useState, type CSSProperties } from "react";
import { screenTime } from "@/config/content";

const MIN = 1;
const MAX = 8;

/** Stunden pro Tag → volle Tage pro Jahr (3 h ≈ 46 Tage, wie im Onboarding) */
export function daysPerYear(hoursPerDay: number) {
  return Math.round((hoursPerDay * 365) / 24);
}

export function ScreenTimeCalc() {
  const [hours, setHours] = useState(3);
  const days = daysPerYear(hours);
  const fill = ((hours - MIN) / (MAX - MIN)) * 100;

  return (
    <section aria-labelledby="screen-title" className="bg-surface">
      <div className="mx-auto max-w-3xl px-8 py-20 text-center md:px-6 md:py-24">
        <p className="text-sm font-extrabold text-accent">{screenTime.eyebrow}</p>
        <h2 id="screen-title" className="mt-2 text-[1.75rem] leading-[1.15] font-extrabold tracking-tight text-balance md:text-4xl">
          {screenTime.title}
        </h2>
        <p className="mt-3 text-ink-muted">{screenTime.text}</p>

        <div className="mt-8 rounded-3xl border border-line bg-bg p-6 md:p-10">
          <p className="text-[5rem] leading-none font-extrabold tracking-tight text-accent tabular-nums md:text-[7rem]" aria-live="polite">
            {days}
          </p>
          <p className="mt-3 text-xl font-extrabold text-balance">
            {hours} {hours === 1 ? "Stunde" : "Stunden"} am Tag sind {days} Tage im Jahr.
          </p>

          <label htmlFor="screen-hours" className="sr-only">Bildschirmzeit in Stunden pro Tag</label>
          <input
            id="screen-hours"
            type="range"
            min={MIN}
            max={MAX}
            step={0.5}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="range-accent mt-8 w-full"
            style={{ "--fill": `${fill}%` } as CSSProperties}
          />
          <div className="mt-2 flex justify-between text-xs font-bold text-ink-muted">
            <span>{MIN} Std.</span>
            <span>{MAX} Std.</span>
          </div>
        </div>
        <p className="mt-6 font-semibold text-ink-muted">🌱 {screenTime.outro}</p>
      </div>
    </section>
  );
}
