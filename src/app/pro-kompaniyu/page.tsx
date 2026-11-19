import Image from "next/image";
import type { Metadata } from "next";
import { ContactBand, PageHero } from "@/components/Shared";
import { MARK_VIEWBOX, markPaths, markUa } from "@/components/Logo";
import { News, Partnership, Process, Trusted, Why } from "@/components/home/Sections";

export const metadata: Metadata = {
  title: "Про компанію",
  description: "RUDNIK — український виробник систем кріплення для промислових сонячних станцій, наземних і дахових конструкцій та фасадів. З 2015 року.",
};

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Про компанію", href: "/pro-kompaniyu" }]}
        eyebrow="Про RUDNIK"
        title={
          <>
            Ваш стандарт <span className="red">надійності</span>
          </>
        }
        lead="Український виробник, що спеціалізується на розробці та виготовленні систем кріплення для промислових сонячних станцій, наземних і дахових конструкцій, а також фасадів."
      />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container about-grid">
          <div className="about-text" data-reveal>
            <p>
              В основі компанії — досвід фахівців, які понад 10 років працюють у сфері відновлюваної енергетики, інженерії та виготовлення металевих конструкцій.
              Розуміння галузі зсередини дозволяє створювати справді надійні та довговічні системи, адаптовані до складних кліматичних умов і нормативних вимог.
            </p>
            <p>
              З самого початку ми робили ставку на розвиток власного виробництва, поступово нарощуючи потужності та вдосконалюючи технологічні процеси. Це дає
              змогу повністю контролювати якість продукції та забезпечувати стабільне постачання систем для об’єктів будь-якої складності.
            </p>
            <p>
              Ми зосереджені на підтримці розвитку зеленої енергетики в Україні: пропонуємо партнерам перевірені системи кріплення, які суттєво зменшують
              експлуатаційні ризики та забезпечують максимальну ефективність кожної інвестиції.
            </p>
          </div>
          <div className="about-media">
            <figure data-reveal="clip">
              <Image src="/images/site/about-a.webp" alt="Стенд RUDNIK на галузевій виставці" fill sizes="(max-width: 1080px) 50vw, 25vw" />
            </figure>
            <figure data-reveal="clip">
              <Image src="/images/site/lstk-b.webp" alt="Склад готового профілю на заводі RUDNIK" fill sizes="(max-width: 1080px) 50vw, 25vw" />
            </figure>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="mission" data-reveal>
            <span className="mono">Наша місія</span>
            <p>Ми створюємо надійні системи кріплення та конструкції для СЕС, щоб ваші проєкти були міцними, ефективними та довговічними.</p>
            <p>Наша мета — забезпечити якісну основу, на яку можна покластися роками.</p>
            <svg className="mission-mark" viewBox={MARK_VIEWBOX} aria-hidden="true">
              {markPaths.map((d) => (
                <path key={d.slice(0, 12)} d={d} />
              ))}
              <polygon points={markUa} />
            </svg>
          </div>
        </div>
      </section>

      <Why />
      <Partnership />
      <Process />
      <Trusted />
      <News />
      <ContactBand topic="Партнерство" title="Станьмо партнерами" />
    </>
  );
}
