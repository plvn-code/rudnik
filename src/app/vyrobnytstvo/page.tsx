import Image from "next/image";
import type { Metadata } from "next";
import { ContactBand, PageHero } from "@/components/Shared";
import { Production } from "@/components/home/Production";
import { ProductionVideo } from "@/components/home/VideoBand";
import { capacities } from "@/lib/copy";
import { facts } from "@/lib/site";

export const metadata: Metadata = {
  title: "Виробництво: власний завод систем кріплення",
  description: "Завод RUDNIK: 5 800 м² виробничих площ, 4 500 м² складу, 2 400 т металу на місяць. Розпуск рулону, холодне профілювання, штампування, різання.",
};

const fmt = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Виробництво", href: "/vyrobnytstvo" }]}
        eyebrow="Виробничі потужності"
        title={
          <>
            Власний <span className="red">завод</span> <span className="thin">— наша гарантія</span>
          </>
        }
        lead="Фундамент компанії — власний сучасний завод. Повний цикл створення систем кріплення: від конструкторської документації до відправлення готової продукції."
        image="/images/site/prod-1.webp"
        photo
      />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <ul className="facts" style={{ marginTop: 0 }}>
            {facts.map((f, i) => (
              <li key={f.label} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
                <strong>
                  <span data-count={f.value}>{fmt(f.value)}</span>
                  {f.suffix}
                  <small>{f.unit}</small>
                </strong>
                <span>{f.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container video-band">
          <div className="about-text" data-reveal>
            <p className="eyebrow">Якість — це система</p>
            <h2 className="h2 h2-md" style={{ marginBottom: 10 }}>
              Синергія обладнання та команди
            </h2>
            <p>
              Висока якість продукції — результат синергії сучасного обладнання та професіоналізму команди. Кожен етап виробництва контролюють досвідчені
              інженери та оператори, що виключає дефекти.
            </p>
            <p>
              Для стабільності постачань ми підтримуємо значний запас сировини та комплектуючих на власних складах, що дозволяє відвантажувати продукцію точно в
              обумовлені графіком терміни.
            </p>
            <p>
              Власне виробництво — наша гарантія того, що кожен елемент системи RUDNIK відповідатиме найвищим стандартам витривалості та безпеки.
            </p>
          </div>
          <ProductionVideo />
        </div>
      </section>

      <Production />

      <section className="section">
        <div className="container">
          <div className="row-head" data-reveal>
            <div>
              <p className="eyebrow">Обладнання</p>
              <h2 className="h2 h2-md">Параметри виробничих ліній</h2>
            </div>
            <p className="section-sub">Працюємо зі сталлю будь-яких марок для холодного профілювання: межа плинності до 450 МПа, тимчасовий опір до 600 МПа.</p>
          </div>
          <div className="cap-grid">
            {capacities.map((c, i) => (
              <article key={c.id} className="cap-card" data-reveal style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
                <div className="cap-card-media">
                  <Image src={c.img} alt={c.title} fill sizes="(max-width: 760px) 100vw, 25vw" />
                </div>
                <div className="cap-card-body">
                  <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                  <dl>
                    {c.params.map(([a, b]) => (
                      <div key={a}>
                        <dt>{a}</dt>
                        <dd>{b}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ContactBand title="Потрібна партія профілю чи комплектів?" topic="Прорахунок" />
    </>
  );
}
