"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icons";
import { reducedMotion } from "@/lib/motion";
import { productHref, systems } from "@/lib/products";

const DUR = 7000;

/**
 * Signature block: "Where will the station stand?" — six surfaces, each switches the 3D render of the
 * matching RUDNIK system, its key specs and a link. Cycles on its own while in view until the visitor clicks.
 */
export function Picker() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !visible || reducedMotion()) return;
    const t = window.setTimeout(() => setI((n) => (n + 1) % systems.length), DUR);
    return () => window.clearTimeout(t);
  }, [i, auto, visible]);

  const cur = systems[i];

  return (
    <section ref={ref} className="section picker" id="systemy">
      <div className="container">
        <div className="row-head" data-reveal>
          <div>
            <p className="eyebrow">Наші напрямки</p>
            <h2 className="h2">
              Де стоятиме <span className="thin">ваша</span> станція?
            </h2>
          </div>
          <p className="section-sub">Оберіть поверхню — покажемо систему RUDNIK, створену саме для неї. Усі рендери — реальні конструкції заводу.</p>
        </div>

        <div className="picker-grid">
          <div className="picker-list" role="tablist" aria-label="Тип об’єкта" style={{ ["--dur" as string]: `${DUR}ms` }}>
            {systems.map((s, k) => (
              <button
                key={s.slug + (k === i && auto && visible ? `-${i}` : "")}
                type="button"
                role="tab"
                aria-selected={k === i}
                className={k === i ? "is-on" : undefined}
                onClick={() => {
                  setI(k);
                  setAuto(false);
                }}
              >
                <span className="mono">{String(k + 1).padStart(2, "0")}</span>
                <strong>{s.where}</strong>
                <em>{s.code === "FACADE" ? "Фасадна" : s.code}</em>
              </button>
            ))}
          </div>

          <div className="picker-stage">
            <span className="picker-code" aria-hidden="true">
              {cur.code}
            </span>
            <div className="picker-imgs">
              <div className="picker-ring" />
              {systems.map((s, k) => (
                <div key={s.slug} className={`picker-img${k === i ? " is-on" : ""}`} aria-hidden={k !== i}>
                  <Image
                    src={s.slug === "fasad" ? "/images/render/facade-2.webp" : s.cover}
                    alt={s.title}
                    fill
                    sizes="(max-width: 1080px) 100vw, 60vw"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              ))}
            </div>
            <div className="picker-card" role="tabpanel" key={cur.slug}>
              <span className="mono red">{cur.name}</span>
              <h3 className="h3" style={{ marginTop: 6 }}>
                {cur.code === "FACADE" ? "Фасадна система" : cur.code}
              </h3>
              <p>{cur.short}</p>
              <dl>
                {cur.specs.slice(1, 4).map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <Link href={productHref(cur)} className="btn btn-ink btn-sm">
                Детальніше про систему <Icon name="arrow" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
