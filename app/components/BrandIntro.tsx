"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MOTION } from "./motion";

const INTRO_KEY = "project-econ-intro-seen";
const INTRO_DURATION = 2100;

type Target = { x: number; y: number; scale: number };

export function BrandIntro({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);
  const [landing, setLanding] = useState(false);
  const [revealSite, setRevealSite] = useState(false);
  const [target, setTarget] = useState<Target>({ x: 0, y: 0, scale: 0.2 });
  const logoStage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadySeen = window.sessionStorage.getItem(INTRO_KEY) === "true";

    if (reducedMotion || alreadySeen) {
      document.documentElement.removeAttribute("data-intro");
      window.requestAnimationFrame(() => { setRevealSite(true); setShowIntro(false); });
      return;
    }

    document.documentElement.dataset.intro = "active";
    function measureTarget() {
      const stage = logoStage.current?.getBoundingClientRect();
      const navLogo = document.querySelector<HTMLElement>(".brand-full")?.getBoundingClientRect();
      if (!stage || !navLogo) return;
      const scale = navLogo.height / stage.height;
      setTarget({ x: navLogo.left + navLogo.width / 2 - (stage.left + stage.width / 2), y: navLogo.top + navLogo.height / 2 - (stage.top + stage.height / 2), scale });
    }

    const frame = window.requestAnimationFrame(measureTarget);
    window.addEventListener("resize", measureTarget);
    const siteTimer = window.setTimeout(() => setRevealSite(true), 900);
    const landingTimer = window.setTimeout(() => { measureTarget(); setLanding(true); }, 910);
    const finishTimer = window.setTimeout(() => {
      window.sessionStorage.setItem(INTRO_KEY, "true");
      document.documentElement.removeAttribute("data-intro");
      setShowIntro(false);
    }, INTRO_DURATION);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", measureTarget);
      window.clearTimeout(siteTimer); window.clearTimeout(landingTimer); window.clearTimeout(finishTimer);
      document.documentElement.removeAttribute("data-intro");
    };
  }, []);

  return <>
    <motion.div className="site-experience" initial={false} animate={{ opacity: revealSite ? 1 : 0 }} transition={{ duration: 0.82, ease: MOTION.ease }} aria-hidden={!revealSite}>
      {children}
    </motion.div>
    <AnimatePresence>
      {showIntro && <div className="brand-intro" aria-hidden="true">
        <motion.div className="brand-intro-backdrop" initial={{ opacity: 1 }} animate={{ opacity: landing ? 0 : 1 }} transition={{ duration: 0.9, ease: MOTION.ease }}/>
        <motion.div ref={logoStage} className="intro-drop-logo" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, x: landing ? target.x : 0, y: landing ? target.y : 0, scale: landing ? target.scale : 1 }} transition={landing ? { duration: 1, ease: MOTION.ease } : { duration: 0.4, ease: MOTION.ease }}>
          <motion.span className="intro-illumination" initial={{ opacity: 0, scale: 0.94 }} animate={landing ? { opacity: 0, scale: 0.88 } : { opacity: [0, 0, 0.42], scale: [0.94, 0.94, 1.01] }} transition={landing ? { duration: 0.9, ease: MOTION.ease } : { duration: 0.9, times: [0, 0.56, 1], ease: "easeOut" }}/>
          <motion.span className="intro-logo-sharp" initial={{ opacity: 0, filter: "brightness(1)" }} animate={landing ? { opacity: 1, filter: "brightness(1)" } : { opacity: [0, 1, 1], filter: ["brightness(1)", "brightness(1)", "brightness(1.045)"] }} transition={landing ? { duration: 0.9, ease: MOTION.ease } : { duration: 0.9, times: [0, 0.44, 1], ease: "easeOut" }}><Image className="intro-complete-logo" src="/project-econ.png" alt="" width={560} height={320} priority unoptimized/></motion.span>
        </motion.div>
      </div>}
    </AnimatePresence>
  </>;
}
