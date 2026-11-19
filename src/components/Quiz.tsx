"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "./Icons";
import { LeadForm } from "./LeadForm";
import { productBySlug, productHref } from "@/lib/products";
import { type Opt, details, estimate, hasMaterial, materials, panelPowers, roles, surfaces, terms, uah } from "@/lib/quiz";

type Answers = { surface?: string; detail?: string; panels: number; power: number; material?: string; role?: string; term?: string };
type StepId = "surface" | "detail" | "volume" | "material" | "role" | "term" | "result";

// Log-scale slider: 0..1000 → 4..3000 modules, rounded to friendly numbers.
const MIN = 4;
const MAX = 3000;
const toPanels = (t: number) => {
  const v = MIN * Math.pow(MAX / MIN, t / 1000);
  const step = v < 40 ? 1 : v < 200 ? 5 : v < 1000 ? 10 : 50;
  return Math.round(v / step) * step;
};
const toSlider = (n: number) => Math.round((Math.log(n / MIN) / Math.log(MAX / MIN)) * 1000);
const PRESETS = [10, 30, 100, 400, 1000];

/** Animated number for the result (counts up once). */
function CountUp({ value, format }: { value: number; format: (n: number) => string }) {
  const [v, setV] = useState(value);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setV(value);
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / 1100);
      setV(Math.round(value * (1 - Math.pow(1 - k, 4))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{format(v)}</>;
}

function Tiles({ opts, value, onPick, big }: { opts: Opt[]; value?: string; onPick: (id: string) => void; big?: boolean }) {
  return (
    <div className={`quiz-tiles${big ? " is-big" : ""}`} role="radiogroup">
      {opts.map((o, i) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={value === o.id}
          className={`quiz-tile${value === o.id ? " is-on" : ""}${o.img ? " has-img" : ""}`}
          style={{ animationDelay: `${i * 45}ms` }}
          onClick={() => onPick(o.id)}
        >
          {o.img && (
            <span className="quiz-tile-img">
              <Image src={o.img} alt="" fill sizes="200px" />
            </span>
          )}
          <span className="quiz-tile-text">
            <strong>{o.label}</strong>
            {o.hint && <small>{o.hint}</small>}
          </span>
          <span className="quiz-check" aria-hidden="true">
            <Icon name="check" size={14} />
          </span>
        </button>
      ))}
    </div>
  );
}

/**
 * Cost quiz: surface → variant → volume → material (if the system comes in both) → who you are → timing → result.
 * The result names the RUDNIK system, power and an indicative range (market prices, labelled as such),
 * and the lead form carries every answer to the commercial department.
 */
