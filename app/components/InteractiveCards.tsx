"use client";

import type { LucideIcon } from "lucide-react";
import { BookOpen, ChevronDown, Eye, HeartHandshake } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useId, useRef, useState } from "react";
import { MOTION } from "./motion";

export function ExpandableInfoCard({ icon: Icon, title, summary, detail }: { icon: LucideIcon; title: string; summary: string; detail: string }) {
  const [open, setOpen] = useState(false);
  const regionId = useId();
  const card = useRef<HTMLElement>(null);
  function toggle() {
    const next = !open;
    setOpen(next);
    if (next) window.setTimeout(() => card.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" }), 320);
  }
  return <motion.article ref={card} className={`expand-card ${open ? "is-open" : ""}`} whileHover={{ y: -4 }} transition={{ duration: MOTION.fast, ease: MOTION.ease }}>
    <button type="button" aria-expanded={open} aria-controls={regionId} onClick={toggle}>
      <span className="expand-icon"><Icon/></span>
      <span className="expand-copy"><strong>{title}</strong><small>{summary}</small></span>
      <ChevronDown className="expand-chevron"/>
    </button>
    <AnimatePresence initial={false}>
      {open && <motion.div id={regionId} className="expand-detail" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: MOTION.base, ease: MOTION.ease }}><p>{detail}</p></motion.div>}
    </AnimatePresence>
  </motion.article>;
}

export function ExplorationCard({ icon: Icon, title, summary, problem, question, approach }: { icon: LucideIcon; title: string; summary: string; problem: string; question: string; approach: string }) {
  const [open, setOpen] = useState(false);
  const regionId = useId();
  const card = useRef<HTMLElement>(null);
  function toggle() {
    const next = !open;
    setOpen(next);
    if (next) window.setTimeout(() => card.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" }), 320);
  }
  return <motion.article ref={card} className={`explore-card ${open ? "is-open" : ""}`} layout transition={{ duration: MOTION.base, ease: MOTION.ease }}>
    <button type="button" aria-expanded={open} aria-controls={regionId} onClick={toggle}>
      <span className="explore-icon"><Icon/></span><span><strong>{title}</strong><small>{summary}</small></span><ChevronDown className="expand-chevron"/>
    </button>
    <AnimatePresence initial={false}>{open && <motion.div id={regionId} className="explore-detail" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: MOTION.base, ease: MOTION.ease }}>
      <dl><div><dt>Local problem</dt><dd>{problem}</dd></div><div><dt>Economic question</dt><dd>{question}</dd></div><div><dt>Possible approach</dt><dd>{approach}</dd></div></dl>
    </motion.div>}</AnimatePresence>
  </motion.article>;
}

export function GradientShapes({ variant = "blue" }: { variant?: "blue" | "navy" }) {
  return <div className={`gradient-shapes gradient-shapes-${variant}`} aria-hidden="true"><span/><span/><span/></div>;
}

export function AboutPrincipleCards() {
  return <div className="expand-grid">
    <ExpandableInfoCard icon={Eye} title="A useful local library" summary="The long-term vision" detail="Build a clear collection of small local case studies that makes applied economics easier for others to understand."/>
    <ExpandableInfoCard icon={HeartHandshake} title="Respect the partner" summary="Listen before recommending" detail="Treat every organization’s context, time, and decisions with care. A suggestion should fit the situation—not the other way around."/>
    <ExpandableInfoCard icon={BookOpen} title="Document the truth" summary="Learning over perfect results" detail="Share what was tried and what happened without overstating certainty. Useful learning includes unexpected and inconclusive outcomes."/>
  </div>;
}
