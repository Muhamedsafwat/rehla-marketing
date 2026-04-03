"use client";

import { useEffect, useState } from "react";

const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#%$&";

export function useGlitch(target: string, startDelay = 1.6) {
  const [display, setDisplay] = useState(() => "▓".repeat(target.length));
  const [done, setDone] = useState(false);

  useEffect(() => {
    let frame = 0;
    const total = 42;
    let rafId: number;

    const tid = setTimeout(() => {
      const tick = () => {
        frame++;
        const resolved = Math.floor((frame / total) * target.length);
        setDisplay(
          target
            .split("")
            .map((ch, i) => {
              if (ch === " ") return " ";
              if (i < resolved) return ch;
              return POOL[Math.floor(Math.random() * POOL.length)];
            })
            .join("")
        );
        if (frame < total) rafId = requestAnimationFrame(tick);
        else { setDisplay(target); setDone(true); }
      };
      rafId = requestAnimationFrame(tick);
    }, startDelay * 1000);

    return () => { clearTimeout(tid); cancelAnimationFrame(rafId); };
  }, [target, startDelay]);

  return { display, done };
}
