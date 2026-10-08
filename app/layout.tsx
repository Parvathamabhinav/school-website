import type { Viewport } from "next";
import { SkipLink } from "@/components/layout/SkipLink";
import { LazySmoothScroll } from "@/components/layout/LazySmoothScroll";
import { AnnouncementBar } from "@/components/navigation/AnnouncementBar";
import { Navbar } from "@/components/navigation/Navbar";
import { siteConfig } from "@/config/site";
import { getThemeCssVariables } from "@/config/theme";
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
      style={getThemeCssVariables(school.brand.colors)}
    >
      <body>
        {/* Without JavaScript, never leave entrance-animation content hidden (see globals.css). */}
        <noscript>
          <style>{"[data-motion-pending] [data-motion-item], [data-motion-pending][data-motion-reveal], [data-motion-pending][data-motion-reveal] > * { opacity: 1 !important; animation: none !important; }"}</style>
        </noscript>
        <SkipLink />
        <AnnouncementBar announcement={school.announcement} />
        <Navbar />
        {children}
        {siteConfig.features.smoothScroll && <LazySmoothScroll />}
      </body>
    </html>
  );
}
