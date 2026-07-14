"use client";
import Link from "next/link";
import { ArrowDown, ArrowRight, Building2, Check, CircleDollarSign, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { concepts } from "../data/concepts";
import { CallToAction, Reveal } from "./SiteShell";

const steps = [
  ["Connect", "Every week, we try to connect with one local business or organization."],
  ["Understand the problem", "We listen through a meeting, email, call, or text—and may point out issues we notice."],
  ["Choose one concept", "We pick the economic or behavioral economic idea that best fits the situation."],
  ["Suggest a strategy", "We turn that concept into a practical, focused suggestion."],
  ["Help implement it", "We help apply the strategy during a one-week time frame."],
  ["Review the results", "The organization reviews what happened and can contact us about next steps."],
];

export function HeroSection(){return <section className="hero"><div className="hero-grid-bg"/><motion.div className="hero-orbit orbit-a" animate={{rotate:360}} transition={{duration:34,repeat:Infinity,ease:"linear"}}/><motion.div className="hero-orbit orbit-b" animate={{rotate:-360}} transition={{duration:46,repeat:Infinity,ease:"linear"}}/><div className="container hero-layout"><motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:.7}}><p className="eyebrow"><span/>Free • Student-led • Cabarrus County</p><h1>Practical economics.<br/><em>Local impact.</em></h1><p className="lead">Project Econ helps small businesses and organizations solve real problems by applying one focused economic concept at a time.</p><div className="hero-actions"><Link className="button" href="/contact">Work With Us <ArrowRight size={18}/></Link><a className="text-link" href="#process">See How It Works <ArrowDown size={17}/></a></div></motion.div><motion.div className="hero-visual" initial={{opacity:0,scale:.94}} animate={{opacity:1,scale:1}} transition={{duration:.8,delay:.15}}><div className="visual-card card-main"><span>ONE WEEK / ONE IDEA</span><strong>A small, focused experiment.</strong><p>Listen → Apply → Learn</p></div><motion.div className="visual-card card-float" animate={{y:[0,-10,0]}} transition={{duration:4,repeat:Infinity}}><Sparkles/><span>Economics made useful</span></motion.div><div className="node n1"/><div className="node n2"/><div className="node n3"/></motion.div></div></section>}

export function MissionSection(){return <section className="section"><div className="container split"><Reveal><p className="eyebrow">Our Mission</p><h2>Bring useful ideas out of the textbook.</h2></Reveal><Reveal><p className="large-copy">Our mission is to help small businesses and organizations in Cabarrus County by taking economic concepts and applying them to real problems.</p><p>We want to make economics more useful, practical, and accessible for organizations in our community.</p><div className="mini-points"><span><Check/> Local first</span><span><Check/> Practical by design</span><span><Check/> Simple and focused</span></div></Reveal></div></section>}

export function ProcessTimeline(){return <section id="process" className="section process-section"><div className="container"><Reveal className="section-head"><p className="eyebrow">How it works</p><h2>One problem. One concept. One week.</h2><p>A clear, six-step process designed to keep the work practical.</p></Reveal><div className="timeline">{steps.map((s,i)=><Reveal className="step" key={s[0]}><div className="step-num">{String(i+1).padStart(2,"0")}</div><div><h3>{s[0]}</h3><p>{s[1]}</p></div></Reveal>)}</div></div></section>}

export function FreeSupport(){return <section className="section"><div className="container"><Reveal className="free-card"><div className="free-icon"><CircleDollarSign/></div><div><p className="eyebrow">No cost</p><h2>Everything we do is completely free.</h2><p>Project Econ does not charge businesses or organizations. Our goal is to gain experience applying economics while helping our local community.</p><small>Project Econ offers educational recommendations. Results are not guaranteed.</small></div></Reveal></div></section>}

export function ConceptsSection(){return <section className="section concepts-section"><div className="container"><Reveal className="section-head"><p className="eyebrow">Our toolkit</p><h2>Ideas we may put to work.</h2><p>The right concept depends entirely on the problem an organization is facing.</p></Reveal><div className="concept-grid">{concepts.map((c,i)=><Reveal className="concept-card" key={c.name}><span>{String(i+1).padStart(2,"0")}</span><h3>{c.name}</h3><p>{c.definition}</p></Reveal>)}</div></div></section>}

export function CompaniesSection(){return <section className="section"><div className="container"><Reveal className="empty-card"><div className="empty-icon"><Building2/></div><p className="eyebrow">Early partners wanted</p><h2>Businesses and Organizations We Have Worked With</h2><p>We are currently looking for our first local businesses and organizations to work with. Completed projects will be added here soon.</p><Link className="button" href="/contact">Become an Early Partner <ArrowRight size={18}/></Link></Reveal></div></section>}

export function HomePage(){return <><HeroSection/><MissionSection/><ProcessTimeline/><FreeSupport/><ConceptsSection/><CompaniesSection/><CallToAction/></>}
