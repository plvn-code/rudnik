"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import { portfolioCats, shotAlt, shotSrc, shots } from "@/lib/portfolio";

/** Category chips (synced to ?cat=) over the masonry gallery of all 83 photos from rudnik.ua/portfolio. */
export function PortfolioFilter() {
  const params = useSearchParams();
  const router = useRouter();
  const cat = params.get("cat") ?? "all";
  const list = cat === "all" ? shots : shots.filter((s) => s.cats.includes(cat));
  const photos = list.map((s) => ({ src: shotSrc(s), w: s.w, h: s.h, alt: shotAlt(s), label: s.label }));

  const set = (c: string) => router.replace(c === "all" ? "/portfolio" : `/portfolio?cat=${c}`, { scroll: false });

  return (
    <>
      <div className="tabs tabs-wrap" role="tablist" aria-label="Категорії">
        <button type="button" role="tab" aria-selected={cat === "all"} className={cat === "all" ? "is-on" : undefined} onClick={() => set("all")}>
          Усі<span>{shots.length}</span>
        </button>
        {portfolioCats.map((c) => (
          <button key={c.slug} type="button" role="tab" aria-selected={cat === c.slug} className={cat === c.slug ? "is-on" : undefined} onClick={() => set(c.slug)}>
            {c.label}
            <span>{c.count}</span>
          </button>
        ))}
      </div>
      <Gallery key={cat} photos={photos} fallbackAlt="Об’єкт з системами RUDNIK" limit={18} />
    </>
  );
}
