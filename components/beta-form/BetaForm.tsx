"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { joinBeta, saveSurvey, type SignupState, type SurveyState } from "@/app/actions/beta";
import { Button } from "@/components/ui/Button";
import { consentText } from "@/config/content";
import { DEVICES, GRADES, MDM_OPTIONS, PROBLEMS, STATES } from "@/lib/schema";

const input =
  "h-13 w-full rounded-2xl border-2 border-line bg-surface px-4 text-base font-semibold text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-accent aria-[invalid=true]:border-accent";

function chipClass(active: boolean) {
  return `inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full border-2 px-4 text-[0.95rem] font-extrabold transition-colors select-none has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-accent-soft ${
    active ? "border-accent bg-accent-soft text-accent" : "border-line bg-surface text-ink-muted hover:border-line-strong"
  }`;
}

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-bold text-accent">
      {msg}
    </p>
  );
}

/* ---------------- Schritt 1 ---------------- */

export function BetaForm() {
  const [state, action, pending] = useActionState<SignupState, FormData>(joinBeta, { status: "idle" });
  const startedAt = useRef(0);

  const prev = state.status === "error" ? state.values : undefined;
  const errors = state.status === "error" ? state.fieldErrors ?? {} : {};
  const [ageGroup, setAgeGroup] = useState(prev?.ageGroup ?? "");
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Ausfüllzeit (Spam-Schutz) und Quelle (?src=yfc / utm_source) erst beim Absenden ergänzen
  const submit = (fd: FormData) => {
    const p = new URLSearchParams(window.location.search);
    fd.set("startedAt", String(startedAt.current));
    fd.set("source", (p.get("src") ?? p.get("utm_source") ?? "").slice(0, 64));
    action(fd);
  };

  if (state.status === "success") {
    return <Success token={state.token} parentConsent={state.parentConsent} />;
  }
  if (state.status === "duplicate") {
    return (
      <div role="status" className="animate-pop rounded-3xl border border-success-line bg-success-soft p-6 text-center">
        <p className="text-4xl" aria-hidden>🙌</p>
        <p className="mt-2 text-xl font-extrabold text-success">Du bist schon auf der Liste!</p>
        <p className="mt-1 font-semibold text-ink-muted">Sobald dein Beta-Platz frei ist, bekommst du eine Einladung per Mail.</p>
      </div>
    );
  }

  return (
    <form action={submit} noValidate className="space-y-6">
      {/* Spam-Schutz */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="beta-email" className="mb-2 block font-extrabold">
          Deine E-Mail
        </label>
        <input
          id="beta-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="du@beispiel.de"
          defaultValue={prev?.email}
          required
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "err-email" : undefined}
          className={input}
        />
        <FieldError id="err-email" msg={errors.email} />
      </div>

      <fieldset aria-describedby={errors.ageGroup ? "err-age" : undefined}>
        <legend className="mb-2 font-extrabold">Bist du 16 oder älter?</legend>
        <div className="flex flex-wrap gap-2">
          {[
            ["ab16", "Ja"],
            ["unter16", "Nein, jünger"],
          ].map(([v, l]) => (
            <label key={v} className={chipClass(ageGroup === v)}>
              <input type="radio" name="ageGroup" value={v} checked={ageGroup === v} onChange={() => setAgeGroup(v)} className="sr-only" />
              {l}
            </label>
          ))}
        </div>
        <FieldError id="err-age" msg={errors.ageGroup} />
      </fieldset>

      {ageGroup === "unter16" ? (
        <div className="animate-fade-up rounded-3xl border border-reward-line bg-reward-soft p-4">
          <label htmlFor="beta-parent" className="mb-1 block font-extrabold">
            E-Mail eines Elternteils
          </label>
          <p className="mb-3 text-sm font-semibold text-[#7a5200]">
            Unter 16 müssen deine Eltern kurz zustimmen. Das ist Gesetz, nicht unsere Idee 😉 Bevor du einsteigst, holen wir uns per Mail ihr OK.
          </p>
          <input
            id="beta-parent"
            name="parentEmail"
            type="email"
            inputMode="email"
            autoComplete="off"
            placeholder="mama-oder-papa@beispiel.de"
            defaultValue={prev?.parentEmail}
            aria-invalid={!!errors.parentEmail}
            aria-describedby={errors.parentEmail ? "err-parent" : undefined}
            className={input}
          />
          <FieldError id="err-parent" msg={errors.parentEmail} />
        </div>
      ) : null}

      <div className="pt-4 sm:pt-0">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "err-consent" : undefined}
            className="mt-0.5 h-6 w-6 shrink-0 cursor-pointer rounded-md accent-[var(--color-accent)]"
          />
          <span className="text-sm leading-relaxed font-semibold text-ink-muted">
            {consentText} Mehr dazu in der{" "}
            <Link href="/datenschutz" className="font-extrabold text-ink underline underline-offset-2">
              Datenschutzerklärung
            </Link>
            .
          </span>
        </label>
        <FieldError id="err-consent" msg={errors.consent} />
      </div>

      {state.status === "error" && state.message ? (
        <p role="alert" className="rounded-2xl bg-accent-soft px-4 py-3 text-sm font-bold text-accent">
          {state.message}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? "Einen Moment …" : "Beta-Platz sichern 🚀"}
      </Button>
      <p className="text-center text-xs font-semibold text-ink-muted">Kostenlos · Keine Werbung · Keine Weitergabe deiner Daten</p>
    </form>
  );
}

