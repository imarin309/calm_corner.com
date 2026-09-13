import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full">
      <Image
        src="/header.webp"
        alt="Calm Corner"
        width={4461}
        height={980}
        className="h-auto w-full"
        priority
      />
    </header>
  );
}
