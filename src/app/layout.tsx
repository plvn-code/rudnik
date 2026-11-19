import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Onest, Unbounded } from "next/font/google";
import { CursorLabel } from "@/components/CursorLabel";
import { Effects } from "@/components/Effects";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Intro } from "@/components/Intro";
import { LeadModal } from "@/components/LeadModal";
import { MobileBar } from "@/components/MobileBar";
import { site } from "@/lib/site";
import "./globals.css";

const display = Unbounded({ subsets: ["latin", "cyrillic"], weight: ["300", "400", "500", "600", "700"], variable: "--font-display", display: "swap" });
const body = Onest({ subsets: ["latin", "cyrillic"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin", "cyrillic"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "RUDNIK — завод-виробник систем кріплення для сонячних панелей та СЕС", template: "%s — RUDNIK" },
  description: site.description,
  openGraph: { type: "website", locale: "uk_UA", siteName: "RUDNIK", images: ["/images/portfolio/79.webp"] },
  // The redesign stays out of search until the client approves the launch.
  robots: process.env.NEXT_PUBLIC_SITE_LIVE === "1" ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RUDNIK",
  url: site.url,
  logo: `${site.url}/brand/logo-color.svg`,
  description: site.description,
  foundingDate: String(site.since),
  email: site.email,
  telephone: "+380670477070",
  address: { "@type": "PostalAddress", streetAddress: "вул. Одеська, 70", addressLocality: "с. Крюківщина", addressRegion: "Київська область", addressCountry: "UA" },
  sameAs: [site.instagram],
};

/** Runs before paint: shows the intro only once per session, only on the home page, never with reduced motion. */
const introScript = `try{var d=document.documentElement;if(sessionStorage.getItem('rd-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches||location.pathname!=='/'){d.classList.add('no-intro')}sessionStorage.setItem('rd-intro','1')}catch(e){document.documentElement.classList.add('no-intro')}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" data-scroll-behavior="smooth" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Перейти до змісту
        </a>
        <Intro />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <LeadModal />
        <MobileBar />
        <CursorLabel />
        <Effects />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      </body>
    </html>
  );
}
