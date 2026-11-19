import Image from "next/image";
import Link from "next/link";
import media from "@/lib/media.json";
import { type Product, productHref } from "@/lib/products";
import { partners, site } from "@/lib/site";
import { Icon } from "./Icons";
import { LeadForm } from "./LeadForm";
import { MARK_VIEWBOX, markPaths, markUa } from "./Logo";

const sizes = media as unknown as Record<string, [number, number]>;
export const dims = (src: string) => sizes[src] ?? [1200, 900];

export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  image,
  photo,
  code,
  small,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  crumbs?: { label: string; href: string }[];
  image?: string;
  photo?: boolean;
  code?: string;
  small?: boolean;
  children?: React.ReactNode;
}) {
  const text = (
    <div>
      {crumbs && (
        <nav className="crumbs fade-up" aria-label="Навігаційний ланцюжок">
          <Link href="/">Головна</Link>
          {crumbs.map((c) => (
            <Link key={c.href} href={c.href}>
              {c.label}
            </Link>
          ))}
        </nav>
      )}
      {eyebrow && <p className="eyebrow fade-up">{eyebrow}</p>}
      <h1 className={`page-title fade-up${small ? " page-title-sm" : ""}`} style={{ animationDelay: "90ms" }}>
        {title}
      </h1>
      {lead && (
        <p className="page-lead fade-up" style={{ animationDelay: "180ms" }}>
          {lead}
        </p>
      )}
      {children && (
        <div className="page-hero-actions fade-up" style={{ animationDelay: "270ms" }}>
          {children}
        </div>
      )}
    </div>
  );
  return (
    <section className="page-hero">
      <div className="container page-hero-inner">
        {image ? (
          <div className="page-hero-split">
            {text}
            <div className={`page-hero-render fade-up${photo ? " is-photo" : ""}`} style={{ animationDelay: "200ms" }}>
              {code && (
                <span className="page-hero-code" aria-hidden="true">
                  {code}
                </span>
              )}
              <Image src={image} alt="" fill priority sizes="(max-width: 1080px) 100vw, 50vw" />
            </div>
          </div>
        ) : (
          text
        )}
      </div>
    </section>
  );
}

export function ProductCard({ p, index = 0 }: { p: Product; index?: number }) {
  const photo = p.coverIsPhoto;
  return (
    <Link href={productHref(p)} className={`sys-card spot${photo ? " is-photo" : ""}`} data-reveal data-cursor="Детальніше" style={{ transitionDelay: `${(index % 3) * 80}ms` }}>
      <div className="sys-card-top">
        <div>
          <span className="mono">{String(index + 1).padStart(2, "0")} · {p.where}</span>
          <div className="sys-card-code" style={{ marginTop: 10 }}>
            {p.code === "FACADE" || p.kind === "solution" ? p.name.toUpperCase() : p.code}
          </div>
        </div>
        <span className="round-link">
          <Icon name="arrowUpRight" size={20} />
        </span>
      </div>
      <div className="sys-card-img">
        <Image src={p.cover} alt={p.title} fill sizes="(max-width: 760px) 100vw, (max-width: 1080px) 50vw, 33vw" />
      </div>
      <h3>{p.name}</h3>
      <p>{p.short}</p>
    </Link>
  );
}

export function Marquee({ items, reverse = false }: { items: readonly string[]; reverse?: boolean }) {
  const row = (hidden: boolean) => (
    <div className="marquee-row" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <span key={i}>
          {t}
          <i />
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee${reverse ? " is-reverse" : ""}`}>
      {row(false)}
      {row(true)}
    </div>
  );
}

export function Faq({ items }: { items: readonly (readonly [string, string])[] }) {
  return (
    <div className="faq" data-reveal>
      {items.map(([q, a], i) => (
        <details key={q} open={i === 0}>
          <summary>
            {q}
            <i aria-hidden="true" />
          </summary>
          <p className="faq-a">{a}</p>
        </details>
      ))}
    </div>
  );
}

export function faqSchema(items: readonly (readonly [string, string])[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
}

export function Partners() {
  return (
    <ul className="partners" data-reveal>
      {partners.map((p) => {
        const src = `/images/partners/${p.id}.webp`;
        const [w, h] = dims(src);
        return (
          <li key={p.id}>
            <Image src={src} alt={p.name} width={w} height={h} sizes="180px" />
          </li>
        );
      })}
    </ul>
  );
}

/** Closing request band in the brand red, with the R mark as a watermark. */
export function ContactBand({
  title = "Готові розпочати проєкт?",
  lead = "Цінуємо прямий зв’язок із клієнтами: так ми краще розуміємо практичні виклики. Повний супровід — від прорахунку параметрів до інженерної підтримки.",
  details,
  topic,
  id = "zapyt",
}: {
  title?: string;
  lead?: string;
  details?: string;
  topic?: string;
  id?: string;
}) {
  return (
    <section className="contact-band" id={id}>
      <svg className="contact-giant" viewBox={MARK_VIEWBOX} aria-hidden="true">
        {markPaths.map((d) => (
          <path key={d.slice(0, 12)} d={d} />
        ))}
        <polygon points={markUa} />
      </svg>
      <div className="container contact-grid">
        <div data-reveal>
          <p className="eyebrow">Обговоримо деталі</p>
          <h2 className="h2">{title}</h2>
          <p className="section-sub">{lead}</p>
          <div className="contact-phones">
            {site.phones.map((p) => (
              <a key={p.href} className="contact-phone" href={p.href}>
                {p.phone}
                <small>{p.label}</small>
              </a>
            ))}
          </div>
          <a className="contact-mail" href={`mailto:${site.email}`}>
            <Icon name="mail" size={18} /> {site.email}
          </a>
        </div>
        <div className="contact-card" data-reveal>
          <LeadForm details={details} topic={topic} source={`band:${id}`} />
        </div>
      </div>
    </section>
  );
}
