import Image from "next/image";
import { siteCatchCopy, siteName } from "@/constants/meta";

export default function Header() {
  return (
    <header className="mx-auto w-full max-w-xl">
      {/* ロゴ画像は白背景のため、multiply で紙色の背景になじませる */}
      <Image
        src="/header.webp"
        alt={`${siteName} ${siteCatchCopy}`}
        width={4448}
        height={720}
        className="h-auto w-full mix-blend-multiply"
        priority
      />
    </header>
  );
}