export function Quiz({ id = "quiz" }: { id?: string }) {
  const [a, setA] = useState<Answers>({ panels: 40, power: 550 });
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const top = useRef<HTMLDivElement>(null);

  const steps = useMemo<StepId[]>(() => {
    const s: StepId[] = ["surface", "detail", "volume"];
    if (!a.surface || hasMaterial(a.surface)) s.push("material");
    s.push("role", "term", "result");
    return s;
  }, [a.surface]);

  // Cards elsewhere on the page can start the quiz with a surface already chosen.
  useEffect(() => {
    const onPick = (e: Event) => {
      const surface = (e as CustomEvent<string>).detail;
      setA((s) => ({ ...s, surface, detail: undefined, material: undefined }));
      setDir(1);
      setI(1);
      top.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    window.addEventListener("quiz:pick", onPick);
    return () => window.removeEventListener("quiz:pick", onPick);
  }, []);

  const step = steps[Math.min(i, steps.length - 1)];
  const total = steps.length - 1;
  const surface = surfaces.find((s) => s.id === a.surface);
  const system = surface ? productBySlug(surface.system) : undefined;
  const detailCfg = a.surface ? details[a.surface] : undefined;
  const detailOpt = detailCfg?.opts.find((o) => o.id === a.detail);
  const kw = (a.panels * a.power) / 1000;
  const price = system ? estimate(system.slug, a.panels, a.material ?? "unknown") : null;

  const go = (n: number) => {
    setDir(n > i ? 1 : -1);
    setI(Math.max(0, Math.min(steps.length - 1, n)));
    // Keep the card in view on phones when it changes height.
    const el = top.current;
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const pick = (key: keyof Answers, v: string) => {
    setA((s) => ({ ...s, [key]: v, ...(key === "surface" && v !== s.surface ? { detail: undefined, material: undefined } : {}) }));
    window.setTimeout(() => go(i + 1), 260);
  };

  const canNext = (step === "surface" && a.surface) || (step === "detail" && a.detail) || step === "volume" || (step === "material" && a.material) || (step === "role" && a.role) || (step === "term" && a.term);

  const label = (opts: Opt[], v?: string) => opts.find((o) => o.id === v)?.label ?? "—";
  const summary = [
    `Квіз-розрахунок`,
    `Об’єкт: ${surface?.label ?? "—"}${system ? ` → ${system.title}` : ""}`,
    `${detailCfg?.q ?? "Варіант"} ${detailOpt?.label ?? "—"}`,
    `Модулів: ${a.panels} × ${a.power} Вт ≈ ${kw.toFixed(1)} кВт`,
    hasMaterial(a.surface ?? "") ? `Матеріал: ${label(materials, a.material)}` : "",
    `Хто: ${label(roles, a.role)}`,
    `Терміни: ${label(terms, a.term)}`,
    price ? `Показаний орієнтир: ${uah(price.lo)} – ${uah(price.hi)}` : "Ціна: за проєктом",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="quiz" id={id} ref={top}>
      <div className="quiz-head">
        <span className="mono">{step === "result" ? "Ваш результат" : `Крок ${i + 1} / ${total}`}</span>
        <div className="quiz-progress" aria-hidden="true">
          <i style={{ transform: `scaleX(${Math.min(1, i / total)})` }} />
        </div>
      </div>

      <div className="quiz-body" key={step} data-dir={dir}>
        {step === "surface" && (
          <>
            <h3 className="quiz-q">Де встановлюватимете панелі?</h3>
            <Tiles opts={surfaces} value={a.surface} onPick={(v) => pick("surface", v)} big />
          </>
        )}

        {step === "detail" && detailCfg && (
          <>
            <h3 className="quiz-q">{detailCfg.q}</h3>
            <Tiles opts={detailCfg.opts} value={a.detail} onPick={(v) => pick("detail", v)} big={detailCfg.opts.some((o) => o.img)} />
          </>
        )}

        {step === "volume" && (
          <>
            <h3 className="quiz-q">Скільки модулів плануєте?</h3>
            <div className="quiz-volume">
              <div className="quiz-volume-num">
                <input
                  type="number"
                  min={1}
                  max={50000}
                  value={a.panels}
                  aria-label="Кількість модулів"
                  onChange={(e) => setA((s) => ({ ...s, panels: Math.max(1, Math.min(50000, Number(e.target.value) || 1)) }))}
                />
                <span>модулів</span>
                <em>
                  ≈ {kw >= 100 ? Math.round(kw) : kw.toFixed(1)} <small>кВт</small>
                </em>
              </div>
              <input
                className="quiz-range"
                type="range"
                min={0}
                max={1000}
                value={toSlider(Math.min(MAX, Math.max(MIN, a.panels)))}
                aria-label="Кількість модулів, повзунок"
                style={{ ["--f" as string]: `${toSlider(Math.min(MAX, Math.max(MIN, a.panels))) / 10}%` }}
                onChange={(e) => setA((s) => ({ ...s, panels: toPanels(Number(e.target.value)) }))}
              />
              <div className="quiz-presets">
                {PRESETS.map((n) => (
                  <button key={n} type="button" className={a.panels === n ? "is-on" : undefined} onClick={() => setA((s) => ({ ...s, panels: n }))}>
                    {n}
                    {n === 1000 ? "+" : ""}
                  </button>
                ))}
              </div>
              <span className="mono">Потужність одного модуля</span>
              <div className="seg">
                {panelPowers.map((p) => (
                  <button key={p} type="button" className={a.power === p ? "is-on" : undefined} onClick={() => setA((s) => ({ ...s, power: p }))}>
                    {p} Вт
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {step === "material" && (
          <>
            <h3 className="quiz-q">З якого матеріалу?</h3>
            <Tiles opts={materials} value={a.material} onPick={(v) => pick("material", v)} />
          </>
        )}

        {step === "role" && (
          <>
            <h3 className="quiz-q">Хто ви?</h3>
            <Tiles opts={roles} value={a.role} onPick={(v) => pick("role", v)} />
          </>
        )}

        {step === "term" && (
          <>
            <h3 className="quiz-q">Коли потрібна поставка?</h3>
            <Tiles opts={terms} value={a.term} onPick={(v) => pick("term", v)} />
          </>
        )}

        {step === "result" && system && (
          <div className="quiz-result">
            <div className="quiz-result-top">
              <div className="quiz-result-img">
                <Image src={detailOpt?.img ?? surface?.img ?? system.cover} alt={system.title} fill sizes="300px" />
              </div>
              <div>
                <span className="mono red">Рекомендована система</span>
                <h3>{system.kind === "system" && system.code !== "FACADE" ? system.code : system.name}</h3>
                <p>
                  {system.name}
                  {detailOpt && detailOpt.id !== "unknown" ? ` · ${detailOpt.label}` : ""}
                  {a.material && a.material !== "unknown" ? ` · ${label(materials, a.material).toLowerCase()}` : ""}
                </p>
                <Link href={productHref(system)} className="text-link" target="_blank">
                  Про систему <Icon name="arrowUpRight" size={14} />
                </Link>
              </div>
            </div>

            <dl className="quiz-figures">
              <div>
                <dt>Модулів</dt>
                <dd>
                  <CountUp value={a.panels} format={(n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} />
                </dd>
              </div>
              <div>
                <dt>Потужність</dt>
                <dd>{kw >= 100 ? Math.round(kw) : kw.toFixed(1)} кВт</dd>
              </div>
              <div className="quiz-price">
                <dt>Кріплення, орієнтовно</dt>
                <dd>
                  {price ? (
                    <>
                      <CountUp value={price.lo} format={uah} /> – <CountUp value={price.hi} format={uah} />
                    </>
                  ) : (
                    "Розрахунок за проєктом"
                  )}
                </dd>
              </div>
            </dl>
            <p className="quiz-note">
              {price
                ? "Діапазон роздрібних цін на аналогічні системи в Україні, без доставки та монтажу. Ціну заводу RUDNIK і специфікацію комплектів менеджер надішле після уточнення навантажень."
                : `${system.name} проєктується під конкретний об’єкт — інженери RUDNIK розрахують конструкцію та вартість після аналізу майданчика.`}
              {a.role === "installer" || a.role === "dealer" ? " Для монтажних компаній і дилерів діють партнерські ціни." : ""}
            </p>

            <div className="quiz-form">
              <strong>Отримайте точну ціну та специфікацію</strong>
              <LeadForm key={summary} details={summary} source="quiz" topic="Прорахунок" topics={false} button="Отримати точний прорахунок" />
            </div>
            <button type="button" className="quiz-restart" onClick={() => go(0)}>
              <Icon name="chevronLeft" size={16} /> Пройти ще раз
            </button>
          </div>
        )}
      </div>

      {step !== "result" && (
        <div className="quiz-nav">
          <button type="button" className="quiz-back" onClick={() => go(i - 1)} disabled={i === 0}>
            <Icon name="chevronLeft" size={18} /> Назад
          </button>
          <button type="button" className="btn btn-red" onClick={() => go(i + 1)} disabled={!canNext}>
            {steps[i + 1] === "result" ? "Показати результат" : "Далі"} <Icon name="arrow" size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
