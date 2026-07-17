import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteShell } from "./components/SiteShell";
import "./globals.css";

const geist = Geist({variable:"--font-geist",subsets:["latin"]});
const mono = Geist_Mono({variable:"--font-mono",subsets:["latin"]});
const description = "Helping Small Buisnesses with Economics";
const socialImage = "https://projectecon.org/opengraph-image.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://projectecon.org"),
  title: { default: "Project Econ", template: "%s | Project Econ" },
  description,
  icons: { icon: "/project-econ-pe-logo.png", shortcut: "/project-econ-pe-logo.png" },
  openGraph: {
    title: "Project Econ",
    description,
    url: "https://projectecon.org",
    siteName: "Project Econ",
    type: "website",
    images: [{ url: socialImage, width: 1200, height: 630, alt: "Project Econ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Econ",
    description,
    images: [socialImage],
  },
};
export const viewport: Viewport = { colorScheme: "dark", themeColor: "#06182e" };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" style={{colorScheme:"dark"}}><body className={`${geist.variable} ${mono.variable}`}><SiteShell>{children}</SiteShell><Analytics /></body></html>}
