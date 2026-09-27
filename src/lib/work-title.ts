/**
 * 記事タイトルは SEO 向けに「【美プラ筆塗り塗装】キット名 制作 | キャッチコピー」の形をしているため、
 * 作品棚では作品名と一言に分けて見せる
 */
export function splitWorkTitle(title: string): {
  name: string;
  catchCopy?: string;
} {
  const [head, ...rest] = title.split(" | ");
  // 【創彩少女庭園】のようにシリーズ名を表す括弧は残し、塗装方法を表す括弧だけ外す
  const name = head.replace(/^【[^】]*塗装】\s*/, "").trim();
  const catchCopy = rest.join(" | ").trim() || undefined;
  return { name, catchCopy };
}