/* ---------------- Erfolg + Schritt 2 ---------------- */

function Success({ token, parentConsent }: { token: string; parentConsent: boolean }) {
  const [state, action, pending] = useActionState<SurveyState, FormData>(saveSurvey, { status: "idle" });
  const [skipped, setSkipped] = useState(false);
  const [grade, setGrade] = useState("");
  const [devices, setDevices] = useState<string[]>([]);
  const [mdm, setMdm] = useState("");
  const [problem, setProblem] = useState("");

  const done = state.status === "success" || skipped;

  return (
    <div className="space-y-6" role="status" aria-live="polite">
      <div className="animate-pop rounded-3xl border border-success-line bg-success-soft p-5 text-center">
        <p className="text-4xl" aria-hidden>🎉</p>
        <p className="mt-2 text-xl font-extrabold text-success">Du bist auf der Liste!</p>
        <p className="mt-1 font-semibold text-ink-muted">
          {parentConsent
            ? "Bevor du einsteigst, schicken wir deinen Eltern eine Mail und holen uns ihr OK. Dann kommt deine Einladung."
            : "Sobald dein Beta-Platz frei ist, bekommst du eine Einladung per Mail."}
        </p>
      </div>

      {done ? (
        <div className="animate-fade-up rounded-3xl border border-reward-line bg-reward-soft p-5 text-center">
          <p className="text-3xl" aria-hidden>⭐</p>
          <p className="mt-1 text-lg font-extrabold">{state.status === "success" ? "Danke! Das hilft uns mega." : "Alles klar!"}</p>
          <p className="mt-1 text-sm font-semibold text-[#7a5200]">Zum Beta-Start wartet ein +50 XP Startbonus auf dich.</p>
        </div>
      ) : (
        <form action={action} className="animate-fade-up space-y-6">
          <input type="hidden" name="token" value={token} />
          <div>
            <p className="text-lg font-extrabold">Hilf uns noch kurz? 🙏</p>
            <p className="text-sm font-semibold text-ink-muted">Freiwillig, 4 Klicks. So bauen wir die App passend für dich.</p>
          </div>

          <fieldset>
            <legend className="mb-2 font-extrabold">Klasse</legend>
            <div className="flex flex-wrap gap-2">
              {GRADES.map((g) => (
                <label key={g} className={`${chipClass(grade === g)} min-w-11 px-0`}>
                  <input type="radio" name="grade" value={g} checked={grade === g} onChange={() => setGrade(g)} className="sr-only" />
                  {g}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="beta-state" className="mb-2 block font-extrabold">Bundesland / Land</label>
            <select id="beta-state" name="state" defaultValue="" className={`${input} appearance-none`}>
              <option value="">Bitte wählen</option>
              {STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <fieldset>
            <legend className="mb-2 font-extrabold">Welche Geräte nutzt du im Unterricht?</legend>
            <div className="flex flex-wrap gap-2">
              {DEVICES.map((d) => {
                const on = devices.includes(d);
                return (
                  <label key={d} className={chipClass(on)}>
                    <input
                      type="checkbox"
                      name="devices"
                      value={d}
                      checked={on}
                      onChange={() => setDevices((cur) => (on ? cur.filter((x) => x !== d) : [...cur, d]))}
                      className="sr-only"
                    />
                    {d}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 font-extrabold">Ist dein iPad von der Schule verwaltet?</legend>
            <div className="flex flex-wrap gap-2">
              {Object.entries(MDM_OPTIONS).map(([v, l]) => (
                <label key={v} className={chipClass(mdm === v)}>
                  <input type="radio" name="mdm" value={v} checked={mdm === v} onChange={() => setMdm(v)} className="sr-only" />
                  {l}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 font-extrabold">Was nervt dich an Schule am meisten?</legend>
            <div className="flex flex-wrap gap-2">
              {Object.entries(PROBLEMS).map(([v, l]) => (
                <label key={v} className={chipClass(problem === v)}>
                  <input type="radio" name="problem" value={v} checked={problem === v} onChange={() => setProblem(v)} className="sr-only" />
                  {l}
                </label>
              ))}
            </div>
          </fieldset>

          {state.status === "error" ? (
            <p role="alert" className="rounded-2xl bg-accent-soft px-4 py-3 text-sm font-bold text-accent">{state.message}</p>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="submit" size="lg" disabled={pending} className="w-full sm:flex-1">
              {pending ? "Speichern …" : "Abschicken"}
            </Button>
            <Button type="button" variant="secondary" size="lg" onClick={() => setSkipped(true)} className="w-full sm:w-auto">
              Überspringen
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
