import Image from "next/image";
import { siteHeaderImage } from "@/constants/meta";

export default function Header() {
  return (
    <header className="relative w-full overflow-hidden">
      <Image
        src={siteHeaderImage}
        alt="Calm Corner"
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full"
        priority
      />
    </header>
  );
}
