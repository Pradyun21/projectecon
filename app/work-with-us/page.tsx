import type { Metadata } from "next";
import { Clock3, MapPin, MessageSquare } from "lucide-react";
import { ContactForm } from "../components/ContactForm";
import { PageIntro, Reveal } from "../components/SiteShell";

export const metadata: Metadata = { title: "Work With Us", description: "Start a simple conversation with Project Econ about your Cabarrus County business or organization." };

export default function WorkWithUs() {
  return <>
    <PageIntro eyebrow="Work with us" title="A simple first conversation." text="You do not need to know which economic concept fits. Share the basics and we’ll begin by listening."/>
    <section className="section contact-section"><div className="container contact-layout">
      <Reveal><div className="contact-copy"><p className="eyebrow">What to expect</p><h2>Easy to begin. No pressure attached.</h2><p>We may follow up to understand the situation better. There is no cost and no obligation.</p><ul><li><MessageSquare/> We listen before suggesting anything.</li><li><MapPin/> We focus on Cabarrus County organizations.</li><li><Clock3/> The form takes less than one minute.</li></ul><div className="disclaimer"><strong>A clear note</strong><p>Project Econ is student-led. We provide educational recommendations and cannot guarantee results.</p></div></div></Reveal>
      <Reveal><ContactForm/></Reveal>
    </div></section>
  </>;
}
