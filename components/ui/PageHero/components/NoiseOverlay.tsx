"use client";

import React, { memo } from "react";

export const NoiseOverlay = memo(() => {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none z-[2] mix-blend-overlay opacity-[0.03] will-change-auto"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px",
      }}
    />
  );
});

NoiseOverlay.displayName = "NoiseOverlay";
