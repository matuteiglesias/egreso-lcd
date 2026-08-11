import Link from "next/link";
import { STAGE_ORDER, STAGE_PAGES } from "@/lib/content";

const featuredProblems = [
  ["subsanacion", "TAD dice SUBSANACIÓN", "Hay algo para corregir y el tiempo importa."],
  ["notas-en-siu", "Falta una nota en SIU", "No avances con un cierre académico incompleto."],
  ["secundario-sin-legalizar", "No tengo el secundario legalizado", "Es un bloqueo previo al diploma."],
  ["equivalencias", "Tengo inclusiones o equivalencias pendientes", "Necesitás llegar a una resolución numerada."],
  ["no-aparece-siet", "No aparece en SIET", "Entendé qué seguir mirando en TAD."],
  ["diploma-listo", "Mi diploma está terminado", "Verificá cuándo queda habilitado para entrega."],
] as const;

const outcomes: Record<string, string> = {
  "tutor-y-pei": "Salir con tutor/a y PEI aprobados, y el tercer ciclo ordenado.",
  tesis: "Llegar de tema y dirección a una defensa aprobada y registrada.",
  "cierre-academico": "Confirmar que materias y tesis estén efectivamente cerradas en SIU.",
  regularizacion: "Concluir inclusiones, puntajes o equivalencias con resolución numerada.",
  diploma: "Presentar una única solicitud completa, sin bloqueos académicos o documentales.",
  seguimiento: "Entender qué mirar en TAD, cuándo actuar y cuándo pasar a SIET.",
  "jura-y-entrega": "Verificar que el diploma esté habilitado y completar la entrega.",
};

const diplomaGates = [
  ["Carrera académicamente cerrada", "Materias y tesis aprobadas y correctamente registradas.", "/etapas/cierre-academico"],
  ["Plan regularizado", "Las inclusiones, equivalencias o puntajes que correspondan ya tienen resolución.", "/etapas/regularizacion"],
  ["Secundario legalizado", "La legalización UBA está efectivamente concluida.", "/etapas/diploma"],
  ["Documentación preparada", "DNI, RC14, comprobante de pago y PDFs listos para presentar.", "/etapas/diploma"],
  ["Seguimiento entendido", "Sabés qué mirar en TAD y qué significa una subsanación.", "/etapas/seguimiento"],
] as const;

export default function Home() {
  return (
    <>
      <section className="hero home-hero">
        <div className="container home-hero-grid">
          <div>
            <p className="eyebrow">Guía de egreso de la Licenciatura en Ciencias de Datos</p>
            <h1>Del tramo final de la carrera al diploma, sin perderte en el proceso.</h1>
            <p className="lead">
              Esta guía ordena tutoría, PEI, tesis, cierre académico, regularizaciones,
              diploma, TAD, SIET y entrega en un solo recorrido. La idea es simple:
              ubicarte, detectar el bloqueo y decirte qué hacer después.
            </p>
            <div className="hero-actions">
              <Link className="button" href="/orientador">
                Ubicar mi situación →
              </Link>
              <Link className="button button-secondary" href="#recorrido">
                Entender el recorrido
              </Link>
            </div>
          </div>

          <aside className="home-promise" aria-label="Qué resuelve esta guía">
            <p className="eyebrow">En dos minutos deberías poder</p>
            <ol>
              <li><strong>Saber dónde estás</strong><span>sin reconstruir toda la burocracia.</span></li>
              <li><strong>Ver qué te bloquea</strong><span>antes de iniciar un trámite demasiado pronto.</span></li>
              <li><strong>Salir con un próximo paso</strong><span>y un enlace a la fuente o sistema oficial.</span></li>
            </ol>
          </aside>
        </div>
      </section>

      <section className="section white">
        <div className="container home-entry-grid">
          <div className="home-entry-primary">
            <p className="eyebrow">Si no sabés por dónde empezar</p>
            <h2>Dejá que el orientador reduzca el problema por vos</h2>
            <p>
              Primero te pregunta en qué gran etapa estás. Después hace sólo las
              preguntas necesarias para ubicar tu estado concreto. No necesitás saber
              qué oficina interviene ni cómo se llama cada expediente.
            </p>
            <Link className="button" href="/orientador">
              Empezar el orientador →
            </Link>
          </div>

          <div className="home-entry-secondary">
            <p className="eyebrow">Si ya sabés dónde estás</p>
            <h2>Entrá directo a la etapa</h2>
            <ul className="stage-link-list">
              {STAGE_ORDER.map((stage, index) => (
                <li key={stage.slug}>
                  <Link href={`/etapas/${stage.slug}`}>
                    <span>{index + 1}</span>
                    <strong>{stage.label}</strong>
                    <small>{outcomes[stage.slug]}</small>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section roadmap-section" id="recorrido">
        <div className="container">
          <p className="eyebrow">Mapa completo</p>
          <h2>El recorrido no es una lista de trámites: es una cadena de condiciones</h2>
          <p className="section-intro">
            Cada etapa produce algo que habilita la siguiente. Por eso conviene mirar
            el proceso como un journey y no como enlaces sueltos.
          </p>

          <ol className="home-roadmap">
            {STAGE_ORDER.map((stage, index) => {
              const page = STAGE_PAGES[stage.slug];
              return (
                <li key={stage.slug}>
                  <div className="roadmap-marker" aria-hidden="true">{index + 1}</div>
                  <div className="roadmap-copy">
                    <p className="roadmap-label">{stage.label}</p>
                    <h3>{page.title}</h3>
                    <p>{page.intro}</p>
                    <p className="roadmap-outcome"><strong>Objetivo de salida:</strong> {outcomes[stage.slug]}</p>
                    <Link className="source" href={`/etapas/${stage.slug}`}>
                      Abrir esta etapa →
                    </Link>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="section white">
        <div className="container home-gates-grid">
          <div>
            <p className="eyebrow">El punto donde más conviene ser metódico</p>
            <h2>Antes de pedir el diploma, confirmá estos cinco puntos</h2>
            <p className="section-intro">
              “Terminé de cursar” y “ya puedo iniciar el diploma” no son lo mismo.
              Este control previo evita buena parte de los avances prematuros y del
              retrabajo administrativo.
            </p>
            <Link className="button button-secondary" href="/etapas/diploma">
              Ver checklist completo de diploma →
            </Link>
          </div>

          <ol className="gate-list">
            {diplomaGates.map(([title, description, href], index) => (
              <li key={title}>
                <span>{index + 1}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{description}</p>
                  <Link href={href}>Revisar →</Link>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section problems-section">
        <div className="container">
          <p className="eyebrow">Entrar por el problema</p>
          <h2>Si ya sabés qué se trabó, no hace falta recorrer todo desde cero</h2>
          <div className="problem-link-list">
            {featuredProblems.map(([slug, title, description]) => (
              <Link
                className={slug === "subsanacion" ? "problem-link urgent" : "problem-link"}
                href={`/problemas/${slug}`}
                key={slug}
              >
                <span>
                  <strong>{title}</strong>
                  <small>{description}</small>
                </span>
                <b aria-hidden="true">→</b>
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
            <p className="eyebrow">Cómo confiar en la guía</p>
            <h2>La explicación es nuestra; la autoridad queda visible</h2>
          </div>
          <div>
            <p>
              Organizamos información dispersa y distinguimos requisitos oficiales,
              procesos oficiales, recomendaciones y tiempos orientativos. Los trámites
              se realizan en los sistemas de UBA y Exactas; ante discrepancias,
              prevalece la información oficial enlazada.
            </p>
            <Link className="source" href="/fuentes">
              Ver fuentes y criterio editorial →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
