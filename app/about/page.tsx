import type { Metadata } from "next";
import { BookOpen, GraduationCap, MapPin } from "lucide-react";
import { CallToAction, PageIntro, Reveal } from "../components/SiteShell";

export const metadata: Metadata = { title: "About", description: "Why Project Econ brings classroom economic concepts into the Cabarrus County community." };

export default function About() {
  return <>
    <PageIntro eyebrow="About Project Econ" title="Economics should be useful beyond the classroom." text="Project Econ takes clear economic ideas and applies them to real situations in Cabarrus County."/>
    <section className="section about-overview"><div className="container split">
      <Reveal><p className="eyebrow">Project overview</p><h2>Local problems deserve thoughtful attention.</h2></Reveal>
      <Reveal><p className="large-copy">Small businesses and local organizations face real questions about customers, pricing, participation, decision-making, and incentives.</p><p>Project Econ uses economics as a practical lens. We listen to the challenge, choose one useful concept, and focus on a reasonable next step—without adding unnecessary complexity.</p></Reveal>
    </div></section>
    <section className="section founder-section"><div className="container"><Reveal className="founder-card">
      <div className="founder-placeholder"><span className="founder-badge">Student-led</span><GraduationCap/><strong>Built to learn by helping.</strong></div>
      <div><p className="eyebrow">Founder</p><h2>A student-led beginning.</h2><p className="large-copy">Project Econ was founded by a student interested in economics, behavioral economics, business, and helping the local community.</p><div className="founder-meta"><span><BookOpen/> Economics & behavioral economics</span><span><MapPin/> Cabarrus County, NC</span></div></div>
    </Reveal></div></section>
    <CallToAction/>
  </>;
}
