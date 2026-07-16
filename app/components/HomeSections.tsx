"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "./SiteShell";
import { ExpandableInfoCard, ExplorationCard } from "./InteractiveCards";
import { InteractiveProcess } from "./InteractiveProcess";
import { MOTION } from "./motion";
import { EmojiGlyph } from "./EmojiGlyph";

export function HeroSection() {
  return <section className="hero">
    <div className="hero-gradient"/>
    <div className="container hero-layout"><motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: MOTION.reveal, ease: MOTION.ease }}>
      <p className="eyebrow"><span/>Free • Student-led • Cabarrus County</p>
      <h1>Practical economics.<br/><em>Local impact.</em></h1>
      <p className="lead">Project Econ helps small businesses and organizations solve real problems by applying one focused economic concept at a time.</p>
      <a className="hero-prompt" href="#process" data-reading-delay="4500"><span className="hero-scroll-circle"><EmojiGlyph emoji="⬇️"/></span><span>Scroll to explore</span></a>
    </motion.div></div><div className="hero-fade"/>
  </section>;
}

export function DifferenceSection() {
  return <section id="difference" className="section community-section"><div className="container">
    <Reveal className="section-head"><p className="eyebrow">Why Project Econ is different</p><h2>Small enough to try. Clear enough to learn from.</h2><p>Open a card to see the principles behind every project.</p></Reveal>
    <Reveal className="expand-grid">
      <ExpandableInfoCard icon="💵" title="Free by design" summary="No fee or obligation" detail="Project Econ is a student-led learning initiative. Organizations contribute context and feedback, never a project fee."/>
      <ExpandableInfoCard icon="🧪" title="Experiment-sized" summary="One concept, one next step" detail="A narrow scope keeps each recommendation realistic to implement and makes the outcome easier to observe."/>
      <ExpandableInfoCard icon="📖" title="Openly documented" summary="Process and learning, not promises" detail="Completed work will explain the challenge, idea, implementation, result, and lesson—including what did not work."/>
    </Reveal>
    <Reveal className="process-next-wrap">
      <a className="process-next" href="#exploration" data-reading-delay="7000"><span><small>Keep exploring</small><strong>See the questions we could investigate</strong></span><i aria-hidden="true"><EmojiGlyph emoji="⬇️"/></i></a>
    </Reveal>
  </div></section>;
}

export function ExplorationSection() {
  return <section id="exploration" className="section future-section"><div className="container">
    <Reveal className="exploration-head"><div><p className="eyebrow">Areas we’re exploring</p><h2>Real questions, viewed through an economic lens.</h2></div><div><p>These are examples of the decisions a future project could investigate—not a fixed menu.</p><Link className="text-cta" href="/our-work">View Projects <EmojiGlyph emoji="➡️"/></Link></div></Reveal>
    <Reveal className="exploration-grid">
      <ExplorationCard icon="👆" title="Customer decisions" summary="How people compare and choose" problem="Customers view a service but rarely take the next step." question="Is the decision unclear or overloaded?" approach="Compare one simpler path with the current experience."/>
      <ExplorationCard icon="💰" title="Pricing" summary="How value is understood" problem="Customers hesitate even when the offer is competitive." question="How is the reference price shaping value?" approach="Test a clearer anchor, bundle, or price presentation."/>
      <ExplorationCard icon="👥" title="Participation" summary="What helps people take part" problem="A useful community program receives limited sign-ups." question="Which friction point prevents participation?" approach="Make one action easier to notice or complete."/>
      <ExplorationCard icon="🔁" title="Retention" summary="What brings people back" problem="First-time visitors rarely return." question="What supports follow-through after the first visit?" approach="Try one timely reminder or commitment cue."/>
      <ExplorationCard icon="🎛️" title="Choice architecture" summary="How options are arranged" problem="Too many service options slow customers down." question="Would a different choice structure reduce effort?" approach="Reorder, group, or simplify the available options."/>
      <ExplorationCard icon="🎯" title="Incentives" summary="What encourages action" problem="A desired action has little immediate motivation." question="Which reward matters, and when?" approach="Test one modest, well-timed incentive."/>
      <ExplorationCard icon="⚙️" title="Defaults" summary="The power of the starting option" problem="People abandon a setup with several equal paths." question="Could a helpful starting choice reduce friction?" approach="Offer a clear default while preserving alternatives."/>
      <ExplorationCard icon="🔒" title="Trust" summary="How confidence is built" problem="Visitors hesitate before contacting an unfamiliar organization." question="Which signals reduce uncertainty?" approach="Test clearer expectations, proof, or process language."/>
      <ExplorationCard icon="🏷️" title="Promotions" summary="How an offer gets attention" problem="A promotion is seen but not acted on." question="Does its frame make the value easy to understand?" approach="Compare one message or offer structure at a time."/>
      <ExplorationCard icon="📅" title="Appointment no-shows" summary="What improves follow-through" problem="Missed appointments create unused time." question="Which reminder or commitment cue might help?" approach="Try a timely confirmation or planning prompt."/>
    </Reveal>
    <Reveal className="process-next-wrap">
      <Link className="process-next" href="/our-work" data-reading-delay="10000"><span><small>Next</small><strong>See where future projects will live</strong></span><i aria-hidden="true"><EmojiGlyph emoji="➡️"/></i></Link>
    </Reveal>
  </div></section>;
}

export function HomePage() {
  return <><HeroSection/><InteractiveProcess/><DifferenceSection/><ExplorationSection/></>;
}
