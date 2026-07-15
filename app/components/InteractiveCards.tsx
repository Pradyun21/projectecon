"use client";

import type { LucideIcon } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import { MOTION } from "./motion";

export function ExpandableInfoCard({ icon: Icon, title, summary, detail }: { icon: LucideIcon; title: string; summary: string; detail: string }) {
  const [open, setOpen] = useState(false);
  const regionId = useId();
  return <motion.article className={`expand-card ${open ? "is-open" : ""}`} whileHover={{ y: -4 }} transition={{ duration: MOTION.fast, ease: MOTION.ease }}>
    <button type="button" aria-expanded={open} aria-controls={regionId} onClick={() => setOpen(value => !value)}>
      <span className="expand-icon"><Icon/></span>
      <span className="expand-copy"><strong>{title}</strong><small>{summary}</small></span>
      <ChevronDown className="expand-chevron"/>
    </button>
    <AnimatePresence initial={false}>
      {open && <motion.div id={regionId} className="expand-detail" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: MOTION.base, ease: MOTION.ease }}><p>{detail}</p></motion.div>}
    </AnimatePresence>
  </motion.article>;
}

export function GradientShapes({ variant = "blue" }: { variant?: "blue" | "navy" }) {
  return <div className={`gradient-shapes gradient-shapes-${variant}`} aria-hidden="true"><span/><span/><span/></div>;
}
