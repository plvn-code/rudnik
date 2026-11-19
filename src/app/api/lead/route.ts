import { NextResponse } from "next/server";

/**
 * Lead endpoint. Sends the request to Telegram via a bot when TELEGRAM_BOT_TOKEN and
 * TELEGRAM_CHAT_ID are set (Vercel env); nothing is stored. Without them it answers 503 and the
 * form shows the phone numbers and e-mail instead of a false "thank you".
 */
export const runtime = "nodejs";

const clip = (v: unknown, n: number) => (typeof v === "string" ? v.trim().slice(0, n) : "");
const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!);

// Light abuse guard: at most 5 submissions per address per 10 minutes on one server instance.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 600_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Некоректний запит." }, { status: 400 });
  if (clip(body.website, 200)) return NextResponse.json({ ok: true }); // honeypot

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) return NextResponse.json({ error: "Забагато спроб. Спробуйте трохи пізніше." }, { status: 429 });

  const name = clip(body.name, 80);
  const phone = clip(body.phone, 24);
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 9 || digits.length > 15) return NextResponse.json({ error: "Перевірте, будь ласка, номер телефону." }, { status: 422 });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return NextResponse.json({ error: "Онлайн-запити ще не підключені." }, { status: 503 });

  const topic = clip(body.topic, 40);
  const comment = clip(body.comment, 1500);
  const details = clip(body.details, 2000);
  const source = clip(body.source, 60);
  const page = clip(body.page, 200);
  const text = [
    "<b>🟥 Новий запит з сайту RUDNIK</b>",
    topic && `Тема: ${esc(topic)}`,
    `Ім’я / компанія: ${esc(name || "не вказано")}`,
    `Телефон: ${esc(phone)}`,
    comment && `Коментар: ${esc(comment)}`,
    details && `\n${esc(details)}`,
    `\nФорма: ${esc(source)}${page ? ` · ${esc(page)}` : ""}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: chat, text, parse_mode: "HTML", disable_web_page_preview: true }),
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) throw new Error(String(r.status));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] telegram failed", err);
    return NextResponse.json({ error: "Не вдалося надіслати запит." }, { status: 502 });
  }
}
