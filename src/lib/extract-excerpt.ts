/** MDX生テキストからプレーンテキストの冒頭を抽出する */
export function extractExcerpt(raw: string, maxLength = 120): string {
  let text = raw
    // JSX/MDXコンポーネントタグを除去 (<Tag .../> や <Tag>...</Tag>)
    .replace(/<[A-Z][^>]*\/>/g, "")
    .replace(/<[A-Z][^>]*>[\s\S]*?<\/[A-Z]\w*>/g, "")
    // Markdownの見出し記号を除去
    .replace(/^#+\s+/gm, "")
    // Markdownのテーブル行を除去
    .replace(/^\s*\|.*\|\s*$\n?/gm, "")
    // Markdownの引用記号を除去
    .replace(/^>\s?/gm, "")
    // Markdownのリスト記号を除去
    .replace(/^[\-*+]\s+/gm, "")
    // Markdownの強調・コードを除去
    .replace(/[*_`~]+/g, "")
    // Markdownリンクをテキストのみに
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // 生URLを除去
    .replace(/https?:\/\/\S+/g, "")
    // HTML/MDXタグ全般を除去
    .replace(/<[^>]+>/g, "");

  // カスタムディレクティブ記法 (:large[...] など) をテキストのみに (ネスト対応)
  let prev: string;
  do {
    prev = text;
    text = text.replace(/:[a-zA-Z]+\[([^[\]]*)\]/g, "$1");
  } while (text !== prev);

  return text
    .replace(/\n{2,}/g, "\n")
    .trim()
    .slice(0, maxLength);
}
