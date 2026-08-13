"use client";

import { useRef, useState, type FormEvent } from "react";
import {
  FEEDBACK_COMMENT_MAX,
  FEEDBACK_COMMENT_MIN,
  FEEDBACK_EMAIL_MAX,
} from "@/lib/feedback";
import styles from "./feedback-widget.module.css";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function FeedbackWidget() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState("");

  function openDialog() {
    setStatus("idle");
    setError("");
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
    if (status === "success") formRef.current?.reset();
  }

  async function submitFeedback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const data = new FormData(event.currentTarget);
    const comment = String(data.get("comment") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const website = String(data.get("website") ?? "");

    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment,
          email,
          website,
          page: `${window.location.pathname}${window.location.search}${window.location.hash}`,
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!response.ok || !result?.ok) {
        throw new Error(
          result?.error ?? "No pudimos enviar el comentario. Volvé a intentarlo.",
        );
      }

      setStatus("success");
    } catch (submissionError) {
      setStatus("error");
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "No pudimos enviar el comentario. Volvé a intentarlo.",
      );
    }
  }

  return (
    <>
      <button className={styles.trigger} type="button" onClick={openDialog}>
        Enviar comentario
      </button>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="feedback-title"
        aria-describedby="feedback-description"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
      >
        <div className={styles.panel}>
          <div className={styles.heading}>
            <div>
              <p className="eyebrow">Ayudanos a mejorar</p>
              <h2 id="feedback-title">¿Encontraste algo confuso o incorrecto?</h2>
            </div>
            <button
              className={styles.close}
              type="button"
              aria-label="Cerrar formulario de comentario"
              onClick={closeDialog}
            >
              ×
            </button>
          </div>

          {status === "success" ? (
            <div className={styles.success} role="status">
              <strong>Gracias. Recibimos tu comentario.</strong>
              <p>Lo vamos a usar para corregir información y mejorar la experiencia.</p>
              <button className="button" type="button" onClick={closeDialog}>
                Cerrar
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={submitFeedback}>
              <p id="feedback-description" className={styles.description}>
                Contanos qué faltó, qué no se entendió o qué problema encontraste. La
                página desde la que escribís se agrega automáticamente.
              </p>

              <label className={styles.field} htmlFor="feedback-comment">
                <span>Comentario *</span>
                <textarea
                  id="feedback-comment"
                  name="comment"
                  required
                  minLength={FEEDBACK_COMMENT_MIN}
                  maxLength={FEEDBACK_COMMENT_MAX}
                  rows={6}
                  placeholder="Por ejemplo: no queda claro qué tengo que hacer después de aprobar el PEI…"
                  disabled={status === "submitting"}
                />
                <small>Máximo {FEEDBACK_COMMENT_MAX} caracteres.</small>
              </label>

              <label className={styles.field} htmlFor="feedback-email">
                <span>
                  Email de contacto <em>(opcional)</em>
                </span>
                <input
                  id="feedback-email"
                  name="email"
                  type="email"
                  maxLength={FEEDBACK_EMAIL_MAX}
                  autoComplete="email"
                  placeholder="tu@email.com"
                  disabled={status === "submitting"}
                />
                <small>Usalo sólo si querés que podamos responderte.</small>
              </label>

              <div className={styles.honeypot} aria-hidden="true">
                <label htmlFor="feedback-website">Dejá este campo vacío</label>
                <input
                  id="feedback-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {status === "error" ? (
                <p className={styles.error} role="alert">
                  {error}
                </p>
              ) : null}

              <div className={styles.actions}>
                <button className="button" type="submit" disabled={status === "submitting"}>
                  {status === "submitting" ? "Enviando…" : "Enviar comentario"}
                </button>
                <button
                  className="button button-secondary"
                  type="button"
                  disabled={status === "submitting"}
                  onClick={closeDialog}
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
