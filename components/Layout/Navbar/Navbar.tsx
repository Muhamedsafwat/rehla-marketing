"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect, memo, useCallback } from "react";
import { HiBars3BottomRight } from "react-icons/hi2";
import LanguageSwitch from "@/components/ui/LanguageSwitch";
import { Button } from "@/components/ui/Button";
import { useLocale } from "next-intl";

// Internal Components
import BrandLogo from "./components/BrandLogo";
import NavLink from "./components/NavLink";
import MobileMenu from "./components/MobileMenu";
import { NAV_LINKS } from "./data/navbar";

const Navbar = () => {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const containerVariants = {
    hidden: { y: -150, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring" as const, 
        stiffness: 100, 
        damping: 20,
        staggerChildren: 0.1,
        delayChildren: 0.5
      } 
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <>
      <motion.header
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={cn(
          "fixed top-8 lg:top-12 left-0 right-0 mx-auto z-[100] transition-all duration-700 border border-white/[0.12] shadow-2xl",
          "w-[94vw] lg:w-max rounded-2xl lg:rounded-full",
          isScrolled ? "bg-zinc-950/90 backdrop-blur-3xl px-4 lg:px-6 py-2" : "bg-zinc-900/40 backdrop-blur-3xl px-4 py-2"
        )}
      >
        <div className="flex items-center justify-between lg:justify-start gap-4 lg:gap-6 h-12">
          
          {/* 1. Logo - Adaptive Reveal Interaction */}
          <div className="flex items-center h-full">
            <BrandLogo />
          </div>

          {/* 2. Navigation - Creative Pill Links (Desktop Only) */}
          <nav className="hidden lg:flex items-center gap-2 h-full px-4 border-l border-r border-white/5">
            {NAV_LINKS.filter(link => !link.isButton).map((link) => (
              <motion.div key={link.href} variants={itemVariants} className="h-full flex items-center">
                <NavLink href={link.href} label={t(link.label)} />
              </motion.div>
            ))}
          </nav>

          {/* 3. Actions - Minimal & Focused */}
          <div className="flex items-center gap-3 lg:gap-4 h-full">
            {/* Always show LangSwitch on mobile too */}
            <motion.div variants={itemVariants} className="h-full flex items-center">
               <LanguageSwitch variant="minimal" />
            </motion.div>
            
            <motion.div variants={itemVariants} className="hidden lg:flex h-full items-center">
               {NAV_LINKS.filter(link => link.isButton).map(btn => (
                  <Button 
                     key={btn.href} 
                     variant="glass" 
                     size="sm" 
                     isMagnetic 
                     className="h-10 rounded-full px-8 border-primary/20 hover:border-primary/40 text-primary-light whitespace-nowrap"
                     href={`/${locale}${btn.href}`}
                  >
                     {t(btn.label)}
                  </Button>
               ))}
            </motion.div>

            {/* Mobile Interaction Trigger */}
            <motion.button
              variants={itemVariants}
              onClick={toggleMobileMenu}
              className="lg:hidden p-3 bg-white/[0.03] border border-white/10 rounded-full text-white backdrop-blur-3xl active:scale-95 transition-all"
            >
              <HiBars3BottomRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        links={NAV_LINKS.map(l => ({ ...l, label: t(l.label) }))} 
      />
    </>
  );
};

export default memo(Navbar);
