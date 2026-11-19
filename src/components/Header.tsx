"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { Icon } from "./Icons";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const dark = pathname === "/" || pathname === "/rozrakhunok";

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Hide on a fast scroll down past the first screen, show again on any scroll up.
      if (Math.abs(y - last) > 6) setHidden(y > last && y > window.innerHeight * 0.9);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    return () => document.documentElement.classList.remove("menu-open");
  }, [open]);

  return (
    <>
      <span className="scroll-line" aria-hidden="true" />
      <header className={`header${scrolled ? " is-solid" : ""}${open ? " is-open" : ""}${dark ? " is-dark" : ""}${hidden && !open ? " is-hidden" : ""}`}>
        <div className="container header-row">
          <Link href="/" className="header-logo" aria-label="RUDNIK — на головну">
            <Logo />
          </Link>

          <nav className="header-nav" aria-label="Головне меню">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className={pathname.startsWith(item.href) ? "is-active" : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <a href={site.phoneHref} className="header-phone">
              <span>Комерційний відділ</span>
              {site.phone}
            </a>
            <Link href="/rozrakhunok" className="btn btn-red btn-sm header-cta">
              Розрахувати вартість <Icon name="arrow" size={16} />
            </Link>
            <button
              type="button"
              className="header-burger"
              aria-label={open ? "Закрити меню" : "Відкрити меню"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? "close" : "menu"} size={26} />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu${open ? " is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Мобільне меню">
          {[{ label: "Головна", href: "/" }, ...nav].map((item, i) => (
            <Link key={item.href} href={item.href} style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }} tabIndex={open ? 0 : -1}>
              {item.label}
              <small>{String(i + 1).padStart(2, "0")}</small>
            </Link>
          ))}
        </nav>
        <div className="mobile-menu-foot">
          <Link href="/rozrakhunok" className="btn btn-red btn-lg btn-wide" tabIndex={open ? 0 : -1}>
            Розрахувати вартість <Icon name="arrow" size={18} />
          </Link>
          {site.phones.map((p) => (
            <a key={p.href} href={p.href} tabIndex={open ? 0 : -1}>
              {p.phone}
              <small>{p.label}</small>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
