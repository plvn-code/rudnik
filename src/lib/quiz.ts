/**
 * Quiz for /rozrakhunok: which RUDNIK system fits, how many modules / kW, and an indicative price range.
 *
 * ⚠ PRICES ARE NOT RUDNIK'S. rudnik.ua publishes no prices, so `perPanel` holds the Ukrainian RETAIL
 * market range for comparable kits (checked 2026-11-19: 220volt.com.ua SolarSet-type pitched-roof kits
 * ≈ 812 грн/панель, WindSpoiler ballast ≈ 950 грн/панель; onlysolar.in.ua ground ≈ 1 848 грн/панель,
 * alfa.solar ground ≈ 3 887 грн/панель; BLOCK-type mini-rail estimated from K2 MiniRail). The page says
 * so next to the number. Replace with the client's price list when they send it (see docs/STATUS.md).
 */

export type Opt = { id: string; label: string; hint?: string; img?: string };

export const surfaces: (Opt & { system: string })[] = [
  { id: "ground", system: "landing", label: "На землі", hint: "Наземна станція", img: "/images/render/landing-piles.webp" },
  { id: "flat", system: "balast", label: "Плаский дах", hint: "Мембрана, руберойд, бетон", img: "/images/render/balast-south.webp" },
  { id: "pitched", system: "solarset", label: "Скатний дах", hint: "Черепиця, шифер, фальц", img: "/images/render/solarset-metal.webp" },
  { id: "sheet", system: "block", label: "Профнастил / сендвіч", hint: "Склади, цехи, ангари", img: "/images/render/block-std.webp" },
  { id: "parking", system: "solarparking", label: "Над парковкою", hint: "Сонячний навіс", img: "/images/render/parking-2.webp" },
  { id: "facade", system: "fasad", label: "На фасаді", hint: "Вертикальний монтаж", img: "/images/render/facade-2.webp" },
];

/** The second question depends on the surface; options are the real variants from rudnik.ua. */
export const details: Record<string, { q: string; opts: Opt[] }> = {
  ground: {
    q: "Як фіксувати опори?",
    opts: [
      { id: "piles", label: "Забивні палі", hint: "Великі промислові об’єкти", img: "/images/render/landing-piles.webp" },
      { id: "ballast", label: "На баластах", hint: "Без втручання в ґрунт", img: "/images/render/landing-balast.webp" },
      { id: "concrete", label: "Під бетонування", hint: "Нестабільні ґрунти", img: "/images/render/landing-concrete.webp" },
      { id: "geo", label: "Геошурупи", hint: "Приватні ділянки", img: "/images/render/landing-geo.webp" },
      { id: "unknown", label: "Порадьте", hint: "Підберемо за ґрунтом" },
    ],
  },
  flat: {
    q: "Яка конфігурація рядів?",
    opts: [
      { id: "south", label: "Південь", hint: "Максимум з кожного модуля", img: "/images/render/balast-south.webp" },
      { id: "ew", label: "Схід-Захід", hint: "Більше панелей на площу", img: "/images/render/balast-ew.webp" },
      { id: "unknown", label: "Порадьте", hint: "Підберемо під дах" },
    ],
  },
  pitched: {
    q: "Яке покриття даху?",
    opts: [
      { id: "metal", label: "Металочерепиця / шифер", img: "/images/render/solarset-metal.webp" },
      { id: "ceramic", label: "Керамічна черепиця", img: "/images/render/solarset-ceramic.webp" },
      { id: "bitum", label: "Бітумна черепиця", img: "/images/render/solarset-bitum.webp" },
      { id: "falc", label: "Фальцева покрівля", img: "/images/render/solarset-falc.webp" },
      { id: "other", label: "Інше", img: "/images/render/solarset-universal.webp" },
    ],
  },
  sheet: {
    q: "Як розміщувати модулі?",
    opts: [
      { id: "std", label: "Паралельно покрівлі", hint: "Стандартна конфігурація", img: "/images/render/block-std.webp" },
      { id: "angle", label: "Під кутом", hint: "Зі змінним кутом («трикутники»)", img: "/images/render/block-angle.webp" },
      { id: "unknown", label: "Порадьте" },
    ],
  },
  parking: {
    q: "Який навіс потрібен?",
    opts: [
      { id: "one", label: "Однорядний", hint: "Одна лінія паркомісць, від 2 авто", img: "/images/render/parking-1.webp" },
      { id: "two", label: "Дворядний", hint: "Дві лінії паркомісць, від 4 авто", img: "/images/render/parking-2.webp" },
      { id: "unknown", label: "Порадьте" },
    ],
  },
  facade: {
    q: "Що за фасад?",
    opts: [
      { id: "existing", label: "Існуюча будівля", hint: "Монтаж на готовий фасад" },
      { id: "new", label: "Будівля в проєкті", hint: "Інтеграція на етапі проєктування" },
      { id: "unknown", label: "Ще не знаю" },
    ],
  },
};

export const materials: Opt[] = [
  { id: "steel", label: "Оцинкована сталь", hint: "Максимальна жорсткість при раціональному бюджеті" },
  { id: "alu", label: "Алюміній", hint: "Легше — для дахів з обмеженням по вазі" },
  { id: "unknown", label: "Порадьте", hint: "Інженер підбере під навантаження" },
];
/** Systems that rudnik.ua offers in both materials. */
export const hasMaterial = (surface: string) => ["flat", "pitched", "facade"].includes(surface);

export const roles: Opt[] = [
  { id: "installer", label: "Монтажна компанія", hint: "Спецціни для партнерів" },
  { id: "owner", label: "Власник об’єкта" },
  { id: "design", label: "Проєктна організація" },
  { id: "dealer", label: "Дилер / дистриб’ютор" },
];

export const terms: Opt[] = [
  { id: "now", label: "Терміново", hint: "До 2 тижнів" },
  { id: "month", label: "Протягом місяця" },
  { id: "quarter", label: "1–3 місяці" },
  { id: "plan", label: "Плануємо бюджет" },
];

export const panelPowers = [450, 550, 620];

/** Indicative retail market range, UAH per module (see the note at the top). null = priced per project. */
export const perPanel: Record<string, [number, number] | null> = {
  landing: [1850, 3900],
  balast: [950, 1900],
  solarset: [800, 1350],
  block: [600, 1100],
  solarparking: null,
  fasad: null,
};

export function estimate(system: string, panels: number, material: string) {
  const r = perPanel[system];
  if (!r) return null;
  let [lo, hi] = r;
  // Steel sits in the lower half of the range, aluminium in the upper half.
  if (material === "steel") hi = Math.round(lo + (hi - lo) * 0.6);
  if (material === "alu") lo = Math.round(lo + (hi - lo) * 0.4);
  const round = (v: number) => Math.round(v / 100) * 100;
  return { lo: round(lo * panels), hi: round(hi * panels) };
}

export const uah = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " грн";
