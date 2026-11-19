import { shots } from "./portfolio-data";
import { products } from "./products";

export type Shot = { id: string; cats: string[]; label: string; w: number; h: number };

export { shots };

export const shotSrc = (s: Shot) => `/images/portfolio/${s.id}.webp`;

/** Filter chips: one per product line that has photos, in catalogue order. */
export const portfolioCats = products
  .filter((p) => shots.some((s) => s.cats.includes(p.slug)))
  .map((p) => ({ slug: p.slug, label: p.slug === "proiektuvannia" ? "Індивідуальні рішення" : p.name, count: shots.filter((s) => s.cats.includes(p.slug)).length }));

export const catName = (slug: string) => portfolioCats.find((c) => c.slug === slug)?.label ?? slug;

export const shotsFor = (slug: string) => shots.filter((s) => s.cats.includes(slug));

export const shotAlt = (s: Shot) => `${catName(s.cats[0])} RUDNIK — ${s.label}`;

/** Hand-picked wide aerials for the home hero (best light, biggest objects). */
export const heroShots = [
  { id: "79", caption: "BALAST · конфігурація «Південь»", href: "/systemy/balast" },
  { id: "73", caption: "BALAST · конфігурація «Південь»", href: "/systemy/balast" },
  { id: "39", caption: "LANDING · під бетонування", href: "/systemy/landing" },
  { id: "11", caption: "SOLAR PARKING · дворядний навіс", href: "/systemy/solarparking" },
  { id: "77", caption: "BALAST + фасадна система · комбінована", href: "/systemy/fasad" },
];
