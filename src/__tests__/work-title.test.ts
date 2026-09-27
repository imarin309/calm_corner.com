import { describe, expect, it } from "vitest";
import { splitWorkTitle } from "@/lib/work-title";

describe("splitWorkTitle", () => {
  it("splits the name and catch copy and drops the painting-method prefix", () => {
    expect(
      splitWorkTitle(
        "【美プラ筆塗り塗装】30MS アルトリアキャスター 制作 | 花を添えて、日常を生きる少女に",
      ),
    ).toEqual({
      name: "30MS アルトリアキャスター 制作",
      catchCopy: "花を添えて、日常を生きる少女に",
    });
  });

  it("keeps a series-name prefix", () => {
    expect(
      splitWorkTitle("【創彩少女庭園】久遠 筆塗り塗装 | 夢のキット"),
    ).toEqual({
      name: "【創彩少女庭園】久遠 筆塗り塗装",
      catchCopy: "夢のキット",
    });
  });

  it("returns only the name when there is no separator", () => {
    expect(splitWorkTitle("色塗りチュートリアルを読んで学んだこと")).toEqual({
      name: "色塗りチュートリアルを読んで学んだこと",
      catchCopy: undefined,
    });
  });
});
