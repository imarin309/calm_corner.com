"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, ReactNode } from "react";
import { toSlug } from "@/lib/heading";

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

// スマホはスワイプで送れるので、矢印はPCだけに出す
function SliderArrow({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "前の画像" : "次の画像"}
      className={`absolute top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-md hover:bg-white sm:flex ${
        direction === "prev" ? "left-2" : "right-2"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={direction === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
        />
      </svg>
    </button>
  );
}

export default function BuildStep({
  number,
  title,
  images,
  children,
}: BuildStepProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isSub = number % 1 !== 0;
  const hasImages = images && images.length > 0;
  const isSlider = images !== undefined && images.length >= 2;
  const id = `step-${toSlug(String(number))}-${toSlug(title)}`;

  const getSlideStep = useCallback((slider: HTMLDivElement) => {
    const slide = slider.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(slider).columnGap) || 0;
    return (slide?.offsetWidth ?? slider.clientWidth) + gap;
  }, []);

  const updateSliderState = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    setActiveSlide(Math.round(slider.scrollLeft / getSlideStep(slider)));
    setCanScrollPrev(slider.scrollLeft > 0);
    // 小数ピクセルの丸めで末尾まで届かないことがあるため1px余裕を持たせる
    setCanScrollNext(
      slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 1,
    );
  }, [getSlideStep]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    // observe直後にも1回呼ばれるので、初期状態の計算もこれで済む
    const observer = new ResizeObserver(updateSliderState);
    observer.observe(slider);
    return () => observer.disconnect();
  }, [updateSliderState]);

  const scrollSlider = (direction: 1 | -1) => {
    const slider = sliderRef.current;
    if (!slider) return;
    slider.scrollBy({
      left: direction * getSlideStep(slider),
      behavior: "smooth",
    });
  };

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
          <h3
            id={id}
            data-toc-heading={isSub ? "4" : "3"}
            data-toc-text={title}
            className={`m-0 scroll-mt-20 text-stone-800 ${isSub ? "text-sm font-medium" : "font-semibold"}`}
          >
            {title}
          </h3>
        </div>

        {(hasImages || children) && (
          <div className="p-4">
            {children && (
              <div
                className={`prose prose-sm sm:prose-base prose-stone max-w-none text-stone-700 ${hasImages ? "mb-3" : ""}`}
              >
                {children}
              </div>
            )}

            {hasImages && (
              <div className="relative">
                <div
                  ref={isSlider ? sliderRef : undefined}
                  onScroll={isSlider ? updateSliderState : undefined}
                  className={
                    isSlider
                      ? "flex snap-x snap-mandatory gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                      : "flex justify-center"
                  }
                >
                  {images!.map((img, i) => (
                    <figure
                      key={i}
                      className={`m-0 w-[85%] shrink-0 sm:w-[calc(50%-0.375rem)] ${isSlider ? "snap-center sm:snap-start" : ""}`}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedIndex(i)}
                        className="relative block aspect-[4/3] w-full overflow-hidden rounded-lg focus:outline-none"
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="(min-width: 640px) 400px, 85vw"
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

                {isSlider && canScrollPrev && (
                  <SliderArrow
                    direction="prev"
                    onClick={() => scrollSlider(-1)}
                  />
                )}
                {isSlider && canScrollNext && (
                  <SliderArrow
                    direction="next"
                    onClick={() => scrollSlider(1)}
                  />
                )}

                {/* PCは2枚ずつ見えて位置と枚数が対応しないため、ドットはスマホだけに出す */}
                {isSlider && (
                  <div
                    aria-hidden
                    className="mt-2 flex justify-center gap-1.5 sm:hidden"
                  >
                    {images!.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 w-1.5 rounded-full ${i === activeSlide ? "bg-stone-600" : "bg-stone-300"}`}
                      />
                    ))}
                  </div>
                )}
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
