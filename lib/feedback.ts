import { z } from "zod";

export const FEEDBACK_COMMENT_MIN = 5;
export const FEEDBACK_COMMENT_MAX = 2000;
export const FEEDBACK_EMAIL_MAX = 254;
export const FEEDBACK_PAGE_MAX = 500;
export const FEEDBACK_MIN_FILL_MS = 1500;

const optionalEmail = z
  .string()
  .trim()
  .max(FEEDBACK_EMAIL_MAX, "El email es demasiado largo.")
  .refine(
    (value) => value === "" || z.string().email().safeParse(value).success,
    "Ingresá un email válido o dejalo vacío.",
  )
  .optional()
  .default("");

export const feedbackPayloadSchema = z.object({
  comment: z
    .string()
    .trim()
    .min(FEEDBACK_COMMENT_MIN, "Contanos un poco más para poder entender el comentario.")
    .max(
      FEEDBACK_COMMENT_MAX,
      `El comentario no puede superar ${FEEDBACK_COMMENT_MAX} caracteres.`,
    ),
  page: z
    .string()
    .trim()
    .min(1, "No pudimos identificar la página.")
    .max(FEEDBACK_PAGE_MAX, "La referencia de página es demasiado larga."),
  email: optionalEmail,
  website: z.string().max(0, "Solicitud inválida.").optional().default(""),
  startedAt: z.number().int().positive(),
});

export type FeedbackPayload = z.infer<typeof feedbackPayloadSchema>;

export type FeedbackValidationResult =
  | { ok: true; data: FeedbackPayload }
  | { ok: false; message: string; spam?: boolean };

export function validateFeedbackPayload(
  input: unknown,
  now = Date.now(),
): FeedbackValidationResult {
  const parsed = feedbackPayloadSchema.safeParse(input);

  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { ok: false, message: issue?.message ?? "Revisá los datos del formulario." };
  }

  if (parsed.data.website) {
    return { ok: false, message: "Solicitud inválida.", spam: true };
  }

  if (now - parsed.data.startedAt < FEEDBACK_MIN_FILL_MS) {
    return { ok: false, message: "Esperá un instante y volvé a intentar.", spam: true };
  }

  return { ok: true, data: parsed.data };
}

function formatBuenosAiresDate(date: Date) {
  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "medium",
    timeStyle: "long",
    timeZone: "America/Argentina/Buenos_Aires",
  }).format(date);
}

export function buildFeedbackEmail(
  feedback: Pick<FeedbackPayload, "comment" | "page" | "email">,
  receivedAt = new Date(),
) {
  const contact = feedback.email?.trim() || "No proporcionado";
  const subjectPage = feedback.page.replace(/\s+/g, " ").slice(0, 90);

  return {
    subject: `[Egreso LCD] Comentario desde ${subjectPage}`,
    text: [
      "Nuevo comentario recibido desde Egreso LCD",
      "",
      "Comentario:",
      feedback.comment,
      "",
      `Página o sección: ${feedback.page}`,
      `Fecha y hora (Buenos Aires): ${formatBuenosAiresDate(receivedAt)}`,
      `Fecha y hora (ISO): ${receivedAt.toISOString()}`,
      `Email de contacto: ${contact}`,
    ].join("\n"),
  };
}
