import Link from "next/link";
import { solutions, systems, productHref } from "@/lib/products";
import { nav, site } from "@/lib/site";
import { Icon } from "./Icons";
import { LOGO_VIEWBOX, Logo, markPaths, markUa, wordPaths } from "./Logo";
import { MadeBy } from "./MadeBy";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" aria-label="RUDNIK — на головну">
              <Logo />
            </Link>
            <p>Сучасний український завод-виробник системних рішень для сонячних електростанцій. З {site.since} року.</p>
            <a className="footer-ig" href={site.instagram} target="_blank" rel="noreferrer">
              <Icon name="instagram" size={18} /> {site.instagramHandle}
            </a>
          </div>

          <div className="footer-col">
            <h3>Системи</h3>
            {systems.map((s) => (
              <Link key={s.slug} href={productHref(s)}>
                {s.name} {s.kind === "system" && s.code !== "FACADE" ? s.code : ""}
              </Link>
            ))}
          </div>

          <div className="footer-col">
            <h3>Рішення та компанія</h3>
            {solutions.map((s) => (
              <Link key={s.slug} href={productHref(s)}>
                {s.name}
              </Link>
            ))}
            {nav.slice(2).map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="footer-col">
            <h3>Контакти</h3>
            {site.phones.map((p) => (
              <a key={p.href} className="footer-phone" href={p.href}>
                {p.phone}
                <small>{p.label}</small>
              </a>
            ))}
            <a href={`mailto:${site.email}`}>
              <Icon name="mail" size={16} /> {site.email}
            </a>
            <a href={site.maps} target="_blank" rel="noreferrer">
              <Icon name="pin" size={16} /> {site.address}
            </a>
            <p>
              <Icon name="clock" size={16} /> {site.hours}
            </p>
          </div>
        </div>
      </div>

      <div className="footer-giant" aria-hidden="true">
        <svg viewBox={LOGO_VIEWBOX}>
          {markPaths.map((d) => (
            <path key={d.slice(0, 12)} className="fg-mark" d={d} />
          ))}
          <polygon className="fg-mark" points={markUa} />
          {wordPaths.map((d) => (
            <path key={d.slice(0, 12)} className="fg-word" d={d} />
          ))}
        </svg>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 RUDNIK. Усі права захищені.</span>
        <span>Ваш стандарт надійності</span>
        <MadeBy />
      </div>
    </footer>
  );
}
