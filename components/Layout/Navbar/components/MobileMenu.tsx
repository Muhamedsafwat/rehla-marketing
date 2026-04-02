"use client";

import { Link, usePathname } from "@/i18n/routing";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { memo } from "react";
import { HiXMark } from "react-icons/hi2";
import { FaInstagram, FaLinkedinIn, FaFacebookF } from "react-icons/fa6";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import LanguageSwitch from "@/components/ui/LanguageSwitch";
import { NavItem } from "../data/navbar";
import { Button } from "@/components/ui/Button";
import { useLocale } from "next-intl";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavItem[];
}

const MobileMenu = ({ isOpen, onClose, links }: MobileMenuProps) => {
  const pathname = usePathname();
  const locale = useLocale();

  const containerVariants: Variants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 120, 
        damping: 20,
        staggerChildren: 0.1,
        delayChildren: 0.3
      } 
    },
    exit: { 
      opacity: 0, 
      x: "100%",
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 30
      } 
    }
  };

  const itemVariants : Variants = {
    hidden: { x: 30, opacity: 0, scale: 0.9 },
    visible: { 
      x: 0, 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
           variants={containerVariants}
           initial="hidden"
           animate="visible"
           exit="exit"
           className="fixed inset-0 z-[150] bg-black/75 backdrop-blur-3xl md:hidden overflow-hidden flex flex-col h-[100dvh]"
        >
            {/* Top Toolbar - Pill Style */}
            <div className="p-6 flex items-center justify-between pointer-events-auto">
                <LanguageSwitch variant="minimal" />
                <button 
                  onClick={onClose}
                  className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-white outline-none active:scale-90 transition-all"
                >
                  <HiXMark className="w-6 h-6" />
                </button>
            </div>

            {/* Main Navigation - Bold Boutique Layout */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6 px-10 relative z-10">
                {links.map((link) => (
                  <motion.div key={link.href} variants={itemVariants} className="w-full max-w-[280px]">
                    {link.isButton ? (
                        <Button
                          variant="primary"
                          size="lg"
                          isMagnetic
                          onClick={onClose}
                          className="w-full text-xs font-black italic tracking-widest shadow-[0_20px_50px_rgba(204,10,10,0.3)]"
                          href={`/${locale}${link.href}`}
                        >
                            {link.label}
                        </Button>
                    ) : (
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className={cn(
                            "block text-center transition-all duration-500",
                            pathname === link.href ? "text-primary tracking-[0.2em]" : "text-white/40 hover:text-white hover:tracking-[0.1em]",
                            locale === 'ar' ? "text-4xl font-black" : "text-3xl font-black uppercase tracking-tighter"
                          )}
                        >
                          {link.label}
                        </Link>
                    )}
                  </motion.div>
                ))}
            </div>

            <div className="p-10 border-t border-white/5 flex flex-col items-center gap-8 relative z-10 bg-black/20">
                {/* Social Icons */}
                <div className="flex items-center gap-6">
                    {[
                      { icon: FaInstagram, href: "https://www.instagram.com/rehlamarketing?igsh=bHQ0eDk3MXQwY2F0&utm_source=qr" },
                      { icon: FaLinkedinIn, href: "https://www.linkedin.com/company/rehla-marketing-agency/" },
                      { icon: FaFacebookF, href: "https://www.facebook.com/share/16xhjLWB9M/?mibextid=wwXIfr" }
                    ].map((social, i) => (
                      <motion.a 
                        key={i}
                        variants={itemVariants}
                        href={social.href}
                        target="_blank"
                        className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-white/50 hover:text-primary hover:border-primary/40 transition-all active:scale-95"
                      >
                        <social.icon className="w-4 h-4" />
                      </motion.a>
                    ))}
                </div>

                {/* Direct Contact Info */}
                <div className="flex flex-col items-center gap-3">
                   <motion.a 
                      variants={itemVariants}
                      href="mailto:info@rehlamarketing.com" 
                      className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors text-sm font-medium tracking-wide"
                   >
                       <HiOutlineMail className="w-4 h-4" />
                       info@rehlamarketing.com
                   </motion.a>
                   <motion.a 
                      variants={itemVariants}
                      href="tel:+966564107629" 
                      className={cn(
                        "flex items-center gap-2 text-white/60 hover:text-primary transition-colors text-sm font-medium",
                        locale === 'ar' ? "flex-row-reverse" : "flex-row"
                      )}
                   >
                       <HiOutlinePhone className="w-4 h-4" />
                       +966 56 410 7629
                   </motion.a>
                </div>
            </div>

            {/* Decorative Light Thread */}
            <div className={cn(
              "absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-primary/20 to-transparent",
              locale === 'ar' ? "right-0" : "left-0"
            )} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(MobileMenu);
