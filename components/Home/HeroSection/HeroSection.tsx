"use client";

import { useLocale } from "next-intl";

import { HeroBadge } from "./components/HeroBadge";
import { HeroHeadline } from "./components/HeroHeadline";
import { HeroCTAs } from "./components/HeroCTAs";
import { HeroProof } from "./components/HeroProof";
import { StageCard } from "./components/StageCard";
import { ScrollHint } from "./components/ScrollHint";

export const HeroSection = () => {
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <section className="relative container overflow-hidden">

      <div
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3 start-4"
        style={{ writingMode: "vertical-lr" }}
        aria-hidden
      >
        <div className="h-14 w-px bg-gradient-to-b from-transparent to-zinc-800" />
        <span className="text-[7px] font-black uppercase tracking-[0.5em] text-zinc-800 py-1 select-none">
          {isRtl ? "رحلة · ستوديو" : "Rehla · Studio"}
        </span>
        <div className="h-14 w-px bg-gradient-to-t from-transparent to-zinc-800" />
      </div>

      <div className="container h-full pt-[140px] lg:pt-[170px] pb-12">

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8 lg:items-center">

          <div className="lg:col-span-7 flex flex-col gap-8">

            <HeroBadge isRtl={isRtl} />

            <HeroHeadline isRtl={isRtl} />

            <div className="lg:hidden flex items-center justify-center py-6">
              <StageCard isRtl={isRtl} />
            </div>

            <div className="space-y-5">
              <HeroCTAs  isRtl={isRtl} />
              <HeroProof isRtl={isRtl} />
            </div>

          </div>

          <div className="hidden lg:flex lg:col-span-5 items-center justify-center">
            <StageCard isRtl={isRtl} />
          </div>

        </div>
      </div>

      <ScrollHint isRtl={isRtl} />
    </section>
  );
};
