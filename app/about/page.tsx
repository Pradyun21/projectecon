import type { Metadata } from "next";
import { BookOpen, GraduationCap, MapPin, ScanSearch } from "lucide-react";
import { AboutPrincipleCards } from "../components/InteractiveCards";
import { PageIntro, Reveal } from "../components/SiteShell";

export const metadata: Metadata = { title: "About", description: "Meet the student behind Project Econ and learn why the initiative exists." };

export default function About() {
  return <>
    <PageIntro eyebrow="About" title="Meet the person behind Project Econ." text="A student-led initiative built from curiosity about how economic ideas work in real community settings."/>
    <section className="section founder-section founder-first"><div className="container"><Reveal className="founder-card">
      <div className="founder-placeholder"><span className="founder-badge">Founder</span><GraduationCap/><strong>Learning by helping.</strong></div>
      <div><p className="eyebrow">Who is behind it</p><h2>A student-led beginning.</h2><p className="large-copy">Project Econ was founded by a student interested in economics, behavioral economics, business, and the local community.</p><p>The initiative creates a way to study those ideas with care, responsibility, and real-world context.</p><div className="founder-meta"><span><BookOpen/> Economics & behavioral economics</span><span><MapPin/> Cabarrus County, NC</span></div></div>
    </Reveal></div></section>
    <section className="section about-story"><div className="container about-story-layout">
      <Reveal><p className="eyebrow">Why it exists</p><h2>Curiosity needs somewhere practical to go.</h2><p>Classroom concepts become clearer when they meet genuine constraints, decisions, and feedback. Project Econ creates that bridge while giving local organizations thoughtful attention.</p></Reveal>
      <Reveal className="about-insight"><ScanSearch/><p>“Start with the real question, then find the economic idea that helps explain it.”</p></Reveal>
    </div></section>
    <section className="section about-principles"><div className="container">
      <Reveal className="section-head"><p className="eyebrow">Vision and values</p><h2>Grow through useful, honest work.</h2><p>Open each principle to see what guides the initiative.</p></Reveal>
      <Reveal><AboutPrincipleCards/></Reveal>
    </div></section>
  </>;
}
