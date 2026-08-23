import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// 'unsafe-inline' script-src is required for the server-rendered JSON-LD and
// Next's own inline bootstrap; harden to nonces later if needed.
// 'unsafe-eval' is dev-only (React Fast Refresh).
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  // images.dmca.com serves the DMCA protection badge. It must load from their
  // origin (not a local copy or an optimized proxy) for the badge to verify.
  "img-src 'self' data: https://images.dmca.com",
  "font-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
  },
};

export default nextConfig;
