import type { Metadata } from "next";
import { loadRegistry } from "@/lib/knowledge";
import { formatVerifiedDate } from "@/components/evidence";

export const metadata: Metadata = {
  title: "Fuentes",
  description:
    "Fuentes oficiales y criterios de trazabilidad usados por Egreso LCD.",
};

const kindLabels: Record<string, string> = {
  official_regulation: "Normativa oficial",
  official_page: "Página oficial",
  official_form: "Formulario oficial",
  official_system: "Sistema oficial",
  official_regulation_user_copy: "Copia registrada de normativa",
  curated_experience: "Experiencia práctica curada",
};

export default function Page() {
  const registry = loadRegistry();

  return (
    <div className="container page page-wide">
      <p className="eyebrow">Confianza y trazabilidad</p>
      <h1>Fuentes</h1>
      <p className="lead">
        Cada afirmación operativa importante se conecta con un registro central.
        “Revisada” indica la verificación editorial de esta versión, no una
        actualización en tiempo real.
      </p>

      <section className="source-policy">
        <h2>Cómo leemos la evidencia</h2>
        <div className="grid">
          <article className="card">
            <h3>1. Normativa</h3>
            <p>Planes, reglamentos y requisitos formales tienen prioridad.</p>
          </article>
          <article className="card">
            <h3>2. Procedimiento oficial</h3>
            <p>
              Usamos las páginas y sistemas vigentes para explicar cómo ejecutar
              el trámite.
            </p>
          </article>
          <article className="card">
            <h3>3. Orientación práctica</h3>
            <p>
              Los tiempos de experiencia se muestran como referencias, nunca
              como garantías institucionales.
            </p>
          </article>
        </div>
      </section>

      <section className="guide-section">
        <h2>Registro de fuentes</h2>
        <div className="source-grid">
          {Object.entries(registry.sources).map(([id, source]) => (
            <article className="source-card" key={id}>
              <span className="evidence-label">
                {kindLabels[source.kind] ?? source.kind}
              </span>
              <h3>{source.title}</h3>
              <p>{source.authority}</p>
              <p className="meta">
                Fuente revisada para esta versión:{" "}
                {formatVerifiedDate(source.verified_at)}.
              </p>
              {source.note ? <p className="meta">{source.note}</p> : null}
              {source.url ? (
                <a
                  className="source"
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Abrir fuente ↗
                </a>
              ) : (
                <span className="meta">Referencia interna registrada.</span>
              )}
            </article>
          ))}
        </div>
      </section>

      <div className="trust">
        <strong>Importante.</strong>{" "}
        Fechas de eventos, formularios, cupos y circuitos operativos pueden
        cambiar. Antes del lanzamiento hacemos una nueva revisión de los
        elementos de alta volatilidad.
      </div>
    </div>
  );
}
