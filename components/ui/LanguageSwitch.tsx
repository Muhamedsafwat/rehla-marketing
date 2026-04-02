"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { Button } from "./Button";
import { HiGlobeAlt } from "react-icons/hi2";
import { memo, useTransition } from "react";
import { cn } from "@/lib/utils";

interface LanguageSwitchProps {
  variant?: 'default' | 'minimal';
}

const LanguageSwitch = ({ variant = 'default' }: LanguageSwitchProps) => {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(nextLocale: string) {
    if (nextLocale === locale) return;
    
    startTransition(() => {
      // @ts-expect-error -- useParams returns a plain object
      router.replace({ pathname, params }, { locale: nextLocale as "en" | "ar" });
    });
  }

  if (variant === 'minimal') {
    return (
      <Button
        variant="glass"
        size="sm"
        disabled={isPending}
        onClick={() => onSelectChange(locale === 'en' ? 'ar' : 'en')}
        className="w-10 h-10 p-0 rounded-full flex items-center justify-center backdrop-blur-3xl border-white/[0.08]"
      >
        <span className="uppercase text-[9px] font-black tracking-tighter">
          {locale === 'en' ? 'AR' : 'EN'}
        </span>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="glass"
        size="sm"
        disabled={isPending}
        onClick={() => onSelectChange(locale === 'en' ? 'ar' : 'en')}
        leftIcon={<HiGlobeAlt className={cn("w-4 h-4 transition-transform duration-700", isPending && "animate-spin")} />}
        className="min-w-[120px] backdrop-blur-3xl border-white/[0.08]"
      >
        <span className="uppercase tracking-[0.2em] font-black text-[10px]">
          {locale === 'en' ? t('ar') : t('en')}
        </span>
      </Button>
    </div>
  );
};

export default memo(LanguageSwitch);
