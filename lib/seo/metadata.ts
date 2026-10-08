import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { school } from "@/data/school";

/** Site-wide defaults, applied by the root layout and inherited by pages. */
export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: school.name,
    template: `%s | ${school.name}`,
  },
  description: siteConfig.description,
  applicationName: school.name,
  keywords: school.seo.keywords,
  icons: { icon: school.brand.favicon },
  openGraph: {
    type: "website",
    siteName: school.name,
    locale: siteConfig.locale,
    images: school.seo.ogImage
      ? [
          {
            url: school.seo.ogImage.src,
            width: school.seo.ogImage.width,
            height: school.seo.ogImage.height,
            alt: school.seo.ogImage.alt,
          },
        ]
      : undefined,
  },
  twitter: { card: "summary_large_image" },
};

interface PageMetadataInput {
  title: string;
  description?: string;
  /** Route path, e.g. "/admissions". Used for the canonical URL. */
  path: string;
}

/** Per-page metadata: `export const metadata = createPageMetadata({...})`. */
export function createPageMetadata({
  title,
  description = siteConfig.description,
  path,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
  };
}
