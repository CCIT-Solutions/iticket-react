const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: true,
  modularizeImports: {
    "react-icons/fa6": { transform: "react-icons/fa6/{{member}}" },
    "lucide-react": { transform: "lucide-react/{{member}}" },
    "framer-motion": { transform: "framer-motion/{{member}}" },
  },
});
