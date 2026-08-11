import remarkBreaks from "remark-breaks";
import remarkDirective from "remark-directive";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import { remarkTextSize } from "./remark-text-size";
import { remarkLinkCard } from "./remark-link-card";
import { remarkRelatedLinks } from "./remark-related-links";

export const remarkPlugins = [
  remarkFrontmatter,
  remarkGfm,
  remarkBreaks,
  remarkDirective,
  remarkTextSize,
  remarkLinkCard,
  remarkRelatedLinks,
];
