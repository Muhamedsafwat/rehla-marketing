"use client";

import { motion } from "framer-motion";

// Types
import { PageHeroProps } from "./types";

// Components
import { ParticleField } from "./components/ParticleField";
import { NoiseOverlay } from "./components/NoiseOverlay";
import { GradientMesh } from "./components/GradientMesh";
import { WordFrame } from "./components/WordFrame";
import { SideDataStrip } from "./components/SideDataStrip";
import { CornerBracket } from "./components/CornerBracket";
import { Cursor } from "./components/Cursor";

// Hooks
import { useGlitch } from "./hooks/useGlitch";

export type { HeroWord, WordVariant, PageHeroProps } from "./types";

export const PageHero = ({
  eyebrow,
  words,
  statement,
  meta,
  isRtl = false,
  className = "",
}: PageHeroProps) => {
  const { display, done } = useGlitch(statement, words.length * 0.14 + 1.0);
  const wordsDelay = words.length * 0.14;

  return (
    <div
      className={`relative w-full pt-[140px] pb-8 md:pb-12 overflow-x-clip ${className}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* ── Background layers ── */}
      <GradientMesh />
      <ParticleField />
      <NoiseOverlay />

      {/* Corner brackets */}
      <CornerBracket position="tl" />
      <CornerBracket position="tr" />
      <CornerBracket position="bl" />
      <CornerBracket position="br" />

      {/* Side data strip */}
      <SideDataStrip isRtl={isRtl} delay={wordsDelay} />

      <div className="container relative z-10">

        {/* ── Eyebrow ── */}
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-3 mb-6 md:mb-10"
          >
            {/* Animated line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "2rem" }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="h-[2px] bg-gradient-to-r from-primary to-primary/30 shrink-0"
            />
            {/* Blinking dot */}
            <motion.span
              aria-hidden
              className="w-1 h-1 rounded-full bg-primary shrink-0"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <span className={`text-[9px] sm:text-[10px] font-black uppercase text-primary/60 ${isRtl ? 'tracking-normal font-arabic' : 'tracking-[0.5em] font-mono'}`}>
              {eyebrow}
            </span>
          </motion.div>
        )}

        {/* ── Word stack (H1 for SEO) ── */}
        <h1 className="flex flex-col gap-1 md:gap-2 w-full m-0 p-0">
          {words.map((w, i) => (
            <WordFrame
              key={i}
              word={w}
              index={i}
              isRtl={isRtl}
            />
          ))}
        </h1>

        {/* ── Statement — glitch terminal readout ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: wordsDelay + 0.6 }}
          className="mt-10 md:mt-14 flex items-start gap-4"
        >
          {/* Left accent bar with pulse */}
          <div className="relative w-[2px] self-stretch shrink-0 mt-[2px] overflow-hidden">
            <div className="absolute inset-0 bg-primary/25" />
            <motion.div
              className="absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-primary to-transparent"
              animate={{ y: ["-100%", "300%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className={`text-[8px] sm:text-[9px] font-black uppercase text-zinc-600 mb-2 font-mono ${isRtl ? 'tracking-normal font-arabic' : 'tracking-[0.55em]'}`}>
              {isRtl ? "// البيان_الأساسي" : "// core_statement"}
            </p>
            <p className={`text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-zinc-300 tracking-tight leading-snug break-words ${isRtl ? 'font-arabic' : 'font-mono'}`}>
              {display}
              <Cursor done={done} />
            </p>
          </div>

          {/* Floating tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: wordsDelay + 1.2, duration: 0.5, ease: "backOut" }}
            className="hidden sm:flex items-center gap-2 shrink-0 self-center px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5"
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className={`text-[8px] font-black uppercase ${isRtl ? 'tracking-normal font-arabic' : 'tracking-[0.4em] font-mono'} text-primary/70`}>
              {isRtl ? "نشط" : "LIVE"}
            </span>
          </motion.div>
        </motion.div>

        {/* ── Meta row ── */}
        {meta && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: wordsDelay + 2.2, duration: 0.7 }}
            className="mt-12 md:mt-16 flex items-center gap-4 pt-5"
          >
            <span className={`text-[8px] sm:text-[9px] font-black uppercase ${isRtl ? 'tracking-normal font-arabic' : 'tracking-[0.5em] font-mono'} text-zinc-700 shrink-0`}>
              {meta}
            </span>
            {/* Metrics chips */}
            {["01", "02", "03"].map((n, i) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: wordsDelay + 2.5 + i * 0.1 }}
                className="shrink-0 w-6 h-6 rounded border border-white/[0.06] flex items-center justify-center"
              >
                <span className="text-[7px] font-black text-zinc-700 font-mono">{n}</span>
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </div>
  );
};
