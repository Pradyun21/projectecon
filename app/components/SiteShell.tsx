"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandIntro } from "./BrandIntro";
import { BrandLockup } from "./BrandLockup";
import { MOTION } from "./motion";

const links = [{ href: "/", label: "Home" }, { href: "/our-work", label: "Projects" }, { href: "/about", label: "About" }];
const workWithUs = { href: "/work-with-us", label: "Work With Us" };

const glassRibbonPaths = [
  { tone: "pale whisper", body: "M-180 70C210-10 510 120 820 90S1220 0 1620 125L1620 300C1225 170 1080 280 805 275S210 115-180 260Z", edge: "M-180 70C210-10 510 120 820 90S1220 0 1620 125" },
  { tone: "blue whisper", body: "M1430-130C1320 120 1310 340 1195 550S900 900 760 1140L540 1140C685 820 925 650 1025 475S1130 105 1220-130Z", edge: "M1430-130C1320 120 1310 340 1195 550S900 900 760 1140" },
  { tone: "warm far", body: "M-190 310C185 190 465 255 735 300S1190 330 1620 180L1620 365C1195 500 980 460 710 430S180 345-190 500Z", edge: "M-190 310C185 190 465 255 735 300S1190 330 1620 180" },
  { tone: "pale far", body: "M90-140C170 120 315 280 485 445S730 790 810 1140L610 1140C530 870 365 700 250 530S-30 155-115-140Z", edge: "M90-140C170 120 315 280 485 445S730 790 810 1140" },
  { tone: "blue far", body: "M760-140C820 105 785 290 900 455S1190 720 1580 875L1515 1090C1070 900 795 720 675 535S635 105 565-140Z", edge: "M760-140C820 105 785 290 900 455S1190 720 1580 875" },
  { tone: "warm", body: "M-190 585C175 455 455 520 735 505S1200 355 1620 400L1620 590C1200 560 1015 675 745 685S175 590-190 775Z", edge: "M-190 585C175 455 455 520 735 505S1200 355 1620 400" },
  { tone: "pale", body: "M1600 80C1280 105 1105 260 850 365S350 425-180 655L-180 895C370 650 650 640 935 530S1295 275 1600 285Z", edge: "M1600 80C1280 105 1105 260 850 365S350 425-180 655" },
  { tone: "blue accent", body: "M-190 5C145 100 385 330 690 470S1180 680 1620 900L1620 1115C1135 900 790 770 535 635S95 270-190 245Z", edge: "M-190 5C145 100 385 330 690 470S1180 680 1620 900" },
  { tone: "warm near", body: "M-190 800C170 650 435 750 720 675S1160 420 1620 520L1620 740C1180 625 1040 770 760 865S175 820-190 1015Z", edge: "M-190 800C170 650 435 750 720 675S1160 420 1620 520" },
  { tone: "pale near", body: "M1190-140C1090 110 930 285 735 415S350 690-70 920L-70 1140C405 860 635 690 845 555S1260 160 1380-140Z", edge: "M1190-140C1090 110 930 285 735 415S350 690-70 920" },
  { tone: "warm accent", body: "M-180 165C200 55 475 165 760 175S1190 120 1620 245L1620 420C1200 300 1040 355 755 350S185 210-180 355Z", edge: "M-180 165C200 55 475 165 760 175S1190 120 1620 245" },
  { tone: "blue near", body: "M520-140C575 110 550 310 660 485S950 780 1390 1010L1260 1140C865 925 610 735 505 555S430 115 350-140Z", edge: "M520-140C575 110 550 310 660 485S950 780 1390 1010" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <header className={`nav-wrap ${scrolled ? "is-scrolled" : ""}`}><nav className="nav container" aria-label="Main navigation">
    <Link href="/" className="brand" aria-label="Project Econ home"><BrandLockup /></Link>
    <div className="nav-links">{links.map(l => <Link key={l.href} className={pathname === l.href ? "active" : ""} href={l.href}>{l.label}</Link>)}<Link className={`button button-small ${pathname === workWithUs.href ? "is-current" : ""}`} href={workWithUs.href}>{workWithUs.label} <ArrowUpRight size={16}/></Link></div>
    <button className="menu-button" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-label="Toggle navigation">{open ? <X/> : <Menu/>}</button>
  </nav><AnimatePresence>{open && <motion.div className="mobile-menu" initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{ duration: MOTION.base, ease: MOTION.ease }}>{links.map(l => <Link key={l.href} className={pathname === l.href ? "active" : ""} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>)}<Link className="button" href={workWithUs.href} onClick={() => setOpen(false)}>{workWithUs.label}</Link></motion.div>}</AnimatePresence></header>
}

