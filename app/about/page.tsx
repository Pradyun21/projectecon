import type { Metadata } from "next";
import { AboutPrincipleCards } from "../components/InteractiveCards";
import { EmojiGlyph } from "../components/EmojiGlyph";
import { PageIntro, Reveal } from "../components/SiteShell";

export const metadata: Metadata = { title: "About", description: "Learn how Project Econ bridges economic theory and real-world business decisions." };

export default function About() {
  return <>
    <PageIntro eyebrow="About" title="Economics should be practical." text="Project Econ helps organizations make data-driven decisions through economic analysis, behavioral insights, and performance tracking."/>
    <section id="about-founder" className="section founder-section founder-first"><div className="container"><Reveal className="founder-card">
      <div><p className="eyebrow">Who is behind it</p><h2>A student-led beginning.</h2><p className="large-copy">Project Econ was founded by Pradyun Menon and Mihir Sedimbi, two students from Cox Mill High School who are deeply passionate about economics. Wanting a way to effectively apply the economic theory that they were taught in the classroom, they both founded this initiative to show that economics has real-world applicability.</p><div className="founder-meta"><span><EmojiGlyph emoji="📚"/> Economics & behavioral economics</span><span><EmojiGlyph emoji="📍"/> Cabarrus County, NC</span></div></div>
    </Reveal><Reveal className="process-next-wrap"><a className="process-next" href="#about-story" data-reading-delay="7000"><span><small>Continue</small><strong>See why Project Econ exists</strong></span><i aria-hidden="true"><EmojiGlyph emoji="⬇️"/></i></a></Reveal></div></section>
    <section id="about-story" className="section about-story"><div className="container about-story-layout">
      <Reveal><p className="eyebrow">Our mission</p><h2>Bridge the gap between theory and practice.</h2><p>Economics is often viewed as lacking real-world application. Traditional models taught in schools provide useful theory, but they often fail to represent the challenges faced by small businesses.</p><p>Project Econ bridges that gap by helping organizations make data-driven decisions through economic analysis, behavioral insights, and performance tracking.</p></Reveal>
      <Reveal className="about-insight"><EmojiGlyph emoji="🔍"/><p>Economic theory becomes practical when it is applied to the operations, customers, and performance of a real organization.</p></Reveal>
    </div><div className="container"><Reveal className="process-next-wrap"><a className="process-next" href="#about-principles" data-reading-delay="6500"><span><small>Keep exploring</small><strong>Discover the vision and values</strong></span><i aria-hidden="true"><EmojiGlyph emoji="⬇️"/></i></a></Reveal></div></section>
    <section id="about-principles" className="section about-principles"><div className="container">
      <Reveal className="section-head"><p className="eyebrow">Our vision</p><h2>Economics is much more than theory.</h2><p>Open each card to see how Project Econ can grow from local analysis into a broader partnership model.</p></Reveal>
      <Reveal><AboutPrincipleCards/></Reveal>
    </div></section>
  </>;
}
