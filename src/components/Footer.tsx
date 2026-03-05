import Link from "next/link";
import { siteName, siteXUrl } from "@/constants/meta";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-800 py-6 text-center">
      <div className="flex items-center justify-center gap-4">
        <Link
          href="/privacy-policy"
          className="text-xs text-stone-500 underline transition-colors hover:text-stone-300"
        >
          プライバシーポリシー
        </Link>
        <a
          href={siteXUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-stone-500 transition-colors hover:text-stone-300"
          aria-label={`${siteName} の X アカウントを新しいタブで開く`}
        >
          <span className="text-sm font-bold">X</span>
        </a>
      </div>
      <p className="mt-2 text-sm text-stone-400">
        &copy; {new Date().getFullYear()} {siteName}
      </p>
    </footer>
  );
}
