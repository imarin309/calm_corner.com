import Link from "next/link";
import { siteName } from "@/constants/meta";

const footerLinks = [
  { label: "ホーム", href: "/" },
  { label: "このブログについて", href: "/about" },
  { label: "お問い合わせ", href: "/contact" },
  { label: "プライバシーポリシー", href: "/privacy-policy" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-800 py-6 text-center">
      <nav aria-label="フッター">
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4">
          {footerLinks.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-xs text-stone-400 underline transition-colors hover:text-stone-200"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <p className="mt-2 text-sm text-stone-400">
        &copy; {new Date().getFullYear()} {siteName}
      </p>
    </footer>
  );
}
