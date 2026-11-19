import Image from "next/image";
import Link from "next/link";
import { Gallery } from "@/components/Gallery";
import { Icon } from "@/components/Icons";
import { LeadButton } from "@/components/LeadModal";
import { ContactBand, Faq, PageHero, ProductCard, faqSchema } from "@/components/Shared";
import { shotAlt, shotSrc, shotsFor } from "@/lib/portfolio";
import { type Product, productBySlug } from "@/lib/products";
import { Variants } from "./Variants";

/** One template for all 11 systems / solutions; every block is optional and driven by lib/products.ts. */
export function ProductPage({ p }: { p: Product }) {
  const photos = shotsFor(p.slug).map((s) => ({ src: shotSrc(s), w: s.w, h: s.h, alt: shotAlt(s), label: s.label }));
  const related = p.related ? productBySlug(p.related) : undefined;
  const section = p.kind === "system" ? { label: "Системи", href: "/systemy" } : { label: "Рішення", href: "/rishennia" };
  const display = p.kind === "system" && p.code !== "FACADE" ? p.code : p.name;
  const isTile = p.variants && (p.slug === "profil" || p.slug === "koshyky");

  return (
    <>
      <PageHero
        crumbs={[section, { label: p.name, href: `${section.href}/${p.slug}` }]}
        eyebrow={p.name}
        title={display}
        lead={p.short}
        image={p.cover}
        photo={p.coverIsPhoto}
        code={p.code}
        small={display.length > 13}
      >
        <LeadButton className="btn btn-red btn-lg" title={`Прорахунок: ${p.title}`} details={`Цікавить: ${p.title}`} topic="Прорахунок">
          Отримати прорахунок <Icon name="arrow" size={18} />
        </LeadButton>
        <LeadButton className="btn btn-outline btn-lg" title="Технічна інформація" details={`Технічна інформація: ${p.title}`} topic="Технічна інформація">
          Технічна консультація
        </LeadButton>
      </PageHero>

      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <dl className="spec-strip" data-reveal>
            {p.specs.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <div className="intro-cols" style={{ marginTop: 44 }} data-reveal>
            {p.intro.map((t) => (
              <p key={t.slice(0, 20)}>{t}</p>
            ))}
          </div>
        </div>
      </section>

      {p.variants && (
        <section className="section section-gray">
          <div className="container">
            <div className="row-head" data-reveal>
              <div>
                <p className="eyebrow">Варіанти виконання</p>
                <h2 className="h2 h2-md">{p.variantsTitle}</h2>
              </div>
            </div>
            {isTile ? (
              <div className="variants-grid">
                {p.variants.map((v, i) => (
                  <div key={v.name} className="variant-tile" data-reveal style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
                    <div className="variant-tile-img">
                      <Image src={v.img} alt={v.name} fill sizes="(max-width: 760px) 50vw, 25vw" />
                    </div>
                    <strong>{v.name}</strong>
                  </div>
                ))}
              </div>
            ) : (
              <Variants items={p.variants} title={p.variantsTitle ?? "Варіанти"} />
            )}
            {p.slug === "profil" && <p className="muted" style={{ marginTop: 22 }}>Наведені характеристики — приклад стандартного виконання. Як виробник, ми адаптуємо параметри під конкретне технічне завдання.</p>}
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="row-head" data-reveal>
            <div>
              <p className="eyebrow">Переваги</p>
              <h2 className="h2 h2-md">Чому {display}</h2>
            </div>
          </div>
          <div className="adv-grid">
            {p.advantages.map(([t, d], i) => (
              <div key={t} className="adv-cell" data-reveal style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {p.table && (
        <section className="section section-gray">
          <div className="container faq-grid">
            <div data-reveal>
              <p className="eyebrow">Параметри</p>
              <h2 className="h2 h2-md">{p.table.title}</h2>
              {p.table.note && <p className="section-sub">{p.table.note}</p>}
            </div>
            <table className="spec-table" data-reveal>
              <tbody>
                {p.table.rows.map(([k, v]) => (
                  <tr key={k}>
                    <th scope="row">{k}</th>
                    <td>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {p.parts && (
        <section className="section">
          <div className="container">
            <div className="row-head" data-reveal>
              <div>
                <p className="eyebrow">{p.slug === "koshyky" ? "Декоративні екрани" : "Складові елементи системи"}</p>
                <h2 className="h2 h2-md">{p.slug === "koshyky" ? "Варіанти узору" : "З чого складається"}</h2>
              </div>
              <p className="section-sub">{p.slug === "koshyky" ? "Каркас стає гармонійним елементом екстер’єру." : "Усі компоненти виготовляє завод RUDNIK — з готовою перфорацією, без доробки на об’єкті."}</p>
            </div>
            <div className="parts-grid">
              {p.parts.map((part, i) => (
                <article key={part.name} className="part-card" data-reveal style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
                  <div className="part-img">
                    <Image src={part.img} alt={part.name} fill sizes="(max-width: 760px) 50vw, 25vw" />
                  </div>
                  <div className="part-body">
                    <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                    <h3>{part.name}</h3>
                    <p>{part.text}</p>
                  </div>
                </article>
              ))}
            </div>
            {p.partsNote && (
              <div className="parts-note" data-reveal>
                {p.partsNote.map((t) => (
                  <p key={t.slice(0, 20)}>{t}</p>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {p.blocks?.map((b) => (
        <section key={b.title} className="section section-gray">
          <div className="container">
            <div className="row-head" data-reveal>
              <h2 className="h2 h2-md">{b.title}</h2>
              {b.lead && <p className="section-sub">{b.lead}</p>}
            </div>
            <div className="blocks-grid">
              {b.items.map((it, i) => (
                <div key={it.title} className="block-card" data-reveal style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
                  <h3>{it.title}</h3>
                  <p>{it.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {photos.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="row-head" data-reveal>
              <div>
                <p className="eyebrow">Портфоліо</p>
                <h2 className="h2 h2-md">Проєкти {display}</h2>
              </div>
              <Link href={`/portfolio?cat=${p.slug}`} className="text-link">
                Усі фото категорії ({photos.length}) <Icon name="arrow" size={16} />
              </Link>
            </div>
            <Gallery photos={photos} fallbackAlt={p.title} limit={6} />
          </div>
        </section>
      )}

      <section className="section section-gray">
        <div className="container faq-grid">
          <div data-reveal>
            <p className="eyebrow">F.A.Q.</p>
            <h2 className="h2 h2-md">Питання про {display}</h2>
            <p className="section-sub">Бажаєте отримати технічну інформацію чи консультацію? Інженери RUDNIK відповідають напряму.</p>
            <LeadButton className="btn btn-ink" title="Технічне питання" details={`Питання про: ${p.title}`} topic="Технічна інформація">
              Поставити питання <Icon name="arrow" size={18} />
            </LeadButton>
          </div>
          <Faq items={p.faq} />
        </div>
      </section>

      {related && (
        <section className="section-tight">
          <div className="container">
            <div className="row-head" data-reveal>
              <h2 className="mini-title">Також може підійти</h2>
              <Link href={section.href} className="text-link">
                Усі {p.kind === "system" ? "системи" : "рішення"} <Icon name="arrow" size={16} />
              </Link>
            </div>
            <div className="sys-grid" style={{ gridTemplateColumns: "minmax(0, 520px)" }}>
              <ProductCard p={related} />
            </div>
          </div>
        </section>
      )}

      <ContactBand title={`Прорахуємо ${display} під ваш об’єкт`} details={`Сторінка: ${p.title}`} id="zapyt" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(p.faq)) }} />
    </>
  );
}
