"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowUp } from "react-icons/hi2";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 50, rotate: -45 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            rotate: 0,
            transition: { type: "spring", stiffness: 260, damping: 20 }
          }}
          exit={{ opacity: 0, scale: 0.5, y: 50, rotate: 15 }}
          whileHover={{ 
            y: -10,
            scale: 1.1,
            backgroundColor: "#ff0c0c",
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
          whileTap={{ scale: 0.9, y: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 z-[110] w-14 h-14 flex items-center justify-center bg-zinc-900 text-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] border border-white/5 backdrop-blur-xl group"
        >
          {/* Internal Glowing Pulse */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          />
          
          <HiArrowUp className="w-6 h-6 relative z-10 transition-transform group-hover:-translate-y-1" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
