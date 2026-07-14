"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [{ href: "/", label: "Home" }, { href: "/our-work", label: "Our Work" }, { href: "/about", label: "About" }, { href: "/contact", label: "Contact" }];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return <header className="nav-wrap"><nav className="nav container" aria-label="Main navigation">
    <Link href="/" className="brand" aria-label="Project Econ home"><Image className="brand-full" src="/project-econ.png" alt="Project Econ" width={220} height={110} priority unoptimized /><Image className="brand-mark" src="/project-econ-p.png" alt="Project Econ" width={58} height={58} priority unoptimized /></Link>
    <div className="nav-links">{links.map(l => <Link key={l.href} className={pathname === l.href ? "active" : ""} href={l.href}>{l.label}</Link>)}<Link className="button button-small" href="/contact">Work With Us <ArrowUpRight size={16}/></Link></div>
    <button className="menu-button" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-label="Toggle navigation">{open ? <X/> : <Menu/>}</button>
  </nav><AnimatePresence>{open && <motion.div className="mobile-menu" initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}}>{links.map(l => <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>)}<Link className="button" href="/contact" onClick={() => setOpen(false)}>Work With Us</Link></motion.div>}</AnimatePresence></header>
}

export function Footer() { return <footer><div className="container footer-grid"><div><Image src="/project-econ.png" alt="Project Econ" width={230} height={115} unoptimized/><p>A student-led initiative applying economics to real local problems—one focused concept at a time.</p></div><div><h3>Explore</h3>{links.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}</div><div><h3>Local to</h3><p>Cabarrus County,<br/>North Carolina</p><a href="mailto:hello@projectecon.org">hello@projectecon.org</a><small>Placeholder email</small></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Project Econ</span><p>Project Econ provides free, student-led, educational recommendations. Results are not guaranteed, and each business or organization is responsible for its own decisions.</p></div></footer> }

export function SiteShell({ children }: { children: React.ReactNode }) { return <><Navbar/><main>{children}</main><Footer/></>; }

export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <motion.div className={className} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true, margin:"-70px"}} transition={{duration:.55,ease:[.22,1,.36,1]}}>{children}</motion.div>; }

export function PageIntro({ eyebrow, title, text }: { eyebrow:string; title:string; text:string }) { return <section className="page-intro"><div className="orb orb-one"/><div className="container"><Reveal><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{text}</p></Reveal></div></section>; }

export function CallToAction({ title="Have a real problem we can explore together?", text="Tell us what your business or organization is facing. We’ll listen first, then see whether one focused economic concept can help." }: {title?:string;text?:string}) { return <section className="cta-section"><div className="container"><Reveal className="cta-card"><div><p className="eyebrow light">Start a conversation</p><h2>{title}</h2><p>{text}</p></div><Link className="button button-white" href="/contact">Work With Us <ArrowUpRight size={18}/></Link></Reveal></div></section> }
