const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "api.iticketapp.net",
      },
      {
        protocol: "https",
        hostname: "api.iticketapp.net",
      },
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
