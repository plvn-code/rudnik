"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { Icon } from "./Icons";
import Link from "next/link";

/** Phone-only action bar: call or request is one tap away, except where a form is already on screen. */
export function MobileBar() {
  const [scrolled, setScrolled] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const seen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) seen.add(e.target);
        else seen.delete(e.target);
      }
      setFormVisible(seen.size > 0);
    });
    const watch = () => document.querySelectorAll(".contact-band, .contacts-form, .footer, .quiz").forEach((el) => io.observe(el));
    watch();
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <div className={`mobile-bar${scrolled && !formVisible ? " is-on" : ""}`}>
      <a href={site.phoneHref} className="btn btn-outline">
        <Icon name="phone" size={18} /> Дзвінок
      </a>
      <Link href="/rozrakhunok" className="btn btn-red">
        Розрахувати <Icon name="arrow" size={18} />
      </Link>
    </div>
  );
}
