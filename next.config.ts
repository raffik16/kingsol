import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  experimental: {
    // Tailwind keeps the CSS small (~6 KB gzipped), so ship it inside the HTML instead of as a
    // render-blocking request: the hero heading (the LCP element) can paint without a round trip.
    inlineCss: true,
  },
  // The site is a single page; old sub-page URLs point at their home page sections.
  redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },
};

export default nextConfig;
