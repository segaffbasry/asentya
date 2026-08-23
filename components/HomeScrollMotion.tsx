"use client";

import { useEffect } from "react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function HomeScrollMotion() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".home-hero");
    const overview = document.querySelector<HTMLElement>(".home-overview");

    if (!hero || !overview) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const updateScale = () => {
      frame = 0;

      if (reducedMotion.matches) {
        hero.style.setProperty("--home-image-scale", "1");
        overview.style.setProperty("--home-image-scale", "1");
        return;
      }

      const progress = clamp(window.scrollY / hero.offsetHeight, 0, 1);
      const scale = 1 + progress * 0.11;

      hero.style.setProperty("--home-image-scale", scale.toFixed(4));
      overview.style.setProperty("--home-image-scale", scale.toFixed(4));
    };

    const requestUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateScale);
      }
    };

    updateScale();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
