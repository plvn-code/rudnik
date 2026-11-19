const paths = {
  arrow: "M5 12h14M13 6l6 6-6 6",
  arrowUpRight: "M7 17 17 7M8 7h9v9",
  phone: "M6.6 3.5 9.3 4l1.2 4-2 1.6a13 13 0 0 0 5.9 5.9l1.6-2 4 1.2.5 2.7a2 2 0 0 1-2 2.1A16.5 16.5 0 0 1 4.5 5.5a2 2 0 0 1 2.1-2Z",
  mail: "M3.5 6.5h17v11h-17zM4 7l8 6 8-6",
  pin: "M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  close: "M6 6l12 12M18 6 6 18",
  menu: "M4 8h16M4 16h16",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  check: "m5 12.5 4.5 4.5L19 7.5",
  chevron: "m6 9 6 6 6-6",
  chevronLeft: "m15 6-6 6 6 6",
  chevronRight: "m9 6 6 6-6 6",
  sun: "M12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6",
  bolt: "M13 2.5 4.5 13.5H12l-1 8 8.5-11H12z",
  battery: "M3.5 7.5h15v9h-15zM18.5 10.5h2v3h-2M7 10v4M10.5 10v4",
  home: "M3.5 11 12 4l8.5 7M6 9.5V20h12V9.5M10 20v-5.5h4V20",
  grid: "M12 3 7 21M12 3l5 18M8.4 15h7.2M9.5 10h5M5 7h14",
  car: "M5 16.5h14M4 16.5v-4l2-5h12l2 5v4M4 16.5V19h3v-2.5M17 16.5V19h3v-2.5M7.5 13.5h.01M16.5 13.5h.01",
  shield: "M12 3 4.5 6v5.5c0 4.5 3.2 8.3 7.5 9.5 4.3-1.2 7.5-5 7.5-9.5V6z M8.5 12l2.5 2.5 4.5-5",
  instagram: "M7.5 3.5h9a4 4 0 0 1 4 4v9a4 4 0 0 1-4 4h-9a4 4 0 0 1-4-4v-9a4 4 0 0 1 4-4ZM12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM17 7h.01",
  send: "M21 3 10 14M21 3l-7 18-4-7-7-4z",
  calc: "M6 3.5h12v17H6zM8.5 6.5h7v3h-7zM9 13h.01M12 13h.01M15 13h.01M9 16.5h.01M12 16.5h.01M15 16.5h.01",
  play: "M8 5.5v13l11-6.5z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7.5V12l3 2",
  sound: "M4 9.5h3.5L12 5.5v13l-4.5-4H4zM16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11",
  mute: "M4 9.5h3.5L12 5.5v13l-4.5-4H4zM16 9.5l5 5M21 9.5l-5 5",
  layers: "M12 3 3 8l9 5 9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5",
  factory: "M3 21V10l5 3V10l5 3V10l5 3V4h3v17zM7 17h2M12 17h2M17 17h2",
  truck: "M3 6.5h11v9H3zM14 10h4l3 3v2.5h-7M7 18.5a1.8 1.8 0 1 0 0-.1M17.5 18.5a1.8 1.8 0 1 0 0-.1",
  ruler: "M3 16 16 3l5 5L8 21zM7 12l2 2M10 9l2 2M13 6l2 2",
  wrench: "M14.5 6.5a4 4 0 0 0 5 5L13 18a2.1 2.1 0 0 1-3-3zM14.5 6.5 17 4",
  handshake: "M3 12l4-4 4 2 3-2 7 4M3 12l5 5 2-1 2 2 2-1 2 1 3-3M10 10l3 3",
  book: "M4 5.5A2 2 0 0 1 6 3.5h13v15H6a2 2 0 0 0-2 2zM4 20.5v-15",
  megaphone: "M4 10v4h3l8 4V6L7 10zM18 9.5a3 3 0 0 1 0 5",
  tag: "M3 12V3h9l9 9-9 9zM7.5 7.5h.01",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d={paths[name]} />
    </svg>
  );
}
