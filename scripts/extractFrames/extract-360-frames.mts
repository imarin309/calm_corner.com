#!/usr/bin/env node
/**
 * 動画から均等な間隔でフレームを抽出し、ThreeSixtyView用のWebP連番画像を生成するスクリプト
 *
 * scripts/extractFrames/data/ 配下の動画ファイルを自動的に処理し、
 * scripts/extractFrames/dataEdited/<動画名>/ に連番画像を出力します。
 *
 * 使用方法:
 *   npx tsx scripts/extractFrames/extract-360-frames.mts [枚数] [幅]
 *
 * 例:
 *   npx tsx scripts/extractFrames/extract-360-frames.mts
 *   npx tsx scripts/extractFrames/extract-360-frames.mts 36 1200
 *
 * 出力ファイル名は ThreeSixtyView のデフォルト props (prefix="frame_", digits=3, start=1, ext="webp")
 * に合わせて frame_001.webp 〜 frame_036.webp となります。
 *
 * 事前に ffmpeg / ffprobe がインストールされている必要があります (brew install ffmpeg)。
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "data");
const OUTPUT_DIR = path.join(__dirname, "dataEdited");

const VIDEO_EXTENSIONS = [".mp4", ".mov", ".avi", ".mkv", ".webm", ".m4v"];

const PREFIX = "frame_";
const DIGITS = 3;
const EXT = "webp";

const [, , countArg, widthArg] = process.argv;
const count = countArg ? parseInt(countArg, 10) : 36;
const width = widthArg ? parseInt(widthArg, 10) : undefined;

function checkBinary(bin: string) {
  try {
    execFileSync(bin, ["-version"], { stdio: "ignore" });
  } catch {
    console.error(
      `${bin} が見つかりません。'brew install ffmpeg' でインストールしてください。`,
    );
    process.exit(1);
  }
}

function getVideoFiles(): string[] {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    return [];
  }

  return fs
    .readdirSync(DATA_DIR)
    .filter((file) =>
      VIDEO_EXTENSIONS.includes(path.extname(file).toLowerCase()),
    )
    .map((file) => path.join(DATA_DIR, file));
}

function getDuration(file: string): number {
  const out = execFileSync("ffprobe", [
    "-v",
    "error",
    "-show_entries",
    "format=duration",
    "-of",
    "csv=p=0",
    file,
  ])
    .toString()
    .trim();
  const duration = parseFloat(out);
  if (!duration || Number.isNaN(duration)) {
    console.error(`動画の長さを取得できませんでした: ${file}`);
    process.exit(1);
  }
  return duration;
}

function extractFrames(videoPath: string) {
  const name = path.basename(videoPath, path.extname(videoPath));
  const outDir = path.join(OUTPUT_DIR, name);
  fs.mkdirSync(outDir, { recursive: true });

  const duration = getDuration(videoPath);
  console.log(
    `\n[${name}] 動画の長さ: ${duration.toFixed(2)}秒 / ${count}枚に分割します`,
  );

  for (let i = 0; i < count; i++) {
    const timestamp = (duration * i) / count;
    const num = (i + 1).toString().padStart(DIGITS, "0");
    const outPath = path.join(outDir, `${PREFIX}${num}.${EXT}`);

    const args = [
      "-y",
      "-ss",
      timestamp.toFixed(3),
      "-i",
      videoPath,
      "-frames:v",
      "1",
      "-update",
      "1",
    ];

    if (width) {
      args.push("-vf", `scale=${width}:-1`);
    }

    args.push("-q:v", "3", outPath);

    execFileSync("ffmpeg", args, { stdio: ["ignore", "ignore", "pipe"] });
    process.stdout.write(`\r生成中: ${i + 1}/${count}`);
  }

  console.log(`\n完了しました: ${outDir}`);
}

checkBinary("ffmpeg");
checkBinary("ffprobe");

const videoFiles = getVideoFiles();

if (videoFiles.length === 0) {
  console.error(
    `動画ファイルが見つかりません。scripts/extractFrames/data/ に動画を配置してください。`,
  );
  process.exit(1);
}

for (const videoPath of videoFiles) {
  extractFrames(videoPath);
}

console.log(
  `\n全て完了しました。ThreeSixtyView の baseUrl には dataEdited/<動画名>/ 配下のアップロード先URLを指定してください。`,
);
