"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import HeroSliderStatus from "./HeroSliderStatus";

export interface HeroSlide {
  backgroundImage: string;
}

export interface HeroProps {
  logoSrc: string;
  page?: string;
  slides?: HeroSlide[]; // for image carousel
  backgroundImage?: string; // legacy single image
  backgroundVideo?: string; // for single looping video
  scrollText?: string;
  autoPlayInterval?: number;
  className?: string;
}

export function Hero({
  slides,
  backgroundImage,
  backgroundVideo,
  scrollText = "SCROLL TO EXPLORE",
  autoPlayInterval = 5000,
  logoSrc,
  page,
  className,
}: HeroProps) {
  const computedSlides: HeroSlide[] =
    slides && slides.length
      ? slides
      : backgroundImage
        ? [{ backgroundImage }]
        : [];

  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const next = useCallback(() => {
    if (computedSlides.length === 0) return;
    setCurrent((prev) => (prev + 1) % computedSlides.length);
  }, [computedSlides.length]);

  // Autoplay functionality for slides
  useEffect(() => {
    if (!backgroundVideo && computedSlides.length > 1) {
      const timer = setInterval(next, autoPlayInterval);
      return () => clearInterval(timer);
    }
  }, [next, autoPlayInterval, backgroundVideo, computedSlides.length]);

  // Initial GSAP Animation using context for safe cleanup
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Background scaling and fade
      tl.fromTo(
        ".hero-bg",
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.8, ease: "power3.out" },
      )
        // Top left logo drop in
        .fromTo(
          ".top-logo",
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=1.4",
        )
        // Center logo pop and fade with blur-like zoom
        .fromTo(
          ".center-logo-container",
          { scale: 0.8, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 1.5, ease: "expo.out" },
          "-=1.2",
        )
        // Scroll indicator fade up
        .fromTo(
          ".scroll-indicator",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          "-=1",
        )
        // Slider status side sweep
        .fromTo(
          ".slider-status",
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
          "-=0.8",
        );

      // Bouncing scroll arrow
      gsap.to(".scroll-arrow", {
        y: 6,
        duration: 1.5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert(); // Cleanup GSAP animations on unmount
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black font-sans"
    >
      {/* Background Media Container */}
      <div className="hero-bg absolute inset-0 w-full h-full origin-center">
        {backgroundVideo ? (
          <>
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={backgroundVideo}
              autoPlay
              loop
              muted
              playsInline
            />
            {/* Elegant Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/30 to-black/90" />
          </>
        ) : (
          computedSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100 z-0" : "opacity-0 -z-10"
                }`}
              style={{ backgroundImage: `url(${slide.backgroundImage})` }}
            >
              <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/30 to-black/90" />
            </div>
          ))
        )}
      </div>

      {/* Top Left Logo */}
      {/* <div className="top-logo absolute top-6 left-6 md:top-10 md:left-12 z-20">
        <Image
          src="/images/sattyaarts.png"
          alt="Sattya Arts"
          width={196}
          height={90}
          priority
          className="h-12 md:h-16 w-auto object-contain"
        />
      </div> */}

      {/* Center Logo / Content */}
      <div className="center-logo-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center">
        <Image
          height={400}
          width={400}
          src={logoSrc}
          alt="Sattya Logo"
          priority
          className={`object-contain drop-shadow-[0_10px_35px_rgba(0,0,0,0.5)] ${className || "w-48 md:w-64"}`}
        />
        {page !== "spotted" && (
          <Image
            src="/images/ui/atsattya.svg"
            alt="@Sattya"
            width={120}
            height={30}
            className="w-auto h-4 md:h-6 object-contain translate-x-10"
          />
        )}
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
        <div className="w-px h-12 md:h-16 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/80 animate-pulse animate-scroll" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-white/70 text-[10px] md:text-xs tracking-[0.25em] uppercase font-light">
            {scrollText}
          </p>
          <svg
            className="scroll-arrow text-white/50 w-4 h-4 md:w-5 md:h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      {/* Bottom Right — Slider Status (only for images) */}
      {!backgroundVideo && computedSlides.length > 1 && (
        <div className="slider-status absolute bottom-8 md:bottom-12 right-6 md:right-12 z-20">
          <HeroSliderStatus
            total={computedSlides.length}
            current={current}
            onChange={setCurrent}
          />
        </div>
      )}
    </div>
  );
}
