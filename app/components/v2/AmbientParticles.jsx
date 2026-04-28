"use client";
import { useEffect, useRef } from "react";

// Slow gold particle field — gives the void a sense of motion and depth.
// Particles drift upward with subtle horizontal sway, like embers.
// Canvas-based so it scales to thousands without DOM cost.

export default function AmbientParticles({ count = 60, speed = 0.15 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;

    const resize = () => {
      canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vy: -speed * (0.5 + Math.random()),
      vx: (Math.random() - 0.5) * speed * 0.3,
      r: 0.8 + Math.random() * 1.6,
      o: 0.1 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2,
    }));

    let phase = 0;
    const draw = () => {
      phase += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.y += p.vy;
        p.x += p.vx + Math.sin(phase + p.phase) * 0.1;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10 || p.x > canvas.width + 10) p.vx *= -1;

        const flicker = 0.8 + Math.sin(phase * 2 + p.phase) * 0.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (window.devicePixelRatio || 1), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 193, 74, ${p.o * flicker})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count, speed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", opacity: 0.85,
      }}
      aria-hidden="true"
    />
  );
}
