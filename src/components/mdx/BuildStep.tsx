"use client";

import Image from "next/image";
import { useState, ReactNode } from "react";

interface BuildStepProps {
  number: number;
  title: string;
  images?: { src: string; alt: string; caption?: string }[];
  children?: ReactNode;
}

export function BuildStepGroup({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-5 [&>div]:!my-0 [&>div:not(:first-child)]:rounded-t-none [&>div:not(:first-child)]:border-t-0 [&>div:not(:last-child)]:rounded-b-none">
      {children}
    </div>
  );
}

export default function BuildStep({
  number,
  title,
  images,
  children,
}: BuildStepProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const isSub = number % 1 !== 0;
  const hasImages = images && images.length > 0;
  const cols = images && images.length >= 2 ? 2 : 1;

  return (
    <>
      <div
        className={`not-prose overflow-hidden rounded-xl border border-stone-200 ${
          isSub ? "my-3 bg-white" : "my-5 bg-stone-50"
        }`}
      >
        <div
          className={`flex items-center gap-3 border-b border-stone-200 px-4 ${
            isSub ? "py-2 bg-stone-50" : "py-3 bg-stone-100/80"
          }`}
        >
          <span
            className={`shrink-0 flex items-center justify-center rounded-full font-bold text-white ${
              isSub
                ? "h-6 min-w-6 px-1.5 bg-stone-400 text-xs"
                : "h-7 w-7 bg-stone-600 text-sm"
            }`}
          >
            {number}
          </span>
          <span
            className={`text-stone-800 ${isSub ? "text-sm font-medium" : "font-semibold"}`}
          >
            {title}
          </span>
        </div>

        {(hasImages || children) && (
          <div className="p-4">
            {children && (
              <div className="prose prose-sm sm:prose-base prose-stone mb-3 max-w-none text-stone-700">
                {children}
              </div>
            )}

            {hasImages && (
              <div
                className={`grid gap-3 ${cols === 1 ? "mx-auto max-w-lg grid-cols-1" : "grid-cols-2"}`}
              >
                {images!.map((img, i) => (
                  <figure key={i} className="m-0">
                    <button
                      type="button"
                      onClick={() => setSelectedIndex(i)}
                      className="relative block aspect-[4/3] w-full overflow-hidden rounded-lg focus:outline-none"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(min-width: 640px) 400px, 100vw"
                        className="object-cover transition-transform hover:scale-105"
                      />
                    </button>
                    {img.caption && (
                      <figcaption className="mt-1 text-center text-xs italic text-stone-500">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {selectedIndex !== null && images && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            className="absolute right-4 top-4 text-white hover:text-zinc-300"
            onClick={() => setSelectedIndex(null)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <button
            className="absolute left-4 text-white hover:text-zinc-300 disabled:opacity-30"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((p) => (p !== null && p > 0 ? p - 1 : p));
            }}
            disabled={selectedIndex === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div
            className="flex max-h-[90vh] max-w-[90vw] flex-col items-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedIndex].src}
              alt={images[selectedIndex].alt}
              width={1200}
              height={800}
              className="min-h-0 max-w-full w-auto shrink object-contain"
            />
            {images[selectedIndex].caption && (
              <p className="mt-2 shrink-0 text-center italic text-white/80">
                {images[selectedIndex].caption}
              </p>
            )}
          </div>

          <button
            className="absolute right-4 text-white hover:text-zinc-300 disabled:opacity-30"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((p) =>
                p !== null && p < images.length - 1 ? p + 1 : p,
              );
            }}
            disabled={selectedIndex === images.length - 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
