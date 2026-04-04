/** MDX生テキストからプレーンテキストの冒頭を抽出する */
export function extractExcerpt(raw: string, maxLength = 120): string {
  return (
    raw
      // JSX/MDXコンポーネントタグを除去 (<Tag .../> や <Tag>...</Tag>)
      .replace(/<[A-Z][^>]*\/>/g, "")
      .replace(/<[A-Z][^>]*>[\s\S]*?<\/[A-Z]\w*>/g, "")
      // Markdownの見出し記号を除去
      .replace(/^#+\s+/gm, "")
      // Markdownのリスト記号を除去
      .replace(/^[\-*+]\s+/gm, "")
      // Markdownの強調・コードを除去
      .replace(/[*_`~]+/g, "")
      // Markdownリンクをテキストのみに
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      // 生URLを除去
      .replace(/https?:\/\/\S+/g, "")
      // HTML/MDXタグ全般を除去
      .replace(/<[^>]+>/g, "")
      // 空行を詰める
      .replace(/\n{2,}/g, "\n")
      .trim()
      .slice(0, maxLength)
  );
}