export function Footer() { return <footer><div className="container footer-grid"><div><Link href="/" className="footer-brand" aria-label="Project Econ home"><BrandLockup /></Link><p>A student-led initiative applying economics to real local problems—one focused concept at a time.</p></div><div><h3>Explore</h3>{[...links, workWithUs].map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}</div><div><h3>Local to</h3><p>Cabarrus County,<br/>North Carolina</p><Link className="footer-cta" href={workWithUs.href}>Start a conversation <ArrowUpRight size={15}/></Link></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Project Econ</span><p>Project Econ provides free, student-led, educational recommendations. Results are not guaranteed, and each business or organization is responsible for its own decisions.</p></div></footer> }

function AmbientBackground() {
  return <div className="ambient-background" aria-hidden="true">
    <svg className="flow-field" viewBox="0 0 1440 1000" preserveAspectRatio="none">
      <defs>
        <linearGradient id="glassBlue" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff" stopOpacity=".18"/><stop offset=".5" stopColor="#9ed4ff" stopOpacity=".3"/><stop offset="1" stopColor="#f8ead6" stopOpacity=".2"/></linearGradient>
        <linearGradient id="glassWarm" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#f4d8ae" stopOpacity=".2"/><stop offset=".52" stopColor="#fffaf0" stopOpacity=".3"/><stop offset="1" stopColor="#c9e3fa" stopOpacity=".19"/></linearGradient>
        <linearGradient id="glassPale" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#ffffff" stopOpacity=".18"/><stop offset=".5" stopColor="#fff5e5" stopOpacity=".27"/><stop offset="1" stopColor="#bcdcff" stopOpacity=".21"/></linearGradient>
      </defs>
      <g className="glass-ribbon-field">{glassRibbonPaths.map(ribbon => <g className={`glass-ribbon ${ribbon.tone}`} key={ribbon.body}><path className="glass-surface" d={ribbon.body}/><path className="glass-edge-outer" d={ribbon.edge}/><path className="glass-edge-soft" d={ribbon.edge}/><path className="glass-edge-blue" d={ribbon.edge}/><path className="glass-edge-inner" d={ribbon.edge}/></g>)}</g>
    </svg>
  </div>;
}

export function SiteShell({ children }: { children: React.ReactNode }) { return <BrandIntro><AmbientBackground/><Navbar/><main>{children}</main><Footer/></BrandIntro>; }

export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <motion.div className={className} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true, margin:"-64px"}} transition={{duration:MOTION.reveal,ease:MOTION.ease}}>{children}</motion.div>; }

export function PageIntro({ eyebrow, title, text, prominent = false }: { eyebrow:string; title:string; text:string; prominent?:boolean }) { return <section className={`page-intro ${prominent ? "page-intro-prominent" : ""}`}><div className="container"><Reveal><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{text}</p></Reveal></div></section>; }

export function CallToAction({ title="Have a real problem we can explore together?", text="Tell us what your business or organization is facing. We’ll listen first, then see whether one focused economic concept can help." }: {title?:string;text?:string}) { return <section className="cta-section"><div className="container"><Reveal className="cta-card"><div><p className="eyebrow light">Start a conversation</p><h2>{title}</h2><p>{text}</p></div><Link className="button button-white" href={workWithUs.href}>Work With Us <ArrowUpRight size={18}/></Link></Reveal></div></section> }
