import Link from "next/link";
import { STAGE_ORDER } from "@/lib/content";

export function StageProgress({ currentSlug }: { currentSlug?: string }) {
  return (
    <nav className="journey-progress" aria-label="Etapas del egreso">
      <ol>
        {STAGE_ORDER.map((stage, index) => {
          const current = stage.slug === currentSlug;
          return (
            <li key={stage.slug} aria-current={current ? "step" : undefined}>
              <Link href={`/etapas/${stage.slug}`}>
                <span className="journey-number">{index + 1}</span>
                <span>{stage.label}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
