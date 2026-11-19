"use client";

import { useRef } from "react";
import { useScrollProgress } from "@/lib/motion";
import { facts } from "@/lib/site";

const TEXT =
  "RUDNIK — український виробник систем кріплення для промислових сонячних станцій, наземних і дахових конструкцій та фасадів. Власний завод, *повний* *цикл* *виробництва* і контроль якості на кожному етапі: від відбору сировини до пакування перед відправленням.";

const fmt = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/** Words light up one by one as the paragraph scrolls through the viewport, then the four counters. */
export function Manifest() {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = TEXT.split(" ");

  useScrollProgress(
    ref,
    (p) => {
      const el = ref.current;
      if (!el) return;
      const lit = Math.round(((p - 0.15) / 0.55) * words.length);
      el.querySelectorAll<HTMLElement>(".mw").forEach((w, i) => (w.style.opacity = i < lit ? "1" : ""));
    },
    "through",
  );

  return (
    <section className="manifest">
      <div className="container">
        <div className="manifest-grid">
          <p className="eyebrow">Про компанію</p>
          <p ref={ref} className="manifest-text">
            {words.map((w, i) => {
              const hi = w.startsWith("*");
              return (
                <span key={i} className={`mw${hi ? " mw-red" : ""}`}>
                  {hi ? w.replaceAll("*", "") : w}{" "}
                </span>
              );
            })}
          </p>
        </div>
        <ul className="facts">
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
  );
}
