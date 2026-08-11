import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StageGuidance } from "@/components/guidance-page";
import { STAGE_PAGES } from "@/lib/content";

export function generateStaticParams() {
  return Object.keys(STAGE_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = STAGE_PAGES[slug];
  return {
    title: page?.title ?? "Etapa",
    description: page?.intro,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = STAGE_PAGES[slug];
  if (!page) notFound();

  return <StageGuidance page={page} />;
}
