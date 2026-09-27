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
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-(--space-lg) sm:flex-row sm:items-center sm:justify-between">
        <p className="font-hand text-lg text-ink">{siteName}</p>
        <nav aria-label="フッター">
          <ul className="flex flex-wrap gap-x-5 text-xs">
            {footerLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-block py-2 text-ink-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="pb-6 text-center text-xs text-ink-muted">
        &copy; {new Date().getFullYear()} {siteName}
      </p>
    </footer>
  );
}
