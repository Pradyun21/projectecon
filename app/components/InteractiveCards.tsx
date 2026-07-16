"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useRef, useState } from "react";
import { MOTION } from "./motion";
import { EmojiGlyph } from "./EmojiGlyph";

export function ExpandableInfoCard({ icon, title, summary, detail }: { icon: string; title: string; summary: string; detail: string }) {
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
      <span className="expand-icon"><EmojiGlyph emoji={icon}/></span>
      <span className="expand-copy"><strong>{title}</strong><small>{summary}</small></span>
      <EmojiGlyph emoji="🔽" className="expand-chevron"/>
    </button>
    <AnimatePresence initial={false}>
      {open && <motion.div id={regionId} className="expand-detail" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: MOTION.base, ease: MOTION.ease }}><p>{detail}</p></motion.div>}
    </AnimatePresence>
  </motion.article>;
}

export function ExplorationCard({ icon, title, summary, problem, question, approach }: { icon: string; title: string; summary: string; problem: string; question: string; approach: string }) {
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
      <span className="explore-icon"><EmojiGlyph emoji={icon}/></span><span><strong>{title}</strong><small>{summary}</small></span><EmojiGlyph emoji="🔽" className="expand-chevron"/>
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
    <ExpandableInfoCard icon="📖" title="A practical discipline" summary="More than economic theory" detail="Smith and Keynes helped shape the field, but economics is also a practical tool for understanding incentives, behavior, tradeoffs, and business performance."/>
    <ExpandableInfoCard icon="🤝" title="A growing local network" summary="Empower businesses through partnership" detail="Project Econ aims to empower local businesses while building a growing network of government institutions, support organizations, and entrepreneurs."/>
    <ExpandableInfoCard icon="📈" title="A replicable model" summary="Begin locally, expand responsibly" detail="The long-term vision is a growing partnership model that can be replicated across the Tar Heel State and beyond."/>
  </div>;
}
