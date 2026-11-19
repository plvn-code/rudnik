import type { MetadataRoute } from "next";
import { productHref, products } from "@/lib/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/systemy", "/rishennia", "/vyrobnytstvo", "/portfolio", "/pro-kompaniyu", "/kontakty", "/rozrakhunok"];
  return [...pages, ...products.map(productHref)].map((p) => ({ url: site.url + p }));
}
