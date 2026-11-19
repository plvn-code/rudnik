"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Icon } from "@/components/Icons";
import { useScrollProgress } from "@/lib/motion";
import { catName, shotSrc, shots } from "@/lib/portfolio";

const PICK = ["02", "73", "30", "18", "15", "64", "39", "45", "71", "80"];

/** Vertical scroll drives a horizontal rail of finished objects (desktop); a swipe row on phones. */
export function Rail() {
  const wrap = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const picks = PICK.map((id) => shots.find((s) => s.id === id)!).filter(Boolean);

  useScrollProgress(wrap, (p) => {
    const r = rail.current;
    const w = wrap.current;
    if (!r || !w || window.innerWidth <= 760) return;
    const max = r.scrollWidth - window.innerWidth + 40;
    r.style.transform = `translate3d(${(-p * max).toFixed(1)}px,0,0)`;
    w.style.setProperty("--p", p.toFixed(4));
  });

  return (
    <section ref={wrap} className="rail-wrap" aria-label="Портфоліо">
      <div className="rail-sticky">
        <div className="container row-head">
          <div>
            <p className="eyebrow">Портфоліо</p>
            <h2 className="h2">
              Фото готових <span className="thin">об’єктів</span>
            </h2>
          </div>
          <p className="section-sub">Наші системи обрані професіоналами для об’єктів будь-якого масштабу — стандарт надійності для сотень проєктів по всій Україні.</p>
        </div>
        <div ref={rail} className="rail">
          {picks.map((s) => (
            <figure key={s.id} className="rail-card" data-cursor="Портфоліо">
              <Link href={`/portfolio?cat=${s.cats[0]}`} aria-label={`${catName(s.cats[0])}: ${s.label}`}>
                <Image src={shotSrc(s)} alt={`${catName(s.cats[0])} — ${s.label}`} fill sizes="(max-width: 760px) 78vw, 30vw" />
              </Link>
              <figcaption>
                <div>
                  <strong>{catName(s.cats[0])}</strong>
                  <span>{s.label}</span>
                </div>
                <Icon name="arrowUpRight" size={18} />
              </figcaption>
            </figure>
          ))}
          <Link href="/portfolio" className="rail-end">
            <strong>{shots.length}</strong>
            <span>фото об’єктів у портфоліо</span>
            <span className="btn btn-glass btn-sm">
              Дивитися все <Icon name="arrow" size={16} />
            </span>
          </Link>
        </div>
        <div className="container">
          <div className="rail-progress">
            <i />
          </div>
        </div>
      </div>
    </section>
  );
}
