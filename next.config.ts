import createMDX from "@next/mdx";
import { remarkPlugins } from "./src/lib/mdx-plugins";

const withMDX = createMDX({
  options: {
    remarkPlugins,
  },
});

export default withMDX({
  output: "export",
  serverExternalPackages: ["lightningcss"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.r2.cloudflarestorage.com",
      },
      {
        protocol: "https",
        hostname: "r2.calm-corner.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
});
