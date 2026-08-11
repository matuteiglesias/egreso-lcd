import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProblemGuidance } from "@/components/guidance-page";
import { PROBLEM_PAGES } from "@/lib/content";

export function generateStaticParams() {
  return Object.keys(PROBLEM_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = PROBLEM_PAGES[slug];
  return {
    title: page?.title ?? "Problema frecuente",
    description: page?.intro,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = PROBLEM_PAGES[slug];
  if (!page) notFound();

  return <ProblemGuidance page={page} />;
}
