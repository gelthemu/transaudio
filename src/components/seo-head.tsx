import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
}

export const SEOHead = ({ title, description, canonical }: SEOHeadProps) => {
  const fullTitle = title.includes("TransAUDIO")
    ? title
    : `${title} | TransAUDIO`;
  const baseUrl = window.location.origin;
  const canonicalUrl = canonical
    ? `${baseUrl}${canonical}`
    : window.location.href;

  useEffect(() => {
    document.title = fullTitle;

    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let meta = document.querySelector(
        `meta[${attr}="${name}"]`,
      ) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMeta("description", description);

    let link = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonicalUrl;

    return () => {};
  }, [fullTitle, description, canonicalUrl]);

  return null;
};
