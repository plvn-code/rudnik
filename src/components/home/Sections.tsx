import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/Icons";
import { Faq, Partners } from "@/components/Shared";
import { faqHome, news, partnership, process, why } from "@/lib/copy";
import { productHref, solutions } from "@/lib/products";
import { ProductionVideo } from "./VideoBand";

export function Why() {
  return (
    <section className="section">
      <div className="container why-grid">
        <div className="why-media" data-reveal="clip">
          <Image src="/images/site/about-b.webp" alt="Стенд RUDNIK з фірмовим знаком" fill sizes="(max-width: 1080px) 100vw, 55vw" />
          <span className="why-media-tag">Ваш стандарт надійності</span>
        </div>
        <div>
          <p className="eyebrow" data-reveal>
            Чому ми
          </p>
          <h2 className="h2" data-reveal>
            Надійність — <span className="thin">це не опція.</span> Це стандарт
          </h2>
          <ul className="why-list">
            {why.map((w, i) => (
              <li key={w.n} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="mono">{w.n}</span>
                <div>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link href="/pro-kompaniyu" className="btn btn-ink" style={{ marginTop: 30 }} data-reveal>
            Про компанію <Icon name="arrow" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function VideoSection() {
  return (
    <section className="section section-gray">
      <div className="container video-band">
        <div>
          <p className="eyebrow" data-reveal>
            Наші виробничі потужності
          </p>
          <h2 className="h2" data-reveal>
            Сучасне обладнання <span className="thin">та технології</span>
          </h2>
          <p className="section-sub" data-reveal>
            Сучасне обладнання в поєднанні з передовими технологіями гарантує точність обробки, міцність і повну відповідність виробів технічним
            стандартам.
          </p>
          <ul className="video-list">
            {[
              ["Власний завод", "Повний цикл: від конструкторської документації до відправлення готової продукції."],
              ["Контроль якості", "Кожен етап контролюють досвідчені інженери та оператори — від відбору сировини до фінального пакування."],
              ["Складські запаси", "Значний запас сировини й комплектуючих — відвантажуємо точно в терміни графіка."],
            ].map(([t, d], i) => (
              <li key={t} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="mono">0{i + 1}</span>
                <div>
                  <strong>{t}</strong>
                  <p>{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <ProductionVideo />
      </div>
    </section>
  );
}

export function Solutions() {
  return (
    <section className="section">
      <div className="container">
        <div className="row-head" data-reveal>
          <div>
            <p className="eyebrow">Інші рішення</p>
            <h2 className="h2">
              Більше, <span className="thin">ніж кріплення для СЕС</span>
            </h2>
          </div>
          <Link href="/rishennia" className="text-link">
            Усі рішення <Icon name="arrow" size={16} />
          </Link>
        </div>
        <div className="sol-list">
          {solutions.map((s, i) => (
            <Link key={s.slug} href={productHref(s)} className="sol-row" data-reveal data-cursor="Детальніше">
              <span className="mono">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.name}</h3>
              <p>{s.short}</p>
              <span className={`sol-thumb${s.coverIsPhoto ? " is-photo" : ""}`}>
                <Image src={s.cover} alt="" fill sizes="120px" />
              </span>
              <span className="round-link">
                <Icon name="arrowUpRight" size={20} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const PARTNER_ICONS: IconName[] = ["tag", "truck", "wrench", "book", "user", "megaphone"];

export function Partnership() {
  return (
    <section className="section section-gray">
      <div className="container">
        <div className="row-head" data-reveal>
          <div>
            <p className="eyebrow">Партнерство з RUDNIK</p>
            <h2 className="h2">
              Ваш надійний тил <span className="thin">для монтажного бізнесу</span>
            </h2>
          </div>
          <p className="section-sub">Ми беремо на себе конструкції, щоб ви зосередились на головному — якісному монтажі та розвитку бізнесу.</p>
        </div>
        <div className="partner-grid">
          {partnership.map((p, i) => (
            <div key={p.title} className="partner-cell spot" data-reveal style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
              <Icon name={PARTNER_ICONS[i]} size={30} />
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="section">
      <div className="container">
        <div className="row-head" data-reveal>
          <div>
            <p className="eyebrow">Як ми працюємо</p>
            <h2 className="h2">
              Від запиту <span className="thin">до відвантаження</span>
            </h2>
          </div>
          <p className="section-sub">
            Уважно вивчаємо потреби, пропонуємо оптимальні інженерні рішення, виробляємо конструкції та супроводжуємо на всіх етапах.
          </p>
        </div>
        <ol className="process">
          {process.map((s, i) => (
            <li key={s.title} data-reveal style={{ transitionDelay: `${i * 110}ms` }}>
              <span className="process-n">0{i + 1}</span>
              <div className="process-bar">
                <span className="process-dot" />
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Trusted() {
  return (
    <section className="section section-tight">
      <div className="container">
        <div className="row-head" data-reveal>
          <div>
            <p className="eyebrow">Нам довіряють</p>
            <h2 className="h2 h2-md">Системи RUDNIK — на об’єктах провідних компаній України</h2>
          </div>
        </div>
        <Partners />
      </div>
    </section>
  );
}

const dateFmt = (d: string) => new Date(d).toLocaleDateString("uk-UA", { day: "numeric", month: "long", year: "numeric" });

export function News() {
  return (
    <section className="section section-gray">
      <div className="container">
        <div className="row-head" data-reveal>
          <div>
            <p className="eyebrow">Новини компанії</p>
            <h2 className="h2 h2-md">Життя заводу та нові продукти</h2>
          </div>
          <a href="https://www.instagram.com/rudnik.ua/" target="_blank" rel="noreferrer" className="text-link">
            <Icon name="instagram" size={18} /> Більше в Instagram
          </a>
        </div>
        <div className="news-grid">
          {news.map((n, i) => {
            const body = (
              <>
                <div className="news-media">
                  <Image src={n.img} alt="" fill sizes="(max-width: 760px) 100vw, (max-width: 1240px) 50vw, 25vw" />
                </div>
                <div className="news-body">
                  <span className="mono">
                    {dateFmt(n.date)} · <span className="red">{n.tag}</span>
                  </span>
                  <h3>{n.title}</h3>
                  <p>{n.text}</p>
                </div>
              </>
            );
            return n.href ? (
              <Link key={n.title} href={n.href} className="news-card" data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
                {body}
              </Link>
            ) : (
              <article key={n.title} className="news-card" data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
                {body}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HomeFaq() {
  return (
    <section className="section">
      <div className="container faq-grid">
        <div data-reveal>
          <p className="eyebrow">F.A.Q.</p>
          <h2 className="h2 h2-md">Часті запитання</h2>
          <p className="section-sub">Відповіді на технічні питання про кожну систему — на її сторінці.</p>
        </div>
        <Faq items={faqHome} />
      </div>
    </section>
  );
}
