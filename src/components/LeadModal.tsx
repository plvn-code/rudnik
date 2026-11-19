"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icons";
import { LeadForm } from "./LeadForm";

const EVENT = "lead:open";
type Detail = { title?: string; details?: string; topic?: string };

/** Opens the request dialog from anywhere; `details` travels with the lead (system, variant…). */
export function LeadButton({
  title,
  details,
  topic,
  className = "btn btn-red",
  children,
}: {
  title?: string;
  details?: string;
  topic?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new CustomEvent<Detail>(EVENT, { detail: { title, details, topic } }))}>
      {children}
    </button>
  );
}

export function LeadModal() {
  const ref = useRef<HTMLDialogElement>(null);
  const [detail, setDetail] = useState<Detail>({});
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    const open = (e: Event) => {
      setDetail((e as CustomEvent<Detail>).detail ?? {});
      setFormKey((k) => k + 1);
      ref.current?.showModal();
    };
    window.addEventListener(EVENT, open);
    return () => window.removeEventListener(EVENT, open);
  }, []);

  return (
    <dialog
      ref={ref}
      className="lead-modal"
      aria-labelledby="leadTitle"
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close();
      }}
    >
      <div className="lead-modal-box">
        <button type="button" className="lead-modal-close" aria-label="Закрити" onClick={() => ref.current?.close()}>
          <Icon name="close" size={22} />
        </button>
        <p className="eyebrow">RUDNIK · запит</p>
        <h2 id="leadTitle">{detail.title ?? "Прорахуємо систему під ваш об’єкт"}</h2>
        <p className="muted">Залиште телефон — менеджер комерційного відділу уточнить параметри та підготує специфікацію і прорахунок.</p>
        <LeadForm key={formKey} details={detail.details} topic={detail.topic} source="modal" comment />
      </div>
    </dialog>
  );
}
