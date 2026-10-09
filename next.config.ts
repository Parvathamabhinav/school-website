import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  /**
   * The footer's copyright year, inlined at build time. Reading the clock
   * while prerendering is an error under Cache Components; a build-time
   * value keeps every page fully static. It updates on the next build.
   */
  env: {
    BUILD_YEAR: String(new Date().getFullYear()),
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
