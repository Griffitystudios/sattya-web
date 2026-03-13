// components/ui/ImageGrid.tsx
"use client";

import { useState } from "react";
import { colorKey } from "../../configs/colors";
import Image from "next/image";

export interface ImageGridItem {
  image: string;
  alt: string;
  label: string;
  hoverText?: string;
  rowSpan?: 1 | 2 | 3;
  colSpan?: 1 | 2 | 3;
}

export interface ImageGridProps {
  items: ImageGridItem[];
  className?: string;
  logoSrc?: string;
  hoverIcon?: string;
  bannerText?: string;
  color?: colorKey;
  cols?: 3 | 4 | 5;
}

function HoverOverlay({
  hoverText,
  hoverIcon,
  active,
  index,
}: {
  hoverText: string;
  hoverIcon?: string;
  bannerText: string;
  logoSrc?: string;
  color?: colorKey;
  active: boolean;
  index: number;
}) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-500 z-20 flex items-center justify-center overflow-hidden bg-black/50 ${
        active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      }`}
    >
      <svg
        className={`absolute inset-3.75 w-[calc(100%-30px)] h-[calc(100%-30px)] pointer-events-none transition-all duration-700 ease-out transform ${
          active
            ? "scale-100 opacity-100"
            : "scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100"
        }`}
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <polygon
          points={
            index % 3 === 0
              ? "5,0 100,0 95,100 0,100"
              : index % 3 === 1
                ? "0,5 100,0 100,95 0,100"
                : "0,0 95,5 100,100 5,95"
          }
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeOpacity="0.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div
        className={`px-8 z-30 relative flex flex-col items-center justify-center gap-6 w-full transition-all duration-700 delay-100 ease-out transform ${
          active
            ? "translate-y-0 opacity-100"
            : "translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
        }`}
      >
        <p className="caption text-white text-center font-light whitespace-pre-line leading-relaxed max-w-[85%]">
          {hoverText}
        </p>

        {hoverIcon && (
          <div className="w-10 h-10 lg:w-12 lg:h-12 relative opacity-90 animate-bounce transition-opacity duration-300">
            <Image
              src={hoverIcon}
              alt=""
              fill
              className="object-contain filter brightness-0 invert"
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Breakpoint reference ────────────────────────────────────────────────────
//   Mobile  ≤640px  → 1 col
//   Desktop >640px  → cols prop
// ────────────────────────────────────────────────────────────────────────────

const desktopColsClass: Record<NonNullable<ImageGridProps["cols"]>, string> = {
  3: "min-[640px]:grid-cols-3",
  4: "min-[640px]:grid-cols-4",
  5: "min-[640px]:grid-cols-5",
};

const rowSpanClass: Record<NonNullable<ImageGridItem["rowSpan"]>, string> = {
  1: "min-[640px]:row-span-1",
  2: "min-[640px]:row-span-2",
  3: "min-[640px]:row-span-3",
};

const colSpanClass: Record<NonNullable<ImageGridItem["colSpan"]>, string> = {
  1: "min-[640px]:col-span-1",
  2: "min-[640px]:col-span-2",
  3: "min-[640px]:col-span-3",
};

export default function ImageGrid({
  items,
  className = "",
  logoSrc,
  hoverIcon,
  bannerText,
  color,
  cols = 4,
}: ImageGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleTap = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={`w-full overflow-hidden ${className}`}>
      <div
        className={[
          // Mobile: 1 col, auto rows
          "grid grid-cols-1 auto-rows-auto",
          // Desktop: cols prop + masonry with fixed total height
          desktopColsClass[cols],
          "min-[640px]:grid-rows-2 min-[640px]:auto-rows-[unset]",
          "min-[640px]:h-[52vw] min-[1920px]:h-[44vw]",
        ].join(" ")}
      >
        {items.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={index}
              className={[
                "group relative overflow-hidden cursor-pointer",
                "h-full w-full",
                // Mobile: aspect ratio drives height
                "aspect-video",
                // Desktop: grid height controls sizing — reset aspect
                "min-[640px]:aspect-auto min-[640px]:h-full",
                rowSpanClass[item.rowSpan ?? 1],
                colSpanClass[item.colSpan ?? 1],
              ].join(" ")}
              onClick={() => handleTap(index)}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className={`object-cover transition-transform duration-500 ${
                  isActive ? "scale-105" : "group-hover:scale-105"
                }`}
                sizes={[
                  "(max-width: 640px) 100vw",
                  `${Math.round(100 / cols)}vw`,
                ].join(", ")}
              />

              <div
                className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
                  isActive ? "opacity-0" : "group-hover:opacity-0"
                }`}
              />

              <div
                className={`absolute inset-0 flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300 z-10 ${
                  isActive ? "opacity-0" : "group-hover:opacity-0"
                }`}
              >
                <h2 className="text-h3-off text-h3-off-line-height font-offset lg:text-h2-off lg:text-h2-off-line-height text-white uppercase text-center whitespace-pre-line">
                  {item.label}
                </h2>
              </div>

              <HoverOverlay
                hoverText={item.hoverText || item.label}
                hoverIcon={hoverIcon}
                bannerText={bannerText || "Sattya"}
                logoSrc={logoSrc}
                color={color}
                active={isActive}
                index={index}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
