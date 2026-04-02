"use client";

import { motion } from "framer-motion";

interface ScrollHintProps {
  isRtl: boolean;
}

export const ScrollHint = ({ isRtl }: ScrollHintProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.6, duration: 1 }}
    className="pointer-events-none absolute -bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
  >
    <span className="text-[7px] font-black uppercase tracking-[0.5em] text-zinc-700">
      {isRtl ? "استكشف" : "Scroll"}
    </span>
    <motion.div
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      className="h-7 w-px bg-gradient-to-b from-zinc-700 to-transparent"
    />
  </motion.div>
);
