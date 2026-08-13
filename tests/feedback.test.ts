import { describe, expect, it } from "vitest";
import {
  FEEDBACK_COMMENT_MAX,
  buildFeedbackEmail,
  validateFeedbackPayload,
} from "../lib/feedback";

describe("feedback validation", () => {
  it("accepts a valid comment with page context", () => {
    const result = validateFeedbackPayload({
      comment: "La explicación del PEI podría aclarar mejor el paso siguiente.",
      page: "/etapas/tutor-pei#pei",
      email: "estudiante@example.com",
      website: "",
    });
    expect(result.ok).toBe(true);
  });

  it("rejects empty or too-short comments", () => {
    expect(validateFeedbackPayload({ comment: "", page: "/", email: "", website: "" }).ok).toBe(false);
    expect(validateFeedbackPayload({ comment: "abc", page: "/", email: "", website: "" }).ok).toBe(false);
  });

  it("rejects comments over the maximum length", () => {
    const result = validateFeedbackPayload({
      comment: "x".repeat(FEEDBACK_COMMENT_MAX + 1),
      page: "/",
      email: "",
      website: "",
    });
    expect(result.ok).toBe(false);
  });

  it("rejects invalid optional email", () => {
    const result = validateFeedbackPayload({
      comment: "Comentario suficientemente largo",
      page: "/",
      email: "no-es-email",
      website: "",
    });
    expect(result.ok).toBe(false);
  });

  it("treats the honeypot as spam", () => {
    const result = validateFeedbackPayload({
      comment: "Comentario suficientemente largo",
      page: "/",
      email: "",
      website: "https://spam.example",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.spam).toBe(true);
  });
});

describe("feedback email", () => {
  it("includes comment, page, timestamp and optional contact email", () => {
    const receivedAt = new Date("2026-08-13T18:00:00.000Z");
    const email = buildFeedbackEmail(
      {
        comment: "Hay un enlace que no se entiende.",
        page: "/problemas/subsanacion",
        email: "estudiante@example.com",
      },
      receivedAt,
    );

    expect(email.subject).toContain("/problemas/subsanacion");
    expect(email.text).toContain("Hay un enlace que no se entiende.");
    expect(email.text).toContain("/problemas/subsanacion");
    expect(email.text).toContain("2026-08-13T18:00:00.000Z");
    expect(email.text).toContain("estudiante@example.com");
  });
});
