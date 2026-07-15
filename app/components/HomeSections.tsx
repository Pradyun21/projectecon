"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight, Building2, Check, CircleDollarSign, Compass, Lightbulb, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { CallToAction, Reveal } from "./SiteShell";
import { ExpandableInfoCard, GradientShapes } from "./InteractiveCards";
import { InteractiveProcess } from "./InteractiveProcess";
import { MOTION } from "./motion";

export function HeroSection() {
  return <section className="hero">
    <div className="hero-gradient"/>
    <div className="hero-grid-bg"/>
    <GradientShapes variant="navy"/>
    <motion.div className="hero-light hero-light-one" animate={{ x: [0, 16, 0], y: [0, -10, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}/>
    <motion.div className="hero-light hero-light-two" animate={{ x: [0, -12, 0], y: [0, 12, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}/>
    <div className="container hero-layout">
      <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: MOTION.reveal, ease: MOTION.ease }}>
        <p className="eyebrow"><span/>Free • Student-led • Cabarrus County</p>
        <h1>Practical economics.<br/><em>Local impact.</em></h1>
        <p className="lead">Project Econ helps small businesses and organizations solve real problems by applying one focused economic concept at a time.</p>
        <div className="hero-actions">
          <Link className="button" href="/work-with-us">Work With Us <ArrowRight size={18}/></Link>
          <a className="button button-secondary" href="#process">See How It Works <ArrowDown size={17}/></a>
        </div>
        <a className="hero-prompt" href="#process"><span>Click below to explore how Project Econ works.</span><ArrowDown size={17}/></a>
      </motion.div>
    </div>
    <div className="hero-fade"/>
  </section>;
}

export function MissionSection() {
  return <section className="section mission-section">
    <GradientShapes variant="blue"/>
    <div className="container">
      <div className="split">
        <Reveal><p className="eyebrow">Our mission</p><h2>Bring useful ideas out of the textbook.</h2></Reveal>
        <Reveal><p className="large-copy">We help small businesses and organizations in Cabarrus County apply economics to real problems.</p><p>Project Econ makes those ideas practical, accessible, and focused enough to try.</p><div className="mini-points"><span><Check/> Local first</span><span><Check/> Practical by design</span><span><Check/> Simple and focused</span></div></Reveal>
      </div>
      <Reveal className="expand-grid">
        <ExpandableInfoCard icon={MapPin} title="Local first" summary="Built around Cabarrus County" detail="We focus on nearby businesses and organizations so every conversation stays grounded in the community we know."/>
        <ExpandableInfoCard icon={Compass} title="Practical by design" summary="One useful next step" detail="We turn a broad challenge into one focused strategy that an organization can realistically try."/>
        <ExpandableInfoCard icon={Lightbulb} title="Simple and focused" summary="One concept at a time" detail="A narrow approach makes it easier to implement the idea, observe what happens, and learn from the result."/>
      </Reveal>
      <Reveal className="section-action"><span>Have a challenge worth exploring?</span><Link className="text-cta" href="/work-with-us">Work With Us <ArrowRight size={17}/></Link></Reveal>
    </div>
  </section>;
}

export function CommunitySection() {
  return <section className="section community-section">
    <GradientShapes variant="navy"/>
    <div className="container">
      <Reveal className="section-head"><p className="eyebrow">Built for the community</p><h2>Low friction. Real attention.</h2><p>Open either card to learn what working together looks like.</p></Reveal>
      <Reveal className="expand-grid expand-grid-two">
        <ExpandableInfoCard icon={CircleDollarSign} title="Completely free" summary="No fee and no obligation" detail="Project Econ does not charge businesses or organizations. The goal is to gain practical experience while helping the local community."/>
        <ExpandableInfoCard icon={Building2} title="Early partners welcome" summary="Small businesses and organizations" detail="We are looking for our first Cabarrus County partners. Completed projects will be documented on the Our Work page as the initiative grows."/>
      </Reveal>
      <Reveal className="community-action"><div><p className="eyebrow light">Start with a conversation</p><h3>Tell us what your organization is working through.</h3></div><Link className="button button-white" href="/work-with-us">Work With Us <ArrowRight size={18}/></Link></Reveal>
    </div>
  </section>;
}

export function HomePage() {
  return <><HeroSection/><MissionSection/><InteractiveProcess/><CommunitySection/><CallToAction/></>;
}
