import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://transaudio.geltaverse.com",
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        }
    ]
}
