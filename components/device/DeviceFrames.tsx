import Image from "next/image";
import type { ReactNode } from "react";
import type { Mockup } from "@/lib/mockups";

type FrameProps = {
  mockup?: Mockup;
  children?: ReactNode;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/** iPhone-artige Hülle im hellen, weichen Stil des Prototyps */
export function PhoneFrame({ mockup, children, className = "", priority, sizes = "(min-width: 768px) 300px, 70vw" }: FrameProps) {
  return (
    <div
      className={`relative rounded-[2.75rem] border border-line bg-surface p-[9px] shadow-[0_30px_60px_-25px_rgba(80,50,30,0.35),0_10px_20px_-10px_rgba(80,50,30,0.15)] ${className}`}
    >
      <div className="relative aspect-[780/1688] overflow-hidden rounded-[2.2rem] bg-bg">
        {mockup ? (
          <Image
            src={mockup.src}
            alt={mockup.alt}
            width={mockup.width}
            height={mockup.height}
            sizes={sizes}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
}

/** iPad-artige Hülle (Querformat) */
export function TabletFrame({ mockup, className = "", priority, sizes = "(min-width: 1024px) 900px, 95vw" }: FrameProps) {
  if (!mockup) return null;
  return (
    <div
      className={`rounded-[1.75rem] border border-line bg-surface p-[10px] shadow-[0_30px_60px_-25px_rgba(80,50,30,0.35),0_10px_20px_-10px_rgba(80,50,30,0.15)] md:rounded-[2.25rem] md:p-[14px] ${className}`}
    >
      <div className="overflow-hidden rounded-[1.2rem] bg-bg md:rounded-[1.6rem]">
        <Image
          src={mockup.src}
          alt={mockup.alt}
          width={mockup.width}
          height={mockup.height}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
