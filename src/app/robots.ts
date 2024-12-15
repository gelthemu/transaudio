import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: "/api/",
      },
      {
        userAgent: ["Applebot", "Bingbot", "Twitterbot"],
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: "https://transaudio.geltaverse.com/sitemap.xml",
    host: "https://transaudio.geltaverse.com",
  };
}

