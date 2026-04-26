import createMDX from "@next/mdx";
import remarkBreaks from "remark-breaks";
import remarkDirective from "remark-directive";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import { remarkTextSize } from "./src/lib/remark-text-size";
import { remarkLinkCard } from "./src/lib/remark-link-card";
import { remarkRelatedLinks } from "./src/lib/remark-related-links";

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      remarkGfm,
      remarkBreaks,
      remarkDirective,
      remarkTextSize,
      remarkLinkCard,
      remarkRelatedLinks,
    ],
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
