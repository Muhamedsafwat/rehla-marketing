"use client";

import { Link, usePathname } from "@/i18n/routing";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { memo } from "react";

interface NavLinkProps {
  href: string;
  label: string;
}

const NavLink = ({ href, label }: NavLinkProps) => {
  const pathname = usePathname();
  const locale = useLocale();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center justify-center py-2.5 px-4 transition-all duration-700",
        isActive ? "text-primary" : "text-zinc-400 hover:text-white"
      )}
    >
      {/* Container to handle the vertical shift */}
      <span className={cn(
        "relative z-10 block transition-all duration-700 group-hover:-translate-y-2",
        "font-black uppercase tracking-[0.2em]",
        locale === 'ar' ? "text-[16px] leading-none mb-1" : "text-[13px] tracking-[0.3em]"
      )}>
        {label}
      </span>

      {/* The 'Light Thread' - Growing from center */}
      <div className="absolute -bottom-1 left-0 right-0 h-[2px] overflow-hidden pointer-events-none">
        <motion.div 
           initial={{ scaleX: 0 }}
           animate={{ scaleX: isActive ? 1 : 0 }}
           whileHover={{ scaleX: 1 }}
           transition={{ type: "spring", stiffness: 300, damping: 20 }}
           className={cn(
             "h-full w-full bg-gradient-to-r from-transparent via-primary to-transparent origin-center opacity-0 group-hover:opacity-100",
             isActive && "opacity-100"
           )}
        >
             {/* The Glow Beam */}
             <div className="absolute inset-0 bg-primary blur-[2px] shadow-[0_0_20px_rgba(204,10,10,1)]" />
        </motion.div>
      </div>

      {/* Background Pulse Shadow */}
      <div className="absolute inset-x-0 inset-y-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg -z-10 blur-xl" />
    </Link>
  );
};

export default memo(NavLink);
