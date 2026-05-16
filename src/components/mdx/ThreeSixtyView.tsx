"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Maximize, RefreshCw, X } from "lucide-react";

interface ThreeSixtyViewProps {
  baseUrl: string;
  count?: number;
  ext?: string;
  digits?: number;
  start?: number;
  prefix?: string;
  alt?: string;
  sensitivity?: number;
}

export default function ThreeSixtyView({
  baseUrl,
  count = 36,
  ext = "webp",
  digits = 3,
  start = 1,
  prefix = "frame_",
  alt = "360度ビュー",
  sensitivity = 8,
}: ThreeSixtyViewProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartFrame = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  const images = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const num = (start + i).toString().padStart(digits, "0");
        return `${baseUrl}${prefix}${num}.${ext}`;
      }),
    [baseUrl, count, ext, digits, start, prefix],
  );

  useEffect(() => {
    let mounted = true;
    let loaded = 0;

    images.forEach((src) => {
      const img = new window.Image();
      const onFinish = () => {
        if (!mounted) return;
        loaded++;
        setLoadedCount(loaded);
      };
      img.onload = onFinish;
      img.onerror = onFinish;
      img.src = src;
    });

    return () => {
      mounted = false;
    };
  }, [images]);

  const isLoaded = loadedCount >= count;

  // Non-passive touchmove — thumbnail
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const delta = e.touches[0].clientX - dragStartX.current;
      const frameDelta = Math.floor(delta / sensitivity);
      const frame =
        (((dragStartFrame.current + frameDelta) % count) + count) % count;
      setCurrentFrame(frame);
    };

    el.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => el.removeEventListener("touchmove", onTouchMove);
  }, [count, sensitivity]);

  // Non-passive touchmove — modal
  useEffect(() => {
    const el = modalContainerRef.current;
    if (!el || !isExpanded) return;

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const delta = e.touches[0].clientX - dragStartX.current;
      const frameDelta = Math.floor(delta / sensitivity);
      const frame =
        (((dragStartFrame.current + frameDelta) % count) + count) % count;
      setCurrentFrame(frame);
    };

    el.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => el.removeEventListener("touchmove", onTouchMove);
  }, [isExpanded, count, sensitivity]);

  // ESC to close modal
  useEffect(() => {
    if (!isExpanded) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsExpanded(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isExpanded]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isExpanded ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isExpanded]);

  const startDrag = (clientX: number, frame: number) => {
    setHasInteracted(true);
    isDragging.current = true;
    dragStartX.current = clientX;
    dragStartFrame.current = frame;
  };

  const handleMouseDown = (e: React.MouseEvent) =>
    startDrag(e.clientX, currentFrame);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - dragStartX.current;
    const frameDelta = Math.floor(delta / sensitivity);
    const frame =
      (((dragStartFrame.current + frameDelta) % count) + count) % count;
    setCurrentFrame(frame);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) =>
    startDrag(e.touches[0].clientX, currentFrame);
  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const loadProgress = Math.round((loadedCount / count) * 100);
  const showHint = isLoaded && !hasInteracted;

  const dragProps = {
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseUp,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
  };

  return (
    <>
      {/* Thumbnail */}
      <div
        ref={containerRef}
        className="group relative my-6 cursor-grab select-none overflow-hidden rounded-xl border border-stone-200 bg-stone-100 shadow-sm active:cursor-grabbing"
        {...dragProps}
      >
        {/* Loading state */}
        {!isLoaded && (
          <div className="flex flex-col items-center justify-center gap-3 py-16">
            <svg
              className="h-10 w-10 animate-spin text-stone-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <div className="h-1.5 w-48 overflow-hidden rounded-full bg-stone-200">
              <div
                className="h-full rounded-full bg-stone-500 transition-all duration-200"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <span className="text-sm text-stone-400">{loadProgress}%</span>
          </div>
        )}

        {/* Main image */}
        {isLoaded && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={images[currentFrame]}
            alt={`${alt} (${currentFrame + 1}/${count})`}
            className="pointer-events-none block h-auto w-full mix-blend-multiply"
            draggable={false}
          />
        )}

        {/* Center drag hint */}
        {isLoaded && (
          <div
            className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${showHint ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex flex-col items-center gap-2 rounded-2xl bg-black/50 px-6 py-4 backdrop-blur-sm">
              <RefreshCw className="h-7 w-7 text-white" />
              <p className="text-sm font-medium text-white/90">
                ドラッグして回転
              </p>
            </div>
          </div>
        )}

        {/* Bottom bar */}
        {isLoaded && (
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/35 to-transparent px-4 pb-3 pt-8">
            <div className="pointer-events-none h-0.5 flex-1 overflow-hidden rounded-full bg-white/30">
              <div
                className="h-full rounded-full bg-white/80"
                style={{ width: `${((currentFrame + 1) / count) * 100}%` }}
              />
            </div>
            <span className="pointer-events-none tabular-nums text-xs text-white/80">
              {currentFrame + 1} / {count}
            </span>
            <button
              className="rounded-full p-1 text-white/80 transition-colors hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(true);
              }}
            >
              <Maximize className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setIsExpanded(false)}
        >
          <button
            className="absolute right-4 top-4 text-white hover:text-zinc-300"
            onClick={() => setIsExpanded(false)}
          >
            <X className="h-7 w-7" />
          </button>

          <div
            ref={modalContainerRef}
            className="relative cursor-grab select-none overflow-hidden rounded-xl bg-stone-100 active:cursor-grabbing"
            style={{ width: "min(90vw, 90vh)", height: "min(90vw, 90vh)" }}
            onClick={(e) => e.stopPropagation()}
            {...dragProps}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[currentFrame]}
              alt={`${alt} (${currentFrame + 1}/${count})`}
              className="pointer-events-none block h-full w-full object-contain mix-blend-multiply"
              draggable={false}
            />

            {/* Bottom bar */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/35 to-transparent px-4 pb-3 pt-8">
              <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/30">
                <div
                  className="h-full rounded-full bg-white/80"
                  style={{ width: `${((currentFrame + 1) / count) * 100}%` }}
                />
              </div>
              <span className="tabular-nums text-xs text-white/80">
                {currentFrame + 1} / {count}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
