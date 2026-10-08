import type { Viewport } from "next";
import { SkipLink } from "@/components/layout/SkipLink";
import { LazySmoothScroll } from "@/components/layout/LazySmoothScroll";
import { siteConfig } from "@/config/site";
import { getBrandCssVariables } from "@/config/theme";
import { school } from "@/data/school";
import { rootMetadata } from "@/lib/seo/metadata";
import { bodyFont, displayFont } from "./fonts";
import "./globals.css";

export const metadata = rootMetadata;

export const viewport: Viewport = {
  themeColor: school.brand.colors.background,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={siteConfig.language}
      className={`${displayFont.variable} ${bodyFont.variable}`}
      style={getBrandCssVariables(school.brand.colors)}
    >
      <body>
        <SkipLink />
        {children}
        {siteConfig.features.smoothScroll && <LazySmoothScroll />}
      </body>
    </html>
  );
}
