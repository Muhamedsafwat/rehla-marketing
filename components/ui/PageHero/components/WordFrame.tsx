"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useCallback, memo } from "react";
import { HeroWord, WordVariant } from "../types";

interface WordFrameProps {
  word: HeroWord;
  index: number;
  isRtl: boolean;
}

const variantClass: Record<WordVariant, string> = {
  filled: "text-white",
  outlined: "text-transparent",
  accent: "text-primary",
  muted: "text-zinc-600",
};

const variantStroke: Record<WordVariant, React.CSSProperties> = {
  filled: {},
  outlined: { WebkitTextStroke: "clamp(1px,0.15vw,2px) rgba(255,255,255,0.5)" },
  accent: {},
  muted: {},
};

export const WordFrame = memo(({ word, index, isRtl }: WordFrameProps) => {
  const variant = word.variant ?? "filled";
  const indent = word.indent ?? 0;
  const delay = index * 0.14;

  const fontSize = word.clampSize ?? "clamp(2.5rem, 8vw, 6.5rem)";

  const spanRef = useRef<HTMLSpanElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 400, damping: 25 });
  const sy = useSpring(my, { stiffness: 400, damping: 25 });

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!spanRef.current) return;
    const rect = spanRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mx.set((e.clientX - cx) * 0.2);
    my.set((e.clientY - cy) * 0.2);
  }, [mx, my]);

  const handleLeave = useCallback(() => {
    mx.set(0); my.set(0);
  }, [mx, my]);

  const indentPercent = `${indent * 5}%`;

  const clipVariants = {
    hidden: { clipPath: "inset(-50% -50% 100% -50%)", opacity: 0, y: 30 },
    visible: {
      clipPath: "inset(-50% -50% -50% -50%)",
      opacity: 1,
      y: 0,
      transition: {
        clipPath: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
        opacity: { duration: 0.1, delay },
        y: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
      },
    },
  };

  return (
    <motion.span
      variants={clipVariants}
      initial="hidden"
      animate="visible"
      className="relative flex items-baseline group overflow-visible select-none"
      style={{
        paddingInlineStart: indentPercent,
        paddingBlock: isRtl ? "0.25em" : "0.15em",
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay + 0.7, duration: 0.4, ease: "backOut" }}
        className="shrink-0 self-center text-[7px] font-black tracking-[0.6em] text-zinc-700 tabular-nums select-none me-4 group-hover:text-primary/50 transition-colors duration-500"
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      <motion.span
        ref={spanRef}
        className={`
          relative font-black
          ${isRtl ? "leading-[1.25] tracking-normal font-arabic" : "uppercase leading-[0.88] tracking-tighter"}
          cursor-default select-none
          transition-all duration-200
          group-hover:drop-shadow-[0_0_24px_rgba(146,11,11,0.4)]
          ${variantClass[variant]}
        `}
        style={{
          fontSize,
          ...variantStroke[variant],
          x: sx,
          y: sy,
          fontFamily: isRtl ? "var(--font-arabic)" : "inherit"
        }}
      >
        {word.text}

        <motion.span
          aria-hidden
          className="absolute bottom-[-2px] left-0 right-0 h-[2px] origin-left"
          style={{
            background: "linear-gradient(90deg, #920b0b, rgba(146,11,11,0.1))",
          }}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </motion.span>

      <motion.span
        aria-hidden
        className="absolute top-0 bottom-0 w-[2px] bg-primary/60 rounded-full"
        style={{ [isRtl ? "right" : "left"]: isRtl ? indentPercent : `calc(${indentPercent} - 12px)` }}
        initial={{ scaleY: 0, opacity: 0 }}
        whileHover={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.span>
  );
});
