import type { Metadata } from "next";
import { Suspense } from "react";
import { PortfolioFilter } from "@/components/PortfolioFilter";
import { ContactBand, PageHero } from "@/components/Shared";
import { shots } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Портфоліо: фото готових об’єктів",
  description: "Фото об’єктів на системах RUDNIK: наземні станції, Solar Parking, баластні, блочні, фасадні системи, SolarSet і кошики кондиціонерів.",
};

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Портфоліо", href: "/portfolio" }]}
        eyebrow={`${shots.length} фото об’єктів`}
        title={
          <>
            Фото готових <span className="red">об’єктів</span>
          </>
        }
        lead="Наші системи обрані професіоналами для комплектації об’єктів будь-якого масштабу та складності — стандарт надійності для сотень реалізованих проєктів по всій Україні."
      />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <Suspense>
            <PortfolioFilter />
          </Suspense>
        </div>
      </section>
      <ContactBand title="Ваш об’єкт може бути наступним" />
    </>
  );
}
