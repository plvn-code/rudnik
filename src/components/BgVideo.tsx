"use client";

import { useEffect, useRef } from "react";

/**
 * Muted background loop (stock montage, Pexels licence — see CLAUDE.md). Picks the 720p file on
 * narrow screens, plays only while on screen, and stays on the poster with reduced motion or Save-Data.
 */
export function BgVideo({ className = "bg-video" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) return;
    v.src = window.innerWidth <= 900 ? "/video/hero-720.mp4" : "/video/hero.mp4";
    const onReady = () => v.classList.add("is-ready");
    v.addEventListener("playing", onReady);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()));
    io.observe(v);
    return () => {
      io.disconnect();
      v.removeEventListener("playing", onReady);
    };
  }, []);

  return <video ref={ref} className={className} muted loop playsInline preload="none" poster="/images/site/hero-poster.webp" aria-hidden="true" />;
}
