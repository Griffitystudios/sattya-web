"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface KathmanduCollageProps {
  className?: string;
}

export default function KathmanduCollage({ className = "" }: KathmanduCollageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stupaRef = useRef<HTMLDivElement>(null);
  const leftWinRef = useRef<HTMLDivElement>(null);
  const rightWinRef = useRef<HTMLDivElement>(null);
  const doorRef = useRef<HTMLDivElement>(null);
  const topStarRef = useRef<HTMLDivElement>(null);
  const leftStarRef = useRef<HTMLDivElement>(null);
  const rightStarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = {
        trigger: containerRef.current,
        start: "top 65%",
        once: true,
      };

      // Back elements — windows only
      const backElements = [
        { ref: leftWinRef.current, delay: 0 },
        { ref: rightWinRef.current, delay: 0.08 },
      ];

      backElements.forEach(({ ref, delay }) => {
        if (!ref) return;
        gsap.fromTo(
          ref,
          { y: 100, opacity: 0, scale: 0.8, filter: "blur(4px)" },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.8,
            delay,
            ease: "back.out(1.6)",
            scrollTrigger: trigger,
          }
        );
      });

      // Door — back element treatment (slower, blurred)
      if (doorRef.current) {
        gsap.fromTo(
          doorRef.current,
          { y: 100, opacity: 0, scale: 0.8, filter: "blur(4px)" },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.8,
            delay: 0.16,
            ease: "back.out(1.6)",
            scrollTrigger: trigger,
          }
        );
      }

      // Stupa — front element treatment (fast, bouncy)
      if (stupaRef.current) {
        gsap.fromTo(
          stupaRef.current,
          { y: 80, opacity: 0, scale: 0.88 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.55,
            delay: 0.45,
            ease: "back.out(3)",
            scrollTrigger: trigger,
          }
        );
      }

      // Stars — last, very fast and very bouncy
      const starElements = [
        { ref: leftStarRef.current, delay: 0.62 },
        { ref: rightStarRef.current, delay: 0.68 },
        { ref: topStarRef.current, delay: 0.84 },
      ];

      starElements.forEach(({ ref, delay }) => {
        if (!ref) return;
        gsap.fromTo(
          ref,
          { y: 40, opacity: 0, scale: 0.3, rotation: -45 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.45,
            delay,
            ease: "back.out(4)",
            scrollTrigger: trigger,
          }
        );
      });

      const hoverElements = [
        { ref: stupaRef.current, scale: 1.08, y: -8 },
        { ref: leftWinRef.current, scale: 1.06, y: -6 },
        { ref: rightWinRef.current, scale: 1.06, y: -6 },
        { ref: doorRef.current, scale: 1.07, y: -7 },
        { ref: topStarRef.current, scale: 1.3, y: -10 },
        { ref: leftStarRef.current, scale: 1.25, y: -8 },
        { ref: rightStarRef.current, scale: 1.25, y: -8 },
      ];

      hoverElements.forEach(({ ref, scale, y }) => {
        if (!ref) return;

        // Make pointer-events work on the div
        ref.style.cursor = "pointer";

        const hoverTl = gsap.timeline({ paused: true });
        hoverTl.to(ref, {
          scale,
          y,
          duration: 0.35,
          ease: "back.out(2)",
        });

        ref.addEventListener("mouseenter", () => hoverTl.play());
        ref.addEventListener("mouseleave", () => hoverTl.reverse());
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);
  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-square max-w-3xl mx-auto mt-15 lg:mt-0 ${className}`}
    >
      {/* STUPA */}
      <div ref={stupaRef} className="absolute left-1/2 -translate-x-1/2 -top-15 w-[45%] opacity-0 pointer-events-auto ">

        <Image src="/images/spotted/stupa.png" alt="Boudhanath Stupa" width={500} height={600} className="w-full h-auto object-contain" />
      </div>

      {/* LEFT WINDOW */}
      <div ref={leftWinRef} className="absolute left-0 top-[35%] w-[42%] z-10 opacity-0 pointer-events-auto">
        <Image src="/images/spotted/left-win.png" alt="Traditional window left" width={500} height={500} className="w-full h-auto object-contain" />
      </div>

      {/* RIGHT WINDOW */}
      <div ref={rightWinRef} className="absolute right-0 top-[35%] w-[48%] z-10 opacity-0">
        <Image src="/images/spotted/right-win.png" alt="Traditional window right" width={500} height={500} className="w-full h-auto object-contain" />
      </div>

      {/* DOOR */}
      <div ref={doorRef} className="absolute left-1/2 -translate-x-1/2 top-[40%] w-[38%] z-30 opacity-0 pointer-events-auto">

        <Image src="/images/spotted/door.png" alt="Ornate temple door" width={400} height={600} className="w-full h-auto object-contain" />
      </div>

      {/* TOP STAR */}
      <div ref={topStarRef} className="absolute right-[18%] top-[4%] w-[10%] z-40 opacity-0 pointer-events-auto">
        <Image src="/images/spotted/top-star.svg" alt="" width={80} height={80} className="w-full h-auto" />
      </div>

      {/* LEFT STAR */}
      <div ref={leftStarRef} className="absolute left-[18%] top-[28%] w-[7%] opacity-0 pointer-events-auto">
        <Image src="/images/spotted/left-star.svg" alt="" width={60} height={60} className="w-full h-auto" />
      </div>

      {/* RIGHT STAR */}
      <div ref={rightStarRef} className="absolute right-[15%] top-[28%] w-[12%] opacity-0 pointer-events-auto">
        <Image src="/images/spotted/right-star.svg" alt="" width={60} height={60} className="w-full h-auto" />
      </div>
    </div>
  );
}