"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icons";

/**
 * The client's own vertical film «Виробничі потужності» (rudnik.ua). Plays muted only while on screen;
 * the visitor can switch the sound on. preload="none" until it nears the viewport.
 */
export function ProductionVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          v.preload = "auto";
          if (!reduce || !v.muted) v.play().catch(() => {});
        } else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <div className="phone-frame" data-reveal>
      <video ref={ref} src="/video/production.mp4" poster="/images/site/video-poster.webp" muted={muted} loop playsInline preload="none" aria-label="Відео: виробничі потужності RUDNIK" />
      <button
        type="button"
        className="phone-sound"
        onClick={() => {
          const v = ref.current;
          if (!v) return;
          v.muted = !muted;
          setMuted(!muted);
          v.play().catch(() => {});
        }}
      >
        <Icon name={muted ? "mute" : "sound"} size={16} /> {muted ? "Увімкнути звук" : "Вимкнути звук"}
      </button>
    </div>
  );
}
