import type { Metadata } from "next";
import Link from "next/link";
import { STAGE_ORDER, STAGE_PAGES } from "@/lib/content";
import { StageProgress } from "@/components/journey-progress";

export const metadata: Metadata = {
  title: "Etapas",
  description: "Recorré las etapas administrativas y académicas del egreso LCD.",
};

export default function Page() {
  return (
    <div className="container page page-wide">
      <p className="eyebrow">El recorrido completo</p>
      <h1>Etapas del egreso</h1>
      <p className="lead">
        Podés leer el proceso de punta a punta o entrar directamente en la etapa
        que necesitás. Si no sabés cuál corresponde, usá el orientador.
      </p>

      <StageProgress />

      <div className="stage-index">
        {STAGE_ORDER.map((stage, index) => {
          const page = STAGE_PAGES[stage.slug];
          return (
            <Link
              className="stage-index-card"
              href={`/etapas/${stage.slug}`}
              key={stage.slug}
            >
              <span className="triage-number">{index + 1}</span>
              <div>
                <h2>{page.title}</h2>
                <p>{page.intro}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <Link className="button" href="/orientador">
        Saber dónde estoy
      </Link>
    </div>
  );
}
