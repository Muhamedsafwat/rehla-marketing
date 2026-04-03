"use client";

import { motion } from "framer-motion";
import React from "react";

interface SideDataStripProps {
  isRtl: boolean;
  delay: number;
}

export function SideDataStrip({ isRtl, delay }: SideDataStripProps) {
  const items = ["SYS::ACTIVE", "VER 2.4.1", "RENDER::OK"];

  return (
    <motion.div
      initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay + 0.8, duration: 0.8 }}
      className="absolute top-[140px] hidden lg:flex flex-col gap-3"
      style={{ [isRtl ? "left" : "right"]: "1.5rem" }}
      aria-hidden
    >
      <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-primary/40 to-transparent mx-auto" />
      {items.map((item, i) => (
        <motion.span
          key={item}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 1 + i * 0.15 }}
          className="text-[7px] font-black tracking-[0.4em] text-zinc-700 writing-mode-vertical [writing-mode:vertical-rl] rotate-180 select-none"
        >
          {item}
        </motion.span>
      ))}
      <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-primary/20 to-transparent mx-auto" />
    </motion.div>
  );
}

SideDataStrip.displayName = "SideDataStrip";


export const MemoSideDataStrip = React.memo(SideDataStrip);
