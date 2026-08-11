"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { ChecklistItem, ChecklistKind } from "@/lib/content";

const kindLabels: Record<ChecklistKind, string> = {
  status: "Estado",
  preparation: "Preparación",
  verification: "Verificación",
};

const CHECKLIST_EVENT = "egreso-lcd:checklist-change";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHECKLIST_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHECKLIST_EVENT, callback);
  };
}

function parseChecked(raw: string) {
  if (!raw) return {} as Record<string, boolean>;
  try {
    return JSON.parse(raw) as Record<string, boolean>;
  } catch {
    return {} as Record<string, boolean>;
  }
}

export function Checklist({
  title = "Checklist de esta etapa",
  items,
  storageKey,
}: {
  title?: string;
  items: ChecklistItem[];
  storageKey?: string;
}) {
  const key = storageKey ? `egreso-lcd:checklist:${storageKey}` : null;
  const raw = useSyncExternalStore(
    subscribe,
    () => (key ? localStorage.getItem(key) ?? "" : ""),
    () => "",
  );
  const checked = useMemo(() => parseChecked(raw), [raw]);

  const completed = useMemo(
    () => items.filter((item) => checked[item.id]).length,
    [checked, items],
  );

  function toggle(id: string) {
    if (!key) return;
    const next = { ...checked, [id]: !checked[id] };
    localStorage.setItem(key, JSON.stringify(next));
    window.dispatchEvent(new Event(CHECKLIST_EVENT));
  }

  return (
    <section
      className="checklist-panel"
      aria-labelledby={`${storageKey ?? "stage"}-checklist`}
    >
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
