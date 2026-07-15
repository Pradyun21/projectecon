"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MOTION } from "./motion";

const INTRO_KEY = "project-econ-intro-seen";
const INTRO_DURATION = 2050;

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
    }, INTRO_DURATION);

    return () => window.clearTimeout(timer);
  }, []);

  return <>
    <motion.div className="site-experience" initial={false} animate={{ opacity: showIntro ? 0 : 1 }} transition={{ duration: MOTION.base, ease: MOTION.ease }} aria-hidden={showIntro}>
      {children}
    </motion.div>
    <AnimatePresence>
      {showIntro && <motion.div className="brand-intro" aria-hidden="true" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: MOTION.base, ease: MOTION.ease }}>
        <motion.div className="intro-glow" animate={{ scale: [0.96, 1.08, 1], opacity: [0.35, 0.7, 0.38] }} transition={{ duration: 1.8, ease: "easeInOut" }}/>
        <motion.div className="intro-full-logo" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: [0, 1, 1, 0], scale: [0.95, 1, 1, 0.98] }} transition={{ duration: 1.55, times: [0, 0.16, 0.82, 1], ease: MOTION.ease }}>
          <Image className="intro-logo-image" src="/project-econ.png" alt="" width={560} height={320} priority unoptimized/>
          {["one", "two", "three"].map((ray, index) => <motion.span key={ray} className={`intro-ray intro-ray-${ray}`} initial={{ opacity: 0.15, scale: 0.75 }} animate={{ opacity: [0.15, 1, 0.35], scale: [0.75, 1.08, 1] }} transition={{ duration: 0.42, delay: 0.42 + index * 0.18, ease: MOTION.ease }}><Image src="/project-econ.png" alt="" width={560} height={320} priority unoptimized/></motion.span>)}
        </motion.div>
        <motion.div className="intro-p-logo" initial={{ opacity: 0, scale: 0.88, x: 0, y: 0 }} animate={{ opacity: [0, 1, 1], scale: [0.88, 1, 0.18], x: [0, 0, "calc(-50vw + 43px)"], y: [0, 0, "calc(-50vh + 40px)"] }} transition={{ duration: 0.82, delay: 1.2, times: [0, 0.24, 1], ease: MOTION.ease }}>
          <Image src="/project-econ-p.png" alt="" width={260} height={260} priority unoptimized/>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  </>;
}
