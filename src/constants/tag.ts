export type Tag = {
  slug: string;
  name: string;
};

export const tags: Tag[] = [
  { slug: "hg", name: "HG" },
  { slug: "sd-ex", name: "SD-EX" },
  { slug: "fag", name: "フレームアームズガール" },
  { slug: "megami-device", name: "メガミデバイス" },
  { slug: "30ms", name: "30MS" },
  { slug: "frs", name: "figure-rise-standard" },
  { slug: "arcanadia", name: "アルカナディア" },
  { slug: "sousai-syoujo", name: "創彩少女庭園" },
  { slug: "megaromaria", name: "メガロマリア" },
];

export function getAllTags(): Tag[] {
  return tags;
}

export function getTagBySlug(slug: string): Tag | undefined {
  return tags.find((tag) => tag.slug === slug);
}

export function getTagName(slug: string): string {
  const tag = getTagBySlug(slug);
  return tag?.name ?? slug;
}
