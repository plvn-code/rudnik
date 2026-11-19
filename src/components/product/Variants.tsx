"use client";

import Image from "next/image";
import { useState } from "react";
import type { Variant } from "@/lib/products";

/** Variant switcher: list on the left, the client's 3D render crossfades on the right. */
export function Variants({ items, title }: { items: Variant[]; title: string }) {
  const [i, setI] = useState(0);
  return (
    <div className="variants">
      <div className="variants-list" role="tablist" aria-label={title}>
        {items.map((v, k) => (
          <button key={v.name} type="button" role="tab" aria-selected={k === i} className={k === i ? "is-on" : undefined} onClick={() => setI(k)} onMouseEnter={() => setI(k)}>
            <strong>{v.name}</strong>
            {v.text && <span>{v.text}</span>}
          </button>
        ))}
      </div>
      <div className="variants-stage" data-reveal>
        {items.map((v, k) => (
          <div key={v.name} className={`picker-img${k === i ? " is-on" : ""}`} aria-hidden={k !== i}>
            <Image src={v.img} alt={v.name} fill sizes="(max-width: 1080px) 100vw, 60vw" style={{ objectFit: "contain" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
