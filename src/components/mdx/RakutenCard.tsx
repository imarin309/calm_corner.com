import Image from "next/image";

interface RakutenCardProps {
  href: string;
  imgSrc: string;
  title: string;
  price: string;
}

export function RakutenCard({ href, imgSrc, title, price }: RakutenCardProps) {
  return (
    <div className="not-prose my-8 rounded-xl border-2 border-primary overflow-hidden shadow-md relative">
      <div className="bg-primary px-3 py-1 flex items-center gap-1.5">
        <span className="text-[10px] font-medium text-white/70 leading-none">
          ads
        </span>
        <span className="text-xs font-bold text-white leading-none">
          楽天市場
        </span>
      </div>
      <a
        href={href}
        target="_blank"
        rel="nofollow sponsored noopener"
        className="flex gap-4 p-4 bg-white hover:bg-accent/30 transition-colors"
      >
        <Image
          src={imgSrc}
          alt={title}
          width={112}
          height={112}
          className="w-28 h-28 object-contain flex-shrink-0"
          unoptimized
        />
        <div className="flex flex-col justify-between min-w-0">
          <p className="text-sm font-medium text-foreground leading-relaxed line-clamp-3">
            {title}
          </p>
          <div>
            <p className="text-sm font-bold text-primary mt-2">{price}</p>
            <div className="mt-2 inline-flex items-center gap-2 bg-white text-[#bf0000] text-xs font-medium px-4 py-1.5 rounded-full border-2 border-[#bf0000]">
              <Image
                src="https://static.affiliate.rakuten.co.jp/makelink/rl.svg"
                alt="楽天"
                width={52}
                height={16}
                className="h-4 w-auto"
                unoptimized
              />
              楽天で購入
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
