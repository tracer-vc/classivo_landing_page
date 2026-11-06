import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  align?: "left" | "center";
  id?: string;
};

export function SectionHeading({ eyebrow, title, children, align = "left", id }: Props) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-sm font-extrabold text-accent">{eyebrow}</p>
      <h2 id={id} className="mt-2 text-[1.75rem] leading-[1.15] font-extrabold tracking-tight text-balance md:text-4xl">
        {title}
      </h2>
      {children ? <div className="mt-3 text-[1.0625rem] leading-relaxed text-ink-muted">{children}</div> : null}
    </div>
  );
}
