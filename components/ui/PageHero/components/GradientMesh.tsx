"use client";

import { motion } from "framer-motion";
import React, { memo } from "react";

export const GradientMesh = memo(() => {
  return (
    <div aria-hidden className="absolute inset-0 overflow-visible pointer-events-none z-[1]">
      {/* Deep red orb — top-start */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(146,11,11,0.18) 0%, transparent 70%)",
          top: "-20%",
          left: "-10%",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, 30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Faint white orb — center-end */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
          top: "30%",
          right: "-5%",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, -30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
    </div>
  );
});

