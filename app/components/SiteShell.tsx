"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandIntro } from "./BrandIntro";
import { GradientShapes } from "./InteractiveCards";
import { MOTION } from "./motion";

const links = [{ href: "/", label: "Home" }, { href: "/our-work", label: "Our Work" }, { href: "/about", label: "About" }];
const workWithUs = { href: "/work-with-us", label: "Work With Us" };

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
    <Link href="/" className="brand" aria-label="Project Econ home"><Image className="brand-full" src="/project-econ.png" alt="Project Econ" width={196} height={112} priority unoptimized /><Image className="brand-mark" src="/project-econ-p.png" alt="" width={54} height={54} priority unoptimized /></Link>
    <div className="nav-links">{links.map(l => <Link key={l.href} className={pathname === l.href ? "active" : ""} href={l.href}>{l.label}</Link>)}<Link className={`button button-small ${pathname === workWithUs.href ? "is-current" : ""}`} href={workWithUs.href}>{workWithUs.label} <ArrowUpRight size={16}/></Link></div>
    <button className="menu-button" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-label="Toggle navigation">{open ? <X/> : <Menu/>}</button>
  </nav><AnimatePresence>{open && <motion.div className="mobile-menu" initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{ duration: MOTION.base, ease: MOTION.ease }}>{links.map(l => <Link key={l.href} className={pathname === l.href ? "active" : ""} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>)}<Link className="button" href={workWithUs.href} onClick={() => setOpen(false)}>{workWithUs.label}</Link></motion.div>}</AnimatePresence></header>
}

export function Footer() { return <footer><div className="container footer-grid"><div><Image src="/project-econ.png" alt="Project Econ" width={230} height={132} unoptimized/><p>A student-led initiative applying economics to real local problems—one focused concept at a time.</p></div><div><h3>Explore</h3>{[...links, workWithUs].map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}</div><div><h3>Local to</h3><p>Cabarrus County,<br/>North Carolina</p><Link className="footer-cta" href={workWithUs.href}>Start a conversation <ArrowUpRight size={15}/></Link></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Project Econ</span><p>Project Econ provides free, student-led, educational recommendations. Results are not guaranteed, and each business or organization is responsible for its own decisions.</p></div></footer> }

export function SiteShell({ children }: { children: React.ReactNode }) { return <BrandIntro><Navbar/><main>{children}</main><Footer/></BrandIntro>; }

export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <motion.div className={className} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true, margin:"-64px"}} transition={{duration:MOTION.reveal,ease:MOTION.ease}}>{children}</motion.div>; }

export function PageIntro({ eyebrow, title, text }: { eyebrow:string; title:string; text:string }) { return <section className="page-intro"><GradientShapes variant="blue"/><div className="orb orb-one"/><div className="container"><Reveal><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{text}</p></Reveal></div></section>; }

export function CallToAction({ title="Have a real problem we can explore together?", text="Tell us what your business or organization is facing. We’ll listen first, then see whether one focused economic concept can help." }: {title?:string;text?:string}) { return <section className="cta-section"><div className="container"><Reveal className="cta-card"><div><p className="eyebrow light">Start a conversation</p><h2>{title}</h2><p>{text}</p></div><Link className="button button-white" href={workWithUs.href}>Work With Us <ArrowUpRight size={18}/></Link></Reveal></div></section> }
