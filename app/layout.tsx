import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteShell } from "./components/SiteShell";
import "./globals.css";

const geist = Geist({variable:"--font-geist",subsets:["latin"]});
const mono = Geist_Mono({variable:"--font-mono",subsets:["latin"]});
export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") ?? incoming.get("host") ?? "projectecon.org";
  const protocol = incoming.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const description = "A free, student-led initiative helping Cabarrus County organizations apply economics to real problems.";
  return {
    title: { default: "Project Econ | Practical Economics. Local Impact.", template: "%s | Project Econ" },
    description,
    icons: { icon: "/project-econ-p.png", shortcut: "/project-econ-p.png" },
    openGraph: { title: "Project Econ | Practical Economics. Local Impact.", description, type: "website", url: origin, images: [{ url: `${origin}/og.png`, width: 1728, height: 910, alt: "Practical economics. Local impact." }] },
    twitter: { card: "summary_large_image", title: "Project Econ | Practical Economics. Local Impact.", description, images: [`${origin}/og.png`] },
  };
}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${geist.variable} ${mono.variable}`}><SiteShell>{children}</SiteShell></body></html>}
