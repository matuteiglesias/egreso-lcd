import type { Metadata } from "next";
import Link from "next/link";
import { PROBLEM_PAGES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Problemas frecuentes",
  description:
    "Atajos para resolver bloqueos y dudas frecuentes del recorrido de egreso.",
};

export default function Page() {
  return (
    <div className="container page page-wide">
      <p className="eyebrow">Atajos por problema</p>
      <h1>Problemas frecuentes</h1>
      <p className="lead">
        Si ya sabés qué te está trabando, entrá por acá. Si todavía no ubicás el
        problema, el orientador es un mejor punto de entrada.
      </p>

      <div className="problem-grid">
        {Object.values(PROBLEM_PAGES).map((page) => (
          <Link
            className={`card ${
              page.slug === "subsanacion" ? "card-urgent" : ""
            }`}
            href={`/problemas/${page.slug}`}
            key={page.slug}
          >
            <h2>{page.title}</h2>
            <p>{page.intro}</p>
          </Link>
        ))}
      </div>

      <Link className="button" href="/orientador">
        Usar el orientador
      </Link>
    </div>
  );
}
