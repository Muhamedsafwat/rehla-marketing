"use client";

import { useEffect, useRef, memo } from "react";

export const ParticleField = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    
    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 30 : 55;
    
    const particles = Array.from({ length: COUNT }, () => ({
      x:    Math.random() * width,
      y:    Math.random() * height,
      r:    Math.random() * 1.2 + 0.3,
      vx:   (Math.random() - 0.5) * 0.2,
      vy:   (Math.random() - 0.5) * 0.2,
      red:  Math.random() > 0.72,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    let rafId: number;
    let isVisible = true;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(canvas);

    const draw = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);
        
        // Batch particles drawing
        for (let i = 0; i < COUNT; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          
          if (p.x < 0) p.x = width;
          else if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          else if (p.y > height) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.red
            ? `rgba(146,11,11,${p.alpha})`
            : `rgba(255,255,255,${p.alpha * 0.5})`;
          ctx.fill();
        }

        // Draw connections with distance check
        ctx.lineWidth = 0.5;
        const maxDistSq = 90 * 90;
        for (let i = 0; i < COUNT; i++) {
          for (let j = i + 1; j < COUNT; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distSq = dx * dx + dy * dy;
            
            if (distSq < maxDistSq) {
              const dist = Math.sqrt(distSq);
              const alpha = (1 - dist / 90) * 0.05;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(146,11,11,${alpha})`;
              ctx.stroke();
            }
          }
        }
      }
      
      rafId = requestAnimationFrame(draw);
    };
    
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60 will-change-transform"
    />
  );
});

ParticleField.displayName = "ParticleField";
