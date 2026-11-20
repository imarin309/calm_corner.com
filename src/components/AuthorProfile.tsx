import Image from "next/image";
import Link from "next/link";
import {
  siteAuthor,
  siteAuthorIcon,
  siteAuthorProfilePath,
} from "@/constants/meta";

export default function AuthorProfile() {
  return (
    <aside
      aria-labelledby="author-profile-heading"
      className="mt-12 rounded-lg border border-line bg-surface p-5 sm:p-6"
    >
      <p className="font-hand text-xs tracking-wider text-accent">Written by</p>
      <div className="mt-3 flex items-start gap-4">
        <Image
          src={siteAuthorIcon}
          alt=""
          width={64}
          height={64}
          className="h-14 w-14 shrink-0 rounded-full border border-line bg-paper sm:h-16 sm:w-16"
        />
        <div className="min-w-0 flex-1">
          <p id="author-profile-heading" className="text-lg font-bold text-ink">
            {siteAuthor}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink">
            ガンプラや美少女プラモデルを、エアブラシを使わず水性塗料のファレホで筆塗りしています。完璧な塗装より、自分のイメージに近づけることを大事にしながら作っています。
          </p>
          <Link
            href={siteAuthorProfilePath}
            className="mt-2 inline-flex min-h-11 items-center text-sm text-ink underline decoration-line decoration-2 underline-offset-8 transition-colors hover:text-accent hover:decoration-accent"
          >
            このブログについて
          </Link>
        </div>
      </div>
    </aside>
  );
}
