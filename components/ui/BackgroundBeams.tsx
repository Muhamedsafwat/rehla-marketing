"use client";

import { memo } from "react";

export const BackgroundBeams = memo(() => {
  return (
    <div
      className="fixed inset-0 z-[-10] overflow-hidden pointer-events-none"
      style={{ backgroundColor: '#000' }}
    >
      {/* 1. Top-Left: Light Source (White) - DOMINANT */}
      <div className="absolute top-[-25%] left-[-20%] md:top-[-15%] md:left-[-15%] w-[160vw] h-[160vw] md:w-[70vw] md:h-[70vw] rounded-full bg-white/[0.03] blur-[120px] md:blur-[180px] animate-wave1 mix-blend-plus-lighter"></div>
      
      {/* 2. Top-Right: Brand Energy (Red) - INTENSE */}
      <div className="absolute top-[20%] right-[-20%] md:top-[5%] md:right-[-10%] w-[130vw] h-[130vw] md:w-[80vw] md:h-[80vw] rounded-full bg-primary/[0.1] blur-[130px] md:blur-[180px] animate-wave2 mix-blend-plus-lighter"></div>
      
      {/* 3. Bottom-Left: Depth & Texture (Gray) */}
      <div className="absolute bottom-[-15%] left-[5%] md:bottom-[-20%] md:left-[15%] w-[150vw] h-[150vw] md:w-[90vw] md:h-[90vw] rounded-full bg-zinc-600/[0.1] blur-[140px] md:blur-[200px] animate-wave3 mix-blend-screen"></div>

      {/* Central Focus (Tuned for contrast) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,var(--background)_100%)] opacity-80" />
    </div>
  );
});

