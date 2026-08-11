import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container page page-wide">
      <p className="eyebrow">No encontramos esa página</p>
      <h1>Volvé al recorrido, no al comienzo del trámite</h1>
      <p className="lead">
        El enlace puede haber cambiado o la página ya no existir. Podés ubicar tu
        etapa con el orientador o entrar directamente al mapa completo.
      </p>
      <div className="hero-actions">
        <Link className="button" href="/orientador">
          Saber dónde estoy →
        </Link>
        <Link className="button button-secondary" href="/etapas">
          Ver todas las etapas
        </Link>
        <Link className="source" href="/">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
