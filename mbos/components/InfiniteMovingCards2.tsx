"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
  showControls = false,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  showControls?: boolean;
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTranslate, setCurrentTranslate] = useState(0);

  const getSpeed = () => {
    if (speed === "fast") return "30s";
    if (speed === "normal") return "60s";
    return "120s";
  };

  const duplicatedItems = [...items, ...items];
  const itemWidth = 366; // Card width (350px) + gap (16px)

  const scrollLeft = () => {
    setIsPaused(true);
    const newTranslate = currentTranslate + itemWidth; // Move right to show previous item
    setCurrentTranslate(newTranslate);
    
    // Resume animation after delay
    setTimeout(() => {
      setCurrentTranslate(0);
      setIsPaused(false);
    }, 2500);
  };

  const scrollRight = () => {
    setIsPaused(true);
    const newTranslate = currentTranslate - itemWidth; // Move left to show next item
    setCurrentTranslate(newTranslate);
    
    // Resume animation after delay
    setTimeout(() => {
      setCurrentTranslate(0);
      setIsPaused(false);
    }, 2500);
  };

  return (
    <div
      className={cn(
        "relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      {/* {showControls && (
        <>
          <button
            onClick={scrollLeft}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all backdrop-blur-sm cursor-pointer"
            aria-label="Scroll left (-1 item)"
          >
            <ChevronLeft size={20} className="text-white stroke-white" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all backdrop-blur-sm cursor-pointer"
            aria-label="Scroll right (+1 item)"
          >
            <ChevronRight size={20} className="text-white stroke-white" />
          </button>
        </>
      )} */}
      <div
        ref={scrollerRef}
        className={cn(
          "flex w-max gap-4 py-4",
          !isPaused && "animate-infinite-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
        style={{
          "--animation-duration": getSpeed(),
          "--animation-direction": direction === "left" ? "normal" : "reverse",
          transform: isPaused ? `translateX(${currentTranslate}px)` : undefined,
          transition: isPaused ? 'transform 0.5s ease-in-out' : undefined,
        } as React.CSSProperties}
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={`${item.name}-${idx}`}
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-b-0 border-zinc-200 bg-[linear-gradient(180deg,#fafafa,#f5f5f5)] px-8 py-6 md:w-[450px] dark:border-zinc-700 dark:bg-[linear-gradient(180deg,#27272a,#18181b)]"
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <span className="relative z-20 text-sm leading-[1.6] font-normal text-neutral-800 dark:text-gray-100">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.6] font-normal text-neutral-500 dark:text-gray-400">
                    {item.name}
                  </span>
                  <span className="text-sm leading-[1.6] font-normal text-neutral-500 dark:text-gray-400">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </div>
        ))}
      </div>
    </div>
  );
};
