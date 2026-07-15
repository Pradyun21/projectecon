"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const INTRO_KEY = "project-econ-intro-seen";

export function BrandIntro({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadySeen = window.sessionStorage.getItem(INTRO_KEY) === "true";

    if (reducedMotion || alreadySeen) {
      window.requestAnimationFrame(() => setShowIntro(false));
      return;
    }

    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem(INTRO_KEY, "true");
      setShowIntro(false);
    }, 2100);

    return () => window.clearTimeout(timer);
  }, []);

  return <>
    <motion.div className="site-experience" initial={false} animate={{ opacity: showIntro ? 0 : 1 }} transition={{ duration: .45 }} aria-hidden={showIntro}>
      {children}
    </motion.div>
    <AnimatePresence>
      {showIntro && <motion.div className="brand-intro" aria-hidden="true" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .35 }}>
        <motion.div className="intro-glow" animate={{ scale: [1, 1.12, 1], opacity: [.45, .8, .35] }} transition={{ duration: 1.8, ease: "easeInOut" }}/>
        <motion.div className="intro-full-logo" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: [0, 1, 1, 0], scale: [.94, 1, 1, .96], x: [0, 0, 0, 18] }} transition={{ duration: 1.05, times: [0, .22, .64, 1], ease: [0.22, 1, 0.36, 1] }}>
          <Image src="/project-econ.png" alt="" width={430} height={215} priority unoptimized/>
        </motion.div>
        <motion.div className="intro-p-logo" initial={{ opacity: 0, scale: .92, x: 0, y: 0 }} animate={{ opacity: [0, 1, 1], scale: [.92, 1, .19], x: [0, 0, "calc(-50vw + 43px)"], y: [0, 0, "calc(-50vh + 39px)"] }} transition={{ duration: 1.35, delay: .62, times: [0, .24, 1], ease: [0.22, 1, 0.36, 1] }}>
          <Image src="/project-econ-p.png" alt="" width={250} height={250} priority unoptimized/>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  </>;
}
