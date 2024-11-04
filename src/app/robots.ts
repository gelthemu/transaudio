import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
        {
      userAgent: "Googlebot",
      allow: "/",
      disallow: "/private/",
      },
      {
        userAgent: ["Applebot", "Bingbot"],
        allow: "/",
      },
    ],
    sitemap: "https://transaudio.geltaverse.com/sitemap.xml",
    host: "https://transaudio.geltaverse.com",
  };
}

