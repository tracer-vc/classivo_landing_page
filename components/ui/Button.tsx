import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-2xl font-extrabold transition-[transform,box-shadow,background-color] duration-100 select-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-soft active:translate-y-[3px] disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-[0_4px_0_var(--color-accent-edge)] active:shadow-[0_1px_0_var(--color-accent-edge)] hover:brightness-[1.04]",
  secondary:
    "bg-surface text-ink border border-line shadow-[0_4px_0_var(--color-line-strong)] active:shadow-[0_1px_0_var(--color-line-strong)] hover:bg-[#fffdfb]",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-5 text-base",
  lg: "h-14 px-7 text-lg",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant; size?: Size };

export function Button({ variant = "primary", size = "md", className = "", ...props }: ButtonProps) {
  return <button className={buttonClass(variant, size, className)} {...props} />;
}

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export function ButtonLink({ href, variant = "primary", size = "md", className = "", children, ...props }: ButtonLinkProps) {
  return (
    <Link href={href} className={buttonClass(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}
