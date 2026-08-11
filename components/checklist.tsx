"use client";

import { useEffect, useMemo, useState } from "react";
import type { ChecklistItem, ChecklistKind } from "@/lib/content";

const kindLabels: Record<ChecklistKind, string> = {
  status: "Estado",
  preparation: "Preparación",
  verification: "Verificación",
};

export function Checklist({
  title = "Checklist de esta etapa",
  items,
  storageKey,
}: {
  title?: string;
  items: ChecklistItem[];
  storageKey?: string;
}) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!storageKey) return;
    try {
      const raw = localStorage.getItem(`egreso-lcd:checklist:${storageKey}`);
      if (raw) setChecked(JSON.parse(raw) as Record<string, boolean>);
    } catch {
      // A corrupted local checklist should never block access to the guide.
    }
  }, [storageKey]);

  const completed = useMemo(
    () => items.filter((item) => checked[item.id]).length,
    [checked, items],
  );

  function toggle(id: string) {
    setChecked((current) => {
      const next = { ...current, [id]: !current[id] };
      if (storageKey) {
        localStorage.setItem(
          `egreso-lcd:checklist:${storageKey}`,
          JSON.stringify(next),
        );
      }
      return next;
    });
  }

  return (
    <section className="checklist-panel" aria-labelledby={`${storageKey ?? "stage"}-checklist`}>
      <div className="checklist-heading">
        <div>
          <p className="eyebrow">Control personal</p>
          <h2 id={`${storageKey ?? "stage"}-checklist`}>{title}</h2>
        </div>
        <span className="checklist-count">
          {completed}/{items.length}
        </span>
      </div>
      <p className="meta">
        Estas marcas se guardan sólo en este navegador. No reemplazan la
        confirmación de la Universidad.
      </p>
      <ul className="checklist">
        {items.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={Boolean(checked[item.id])}
                onChange={() => toggle(item.id)}
              />
              <span>
                <span className={`check-kind kind-${item.kind}`}>
                  {kindLabels[item.kind]}
                </span>
                {item.label}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
