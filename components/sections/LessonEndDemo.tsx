"use client";

import { useEffect, useRef, useState } from "react";
import { PhoneFrame } from "@/components/device/DeviceFrames";
import { AppIcon } from "@/components/ui/Logo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brand } from "@/config/brand";
import { lessonEnd } from "@/config/content";

type Phase = "waiting" | "notified" | "editing" | "saved" | "nothing";

const lessons = [
  { n: 1, time: "8:00", name: "Mathe", emoji: "📐", bg: "bg-subject-mathe" },
  { n: 2, time: "8:45", name: "Mathe", emoji: "📐", bg: "bg-subject-mathe" },
  { n: 3, time: "9:50", name: "Deutsch", emoji: "📖", bg: "bg-subject-deutsch", current: true },
  { n: 4, time: "10:35", name: "Englisch", emoji: "🇬🇧", bg: "bg-subject-englisch" },
  { n: 5, time: "11:40", name: "Biologie", emoji: "🧬", bg: "bg-subject-biologie" },
  { n: 6, time: "12:25", name: "Geschichte", emoji: "📜", bg: "bg-subject-geschichte" },
];

const durations = ["10 Min.", "15 Min.", "30 Min.", "45 Min.", "1 Std."];

export function LessonEndDemo() {
  const [phase, setPhase] = useState<Phase>("waiting");
  const [text, setText] = useState("S. 112 Nr. 4");
  const [duration, setDuration] = useState("30 Min.");
  const [xp, setXp] = useState(80);
  const ref = useRef<HTMLDivElement>(null);

  // Mitteilung kommt, sobald die Demo ins Bild scrollt
  useEffect(() => {
    if (phase !== "waiting") return;
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => setPhase("notified"), 900);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [phase]);

  const save = () => {
    setPhase("saved");
    setXp((v) => v + 5);
  };

  const reset = () => {
    setText("S. 112 Nr. 4");
    setDuration("30 Min.");
    setXp(80);
    setPhase("waiting");
  };

  const lessonDone = phase === "saved" || phase === "nothing";

  return (
    <section id="stundenende" aria-labelledby="demo-title" className="bg-surface">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-8 py-20 md:grid-cols-2 md:gap-16 md:px-6 md:py-28">
        <div>
          <SectionHeading id="demo-title" eyebrow={lessonEnd.eyebrow} title={lessonEnd.title}>
            <p>{lessonEnd.text}</p>
          </SectionHeading>
          <ul className="mt-6 space-y-3">
            {lessonEnd.bullets.map((b) => (
              <li key={b} className="flex gap-3 font-semibold">
                <span aria-hidden className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-success-soft text-sm text-success">✓</span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div ref={ref} className="mx-auto w-full max-w-[20rem]">
          <PhoneFrame>
            <div className="relative flex h-full flex-col text-ink" aria-live="polite">
              {/* Kopfzeile */}
              <div className="flex items-center justify-between px-4 pt-4">
                <span className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] font-extrabold">
                  ⭐ Lvl 1
                  <span className="relative h-1.5 w-10 overflow-hidden rounded-full bg-line">
                    <span className="absolute inset-y-0 left-0 rounded-full bg-reward transition-all duration-700" style={{ width: `${xp}%` }} />
                  </span>
                  <span className="text-ink-muted">{xp} XP</span>
                </span>
                <span className="rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] font-extrabold">🔥 3</span>
              </div>
              <p className="mt-3 px-4 text-center text-[11px] font-extrabold text-accent">Heute</p>
              <p className="px-4 text-center text-sm font-extrabold">Montag, 12. Oktober</p>

              {/* Stundenplan */}
              <ol className="mt-3 space-y-1.5 px-3">
                {lessons.map((l) => {
                  const isCurrent = l.current && !lessonDone;
                  const past = l.n < 3 || (l.current && lessonDone);
                  return (
                    <li key={l.n} className="flex items-center gap-2">
                      <span className={`w-8 text-right text-[9px] leading-tight font-bold ${isCurrent ? "text-accent" : "text-ink-faint"}`}>
                        {l.n}.<br />
                        {l.time}
                      </span>
                      <div
                        className={`flex-1 rounded-xl ${l.bg} px-2.5 ${
                          isCurrent ? "border-2 border-progress/50 py-2" : "border border-black/[0.04] py-1.5"
                        } ${past && !isCurrent ? "opacity-60" : ""}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`font-extrabold ${isCurrent ? "text-sm" : "text-xs"}`}>
                            <span aria-hidden>{l.emoji}</span> {l.name}
                          </span>
                          {l.current && phase === "saved" ? (
                            <span className="animate-pop rounded-full bg-surface px-1.5 py-0.5 text-[9px] font-extrabold text-success">✏️ eingetragen</span>
                          ) : null}
                          {l.current && phase === "nothing" ? (
                            <span className="animate-pop rounded-full bg-surface px-1.5 py-0.5 text-[9px] font-extrabold text-ink-muted">✓ nichts auf</span>
                          ) : null}
                        </div>
                        {isCurrent ? (
                          <div className="mt-1.5 flex items-center gap-2 text-[9px] font-extrabold text-progress">
                            JETZT
                            <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-surface">
                              <span className="absolute inset-y-0 left-0 w-[93%] rounded-full bg-progress" />
                            </span>
                            bis 10:35
                          </div>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ol>

              {/* Ergebnis-Karte */}
              {phase === "saved" ? (
                <div className="mx-3 mt-3 animate-fade-up rounded-2xl border border-success-line bg-success-soft p-3">
                  <p className="text-xs font-extrabold text-success">✏️ Heute in der Schule eingetragen</p>
                  <p className="mt-1.5 flex justify-between text-[11px] font-semibold">
                    <span className="truncate">📖 Deutsch · {text || "Hausaufgabe"}</span>
                    <span className="shrink-0 pl-2 text-ink-muted">→ Heute 16:00</span>
                  </p>
                  <p className="mt-0.5 text-[10px] font-semibold text-ink-muted">{duration} · in deiner Lernzeit eingeplant</p>
                </div>
              ) : null}

              {/* Tagesquest */}
              <div className="mx-3 mt-3 flex items-center gap-2.5 rounded-2xl border border-reward-line bg-reward-soft p-3">
                <span className="text-xl" aria-hidden>🎁</span>
                <div className="flex-1">
                  <p className="text-[11px] font-extrabold">
                    Nach der Schule: {phase === "saved" ? "2 Aufgaben · 60 Min" : "1 Aufgabe · 30 Min"}
                  </p>
                  <div className="mt-1.5 flex gap-1">
                    <span className="h-1.5 flex-1 rounded-full bg-surface" />
                    {phase === "saved" ? <span className="h-1.5 flex-1 animate-pop rounded-full bg-surface" /> : null}
                  </div>
                </div>
              </div>

              {/* Toasts */}
              {phase === "saved" ? (
                <div className="absolute inset-x-3 bottom-16 animate-pop rounded-2xl border border-success-line bg-success-soft px-3 py-2.5 text-center text-xs font-extrabold text-success shadow-md">
                  ✏️ Eingetragen · Heute 16:00 · +5 XP Sofort-Bonus
                </div>
              ) : null}
              {phase === "nothing" ? (
                <div className="absolute inset-x-3 bottom-16 animate-pop rounded-2xl border border-line bg-surface px-3 py-2.5 text-center text-xs font-extrabold shadow-md">
                  👍 Alles klar, nichts auf. Zählt für deinen Check!
                </div>
              ) : null}

              {/* Tab-Bar */}
              <div className="absolute inset-x-3 bottom-3 flex items-center justify-around rounded-full border border-line bg-surface py-1.5 shadow-sm">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-accent-soft text-xs">🏠</span>
                <span className="text-xs opacity-50">📝</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-base font-extrabold text-white shadow-[0_2px_0_var(--color-accent-edge)]">+</span>
                <span className="text-xs opacity-50">📊</span>
                <span className="text-xs opacity-50">👤</span>
              </div>

              {/* Mitteilung */}
              {phase === "notified" || phase === "editing" ? (
                <div className="absolute inset-x-2 top-2 z-10 animate-notify rounded-[1.4rem] border border-line bg-surface p-3 shadow-[0_18px_40px_-12px_rgba(60,40,30,0.4)]">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-ink-muted">
                    <AppIcon className="h-4 w-4 text-[8px]" />
                    {brand.name.toUpperCase()} · jetzt
                  </div>
                  <p className="mt-1.5 text-sm font-extrabold">📖 Deutsch endet um 10:35</p>
                  <p className="text-xs font-semibold text-ink-muted">
                    {phase === "editing" ? "Trag es ein, solange es noch an der Tafel steht." : "Was ist auf? Tippe zum Eintragen."}
                  </p>

                  {phase === "editing" ? (
                    <form
                      className="mt-2.5 space-y-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        save();
                      }}
                    >
                      <label className="sr-only" htmlFor="demo-hw">Hausaufgabe</label>
                      <input
                        id="demo-hw"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        maxLength={40}
                        className="w-full rounded-xl border-2 border-accent bg-surface px-3 py-2 text-base font-bold outline-none sm:text-sm"
                        autoComplete="off"
                      />
                      <div className="flex flex-wrap gap-1" role="radiogroup" aria-label="Geschätzte Dauer">
                        {durations.map((d) => (
                          <button
                            type="button"
                            key={d}
                            role="radio"
                            aria-checked={duration === d}
                            onClick={() => setDuration(d)}
                            className={`rounded-full px-2 py-1 text-[10px] font-extrabold transition-colors ${
                              duration === d ? "bg-accent text-white" : "border border-line bg-surface text-ink-muted"
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => setPhase("nothing")} className="h-9 flex-1 rounded-xl border border-line bg-surface text-xs font-extrabold shadow-[0_2px_0_var(--color-line-strong)] active:translate-y-px">
                          Nichts auf
                        </button>
                        <button type="submit" className="h-9 flex-[1.4] rounded-xl bg-accent text-xs font-extrabold text-white shadow-[0_2px_0_var(--color-accent-edge)] active:translate-y-px">
                          Eintragen · +5 XP
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="mt-2.5 flex gap-2">
                      <button type="button" onClick={() => setPhase("nothing")} className="h-9 flex-1 rounded-xl border border-line bg-surface text-xs font-extrabold shadow-[0_2px_0_var(--color-line-strong)] active:translate-y-px">
                        Nichts auf
                      </button>
                      <button type="button" onClick={() => setPhase("editing")} className="relative h-9 flex-1 rounded-xl bg-accent text-xs font-extrabold text-white shadow-[0_2px_0_var(--color-accent-edge)] active:translate-y-px">
                        <span className="absolute inset-0 animate-ping rounded-xl bg-accent opacity-25" aria-hidden />
                        Eintragen
                      </button>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </PhoneFrame>

          <div className="mt-6 flex min-h-11 justify-center">
            {phase === "waiting" ? (
              <button type="button" onClick={() => setPhase("notified")} className="text-sm font-extrabold text-accent underline-offset-4 hover:underline">
                Mitteilung jetzt auslösen ⏱
              </button>
            ) : null}
            {lessonDone ? (
              <button type="button" onClick={reset} className="text-sm font-extrabold text-ink-muted underline-offset-4 hover:text-ink hover:underline">
                ↺ Nochmal ausprobieren
              </button>
            ) : null}
            {phase === "notified" || phase === "editing" ? (
              <p className="text-sm font-bold text-ink-muted">👆 Tipp auf die Mitteilung</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
