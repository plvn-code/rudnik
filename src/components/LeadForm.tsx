"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { site, topics } from "@/lib/site";
import { Icon } from "./Icons";

type State = "idle" | "sending" | "done" | "error";

/** Topic (as on rudnik.ua/kontakty) + name + phone + optional comment. `details` carries context (system, variant…). */
export function LeadForm({
  details,
  source,
  topic = "Прорахунок",
  button = "Надіслати запит",
  comment = false,
  topics: showTopics = true,
}: {
  details?: string;
  source: string;
  topic?: string;
  button?: string;
  comment?: boolean;
  topics?: boolean;
}) {
  const pathname = usePathname();
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");
  const [current, setCurrent] = useState<string>(topic);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, topic: current, details, source, page: pathname }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Не вдалося надіслати запит.");
      form.reset();
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не вдалося надіслати запит.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="lead-done" role="status">
        <span className="lead-done-icon">
          <Icon name="check" size={30} />
        </span>
        <h3>Дякуємо! Запит отримано</h3>
        <p>Менеджер RUDNIK зв’яжеться з вами в робочий час ({site.hours}), уточнить параметри об’єкта та підготує відповідь.</p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={onSubmit}>
      {showTopics && (
        <>
          <span className="mono">Тема звернення</span>
          <div className="topic-row" role="radiogroup" aria-label="Тема звернення">
            {topics.map((t) => (
              <button key={t} type="button" role="radio" aria-checked={current === t} className={current === t ? "is-on" : undefined} onClick={() => setCurrent(t)}>
                {t}
              </button>
            ))}
          </div>
        </>
      )}
      <label className="field">
        <input name="name" maxLength={80} placeholder=" " autoComplete="name" />
        <span>Ім’я та компанія</span>
      </label>
      <label className="field">
        <input name="phone" type="tel" inputMode="tel" required maxLength={24} placeholder=" " autoComplete="tel" />
        <span>Телефон</span>
      </label>
      {comment && (
        <label className="field">
          <textarea name="comment" maxLength={1500} placeholder=" " />
          <span>Об’єкт: тип даху чи ділянки, кількість модулів, терміни</span>
        </label>
      )}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      {state === "error" && (
        <p className="form-error" role="alert">
          {error} Зателефонуйте: <a href={site.phoneHref}>{site.phone}</a> або напишіть на <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      )}
      <button type="submit" className="btn btn-red btn-lg btn-wide" disabled={state === "sending"}>
        {state === "sending" ? "Надсилаємо…" : button}
        <Icon name="arrow" size={18} />
      </button>
      <p className="form-note">Контакти використовуємо лише для відповіді на ваш запит.</p>
    </form>
  );
}
