"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { memo, useCallback, useRef, useState } from "react";
import { useLocale } from "next-intl";

const BrandLogo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 12 });
  const springY = useSpring(y, { stiffness: 200, damping: 12 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = logoRef.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.1);
    y.set((clientY - centerY) * 0.1);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0); y.set(0);
    setIsHovered(false);
  }, [x, y]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <Link 
      href="/" 
      className="group relative flex items-center h-12 focus:outline-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        ref={logoRef}
        style={{ x: springX, y: springY }}
        className="flex items-center bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 rounded-full px-4 py-2 transition-all duration-700 overflow-hidden"
      >
        {/* The Icon Part */}
        <div className="relative h-7 w-7 flex-shrink-0">
          <Image 
            src="/Logos/White-Logo.png"
            alt="R" 
            fill
            className="object-contain transition-all duration-700 group-hover:scale-110"
            priority
          />
        </div>

        {/* The Text Reveal Part - Adaptive Width */}
        <motion.div
           initial={{ width: 0, opacity: 0 }}
           animate={{ 
             width: (isHovered || typeof window !== 'undefined' && window.innerWidth < 1024) ? "auto" : 0, 
             opacity: (isHovered || typeof window !== 'undefined' && window.innerWidth < 1024) ? 1 : 0,
             marginLeft: (isHovered || typeof window !== 'undefined' && window.innerWidth < 1024) ? 12 : 0
           }}
           transition={{ type: "spring", stiffness: 100, damping: 20 }}
           className="whitespace-nowrap overflow-hidden"
        >
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white">
              {useLocale() === 'ar' ? "رحلة" : "REHLA"}
            </span>
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default memo(BrandLogo);
