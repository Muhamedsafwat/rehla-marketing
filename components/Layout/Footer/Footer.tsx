"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { HiArrowUpRight, HiOutlineEnvelope, HiOutlinePhone } from "react-icons/hi2";
import { contactData, socialsData, navLinksData } from "./Data/footer";

export const Footer = () => {
  const locale = useLocale();
  const isRtl = locale === "ar";
  
  const currentYear = new Date().getFullYear();

  // Micro-Container for Nav Links
  const PageTile = ({ label, icon: Icon, href, special }: { label: string; icon: any; href: string; special?: boolean }) => {
    const isExternal = href.startsWith('http');
    return (
    <Link 
      href={href} 
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(
        "group flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-300 w-full",
        special 
          ? "col-span-1 sm:col-span-3 bg-gradient-to-r from-primary/20 via-primary/5 to-transparent border border-primary/30 hover:border-primary hover:shadow-[0_0_20px_rgba(204,10,10,0.3)] shadow-[inset_0_0_20px_rgba(204,10,10,0.05)]" 
          : "col-span-1 bg-white/[0.03] border border-white/5 hover:border-primary/50 hover:bg-white/[0.06]"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-7 h-7 rounded-md border flex items-center justify-center transition-colors shrink-0",
          special 
            ? "bg-primary/20 border-primary/50 text-white group-hover:bg-primary group-hover:shadow-[0_0_15px_rgba(204,10,10,0.6)]" 
            : "bg-[#050505] border-white/10 text-zinc-300 group-hover:text-primary"
        )}>
           <Icon className="w-4 h-4" />
        </div>
        <span className={cn(
          "text-xs font-bold transition-colors tracking-wide uppercase",
          special ? "text-white" : "text-zinc-400 group-hover:text-white"
        )}>
          {label}
        </span>
      </div>
      
      {/* Dynamic Native RTL/LTR Arrow */}
      <HiArrowUpRight className={cn(
        "w-3.5 h-3.5 transition-transform duration-300",
        special ? "text-primary group-hover:text-white" : "text-zinc-600 group-hover:text-primary",
        "rtl:-scale-x-100 group-hover:ltr:translate-x-1 group-hover:ltr:-translate-y-1 group-hover:rtl:-translate-x-1 group-hover:rtl:-translate-y-1"
      )} />
    </Link>
    );
  };

  return (
    <footer className="relative w-full py-8 md:py-12 z-10 overflow-hidden flex justify-center">
      <div className="container px-4 sm:px-6 w-full max-w-6xl">
        
        {/* Main Compact Bento Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-10%" }}
          className="relative overflow-hidden rounded-[2rem] bg-[#050505] shadow-[0_0_60px_rgba(0,0,0,0.5)] border border-white/5 p-4 md:p-6 flex flex-col gap-4 md:gap-6"
        >
          {/* Subtle Ambient Architecture Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(204,10,10,0.06),transparent_60%)] pointer-events-none" />

          {/* Top Section: The Bento Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
            
            {/* Box 1: Brand & Conversational Contact (Larger Partition) */}
            <div className="lg:col-span-7 flex flex-col justify-between p-6 md:p-8 rounded-[1.5rem] bg-white/[0.015] border border-white/5">
              
              <div className={cn("flex flex-col gap-6", isRtl ? "text-right items-start" : "text-left items-start")}>
                <Image 
                  src="/Logos/White-Logo.png" 
                  alt="Rehla Marketing" 
                  width={130} 
                  height={45} 
                  className="opacity-90 hover:opacity-100 transition-opacity duration-500 cursor-pointer object-contain"
                />
                
                {/* Chill Conversational Text */}
                <h3 className={cn(
                  "text-lg md:text-xl font-light text-zinc-400 leading-relaxed md:leading-relaxed max-w-lg",
                  isRtl && "font-arabic"
                )}>
                  {isRtl ? (
                    <>هل أنتم مستعدون لبدء رحلة نجاحكم القادمة؟ لا تترددوا في التواصل معنا لمناقشة أفكاركم ومشاريعكم بشكل مباشر.</>
                  ) : (
                    <>Ready to embark on your next successful journey? Feel free to reach out and let's discuss your ideas directly.</>
                  )}
                </h3>
              </div>

              {/* Data Inner-Containers (Contact Modules) */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-8 md:mt-12 flex-wrap">
                {/* Email Container */}
                <a href={contactData.rawEmail} className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-[#080808] border border-white/5 hover:border-primary/50 transition-colors w-max">
                   <div className="w-8 h-8 rounded-full bg-white/[0.03] flex items-center justify-center text-zinc-300 group-hover:text-primary transition-colors shrink-0">
                      <HiOutlineEnvelope className="w-4 h-4" />
                   </div>
                   <span className="text-xs md:text-sm font-semibold text-white tracking-wide">{contactData.email}</span>
                </a>

                {/* Phone Container */}
                <a href={contactData.rawPhone} dir="ltr" className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-[#080808] border border-white/5 hover:border-primary/50 transition-colors w-max">
                   <div className="w-8 h-8 rounded-full bg-white/[0.03] flex items-center justify-center text-zinc-300 group-hover:text-primary transition-colors shrink-0">
                      <HiOutlinePhone className="w-4 h-4" />
                   </div>
                   <span className="text-xs md:text-sm font-semibold text-zinc-300 group-hover:text-white tracking-wide">{contactData.phone}</span>
                </a>
              </div>

            </div>

            {/* Right Group: Navigation & Socials Modules */}
            <div className="lg:col-span-5 flex flex-col gap-4 md:gap-6">
              
              {/* Box 2: Mini Pages Grid Container */}
              <div className="flex flex-col flex-1 p-6 md:p-8 rounded-[1.5rem] bg-white/[0.015] border border-white/5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 rounded-sm bg-primary/70 animate-pulse" />
                  <h4 className="text-[10px] font-black uppercase text-zinc-300 tracking-widest">
                    {isRtl ? "صفحات النظام" : "SYSTEM PAGES"}
                  </h4>
                </div>
                
                {/* Adaptive 3-Column Inner Partition grid for 4 pages. The special 'Contact' tile spans all 3 columns. */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                   {navLinksData.map((link) => (
                      <PageTile key={link.labelEn} label={isRtl ? link.labelAr : link.labelEn} icon={link.icon} href={link.href} special={link.special} />
                   ))}
                </div>
              </div>

              {/* Box 3: Socials Container */}
              <div className="flex flex-col p-6 md:p-8 rounded-[1.5rem] bg-white/[0.015] border border-white/5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 rounded-sm bg-primary/70 animate-pulse" />
                  <h4 className="text-[10px] font-black uppercase text-zinc-300 tracking-widest">
                    {isRtl ? "الشبكات الموثقة" : "VERIFIED NETWORKS"}
                  </h4>
                </div>

                <div className="flex flex-wrap gap-3 w-full">
                  {socialsData.map((social: any) => {
                    const SocialIcon = social.icon;
                    return (
                      <a 
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-1 items-center justify-center p-4 rounded-xl bg-[#080808] border border-white/5 hover:border-primary/50 hover:bg-primary/5 hover:shadow-[0_0_20px_rgba(204,10,10,0.1)] transition-all duration-300 min-w-[70px] shrink-0"
                      >
                        <SocialIcon className="w-5 h-5 text-zinc-300 group-hover:text-primary transition-colors duration-300 group-hover:scale-110" />
                      </a>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Row Credits Container */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 w-full px-6 py-5 rounded-2xl bg-white/[0.01] border border-white/5 text-[10px] md:text-xs font-bold tracking-widest uppercase text-zinc-300">
            <p>&copy; {currentYear} REHLA MARKETING</p>
            
            <p className="flex items-center gap-3">
              {isRtl ? "تطوير بواسطة" : "DEV BY"}
              <a 
                href="https://www.bsystemseg.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-primary transition-colors flex items-center gap-2 group"
              >
                BSYSTEMS 
                <HiArrowUpRight className="w-3 h-3 group-hover:animate-ping rtl:-scale-x-100" />
              </a>
            </p>
          </div>

        </motion.div>
      </div>
    </footer>
  );
};
