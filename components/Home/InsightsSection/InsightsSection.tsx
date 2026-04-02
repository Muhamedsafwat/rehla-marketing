"use client";

import dynamic from "next/dynamic";
import { useTranslations, useLocale } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { HiSparkles, HiChartBar, HiBolt } from "react-icons/hi2";

const InsightsChart = dynamic(
  () => import("./InsightsChart").then((m) => m.InsightsChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-[260px] w-full animate-pulse rounded-3xl bg-white/3" />
    ),
  },
);

export function InsightsSection() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("HomePage.Insights");
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full py-18 md:py-22">
      <div className="container">
        <SectionTitle
          title={t("headline")}
          subtitle={t("subheadline")}
          align="center"
          badge={isRtl ? "الرؤى / الإشارات / التحكم" : "Charts / Signal / Control"}
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
            className="lg:col-span-7 rounded-[2.5rem] border border-white/10 bg-white/2 p-10 backdrop-blur-3xl"
          >
            <div className="flex items-center justify-between gap-6">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-500">
                  {t("panelKicker")}
                </div>
                <div className="mt-3 text-2xl font-black tracking-tight text-white md:text-3xl">
                  {t("panelTitle")}
                </div>
              </div>

              <div className="hidden items-center gap-3 md:flex">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.35em] text-zinc-500">
                    {t("legendSignal")}
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-white/40" />
                  <span className="text-[10px] font-black uppercase tracking-[0.35em] text-zinc-500">
                    {t("legendPerformance")}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <InsightsChart />
            </div>
          </motion.div>

          <div className="lg:col-span-5 space-y-8">
            {[
              {
                icon: <HiSparkles className="h-6 w-6 text-primary" />,
                title: t("cards.0.title"),
                body: t("cards.0.body"),
              },
              {
                icon: <HiChartBar className="h-6 w-6 text-primary" />,
                title: t("cards.1.title"),
                body: t("cards.1.body"),
              },
              {
                icon: <HiBolt className="h-6 w-6 text-primary" />,
                title: t("cards.2.title"),
                body: t("cards.2.body"),
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{
                  delay: idx * 0.08,
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
                className="rounded-[2.5rem] border border-white/10 bg-white/2 p-10 backdrop-blur-3xl"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl border border-primary/20 bg-primary/10 p-3 shadow-[0_0_40px_rgba(146,11,11,0.18)]">
                    {card.icon}
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.35em] text-white/80">
                      {card.title}
                    </div>
                    <div className="mt-3 text-sm font-medium leading-relaxed text-zinc-500">
                      {card.body}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
