import type { Metadata } from "next";
import { ContactBand, PageHero, ProductCard } from "@/components/Shared";
import { systems } from "@/lib/products";

export const metadata: Metadata = {
  title: "Системи кріплення для сонячних панелей",
  description: "Каталог систем RUDNIK: наземна LANDING, Solar Parking, баластна BALAST, SolarSet для скатних дахів, блочна BLOCK та фасадні системи.",
};

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Системи", href: "/systemy" }]}
        eyebrow="Каталог систем"
        title={
          <>
            Системи <span className="thin">кріплення</span> <span className="red">для СЕС</span>
          </>
        }
        lead="Шість інженерних систем власного виробництва — для ґрунту, паркінгів, пласких і скатних дахів, профнастилу, сендвіч-панелей та фасадів."
      />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container sys-grid">
          {systems.map((p, i) => (
            <ProductCard key={p.slug} p={p} index={i} />
          ))}
        </div>
      </section>
      <ContactBand title="Не впевнені, яка система підійде?" lead="Опишіть об’єкт — інженери RUDNIK підберуть систему, спосіб фіксації та підготують специфікацію." topic="Консультація" />
    </>
  );
}
