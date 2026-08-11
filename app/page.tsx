import Link from "next/link";
import { STAGE_ORDER, STAGE_PAGES } from "@/lib/content";
import { StageProgress } from "@/components/journey-progress";

const featuredProblems = [
  ["subsanacion", "TAD dice SUBSANACIÓN", "Hay algo para corregir y el tiempo importa."],
  ["notas-en-siu", "Falta una nota en SIU", "No avances con un cierre académico incompleto."],
  ["secundario-sin-legalizar", "No tengo el secundario legalizado", "Es un bloqueo previo al diploma."],
  ["equivalencias", "Tengo inclusiones o equivalencias pendientes", "Necesitás llegar a una resolución numerada."],
  ["no-aparece-siet", "No aparece en SIET", "Entendé qué seguir mirando en TAD."],
  ["diploma-listo", "Mi diploma está terminado", "Verificá cuándo queda habilitado para entrega."],
] as const;

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">Una guía para tu tramo final</p>
          <h1>Terminaste o estás terminando Datos. ¿Y ahora qué?</h1>
          <p className="lead">
            Ubicá tu estado, detectá qué te falta y encontrá el próximo paso hasta
            recibir el título.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/orientador">
              Saber dónde estoy →
            </Link>
            <Link className="button button-secondary" href="/etapas">
              Ver todas las etapas
            </Link>
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="container">
          <p className="eyebrow">Mapa del recorrido</p>
          <h2>Un proceso largo se entiende mejor por etapas</h2>
          <p className="section-intro">
            El portal separa el recorrido académico del administrativo para que
            puedas ver qué condición habilita el paso siguiente.
          </p>
          <StageProgress />
          <div className="stage-home-grid">
            {STAGE_ORDER.map((stage, index) => {
              const page = STAGE_PAGES[stage.slug];
              return (
                <Link
                  className="stage-home-card"
                  href={`/etapas/${stage.slug}`}
                  key={stage.slug}
                >
                  <span>{index + 1}</span>
                  <div>
                    <h3>{stage.label}</h3>
                    <p>{page.intro}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Entrar por el problema</p>
          <h2>¿Ya sabés qué te está trabando?</h2>
          <div className="grid problem-home-grid">
            {featuredProblems.map(([slug, title, description]) => (
              <Link
                className={`card ${slug === "subsanacion" ? "card-urgent" : ""}`}
                href={`/problemas/${slug}`}
                key={slug}
              >
                <h3>{title}</h3>
                <p>{description}</p>
              </Link>
            ))}
          </div>
          <Link className="source inline-more" href="/problemas">
            Ver todos los problemas frecuentes →
          </Link>
        </div>
      </section>

      <section className="section white">
        <div className="container trust trust-wide">
          <div>
            <p className="eyebrow">Qué hace diferente esta guía</p>
            <h2>Información ordenada, con procedencia visible</h2>
          </div>
          <div>
            <p>
              Distinguimos requisitos oficiales, procesos oficiales,
              recomendaciones y tiempos orientativos. Los trámites se realizan en
              los sistemas de UBA y Exactas; ante discrepancias, prevalece la
              información oficial enlazada.
            </p>
            <Link className="source" href="/fuentes">
              Cómo usamos y fechamos las fuentes →
            </Link>
          </div>
        </div>
      </section>

      <section className="section future-ai">
        <div className="container">
          <p className="eyebrow">Más adelante</p>
          <h2>Una consulta conversacional, sobre la misma base confiable</h2>
          <p className="lead">
            La arquitectura deja preparada una futura capa de consultas con IA.
            No forma parte de v1: primero queremos que el recorrido, los
            checklists y las fuentes funcionen bien por sí solos.
          </p>
        </div>
      </section>
    </>
  );
}
