"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MOTION } from "./motion";
import { BrandLockup } from "./BrandLockup";

const INTRO_KEY = "project-econ-intro-seen";
const INTRO_DURATION = 3550;
const MOBILE_LANDING_DELAY = 1200;
const MOBILE_INTRO_DURATION = 2300;

type Target = { x: number; y: number; scale: number };

export function BrandIntro({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);
  const [landing, setLanding] = useState(false);
  const [revealSite, setRevealSite] = useState(false);
  const [target, setTarget] = useState<Target>({ x: 0, y: 0, scale: 0.2 });
  const iconStage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadySeen = window.sessionStorage.getItem(INTRO_KEY) === "true";
    const mobileIntro = window.matchMedia("(max-width: 760px)").matches;

    if (reducedMotion || alreadySeen) {
      document.documentElement.removeAttribute("data-intro");
      window.requestAnimationFrame(() => { setRevealSite(true); setShowIntro(false); });
      return;
    }

    document.documentElement.dataset.intro = "active";
    function measureTarget() {
      const stage = iconStage.current?.getBoundingClientRect();
      const introIcon = iconStage.current?.querySelector<HTMLElement>(".brand-logo-art")?.getBoundingClientRect();
      const navIcon = document.querySelector<HTMLElement>(".brand .brand-logo-art")?.getBoundingClientRect();
      if (!stage || !introIcon || !navIcon) return;
      if (window.matchMedia("(max-width: 760px)").matches) {
        setTarget({
          x: navIcon.left + navIcon.width / 2 - window.innerWidth / 2,
          y: navIcon.top + navIcon.height / 2 - window.innerHeight / 2,
          scale: navIcon.height / iconStage.current!.offsetHeight,
        });
        return;
      }
      const scale = navIcon.height / introIcon.height;
      const stageCenterX = stage.left + stage.width / 2;
      const stageCenterY = stage.top + stage.height / 2;
      setTarget({
        x: navIcon.left + navIcon.width / 2 - stageCenterX - scale * (introIcon.left + introIcon.width / 2 - stageCenterX),
        y: navIcon.top + navIcon.height / 2 - stageCenterY - scale * (introIcon.top + introIcon.height / 2 - stageCenterY),
        scale,
      });
    }

    const frame = window.requestAnimationFrame(measureTarget);
    window.addEventListener("resize", measureTarget);
    const visualViewport = mobileIntro ? window.visualViewport : null;
    visualViewport?.addEventListener("resize", measureTarget);
    const landingTimer = window.setTimeout(() => { measureTarget(); setRevealSite(true); setLanding(true); }, mobileIntro ? MOBILE_LANDING_DELAY : 2450);
    const finishTimer = window.setTimeout(() => {
      window.sessionStorage.setItem(INTRO_KEY, "true");
      document.documentElement.removeAttribute("data-intro");
      setShowIntro(false);
    }, mobileIntro ? MOBILE_INTRO_DURATION : INTRO_DURATION);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", measureTarget);
      visualViewport?.removeEventListener("resize", measureTarget);
      [landingTimer, finishTimer].forEach(window.clearTimeout);
      document.documentElement.removeAttribute("data-intro");
    };
  }, []);

  return <>
    <motion.div className="site-experience" initial={false} animate={{ opacity: revealSite ? 1 : 0 }} transition={{ duration: 0.9, ease: MOTION.ease }} aria-hidden={!revealSite}>
      {children}
    </motion.div>
    <AnimatePresence>
      {showIntro && <motion.div className="brand-intro" aria-hidden="true" exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
        <motion.div className="brand-intro-backdrop" animate={{ opacity: landing ? 0 : 1 }} transition={{ duration: 1, ease: MOTION.ease }}/>
        <svg className="intro-environment" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <path d="M-120 90C250 5 490 170 800 125S1210 20 1560 175L1560 320C1190 190 1040 290 790 280S250 125-120 245Z"/>
          <path d="M1560 120C1250 150 1100 330 840 420S350 470-120 700L-120 850C380 630 650 650 920 545S1270 335 1560 315Z"/>
          <path d="M310-100C380 150 520 300 700 455S990 735 1160 980L960 980C800 790 585 650 465 500S150 150 85-100Z"/>
        </svg>
        <div className="intro-stage-viewport">
          <motion.div ref={iconStage} className={`intro-lockup-stage ${landing ? "is-landing" : ""}`} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, x: landing ? target.x : 0, y: landing ? target.y : 0, scale: landing ? target.scale : 1 }} transition={landing ? { duration: 1, ease: MOTION.ease } : { duration: 0.42, ease: MOTION.ease }}>
            <BrandLockup className="brand-lockup-intro" />
          </motion.div>
        </div>
      </motion.div>}
    </AnimatePresence>
  </>;
}
