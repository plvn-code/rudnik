import type { Metadata } from "next";
import { ContactBand, PageHero, ProductCard } from "@/components/Shared";
import { solutions } from "@/lib/products";

export const metadata: Metadata = {
  title: "Інші рішення: профіль, кошики кондиціонерів, забивання паль, проєктування, ЛСТК",
  description: "Монтажний профіль, кошики кондиціонерів, забивання паль власною технікою, індивідуальне проєктування та ЛСТК від заводу RUDNIK.",
};

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Рішення", href: "/rishennia" }]}
        eyebrow="Інші рішення"
        title={
          <>
            Метал, <span className="thin">інженерія</span> <span className="red">та сервіс</span>
          </>
        }
        lead="Ті самі лінії та інженери, що виготовляють системи для СЕС, працюють і для фасадів, будівництва, логістики та нестандартних задач."
      />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container sys-grid">
          {solutions.map((p, i) => (
            <ProductCard key={p.slug} p={p} index={i} />
          ))}
        </div>
      </section>
      <ContactBand topic="Консультація" />
    </>
  );
}
