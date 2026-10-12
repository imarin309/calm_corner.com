import Image from "next/image";
import { ReactNode } from "react";
import { siteAuthor } from "@/constants/meta";

/** ファビコンを差し替えても吹き出しのアイコンが変わらないよう、別ファイルにしている */
const SPEECH_ICON = "/speech-anpan.png";

export default function Speech({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-5 flex items-start gap-3">
      <Image
        src={SPEECH_ICON}
        alt={siteAuthor}
        width={56}
        height={56}
        className="h-12 w-12 shrink-0 rounded-full border border-line bg-surface sm:h-14 sm:w-14"
      />
      {/* 1行のときは吹き出しとアイコンの高さをそろえ、複数行ならアイコンは上に残してしっぽだけアイコンの中心に向ける */}
      <div className="relative flex min-h-12 min-w-0 flex-1 items-center rounded-lg border border-line bg-surface px-4 py-2 sm:min-h-14">
        <span
          aria-hidden
          className="absolute -left-[7px] top-[17px] h-3 w-3 sm:top-[21px] rotate-45 border-b border-l border-line bg-surface"
        />
        <div className="prose prose-sm sm:prose-base prose-stone w-full max-w-none text-stone-700 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
          {children}
        </div>
      </div>
    </div>
  );
}
