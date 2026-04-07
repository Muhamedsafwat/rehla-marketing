"use client";

import { motion } from "framer-motion";
import React, { memo } from "react";

interface CornerBracketProps {
  position: "tl" | "tr" | "bl" | "br";
}

export const CornerBracket = memo(({ position }: CornerBracketProps) => {
  const posClass = {
    tl: "top-4 left-4",
    tr: "top-4 right-4",
    bl: "bottom-4 left-4",
    br: "bottom-4 right-4",
  }[position];

  const rotate = { tl: "0deg", tr: "90deg", bl: "-90deg", br: "180deg" }[position];

  return (
    <motion.div
      aria-hidden
      className={`absolute w-5 h-5 hidden md:block pointer-events-none ${posClass}`}
      style={{ rotate }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/40" />
      <div className="absolute top-0 left-0 h-full w-[1px] bg-primary/40" />
      <div className="absolute top-0 left-0 w-1 h-1 rounded-full bg-primary/60" />
    </motion.div>
  );
});


