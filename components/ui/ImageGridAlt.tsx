// components/ui/ImageGridAlt.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { colorKey } from "../../configs/colors";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
      className={`absolute inset-0 transition-opacity duration-500 z-20 flex items-center justify-center overflow-hidden bg-black/50 ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
    >
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
              ? "5,0 100,0 95,100 0,100"
              : index % 3 === 1
                ? "0,5 100,0 100,95 0,100"
                : "0,0 95,5 100,100 5,95"
          }
          fill="none"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.4"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

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
  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const row = rowRef.current;
    if (!section || !row) return;

    const cells = row.querySelectorAll<HTMLElement>(".alt-grid-cell");

    // Stagger from sides — even cells from left, odd from right
    cells.forEach((cell, i) => {
      gsap.set(cell, {
        opacity: 0,
        x: i % 2 === 0 ? -40 : 40,
        scale: 0.96,
      });
    });

    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(cells, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.75,
          ease: "power3.out",
          stagger: {
            each: 0.1,
            from: "start",
          },
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [items.length]);

  const handleTap = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section ref={sectionRef} className={`w-full overflow-hidden ${className}`}>
      <div ref={rowRef} className="flex flex-col md:flex-row">
        {items.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={index}
              className="alt-grid-cell group relative flex-1 min-h-40 sm:min-h-63 lg:min-h-80 overflow-hidden cursor-pointer"
              onClick={() => handleTap(index)}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className={`object-cover transition-transform duration-500 ${isActive ? "scale-105" : "group-hover:scale-105"
                  }`}
                sizes="(max-width: 640px) 100vw, 25vw"
              />

              <div
                className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isActive ? "opacity-0" : "group-hover:opacity-0"
                  }`}
              />

              <div
                className={`absolute inset-0 flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300 z-10 ${isActive ? "opacity-0" : "group-hover:opacity-0"
                  }`}
              >
                <h2 className="text-h3-off text-h3-off-line-height font-display lg:text-h2-off lg:text-h2-off-line-height text-white uppercase text-center whitespace-pre-line">
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