"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi2";

const CARDS_DATA = [
  { id: "point1", image: "/images/whyus/alignment.png" },
  { id: "point2", image: "/images/whyus/systems.png" },
  { id: "point3", image: "/images/whyus/clarity.png" },
  { id: "point4", image: "/images/whyus/consistency.png" },
];

export const WhyUsSection = () => {
  const t = useTranslations("HomePage.WhyUs");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const constraintsRef = useRef<HTMLDivElement>(null);

  const displayCards = isRtl ? [...CARDS_DATA].reverse() : CARDS_DATA;

  const x = useMotionValue(0);
  const smoothX = useSpring(x, { damping: 50, stiffness: 400 });

  const skewX = useTransform(smoothX, (currentX) => {
    const diff = x.get() - currentX;
    return Math.max(-10, Math.min(10, diff * 0.08));
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorOpacity = useMotionValue(0);
  const cursorScale = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 500, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const handlePointerMove = (e: React.PointerEvent) => {
    mouseX.set(e.clientX - 40); 
    mouseY.set(e.clientY - 40);
  };

  const handlePointerEnter = () => {
    cursorOpacity.set(1);
    cursorScale.set(1);
  };

  const handlePointerLeave = () => {
    cursorOpacity.set(0);
    cursorScale.set(0.5);
  };

  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden bg-transparent">

      <div className="container relative z-20 mb-16 md:mb-20">
        <SectionTitle
          title={t("headline")}
          align="center"
          badge={t("badge")}
        />
      </div>

      <div
        className="relative z-10 w-full pl-6 md:pl-12 lg:pl-[10vw]"
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerLeave}
      >

        <motion.div
          style={{
            x: cursorX,
            y: cursorY,
            opacity: cursorOpacity,
            scale: cursorScale,
          }}
          className="fixed top-0 left-0 z-50 pointer-events-none hidden md:flex h-20 w-20 items-center justify-center rounded-full bg-primary/90 text-[10px] font-black uppercase tracking-widest text-white shadow-[0_0_30px_rgba(204,10,10,0.4)] backdrop-blur-md will-change-transform"
        >
          {isRtl ? "اسحب" : "Drag"}
        </motion.div>

        <div ref={constraintsRef} className="overflow-visible pr-6 md:pr-12 lg:pr-[10vw]">
          <motion.div
            dir="ltr"
            drag="x"
            dragConstraints={constraintsRef} 
            dragElastic={0.15}
            whileTap={{ cursor: "grabbing" }}
            style={{ x, skewX }} 
            className="flex gap-6 md:gap-8 cursor-grab w-max pb-12 will-change-transform"
          >
            {displayCards.map((card, index) => {
              const realIndex = isRtl ? CARDS_DATA.length - 1 - index : index;

              return (
                <motion.div
                  key={card.id}
                  className="relative w-[85vw] sm:w-[400px] md:w-[480px] lg:w-[600px] h-[450px] md:h-[550px] flex-none group overflow-hidden rounded-[2.5rem] bg-[#0c0c0c] border border-white/5 hover:border-primary/40 transition-colors duration-700"
                >
                  <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                    <Image
                      src={card.image}
                      alt={t(`cards.${card.id}.title`)}
                      fill
                      draggable={false}
                      className="object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-50 group-hover:opacity-100 mix-blend-screen will-change-transform"
                      sizes="(max-width: 768px) 85vw, (max-width: 1200px) 480px, 600px"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/60 to-transparent" />
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-8 md:p-12 z-20 pointer-events-none flex flex-col justify-end h-full">

                    <div className="absolute top-8 right-8 overflow-hidden">
                      <span className="block text-6xl md:text-8xl font-black italic text-white/5 group-hover:text-primary/20 transition-colors duration-700 select-none">
                        0{realIndex + 1}
                      </span>
                    </div>

                    <div className={cn(
                      "flex flex-col mb-2",
                      isRtl && "text-right"
                    )}>
                      <div className={cn(
                        "h-0.5 w-0 bg-primary group-hover:w-full shadow-[0_0_15px_rgba(204,10,10,0.5)] transition-all duration-700 mb-6",
                        isRtl && "ml-auto"
                      )} />

                      <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white/90 group-hover:text-white transition-colors duration-500 mb-4 drop-shadow-md">
                        {t(`cards.${card.id}.title`)}
                      </h3>

                      <p className="text-base md:text-xl font-medium leading-relaxed text-zinc-500 group-hover:text-zinc-200 transition-colors duration-500 max-w-sm drop-shadow-md text-balance">
                        {t(`cards.${card.id}.desc`)}
                      </p>
                    </div>
                  </div>

                  <div className="absolute inset-0 rounded-[2.5rem] border border-primary/0 group-hover:border-primary/20 shadow-[inset_0_0_80px_rgba(204,10,10,0)] group-hover:shadow-[inset_0_0_80px_rgba(204,10,10,0.15)] transition-all duration-700 pointer-events-none" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="mt-4 flex md:hidden items-center justify-center gap-2 opacity-50">
          <HiArrowLeft className="w-4 h-4 text-zinc-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
            {t("dragText")}
          </span>
          <HiArrowRight className="w-4 h-4 text-zinc-500 animate-pulse" />
        </div>
      </div>
    </section>
  );
};
