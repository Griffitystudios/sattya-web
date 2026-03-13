// components/ui/GallerySlider.tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import SliderStatus from "./SliderStatus";

export interface GallerySlide {
  image: string;
  alt: string;
}

export interface GallerySliderProps {
  slides: GallerySlide[];
  instagramLabel?: string;
  instagramHref?: string;
  instagramIcon?: string;
  autoPlayInterval?: number;
  color?: string;
  sliderVariant?: "dark" | "light";
}

export default function GallerySlider({
  slides,
  instagramLabel = "More from the Makerspace on Instagram.",
  instagramHref = "https://instagram.com",
  instagramIcon = "/icons/instagram.svg",
  autoPlayInterval = 4000,
  color,
}: GallerySliderProps) {
  const [current, setCurrent] = useState(0);

  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [next, autoPlayInterval]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) < 30) return;
    if (diff > 0) next();
    else prev();
  };

  return (
    <section
      className="relative w-full h-[90vh] min-h-96 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>
      ))}

      {/* Bottom bar */}
      <div className="absolute bottom-6 inset-x-0 z-10 flex items-center justify-between px-6 lg:px-12">
        <div className="flex-1" />

        <div className="flex-1 flex justify-center items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              className="h-6 w-6"
            >
              <SliderStatus variant={index === current ? "light" : "dark"} />
            </button>
          ))}
        </div>

        <div className={`flex-1 flex justify-end text-white`}>
          <a
            href={instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            {instagramIcon && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 256 256"
                className={`fill-white hover:fill-${color} transition-colors`}
              >
                <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
              </svg>
            )}
            <span className="caption hidden md:block">{instagramLabel}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
