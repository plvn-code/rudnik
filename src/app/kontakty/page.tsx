import type { Metadata } from "next";
import { Icon } from "@/components/Icons";
import { LeadForm } from "@/components/LeadForm";
import { PageHero } from "@/components/Shared";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакти",
  description: "RUDNIK: комерційний відділ +38 (067) 047 70 70, відділ постачання +38 (068) 553 70 70, info@rudnik.ua. с. Крюківщина, вул. Одеська, 70. Пн–Пт 09:00–18:00.",
};

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Контакти", href: "/kontakty" }]}
        eyebrow="Зв’яжіться з нами"
        title={
          <>
            Готові розпочати <span className="red">проєкт?</span>
          </>
        }
        lead="Цінуємо прямий зв’язок із клієнтами — так ми краще розуміємо практичні виклики, з якими ви стикаєтесь. Повний супровід: від прорахунку параметрів до інженерної підтримки."
      />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container contacts-grid">
          <dl className="contact-list" data-reveal>
            {site.phones.map((p) => (
              <div key={p.href}>
                <dt>{p.label}</dt>
                <dd>
                  <a href={p.href}>{p.phone}</a>
                </dd>
              </div>
            ))}
            <div>
              <dt>E-mail</dt>
              <dd>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </dd>
            </div>
            <div>
              <dt>Адреса</dt>
              <dd>
                <a href={site.maps} target="_blank" rel="noreferrer">
                  {site.address}
                </a>
                <small>Офіс RUDNIK.UA · Київська область</small>
              </dd>
            </div>
            <div>
              <dt>Графік</dt>
              <dd>{site.hours}</dd>
            </div>
            <div>
              <dt>Соцмережі</dt>
              <dd>
                <a href={site.instagram} target="_blank" rel="noreferrer" style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                  <Icon name="instagram" size={20} /> {site.instagramHandle}
                </a>
              </dd>
            </div>
          </dl>
          <div className="contacts-form" data-reveal>
            <h2>Напишіть нам</h2>
            <LeadForm source="contacts" topic="Прорахунок" comment />
          </div>
        </div>
      </section>
    </>
  );
}
