"use client";

import Image from "next/image";
import { Icon } from "./Icons";
import { surfaces } from "@/lib/quiz";

/** Six surfaces as cards; a click starts the quiz on step 2 with that surface chosen. */
export function QuizPick() {
  return (
    <div className="lp-pick">
      {surfaces.map((s, i) => (
        <button key={s.id} type="button" className="lp-pick-card" data-reveal style={{ transitionDelay: `${(i % 3) * 70}ms` }} onClick={() => window.dispatchEvent(new CustomEvent("quiz:pick", { detail: s.id }))}>
          <span className="lp-pick-img">
            <Image src={s.img!} alt="" fill sizes="(max-width: 760px) 50vw, 30vw" />
          </span>
          <strong>{s.label}</strong>
          <small>{s.hint}</small>
          <span className="lp-pick-go">
            Розрахувати <Icon name="arrow" size={16} />
          </span>
        </button>
      ))}
    </div>
  );
}
