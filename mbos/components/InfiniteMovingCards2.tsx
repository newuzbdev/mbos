"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

// Helper to check if image is remote (http/https) or local
function isRemoteImage(src: string) {
  return /^https?:\/\//.test(src);
}

export const InfiniteMovingCards2 = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    image: string;
    name: string;
    role: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative max-w-8xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max md:w-500 min-w-full shrink-0 gap-5 flex-nowrap py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <li
            className="relative shrink-0 flex items-center flex-col rounded-2xl"
            key={idx}
          >
            {isRemoteImage(item.image) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image}
                alt={`Image ${idx}`}
                width={300}
                height={400}
                className="rounded-3xl h-[400px] w-[300px] object-cover"
                loading="lazy"
                draggable={false}
              />
            ) : (
              // Local images can use next/image for optimization
              <img
                src={item.image}
                alt={`Image ${idx}`}
                width={300}
                height={400}
                className="rounded-3xl h-[400px] w-[300px] object-cover"
                loading="lazy"
                draggable={false}
              />
            )}
            <h3>{item.name}</h3>
            <p>{item.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
