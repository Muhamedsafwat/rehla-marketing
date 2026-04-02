"use client";

import React, { useRef, useState, useCallback, useMemo } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  glowColor?: string; 
}

export const GlowCard = ({ children, className, delay = 0, glowColor = "rgba(146, 11, 11, 0.35)" }: GlowCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth the mouse movement for the background glow
  const springX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 200 });

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || reducedMotion) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }, [mouseX, mouseY, reducedMotion]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Spotlight Background
  const background = useTransform(
    [springX, springY],
    ([x, y]) => `radial-gradient(450px circle at ${x}px ${y}px, ${glowColor}, transparent 80%)`
  );

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-10%" }}
      className={cn(
        "group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.015] p-10 backdrop-blur-3xl transition-colors duration-500",
        className
      )}
    >
      {!reducedMotion && (
        <motion.div
          className="pointer-events-none absolute -inset-px z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background }}
        />
      )}

      {!reducedMotion && (
        <motion.div
          className="pointer-events-none absolute -inset-px z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem] border-2 border-primary/30"
          style={{
            maskImage: useTransform(
              [springX, springY],
              ([x, y]) => `radial-gradient(120px circle at ${x}px ${y}px, black, transparent)`
            ),
            WebkitMaskImage: useTransform(
              [springX, springY],
              ([x, y]) => `radial-gradient(120px circle at ${x}px ${y}px, black, transparent)`
            ),
          }}
        />
      )}

      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-30" />
      
      <div className="relative z-30">
        {children}
      </div>
    </motion.div>
  );
};
