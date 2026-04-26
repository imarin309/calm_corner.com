import Image from "next/image";

interface RelatedLinkItem {
  label: string;
  url: string;
  image?: string;
  favicon?: string;
}

interface RelatedLinksProps {
  items: RelatedLinkItem[];
}

function YouTubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 fill-red-500 flex-shrink-0"
      aria-hidden="true"
    >
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 text-stone-400 flex-shrink-0"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
}

function isYouTube(url: string) {
  try {
    const { hostname } = new URL(url);
    return hostname.includes("youtube.com") || hostname.includes("youtu.be");
  } catch {
    return false;
  }
}

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function RelatedLinks({ items }: RelatedLinksProps) {
  return (
    <div className="not-prose my-8">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-px flex-1 bg-stone-200" />
        <span className="text-xs font-medium text-stone-400 tracking-widest uppercase">
          関連リンク
        </span>
        <div className="h-px flex-1 bg-stone-200" />
      </div>
      <ul className="flex flex-col gap-2">
        {items.map(({ label, url, image, favicon }) => (
          <li key={url}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300 transition-colors overflow-hidden group"
            >
              {/* サムネイル */}
              {image ? (
                <div className="w-24 sm:w-32 h-16 flex-shrink-0 bg-stone-100">
                  <Image
                    src={image}
                    alt={label}
                    width={128}
                    height={64}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-16 h-16 flex-shrink-0 bg-stone-100 flex items-center justify-center">
                  {isYouTube(url) ? <YouTubeIcon /> : <ExternalIcon />}
                </div>
              )}

              {/* テキスト情報 */}
              <div className="flex-1 min-w-0 py-3 pr-3">
                <p className="text-sm font-medium text-stone-700 group-hover:text-stone-900 transition-colors line-clamp-2 leading-snug">
                  {label}
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  {favicon && (
                    <Image
                      src={favicon}
                      alt=""
                      width={12}
                      height={12}
                      className="w-3 h-3"
                      unoptimized
                    />
                  )}
                  <span className="text-xs text-stone-400 truncate">
                    {getDomain(url)}
                  </span>
                </div>
              </div>

              {/* 矢印 */}
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-stone-300 group-hover:text-stone-400 flex-shrink-0 mr-3 transition-colors"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
