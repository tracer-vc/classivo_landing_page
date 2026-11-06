"use client";

import { useEffect, useState } from "react";
import { buttonClass } from "@/components/ui/Button";

/**
 * Mobiler Sticky-CTA: erscheint, sobald der Hero aus dem Bild ist,
 * und verschwindet wieder, wenn das Beta-Formular sichtbar wird.
 */
export function StickyCta() {
  const [heroGone, setHeroGone] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const form = document.getElementById("beta");
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) setHeroGone(!e.isIntersecting);
        if (e.target === form) setFormVisible(e.isIntersecting);
      }
    });
    if (hero) io.observe(hero);
    if (form) io.observe(form);
    return () => io.disconnect();
  }, []);

  const show = heroGone && !formVisible;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-8 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] transition-all duration-300 md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/90 to-transparent" aria-hidden />
      <a href="#beta" className={buttonClass("primary", "lg", "relative w-full")} tabIndex={show ? 0 : -1}>
        Beta-Platz sichern 🚀
      </a>
    </div>
  );
}
