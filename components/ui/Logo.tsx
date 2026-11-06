import { brand } from "@/config/brand";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-extrabold tracking-tight ${className}`}>
      {brand.logo.main}
      <span className="text-accent">{brand.logo.accent}</span>
    </span>
  );
}

export function AppIcon({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-grid place-items-center rounded-[28%] bg-accent font-extrabold text-white ${className}`}
    >
      {brand.iconLetter}
    </span>
  );
}
