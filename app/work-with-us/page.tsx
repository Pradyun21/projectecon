import type { Metadata } from "next";
import { ContactForm } from "../components/ContactForm";
import { EmojiGlyph } from "../components/EmojiGlyph";
import { PageIntro, Reveal } from "../components/SiteShell";

export const metadata: Metadata = { title: "Work With Us", description: "Explore whether economic analysis can provide useful insights for your organization." };

export default function WorkWithUs() {
  return <>
    <PageIntro prominent eyebrow="Work with us" title="Begin with the organization, not the theory." text="You do not need economic expertise. Project Econ will learn about your organization, analyze available data, and determine whether economic analysis can provide useful insights."/>
    <section className="section contact-section"><div className="container contact-layout">
      <Reveal><div className="contact-copy"><p className="eyebrow">What to expect</p><h2>Individualized analysis begins with context.</h2><div className="contact-details"><p>We may follow up to understand operations, customer behavior, marketing, financial performance, and the data currently available.</p><ul><li><EmojiGlyph emoji="💬"/> We learn about the organization before making recommendations.</li><li><EmojiGlyph emoji="📍"/> We build community partnerships in Cabarrus County.</li><li><EmojiGlyph emoji="⏱️"/> The initial form takes less than one minute.</li></ul></div><div className="disclaimer"><strong>A clear note</strong><p>Project Econ is student-led. Recommendations are educational, grounded in available data, and cannot guarantee results.</p></div></div></Reveal>
      <Reveal><ContactForm/></Reveal>
    </div></section>
  </>;
}
