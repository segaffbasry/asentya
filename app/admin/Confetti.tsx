"use client";

import { useEffect, useRef } from "react";
export type BurstOrigin = { x: number; y: number };

export function Confetti({ origin }: { origin: BurstOrigin }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const element = canvas.current;
    const context = element?.getContext("2d");
    if (!element || !context) return;
    const width = window.innerWidth, height = window.innerHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    element.width = width * ratio; element.height = height * ratio;
    context.scale(ratio, ratio);
    const colors = ["#087ead", "#00acd6", "#70c2e0", "#083562", "#c0eafb", "#e5ba68"];
    const particles = Array.from({ length: 42 }, (_, index) => ({
      x: origin.x, y: origin.y, vx: (Math.random() - .5) * 380, vy: -190 - Math.random() * 260,
      rotation: Math.random() * Math.PI, spin: (Math.random() - .5) * 14,
      size: 3 + Math.random() * 4, color: colors[index % colors.length], landed: false,
    }));
    let frame = 0, start = 0, previous = 0;
    function draw(time: number) {
      if (!start) { start = time; previous = time; }
      const elapsed = (time - start) / 1000;
      const dt = Math.min((time - previous) / 1000, .04); previous = time;
      context!.clearRect(0, 0, width, height);
      for (const particle of particles) {
        if (!particle.landed) {
          particle.vy += 650 * dt;
          particle.x += particle.vx * dt; particle.y += particle.vy * dt; particle.rotation += particle.spin * dt;
          if (particle.vy > 0 && particle.y >= origin.y + 8) { particle.y = origin.y + 8; particle.landed = true; }
        }
        context!.save(); context!.globalAlpha = Math.max(0, Math.min(1, (1.8 - elapsed) / .45));
        context!.translate(particle.x, particle.y); context!.rotate(particle.rotation);
        context!.fillStyle = particle.color; context!.fillRect(-particle.size / 2, -particle.size / 4, particle.size, particle.size / 2);
        context!.restore();
      }
      if (elapsed < 1.8) frame = requestAnimationFrame(draw);
      else context!.clearRect(0, 0, width, height);
    }
    frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); context.clearRect(0, 0, width, height); };
  }, [origin]);
  return <canvas ref={canvas} className="cms-confetti" aria-hidden="true" />;
}
