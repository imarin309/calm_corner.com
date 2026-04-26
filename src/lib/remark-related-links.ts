import { visit } from "unist-util-visit";
import { parse as acornParse } from "acorn";
import type { Root } from "mdast";
import type { Plugin } from "unified";
import type { Program } from "estree";
import type { MdxJsxFlowElement, MdxJsxAttribute } from "mdast-util-mdx-jsx";

interface RelatedLinkItem {
  label: string;
  url: string;
  image?: string;
  favicon?: string;
}

async function fetchOGPImage(
  url: string,
): Promise<{ image: string; favicon: string }> {
  try {
    const domain = new URL(url).hostname;
    const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;

    if (domain.includes("youtube.com") || domain.includes("youtu.be")) {
      const videoId =
        new URL(url).searchParams.get("v") ||
        new URL(url).pathname.split("/").pop();
      const image = videoId
        ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
        : "";
      return { image, favicon };
    }

    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; LinkCardBot/1.0)" },
      signal: AbortSignal.timeout(5000),
    });
    const html = await res.text();

    const getMetaContent = (property: string) => {
      const m =
        html.match(
          new RegExp(
            `<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']*)["']`,
            "i",
          ),
        ) ||
        html.match(
          new RegExp(
            `<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name)=["']${property}["']`,
            "i",
          ),
        );
      return m?.[1] ?? "";
    };

    const rawImage = getMetaContent("og:image");
    const image = rawImage
      ? (() => {
          try {
            return new URL(rawImage, url).href;
          } catch {
            return "";
          }
        })()
      : "";

    return { image, favicon };
  } catch {
    return { image: "", favicon: "" };
  }
}

export const remarkRelatedLinks: Plugin<[], Root> = () => {
  return async (tree) => {
    const nodes: MdxJsxFlowElement[] = [];

    visit(tree, "mdxJsxFlowElement", (node: MdxJsxFlowElement) => {
      if (node.name === "RelatedLinks") nodes.push(node);
    });

    for (const node of nodes) {
      const itemsAttr = node.attributes?.find(
        (a): a is MdxJsxAttribute =>
          a.type === "mdxJsxAttribute" && a.name === "items",
      );
      const attrValue = itemsAttr?.value;
      if (!attrValue || typeof attrValue !== "object") continue;

      let items: RelatedLinkItem[];
      try {
        items = new Function(`return (${attrValue.value})`)();
      } catch {
        continue;
      }

      const results = await Promise.all(
        items.map((item) =>
          item.image
            ? Promise.resolve({
                image: item.image,
                favicon: item.favicon ?? "",
              })
            : fetchOGPImage(item.url),
        ),
      );

      const enriched = items.map((item, i) => ({
        ...item,
        image: results[i].image,
        favicon: results[i].favicon,
      }));

      const newValue = JSON.stringify(enriched);
      // MDXコンパイラはdata.estreeを優先するため、acornで再パースして更新する
      attrValue.value = newValue;
      attrValue.data = {
        estree: acornParse(newValue, {
          ecmaVersion: 2020,
        }) as unknown as Program,
      };
    }
  };
};
