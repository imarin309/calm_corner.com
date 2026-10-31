import sharp from "sharp";

export interface ImageSize {
  width: number;
  height: number;
}

/** オフラインでのビルドなどで取れなくても、ビルド自体は止めない */
export async function fetchImageSize(
  url: string,
): Promise<ImageSize | undefined> {
  try {
    const response = await fetch(url);
    if (!response.ok) return undefined;
    const { width, height } = await sharp(
      Buffer.from(await response.arrayBuffer()),
    ).metadata();
    return width && height ? { width, height } : undefined;
  } catch {
    return undefined;
  }
}
