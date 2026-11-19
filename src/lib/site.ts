/** Contacts and global facts. Everything here is taken from rudnik.ua (home, contacts, about) and @rudnik.ua. */
export const site = {
  name: "RUDNIK",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://rudnik.ua",
  description:
    "RUDNIK — український завод-виробник систем кріплення для сонячних електростанцій і фасадів. Наземні, баластні, дахові, блочні та фасадні системи, Solar Parking, монтажний профіль, забивання паль. Власне виробництво з 2015 року.",
  tagline: "Ваш стандарт надійності",
  phones: [
    { label: "Комерційний відділ", phone: "+38 (067) 047 70 70", href: "tel:+380670477070" },
    { label: "Відділ постачання", phone: "+38 (068) 553 70 70", href: "tel:+380685537070" },
  ],
  phone: "+38 (067) 047 70 70",
  phoneHref: "tel:+380670477070",
  email: "info@rudnik.ua",
  address: "с. Крюківщина, вул. Одеська, 70",
  addressFull: "Офіс RUDNIK.UA · Київська обл., с. Крюківщина, вул. Одеська, 70",
  maps: "https://www.google.com/maps/search/?api=1&query=%D1%81.+%D0%9A%D1%80%D1%8E%D0%BA%D1%96%D0%B2%D1%89%D0%B8%D0%BD%D0%B0%2C+%D0%B2%D1%83%D0%BB%D0%B8%D1%86%D1%8F+%D0%9E%D0%B4%D0%B5%D1%81%D1%8C%D0%BA%D0%B0%2C+70",
  hours: "Пн–Пт: 09:00–18:00",
  instagram: "https://www.instagram.com/rudnik.ua/",
  instagramHandle: "@rudnik.ua",
  since: 2015,
};

export const nav = [
  { label: "Системи", href: "/systemy" },
  { label: "Рішення", href: "/rishennia" },
  { label: "Виробництво", href: "/vyrobnytstvo" },
  { label: "Портфоліо", href: "/portfolio" },
  { label: "Про компанію", href: "/pro-kompaniyu" },
  { label: "Контакти", href: "/kontakty" },
];

/** Counters from the home page of rudnik.ua. The mobile block there says 2 500 t — see docs/STATUS.md. */
export const facts = [
  { value: 10, suffix: "+", unit: "років", label: "досвіду в галузі" },
  { value: 2400, suffix: "", unit: "т", label: "металу на місяць" },
  { value: 5800, suffix: "", unit: "м²", label: "виробничих площ" },
  { value: 4500, suffix: "", unit: "м²", label: "складських запасів" },
];

/** «Нам довіряють» — logos shown on rudnik.ua. */
export const partners = [
  { id: "atb", name: "АТБ" },
  { id: "silpo", name: "Сільпо" },
  { id: "novus", name: "Novus" },
  { id: "epicentr", name: "Епіцентр К" },
  { id: "okko", name: "ОККО" },
  { id: "p6", name: "Ковальська" },
  { id: "p7", name: "Perfect Group" },
  { id: "p8", name: "Рудь" },
];

/** Contact form topics, as on rudnik.ua/kontakty. */
export const topics = ["Прорахунок", "Консультація", "Партнерство", "Технічна інформація", "Маркетинг", "Інше"] as const;
