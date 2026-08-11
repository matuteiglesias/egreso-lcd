import { getClaim } from "@/lib/knowledge";

const labels: Record<string, string> = {
  official_requirement: "Requisito oficial",
  official_process: "Proceso oficial",
  official_timing: "Tiempo informado por la institución",
  recommendation_official: "Recomendación oficial",
  community_expectation: "Tiempo orientativo",
};

export function formatVerifiedDate(value: string) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export function SourceLink({ claimId }: { claimId: string }) {
  const { sourceDetail } = getClaim(claimId);

  return sourceDetail.url ? (
    <a
      className="source"
      href={sourceDetail.url}
      target="_blank"
      rel="noreferrer"
    >
      Ver fuente oficial ↗
    </a>
  ) : (
    <span className="meta">
      Fuente documental registrada: {sourceDetail.title}
    </span>
  );
}

export function Evidence({
  claimId,
  variant,
  compact = false,
}: {
  claimId: string;
  variant?: "warning" | "timing" | "recommendation";
  compact?: boolean;
}) {
  const claim = getClaim(claimId);
  const isExpectation = claim.type === "community_expectation";

  return (
    <aside
      className={`evidence ${compact ? "compact" : ""} ${
        variant ?? (claim.blocking ? "warning" : "")
      }`}
      aria-label={labels[claim.type] ?? "Evidencia"}
    >
      <span className="evidence-label">
        {labels[claim.type] ?? claim.type}
      </span>
      <p>
        <strong>{claim.claim}</strong>
      </p>
      {isExpectation ? (
        <p className="meta">Es una referencia para planificar, no una garantía.</p>
      ) : null}
      <p className="meta">
        {claim.sourceDetail.title} · Fuente revisada para esta versión:{" "}
        {formatVerifiedDate(claim.verified_at)}.
      </p>
      <SourceLink claimId={claimId} />
    </aside>
  );
}

function EvidenceRow({ claimId }: { claimId: string }) {
  const claim = getClaim(claimId);
  const isExpectation = claim.type === "community_expectation";

  return (
    <li className={claim.blocking ? "evidence-row blocking" : "evidence-row"}>
      <div className="evidence-row-main">
        <span className="evidence-label">{labels[claim.type] ?? claim.type}</span>
        <p>{claim.claim}</p>
        {isExpectation ? (
          <small>Referencia para planificar; no es una garantía.</small>
        ) : null}
      </div>
      <div className="evidence-row-source">
        <small>{claim.sourceDetail.title}</small>
        <SourceLink claimId={claimId} />
      </div>
    </li>
  );
}

export function EvidenceGroup({ claimIds }: { claimIds: string[] }) {
  if (!claimIds.length) return null;

  return (
    <details className="evidence-disclosure">
      <summary>
        <span>Fuentes y fundamentos</span>
        <small>
          {claimIds.length === 1
            ? "1 referencia"
            : `${claimIds.length} referencias`}
        </small>
      </summary>
      <p className="evidence-disclosure-intro">
        Abrimos la procedencia para que puedas distinguir qué es requisito, qué es
        proceso publicado y qué es sólo una referencia práctica.
      </p>
      <ul className="evidence-row-list">
        {claimIds.map((claimId) => (
          <EvidenceRow key={claimId} claimId={claimId} />
        ))}
      </ul>
    </details>
  );
}

export const OfficialRequirement = ({ claimId }: { claimId: string }) => (
  <Evidence claimId={claimId} />
);

export const Recommendation = ({ claimId }: { claimId: string }) => (
  <Evidence claimId={claimId} variant="recommendation" />
);

export const TimingNotice = ({ claimId }: { claimId: string }) => (
  <Evidence claimId={claimId} variant="timing" />
);

export const BlockingNotice = ({ claimId }: { claimId: string }) => (
  <Evidence claimId={claimId} variant="warning" />
);
