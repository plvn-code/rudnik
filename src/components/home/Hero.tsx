"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { BgVideo } from "@/components/BgVideo";
import { Icon } from "@/components/Icons";
import { useScrollProgress } from "@/lib/motion";
import { shots } from "@/lib/portfolio";

const words = (text: string, start: number, cls?: string) =>
  text.split(" ").map((w, i) => (
    <span key={i} className={`word${cls ? ` ${cls}` : ""}`} style={{ marginRight: "0.24em" }}>
      <span style={{ animationDelay: `calc(var(--intro, 2.2s) + ${start + i * 0.08}s)`, ["--d" as string]: `${start + i * 0.08}s` }}>{w}</span>
    </span>
  ));

/**
 * Full-bleed background video (aerial solar plants). While the page scrolls through the first
 * 70svh the frame pulls in to a rounded card (clip-path driven by --p) and the copy lifts away.
 * The card bottom-right leads to the client's own objects, so the stock footage never poses as theirs.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useScrollProgress(ref, (p) => ref.current?.style.setProperty("--p", p.toFixed(4)));

  return (
    <section ref={ref} className="hero" aria-label="RUDNIK — завод систем кріплення для СЕС">
      <div className="hero-sticky">
        <div className="hero-media">
          <BgVideo className="hero-video" />
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
                <Link href="/rozrakhunok" className="btn btn-red btn-lg">
                  Розрахувати вартість <Icon name="arrow" size={18} />
                </Link>
                <Link href="/systemy" className="btn btn-glass btn-lg">
                  Каталог систем
                </Link>
              </div>
            </div>
            <Link href="/portfolio" className="hero-objects fade-up" style={{ animationDelay: "2.9s" }}>
              <span className="hero-objects-img">
                <Image src="/images/portfolio/79.webp" alt="" fill sizes="96px" priority />
              </span>
              <span className="hero-objects-text">
                <span className="mono">Портфоліо</span>
                <strong>{shots.length} фото об’єктів на системах RUDNIK</strong>
                <span>Наземні станції, дахи, паркінги, фасади</span>
              </span>
              <Icon name="arrowUpRight" size={20} />
            </Link>
          </div>
        </div>
        <span className="hero-scroll" aria-hidden="true">
          Гортайте
        </span>
      </div>
    </section>
  );
}
