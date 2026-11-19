"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { LeadButton } from "@/components/LeadModal";
import { Icon } from "@/components/Icons";
import { reducedMotion, useScrollProgress } from "@/lib/motion";
import { heroShots } from "@/lib/portfolio";

const DUR = 6000;

const words = (text: string, start: number, cls?: string) =>
  text.split(" ").map((w, i) => (
    <span key={i} className={`word${cls ? ` ${cls}` : ""}`} style={{ marginRight: "0.24em" }}>
      <span style={{ animationDelay: `calc(var(--intro, 2.2s) + ${start + i * 0.08}s)`, ["--d" as string]: `${start + i * 0.08}s` }}>{w}</span>
    </span>
  ));

/**
 * Full-bleed slideshow of the client's own drone shots. While the page scrolls through the first
 * 70svh the frame pulls in to a rounded card (clip-path driven by --p) and the copy lifts away.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number>(0);

  useScrollProgress(ref, (p) => ref.current?.style.setProperty("--p", p.toFixed(4)));

  const go = useCallback((n: number) => setI((n + heroShots.length) % heroShots.length), []);

  useEffect(() => {
    if (paused || reducedMotion()) return;
    timer.current = window.setTimeout(() => go(i + 1), DUR);
    return () => window.clearTimeout(timer.current);
  }, [i, paused, go]);

  // Stop cycling when the hero is off screen (saves decoding work further down the page).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setPaused(!e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cur = heroShots[i];

  return (
    <section ref={ref} className="hero" aria-label="RUDNIK — завод систем кріплення для СЕС">
      <div className="hero-sticky">
        <div className="hero-media">
          {heroShots.map((s, k) => (
            <div key={s.id} className={`hero-slide${k === i ? " is-on" : ""}`} aria-hidden={k !== i}>
              <Image src={`/images/portfolio/${s.id}.webp`} alt={s.caption} fill priority={k === 0} sizes="100vw" />
            </div>
          ))}
          <div className="hero-shade" />
        </div>

        <div className="container hero-content">
          <span className="hero-badge fade-up" style={{ animationDelay: "2.1s" }}>
            <span className="pulse" /> Український завод · з 2015 року
          </span>
          <h1 className="hero-title">
            <span className="hero-line">{words("Системи кріплення", 0)}</span>
            <span className="hero-line">
              {words("для", 0.2, "thin")}
              {words("сонячних", 0.3, "red-word")}
            </span>
            <span className="hero-line">{words("електростанцій", 0.45)}</span>
          </h1>
          <div className="hero-bottom">
            <div className="fade-up" style={{ animationDelay: "2.7s" }}>
              <p className="hero-lead">
                Наземні, баластні, дахові, блочні й фасадні системи, Solar Parking та монтажний профіль. Власний завод, повний цикл
                виробництва та інженерний супровід — від прорахунку до відвантаження.
              </p>
              <div className="hero-actions">
                <LeadButton className="btn btn-red btn-lg" topic="Прорахунок">
                  Отримати прорахунок <Icon name="arrow" size={18} />
                </LeadButton>
                <Link href="/systemy" className="btn btn-glass btn-lg">
                  Каталог систем
                </Link>
              </div>
            </div>
            <div className="hero-nav fade-up" style={{ animationDelay: "2.9s" }}>
              <div className="hero-caption">
                <span>
                  {String(i + 1).padStart(2, "0")} / {String(heroShots.length).padStart(2, "0")}
                </span>
                <Link href={cur.href}>
                  {cur.caption} <Icon name="arrowUpRight" size={14} />
                </Link>
              </div>
              <div className="hero-dots" style={{ ["--dur" as string]: `${DUR}ms` }}>
                {heroShots.map((s, k) => (
                  <button
                    key={s.id + (k === i ? `-${i}` : "")}
                    type="button"
                    aria-label={`Кадр ${k + 1}: ${s.caption}`}
                    className={k === i ? (paused ? "is-done" : "is-on") : k < i ? "is-done" : undefined}
                    onClick={() => go(k)}
                  >
                    <i />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <span className="hero-scroll" aria-hidden="true">
          Гортайте
        </span>
      </div>
    </section>
  );
}
