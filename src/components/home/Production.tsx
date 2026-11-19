"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Icon } from "@/components/Icons";
import { capacities } from "@/lib/copy";
import { useScrollProgress } from "@/lib/motion";

/**
 * "From coil to warehouse": a pinned scene (desktop) where scrolling walks through the five real
 * production stages with the equipment parameters from rudnik.ua/lstk. Photos wipe up one over another.
 * Below 1080px it becomes a tabbed block (CSS turns the pin off; the tabs still work).
 */
export function Production() {
  const ref = useRef<HTMLDivElement>(null);
  const tabs = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const n = capacities.length;

  useScrollProgress(ref, (p) => {
    if (window.innerWidth <= 1080) return;
    const s = Math.min(n - 1, Math.floor(p * n * 0.999));
    setStep((cur) => (cur === s ? cur : s));
    tabs.current?.querySelectorAll<HTMLElement>("i").forEach((el, k) => el.style.setProperty("--f", String(Math.max(0, Math.min(1, p * n - k)))));
  });

  const jump = (k: number) => {
    const el = ref.current;
    if (!el || window.innerWidth <= 1080) {
      setStep(k);
      tabs.current?.querySelectorAll<HTMLElement>("i").forEach((t, j) => t.style.setProperty("--f", j <= k ? "1" : "0"));
      return;
    }
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((k + 0.5) / n) * (el.offsetHeight - window.innerHeight), behavior: "smooth" });
  };

  return (
    <section className="prod" aria-label="Виробництво RUDNIK">
      <div ref={ref} className="prod-track">
        <div className="prod-sticky">
          <div className="container prod-grid">
            <div className="prod-head">
              <p className="eyebrow on-dark" style={{ color: "#ff5a4f" }}>
                Виробництво
              </p>
              <h2 className="h2">Від рулону сталі до готового комплекту</h2>
              <p className="section-sub">Власний завод дає повний цикл: розробка документації, виготовлення, контроль і відвантаження — під одним дахом.</p>
              <div className="prod-steps">
                {capacities.map((c, k) => (
                  <div key={c.id} className={`prod-step${k === step ? " is-on" : ""}`} aria-hidden={k !== step}>
                    <span className="mono">
                      Етап {String(k + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                    </span>
                    <h3>{c.title}</h3>
                    <p>{c.text}</p>
                    <dl className="prod-params">
                      {c.params.map(([a, b]) => (
                        <div key={a}>
                          <dt>{a}</dt>
                          <dd>{b}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
              <div ref={tabs} className="prod-tabs">
                {capacities.map((c, k) => (
                  <button key={c.id} type="button" aria-label={c.title} onClick={() => jump(k)}>
                    <i />
                  </button>
                ))}
              </div>
              <Link href="/vyrobnytstvo" className="text-link" style={{ marginTop: 26, color: "#fff" }}>
                Усе про виробництво <Icon name="arrow" size={16} />
              </Link>
            </div>
            <div className="prod-media">
              {capacities.map((c, k) => (
                <div key={c.id} className={`prod-img${k === step ? " is-on" : k < step ? " is-past" : ""}`}>
                  <Image src={c.img} alt={c.title} fill sizes="(max-width: 1080px) 100vw, 55vw" />
                </div>
              ))}
              <span className="prod-counter">
                {String(step + 1).padStart(2, "0")}
                <small>/{String(n).padStart(2, "0")}</small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
