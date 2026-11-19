import { ContactBand, Marquee, faqSchema } from "@/components/Shared";
import { Hero } from "@/components/home/Hero";
import { Manifest } from "@/components/home/Manifest";
import { Picker } from "@/components/home/Picker";
import { Production } from "@/components/home/Production";
import { Rail } from "@/components/home/Rail";
import { HomeFaq, News, Partnership, Process, Solutions, Trusted, VideoSection, Why } from "@/components/home/Sections";
import { faqHome } from "@/lib/copy";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifest />
      <Marquee items={["Landing", "Solar Parking", "Balast", "SolarSet", "Block", "Фасадні системи", "Монтажний профіль", "ЛСТК"]} />
      <Picker />
      <Production />
      <Why />
      <Rail />
      <VideoSection />
      <Solutions />
      <Partnership />
      <Process />
      <Trusted />
      <News />
      <HomeFaq />
      <ContactBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqHome)) }} />
    </>
  );
}
