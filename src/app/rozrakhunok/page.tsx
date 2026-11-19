import Image from "next/image";
import type { Metadata } from "next";
import { BgVideo } from "@/components/BgVideo";
import { Icon } from "@/components/Icons";
import { Quiz } from "@/components/Quiz";
import { QuizPick } from "@/components/QuizPick";
import { Faq, Partners, faqSchema } from "@/components/Shared";
import { shotAlt, shotSrc, shots } from "@/lib/portfolio";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Розрахунок вартості кріплення для сонячних панелей — квіз",
  description: "6 питань — і ви бачите, яка система RUDNIK підходить вашому об’єкту, потужність станції та орієнтовну вартість кріплення. Точну ціну заводу надішле менеджер.",
};

const faq: [string, string][] = [
  ["Чому вартість у квізі орієнтовна?", "Ціна кріплення залежить від вітрових і снігових навантажень регіону, ґрунту чи типу покрівлі, кута нахилу та розкладки рядів. Квіз показує діапазон, а точну специфікацію й ціну заводу менеджер RUDNIK готує після уточнення параметрів."],
  ["Що входить у систему кріплення?", "Несучі елементи (рами, трикутники, кронштейни чи блоки), монтажний профіль, з’єднувачі, крайні та міжмодульні притиски, а для баластних систем — спойлери, гумові мати й баластні блоки. Склад для кожної системи — на її сторінці."],
  ["Ви монтуєте станції?", "RUDNIK — завод-виробник: проєктуємо, виготовляємо та відвантажуємо конструкції, надаємо інструкції й інженерний супровід. Забивання паль для наземних станцій виконуємо власними бригадами й технікою."],
  ["Чи є знижки для монтажних компаній?", "Так. Партнерам — спеціальні ціни на всю продукцію, швидке виготовлення та доставка, прямий контакт з інженерами, інструкції та маркетингова підтримка."],
  ["Чи можна отримати розрахунок міцності?", "Так. Статика систем розраховується згідно з ДБН для всіх кліматичних зон України; за запитом надаємо технічний паспорт із розрахунками для вашого регіону."],
];

const why = [
  { icon: "factory", title: "Ціна заводу", text: "Власне виробництво 5 800 м² — без посередників між металом і вашим об’єктом." },
  { icon: "truck", title: "Склад 4 500 м²", text: "Запас сировини й комплектуючих — відвантаження точно в терміни графіка." },
  { icon: "ruler", title: "Розрахунок за ДБН", text: "Конструкція під вітрові та снігові навантаження вашого регіону." },
  { icon: "handshake", title: "Партнерські умови", text: "Спецціни, інструкції та прямий контакт з інженерами для монтажників." },
] as const;

const steps = [
  ["Відповідаєте на 6 питань", "Де стоятиме станція, скільки модулів, матеріал і терміни — без технічних знань."],
  ["Бачите систему й орієнтир", "Квіз підбирає систему RUDNIK, рахує потужність і показує діапазон вартості."],
  ["Отримуєте ціну заводу", "Менеджер комерційного відділу надсилає специфікацію комплектів і точну ціну."],
];

const PICKS = ["79", "39", "11", "18", "64", "15"];

export default function Page() {
  const picks = PICKS.map((id) => shots.find((s) => s.id === id)!).filter(Boolean);
  return (
    <>
      <section className="lp-hero">
        <BgVideo />
        <div className="lp-hero-shade" />
        <div className="container lp-hero-grid">
          <div className="lp-hero-text">
            <p className="eyebrow on-dark fade-up">Калькулятор кріплень RUDNIK</p>
            <h1 className="lp-title fade-up" style={{ animationDelay: "90ms" }}>
              Розрахуйте вартість кріплення <span className="red-word">для ваших панелей</span>
            </h1>
            <p className="lp-lead fade-up" style={{ animationDelay: "180ms" }}>
              6 коротких питань — і ви побачите, яка система підходить вашому об’єкту, потужність станції та орієнтовну вартість. Точну ціну заводу надішле менеджер.
            </p>
            <ul className="lp-checks fade-up" style={{ animationDelay: "270ms" }}>
              {["Результат одразу, без реєстрації", "Система під ваш дах чи ділянку", "Специфікація від інженерів заводу"].map((t) => (
                <li key={t}>
                  <Icon name="check" size={18} /> {t}
                </li>
              ))}
            </ul>
            <a href="#quiz" className="btn btn-red btn-lg lp-mobile-cta fade-up" style={{ animationDelay: "320ms" }}>
              Почати розрахунок <Icon name="arrow" size={18} />
            </a>
            <div className="lp-trust fade-up" style={{ animationDelay: "360ms" }}>
              <div>
                <strong>10+</strong>
                <span>років досвіду</span>
              </div>
              <div>
                <strong>2 400 т</strong>
                <span>металу на місяць</span>
              </div>
              <div>
                <strong>{shots.length}</strong>
                <span>фото об’єктів у портфоліо</span>
              </div>
            </div>
          </div>
          <div className="fade-up" style={{ animationDelay: "200ms" }}>
            <Quiz />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row-head" data-reveal>
            <div>
              <p className="eyebrow">Як це працює</p>
              <h2 className="h2 h2-md">Три кроки до точної ціни</h2>
            </div>
          </div>
          <ol className="lp-steps">
            {steps.map(([t, d], i) => (
              <li key={t} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
                <span className="lp-step-n">0{i + 1}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <div className="row-head" data-reveal>
            <div>
              <p className="eyebrow">Оберіть об’єкт</p>
              <h2 className="h2 h2-md">Почніть розрахунок з вашої поверхні</h2>
            </div>
            <p className="section-sub">Натисніть на картку — квіз відкриється вже з потрібною системою.</p>
          </div>
          <QuizPick />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row-head" data-reveal>
            <div>
              <p className="eyebrow">Чому RUDNIK</p>
              <h2 className="h2 h2-md">Кріплення напряму від заводу</h2>
            </div>
          </div>
          <div className="lp-why">
            {why.map((w, i) => (
              <div key={w.title} className="lp-why-card spot" data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
                <Icon name={w.icon} size={30} />
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
          <div className="lp-shots">
            {picks.map((s, i) => (
              <figure key={s.id} data-reveal="clip" style={{ transitionDelay: `${i * 80}ms` }}>
                <Image src={shotSrc(s)} alt={shotAlt(s)} fill sizes="(max-width: 760px) 50vw, 17vw" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <p className="eyebrow" data-reveal>
            Нам довіряють
          </p>
          <Partners />
        </div>
      </section>

      <section className="section">
        <div className="container faq-grid">
          <div data-reveal>
            <p className="eyebrow">F.A.Q.</p>
            <h2 className="h2 h2-md">Питання про розрахунок</h2>
            <p className="section-sub">
              Зручніше голосом? Комерційний відділ: <a href={site.phoneHref}>{site.phone}</a>, {site.hours.toLowerCase()}.
            </p>
          </div>
          <Faq items={faq} />
        </div>
      </section>

      <section className="lp-final">
        <div className="container lp-final-row" data-reveal>
          <h2 className="h2 h2-md">Дізнайтеся вартість за хвилину</h2>
          <a href="#quiz" className="btn btn-glass btn-lg">
            Почати розрахунок <Icon name="arrow" size={18} />
          </a>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faq)) }} />
    </>
  );
}
