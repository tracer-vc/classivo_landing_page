import type { ReactNode } from "react";

type Tone = "reward" | "success" | "accent" | "muted";

const tones: Record<Tone, string> = {
  reward: "bg-reward-soft text-[#8a5a00] border-reward-line",
  success: "bg-success-soft text-success border-success-line",
  accent: "bg-accent-soft text-accent border-transparent",
  muted: "bg-[#f3efeb] text-ink-muted border-line",
};

export function Pill({ tone = "reward", children, className = "" }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-extrabold whitespace-nowrap ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
