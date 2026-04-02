"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useTranslations } from "next-intl";
import {
  HiSparkles,
  HiBolt,
  HiChartBar,
  HiShieldCheck,
} from "react-icons/hi2";
import { useCallback, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

const SP = { stiffness: 130, damping: 22, mass: 0.35 } as const;
const E: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface StageCardProps {
  isRtl: boolean;
}

export const StageCard = ({ isRtl }: StageCardProps) => {
  const t = useTranslations("HomePage.Hero");
  const reduced = useReducedMotion();

  /* 3-D tilt */
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, SP);
  const smy = useSpring(my, SP);
  const rotY = useTransform(smx, [-0.5, 0.5], reduced ? [0, 0] : [-14, 14]);
  const rotX = useTransform(smy, [-0.5, 0.5], reduced ? [0, 0] : [8, -8]);

  const onMv = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el || reduced) return;
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    },
    [reduced, mx, my]
  );
  const onLv = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  const orbits = useMemo(
    () => [
      { key: "spark" as const, icon: <HiSparkles className="h-4 w-4 text-primary" /> },
      { key: "bolt" as const, icon: <HiBolt className="h-4 w-4 text-primary" /> },
      { key: "chart" as const, icon: <HiChartBar className="h-4 w-4 text-primary" /> },
      { key: "shield" as const, icon: <HiShieldCheck className="h-4 w-4 text-primary" /> },
    ],
    []
  );

  return (
    <motion.div
      className="relative w-full max-w-md mx-auto"
      initial={{ opacity: 0, x: isRtl ? -64 : 64 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 1.2, ease: E }}
    >
      {/* perspective wrapper */}
      <div
        ref={cardRef}
        onMouseMove={onMv}
        onMouseLeave={onLv}
        className="relative w-full"
        style={{ perspective: "1100px" }}
      >
        {/* pulsing ambient glow */}
        <motion.div
          animate={{ scale: [1, 1.04, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-[2.75rem] bg-primary/5 blur-[50px]"
        />

        {/* card */}
        <motion.div
          style={{
            rotateX: rotX,
            rotateY: rotY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full overflow-hidden rounded-[2.75rem] border border-white/[0.08] bg-white/[0.015] backdrop-blur-3xl"
        >
          {/* edge highlights */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/18 to-transparent" />
          {/* inner radial */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(146,11,11,0.07),transparent)]" />

          <div className="p-8 md:p-9" style={{ transformStyle: "preserve-3d" }}>
            {/* kicker */}
            <div
              className={cn(
                "text-[8px] font-black uppercase tracking-[0.6em] text-zinc-700",
                isRtl && "text-right"
              )}
              style={{ transform: "translateZ(6px)" }}
            >
              {t("stage.kicker")}
            </div>

            {/* orbit grid */}
            <div
              className="mt-7 grid grid-cols-2 gap-2"
              style={{ transform: "translateZ(20px)" }}
            >
              {orbits.map((o) => (
                <div
                  key={o.key}
                  className={cn(
                    "flex flex-col sm:flex-row items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.025] px-2.5 py-3 text-center sm:text-start",
                    isRtl && "sm:flex-row-reverse sm:text-right"
                  )}
                >
                  <span className="shrink-0 rounded-lg border border-primary/25 bg-primary/10 p-1.5">
                    {o.icon}
                  </span>
                  <span className="text-[7px] font-black uppercase tracking-[0.2em] text-zinc-500 leading-tight">
                    {t(`stage.orbit.${o.key}`)}
                  </span>
                </div>
              ))}
            </div>

            {/* divider */}
            <div className="my-8 h-px bg-white/[0.05]" />

            {/* stage title */}
            <div
              className={cn(
                "font-black text-white",
                isRtl
                  ? "text-3xl leading-snug text-right"
                  : "text-4xl leading-tight tracking-tighter",
              )}
              style={{ transform: "translateZ(28px)" }}
            >
              {t("stage.title")}
            </div>

            {/* primary accent line */}
            <div
              className={cn(
                "mt-4 h-px w-14 bg-primary/75 shadow-[0_0_12px_rgba(146,11,11,0.6)]",
                isRtl && "ml-auto"
              )}
              style={{ transform: "translateZ(22px)" }}
            />

            {/* body */}
            <p
              className={cn(
                "mt-5 text-sm font-medium leading-relaxed text-zinc-400",
                isRtl && "text-right"
              )}
            >
              {t("stage.body")}
            </p>

            {/* footer rule */}
            <div className="mt-9 flex items-center gap-3 opacity-20">
              <div className="h-px flex-1 bg-white/40" />
              <div className="text-[7px] font-black uppercase tracking-[0.5em] text-zinc-100">
                {isRtl ? "رحلة" : "Rehla"}
              </div>
              <div className="h-px flex-1 bg-white/40" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
