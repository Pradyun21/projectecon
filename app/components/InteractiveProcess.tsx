"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { Reveal } from "./SiteShell";
import { MOTION } from "./motion";
import { EmojiGlyph } from "./EmojiGlyph";

export const processSteps = [
  { title: "Connect", short: "Start a local conversation", icon: "🤝", detail: "We connect with a local business or organization through a conversation, meeting, email, phone call, or text." },
  { title: "Understand", short: "Find the real challenge", icon: "🔍", detail: "We learn about the challenge they are facing or identify a possible issue we notice." },
  { title: "Choose", short: "Match one useful idea", icon: "💡", detail: "We decide which economic or behavioral economic concept best fits the problem." },
  { title: "Suggest", short: "Recommend a practical move", icon: "💬", detail: "We analyze the situation and recommend one practical strategy." },
  { title: "Implement", short: "Put it into practice", icon: "🔧", detail: "We help the organization apply the strategy during a one-week time frame." },
  { title: "Review", short: "Learn from what happened", icon: "📈", detail: "The organization reviews what happened and can contact us again if they want to continue working with Project Econ." },
];

export function InteractiveProcess() {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const selected = processSteps[active];

  function moveTo(index: number) {
    const next = (index + processSteps.length) % processSteps.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  return <section id="process" className="section process-section">
    <div className="container process-container">
      <Reveal className="section-head"><p className="eyebrow">How it works</p><h2>From a real problem to a tested next step.</h2><p>Choose any point in the journey to see how one focused idea moves forward.</p></Reveal>
      <div className="journey-shell">
        <div className="journey-track" aria-hidden="true"><motion.span animate={{ width: `${(active / (processSteps.length - 1)) * 100}%` }} transition={{ duration: MOTION.base, ease: MOTION.ease }}/></div>
        <div className="journey-nodes" role="tablist" aria-label="Project Econ process">
          {processSteps.map((step, index) => {
            return <button ref={element => { tabs.current[index] = element; }} key={step.title} id={`journey-tab-${index}`} type="button" role="tab" aria-selected={active === index} aria-controls="journey-detail" tabIndex={active === index ? 0 : -1} className={active === index ? "active" : ""} onClick={() => setActive(index)} onKeyDown={event => {
              if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); moveTo(active + 1); }
              if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); moveTo(active - 1); }
              if (event.key === "Home") { event.preventDefault(); moveTo(0); }
              if (event.key === "End") { event.preventDefault(); moveTo(processSteps.length - 1); }
            }}>
              <span className="journey-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="journey-node"><EmojiGlyph emoji={step.icon}/></span>
              <span className="journey-label"><strong>{step.title}</strong><small>{step.short}</small></span>
            </button>;
          })}
        </div>
        <div id="journey-detail" className="journey-detail" role="tabpanel" aria-labelledby={`journey-tab-${active}`} aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div key={selected.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: MOTION.base, ease: MOTION.ease }}>
              <span className="journey-kicker">Step {active + 1} of {processSteps.length}</span><h3>{selected.title}</h3><p>{selected.detail}</p>
            </motion.div>
          </AnimatePresence>
          <div className="journey-progress" aria-hidden="true"><span style={{ width: `${((active + 1) / processSteps.length) * 100}%` }}/></div>
        </div>
      </div>
      <Reveal className="signature-visual">
        <div><span className="signature-icon"><EmojiGlyph emoji="💡"/></span><strong>Idea</strong><small>Choose one useful concept</small></div>
        <motion.span className="signature-flow" aria-hidden="true"><motion.i animate={{ x: ["-100%", "260%"] }} transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 0.7, ease: "easeInOut" }}/></motion.span>
        <div><span className="signature-icon"><EmojiGlyph emoji="🔧"/></span><strong>Experiment</strong><small>Try one practical change</small></div>
        <motion.span className="signature-flow" aria-hidden="true"><motion.i animate={{ x: ["-100%", "260%"] }} transition={{ duration: 2.8, delay: 0.55, repeat: Infinity, repeatDelay: 0.7, ease: "easeInOut" }}/></motion.span>
        <div><span className="signature-icon"><EmojiGlyph emoji="📈"/></span><strong>Learning</strong><small>Observe and document</small></div>
      </Reveal>
      <Reveal className="process-next-wrap">
        <a className="process-next" href="#difference" data-reading-delay="9000">
          <span><small>Continue exploring</small><strong>See why Project Econ is different</strong></span>
          <i aria-hidden="true"><EmojiGlyph emoji="⬇️"/></i>
        </a>
      </Reveal>
    </div>
  </section>;
}
