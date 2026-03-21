"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface BookingCTAProps {
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaIconSrc?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  topBorderSrc?: string;
  strokeColor?: string;
}

export default function BookingCTA({
  heading = "BOOKING & INQUIRES",
  subheading,
  ctaLabel = "Contact @ Sattya",
  ctaHref = "#",
  secondaryLabel,
  secondaryHref,
  strokeColor = "#ec512f",
}: BookingCTAProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const borderPath1Ref = useRef<SVGPathElement>(null);
  const borderPath2Ref = useRef<SVGPathElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const secondaryRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const path1 = borderPath1Ref.current;
    const path2 = borderPath2Ref.current;
    const h = headingRef.current;
    const sub = subheadingRef.current;
    const cta = ctaRef.current;
    const sec = secondaryRef.current;
    if (!section || !h) return;

    [path1, path2].forEach((path) => {
      if (!path) return;
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    });

    const contentEls = [h, sub, cta, sec].filter(Boolean) as HTMLElement[];
    gsap.set(contentEls, { opacity: 0, y: 28 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: "top 80%", once: true },
    });

    tl.to(
      [path1, path2].filter(Boolean),
      { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut", stagger: 0 },
      0,
    )
      .to(h, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.55")
      .to(sub ?? [], { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, "-=0.45")
      .to(
        [cta, sec].filter(Boolean),
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.12 },
        "-=0.35",
      );

    // CTA hover
    if (cta) {
      const inner = cta.querySelector<HTMLElement>(".cta-inner");
      const shadow = cta.querySelector<HTMLElement>(".cta-shadow");
      if (inner && shadow) {
        const hoverTl = gsap.timeline({ paused: true });
        hoverTl
          .to(inner, { x: -2, y: -2, duration: 0.22, ease: "power2.out" }, 0)
          .to(shadow, { opacity: 1, duration: 0.22, ease: "power2.out" }, 0);
        cta.addEventListener("mouseenter", () => hoverTl.play());
        cta.addEventListener("mouseleave", () => hoverTl.reverse());
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="z-100 py-16 px-6 lg:px-16 ">
      {/* Animated top border */}
      <div className="max-w-7xl mx-auto mb-12">
        <svg
          viewBox="0 0 800 12"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <path
            ref={borderPath1Ref}
            d="M0,6 C40,2 80,10 130,5 C180,0 220,9 280,6 C340,3 380,8 440,5 C500,2 540,9 600,6 C660,3 700,8 750,5 C780,3 800,6 800,6"
            stroke={strokeColor}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            ref={borderPath2Ref}
            d="M0,7 C60,4 100,9 160,6 C220,3 260,8 320,5 C380,2 430,8 490,5 C550,2 600,7 660,5 C720,3 760,7 800,6"
            stroke={strokeColor}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 text-center">
        <h2 ref={headingRef} className="h2-off text-black uppercase">
          {heading}
        </h2>

        {subheading && (
          <p ref={subheadingRef} className="p text-black/70 max-w-lg">
            {subheading}
          </p>
        )}

        <a
          ref={ctaRef}
          href={ctaHref}
          className="group relative inline-flex items-center justify-center"
        >
          <div className="cta-shadow absolute translate-y-1 translate-x-1 w-full h-full bg-black opacity-0 border border-black" />
          <div className="cta-inner relative bg-white border border-black px-4 py-1.5 text-sm font-bold text-black flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              viewBox="0 0 256 256"
              className="h-5 w-5 sm:h-6 sm:w-6"
            >
              <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z" />
            </svg>
            {ctaLabel}
          </div>
        </a>

        {secondaryLabel && secondaryHref && (
          <a
            ref={secondaryRef}
            href={secondaryHref}
            className="caption text-black/60 underline underline-offset-4 hover:text-black transition-colors"
          >
            {secondaryLabel} {"→"}
          </a>
        )
        }
      </div >
    </section >
  );
}