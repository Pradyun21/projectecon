import type { Metadata } from "next";
import { AboutPrincipleCards } from "../components/InteractiveCards";
import { EmojiGlyph } from "../components/EmojiGlyph";
import { PageIntro, Reveal } from "../components/SiteShell";

export const metadata: Metadata = { title: "About", description: "Meet the student behind Project Econ and learn why the initiative exists." };

export default function About() {
  return <>
    <PageIntro eyebrow="About" title="Meet the person behind Project Econ." text="A student-led initiative built from curiosity about how economic ideas work in real community settings."/>
    <section id="about-founder" className="section founder-section founder-first"><div className="container"><Reveal className="founder-card">
      <div className="founder-placeholder"><span className="founder-badge">Founder</span><EmojiGlyph emoji="🎓"/><strong>Learning by helping.</strong></div>
      <div><p className="eyebrow">Who is behind it</p><h2>A student-led beginning.</h2><p className="large-copy">Project Econ was founded by a student interested in economics, behavioral economics, business, and the local community.</p><p>The initiative creates a way to study those ideas with care, responsibility, and real-world context.</p><div className="founder-meta"><span><EmojiGlyph emoji="📚"/> Economics & behavioral economics</span><span><EmojiGlyph emoji="📍"/> Cabarrus County, NC</span></div></div>
    </Reveal><Reveal className="process-next-wrap"><a className="process-next" href="#about-story" data-reading-delay="7000"><span><small>Continue</small><strong>See why Project Econ exists</strong></span><i aria-hidden="true"><EmojiGlyph emoji="⬇️"/></i></a></Reveal></div></section>
    <section id="about-story" className="section about-story"><div className="container about-story-layout">
      <Reveal><p className="eyebrow">Why it exists</p><h2>Curiosity needs somewhere practical to go.</h2><p>Classroom concepts become clearer when they meet genuine constraints, decisions, and feedback. Project Econ creates that bridge while giving local organizations thoughtful attention.</p></Reveal>
      <Reveal className="about-insight"><EmojiGlyph emoji="🔍"/><p>“Start with the real question, then find the economic idea that helps explain it.”</p></Reveal>
    </div><div className="container"><Reveal className="process-next-wrap"><a className="process-next" href="#about-principles" data-reading-delay="6500"><span><small>Keep exploring</small><strong>Discover the vision and values</strong></span><i aria-hidden="true"><EmojiGlyph emoji="⬇️"/></i></a></Reveal></div></section>
    <section id="about-principles" className="section about-principles"><div className="container">
      <Reveal className="section-head"><p className="eyebrow">Vision and values</p><h2>Grow through useful, honest work.</h2><p>Open each principle to see what guides the initiative.</p></Reveal>
      <Reveal><AboutPrincipleCards/></Reveal>
    </div></section>
  </>;
}
