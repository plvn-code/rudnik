"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "./Icons";

export type Photo = { src: string; w: number; h: number; alt?: string; label?: string };

/** Masonry gallery with a keyboard- and swipe-friendly lightbox. */
export function Gallery({ photos, fallbackAlt, limit }: { photos: Photo[]; fallbackAlt: string; limit?: number }) {
  const [index, setIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const touchX = useRef(0);
  const shown = limit && !expanded ? photos.slice(0, limit) : photos;

  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (index !== null && !el.open) el.showModal();
    if (index === null && el.open) el.close();
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  const current = index !== null ? photos[index] : null;

  return (
    <>
      <div className="gallery">
        {shown.map((p, i) => (
          <button
            key={p.src}
            type="button"
            className="gallery-item"
            data-reveal
            data-cursor="Збільшити"
            style={{ aspectRatio: `${p.w} / ${p.h}`, transitionDelay: `${(i % 3) * 70}ms` }}
            onClick={() => setIndex(i)}
            aria-label={`Відкрити фото: ${p.alt || fallbackAlt}`}
          >
            <Image src={p.src} alt={p.alt || fallbackAlt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
            {p.label && <span className="gallery-cap">{p.label}</span>}
            <span className="gallery-zoom">
              <Icon name="plus" size={22} />
            </span>
          </button>
        ))}
      </div>
      {limit && photos.length > limit && !expanded && (
        <div className="center-row">
          <button type="button" className="btn btn-ink" onClick={() => setExpanded(true)}>
            Показати всі {photos.length} фото
          </button>
        </div>
      )}

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Перегляд фото"
        onClose={() => setIndex(null)}
        onClick={(e) => {
          if (e.target === dialog.current) setIndex(null);
        }}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
        }}
      >
        {current && (
          <>
            <div className="lightbox-stage" key={current.src}>
              <Image src={current.src} alt={current.alt || fallbackAlt} width={current.w} height={current.h} sizes="94vw" priority />
            </div>
            {current.alt && <p className="lightbox-caption">{current.alt}</p>}
            <span className="lightbox-count">
              {(index ?? 0) + 1} / {photos.length}
            </span>
            <button type="button" className="lightbox-btn lightbox-close" aria-label="Закрити" onClick={() => setIndex(null)}>
              <Icon name="close" size={24} />
            </button>
            <button type="button" className="lightbox-btn lightbox-prev" aria-label="Попереднє фото" onClick={() => step(-1)}>
              <Icon name="chevronLeft" size={26} />
            </button>
            <button type="button" className="lightbox-btn lightbox-next" aria-label="Наступне фото" onClick={() => step(1)}>
              <Icon name="chevronRight" size={26} />
            </button>
          </>
        )}
      </dialog>
    </>
  );
}
