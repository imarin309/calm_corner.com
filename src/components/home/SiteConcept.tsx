import Image from "next/image";
import Link from "next/link";

const policies = [
  "筆塗りの楽しさを感じながら作る",
  "健康に気を使って作る",
  "完璧を目指さない",
];

export default function SiteConcept() {
  return (
    <section aria-labelledby="concept-heading">
      <div className="mb-(--space-md)">
        <p className="font-hand text-xs tracking-wider text-accent">
          このサイトのコンセプト
        </p>
        <div className="mt-1 flex items-center gap-3">
          {/* アイコンは白背景のため、multiply で紙色の背景になじませる */}
          <Image
            src="/icon.png"
            alt=""
            width={56}
            height={56}
            className="h-12 w-12 shrink-0 mix-blend-multiply sm:h-14 sm:w-14"
          />
          <h2
            id="concept-heading"
            className="text-2xl font-bold text-ink sm:text-3xl"
          >
            プラモデルを楽しく作って、塗ろう！！
          </h2>
        </div>
      </div>
      <div className="flex flex-col gap-(--space-sm) leading-relaxed text-ink">
        <p>
          筆塗りって楽しいです！！
          <br />
          自分だけの色を混ぜて作って、筆先に集中して塗って、完成したときの達成感がとてもすきです。
        </p>
        <p>そんな気持ちをみんなに伝えたくて、このブログを作りました。</p>
        <div>
          <p>このブログでの制作方針はこんな感じです。</p>
          <ul className="mt-2 list-disc pl-6">
            {policies.map((policy) => (
              <li key={policy}>{policy}</li>
            ))}
          </ul>
        </div>
        <p>まだまだ経験は浅いですが、見てもらえたら嬉しいです！</p>
      </div>
      <Link
        href="/about"
        className="mt-(--space-sm) inline-flex min-h-11 items-center py-2 text-ink underline decoration-line decoration-2 underline-offset-8 transition-colors hover:text-accent hover:decoration-accent"
      >
        このブログについて
      </Link>
    </section>
  );
}
