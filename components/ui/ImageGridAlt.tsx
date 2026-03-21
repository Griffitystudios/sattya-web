// components/ui/ImageGrid.tsx
"use client";

import { useState } from "react";
import { colorKey, colors } from "../../configs/colors";
import Image from "next/image";

export interface ImageGridItem {
  image: string;
  alt: string;
  label: string;
  hoverText?: string;
}

export interface ImageGridProps {
  items: ImageGridItem[];
  className?: string;
  logoSrc?: string;
  hoverIcon?: string;
  bannerText?: string;
  color?: colorKey;
}

function star(color: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="94"
      height="88"
      viewBox="0 0 94 88"
      fill="none"
    >
      <path
        d="M36.4496 10.0994L13.848 -33L63.6172 -3.78045L78.861 -26.8095L101.116 3.33123L149 11.8325L112.685 25.0176L128.63 60.2325L84.121 50.3417L70.8014 88L59.5874 52.2543L20.8509 70.295L36.6231 40.8022L0 21.5515L36.4496 10.0994Z"
        fill={color}
      />
      <path
        d="M39.4496 7.09942L16.848 -36L66.6172 -6.78045L81.861 -29.8095L104.116 0.33123L152 8.83245L115.685 22.0176L131.63 57.2325L87.121 47.3417L73.8014 85L62.5874 49.2543L23.8509 67.295L39.6231 37.8022L3 18.5515L39.4496 7.09942Z"
        fill="black"
      />
    </svg>
  );
}

function HoverOverlay({
  hoverText,
  hoverIcon,
  bannerText,
  logoSrc,
  color,
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
      className={`absolute inset-0 transition-opacity duration-500 z-20 flex items-center justify-center overflow-hidden bg-black/50 ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
    >
      {/* Dynamic 4-sided SVG shapes */}
      <svg
        className={`absolute inset-3.75 w-[calc(100%-30px)] h-[calc(100%-30px)] pointer-events-none transition-all duration-700 ease-out transform ${active
          ? "scale-100 opacity-100"
          : "scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100"
          }`}
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <polygon
          points={
            index % 3 === 0
              ? "5,0 100,0 95,100 0,100" // Parallelogram
              : index % 3 === 1
                ? "0,5 100,0 100,95 0,100" // Trapezoid
                : "0,0 95,5 100,100 5,95" // Kite shape
          }
          fill="none"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.4"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Center content */}
      <div
        className={`px-8 z-30 relative flex flex-col items-center justify-center gap-6 w-full transition-all duration-700 delay-100 ease-out transform ${active
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
          }`}
      >
        <p className="text-base sm:text-lg md:text-sm lg:text-xl text-white text-center font-light whitespace-pre-line leading-relaxed max-w-[85%]">
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

export default function ImageGridAlt({
  items,
  className = "",
  logoSrc,
  hoverIcon,
  bannerText,
  color,
}: ImageGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleTap = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={`w-full overflow-hidden ${className}`}>
      <div className="flex flex-col md:flex-row">
        {items.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={index}
              className="group relative flex-1 min-h-40 sm:min-h-63 lg:min-h-80 overflow-hidden cursor-pointer"
              onClick={() => handleTap(index)}
            >
              {/* Photo */}
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className={`object-cover transition-transform duration-500 ${isActive ? "scale-105" : "group-hover:scale-105"
                  }`}
                sizes="(max-width: 640px) 100vw, 25vw"
              />

              {/* Base dark overlay */}
              <div
                className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isActive ? "opacity-0" : "group-hover:opacity-0"
                  }`}
              />

              {/* Default label */}
              <div
                className={`absolute inset-0 flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300 z-10 ${isActive ? "opacity-0" : "group-hover:opacity-0"
                  }`}
              >
                <h2 className="text-h3-off text-h3-off-line-height font-display lg:text-h2-off lg:text-h2-off-line-height text-white uppercase text-center whitespace-pre-line">
                  {item.label}
                </h2>
              </div>

              {/* Hover / tap overlay */}
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
