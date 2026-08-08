import { MetadataRoute } from "next";
import { getProdukts } from "@/app/api";
import { createSlug } from "@/lib/slugify";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL ||
        "https://little-lady-jewelry.vercel.app/";
    
    const products = (await getProdukts()) || [];

    const productUrls: MetadataRoute.Sitemap = products.map((product: { name: string; _id: string }) => ({
        url: `${baseUrl}/product/${createSlug(product.name)}-${product._id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
    }));
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1.0,
        },
        {
            url: `${baseUrl}favorite`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.3,
        },
    ];
    return [...productUrls, ...staticPages];
}
