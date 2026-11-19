import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "@/components/product/ProductPage";
import { productBySlug, products } from "@/lib/products";

const list = products.filter((p) => p.kind === "system");

export function generateStaticParams() {
  return list.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = productBySlug((await params).slug);
  if (!p || p.kind !== "system") return {};
  return { title: p.title, description: p.short, openGraph: { images: [p.cover] } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const p = productBySlug((await params).slug);
  if (!p || p.kind !== "system") notFound();
  return <ProductPage p={p} />;
}
