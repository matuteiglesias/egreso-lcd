import { buildFeedbackEmail, validateFeedbackPayload } from "@/lib/feedback";

export const runtime = "nodejs";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const MAX_BODY_BYTES = 12_000;

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return Response.json({ error: "El comentario es demasiado largo." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "No pudimos leer el comentario. Volvé a intentarlo." },
      { status: 400 },
    );
  }

  const validation = validateFeedbackPayload(body);
  if (!validation.ok) {
    if (validation.spam) return Response.json({ ok: true });
    return Response.json({ error: validation.message }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.FEEDBACK_TO_EMAIL;
  const from = process.env.FEEDBACK_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return Response.json(
      { error: "El envío de comentarios no está disponible en este momento. Probá de nuevo más tarde." },
      { status: 503 },
    );
  }

  const email = buildFeedbackEmail(validation.data);
  const emailRequest: Record<string, unknown> = {
    from,
    to: [to],
    subject: email.subject,
    text: email.text,
  };
  if (validation.data.email) emailRequest.reply_to = validation.data.email;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailRequest),
      cache: "no-store",
    });

    if (!response.ok) {
      return Response.json(
        { error: "No pudimos enviar el comentario. Podés volver a intentarlo." },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "No pudimos enviar el comentario. Revisá tu conexión y volvé a intentarlo." },
      { status: 502 },
    );
  }
}
