import type { Metadata } from "next";
import { ResolverClient } from "@/components/resolver-client";
import { loadJourney, loadRegistry } from "@/lib/knowledge";

export const metadata: Metadata = {
  title: "Orientador",
  description:
    "Ubicá tu estado en el recorrido de egreso y encontrá el próximo paso.",
};

export default function Page() {
  const journey = loadJourney();
  const registry = loadRegistry();

  return (
    <div className="container page page-wide">
      <ResolverClient journey={journey} registry={registry} />
    </div>
  );
}
