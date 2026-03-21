"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ArtcafeSectionProps {
  heading?: string;
  subheading?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  color?: string;
}

export default function ArtcafeSection({
  subheading = "at Sattya for making",
  description = "The Art Cafe is a drop-in space with tables, materials, and a small menu. Grab something and settle in for a bit.",
  imageSrc = "/images/artcafe/tree.png",
  imageAlt = "Decorative tree illustration",
  color = "rgba(233, 175, 172, 1)",
}: ArtcafeSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subheadingRef = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const treeRef = useRef<HTMLDivElement>(null);
  const treePinkRef = useRef<HTMLImageElement>(null);
  const treeMainRef = useRef<HTMLImageElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(headingRef.current, { opacity: 0, x: -40 });
      gsap.set(subheadingRef.current, { opacity: 0, y: 16 });
      gsap.set(descriptionRef.current, { opacity: 0, x: -24 });
      gsap.set(borderRef.current, { scaleY: 0, transformOrigin: "top" });
      gsap.set(treeMainRef.current, { opacity: 0, x: 60, scale: 0.95 });
      gsap.set(treePinkRef.current, { opacity: 0, x: 80, scale: 0.92 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      // Tree pink shadow slides in first (behind)
      tl.to(treePinkRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
      })
        // Main tree slides in slightly after
        .to(treeMainRef.current, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        }, "-=0.7")
        // Heading slides in from left
        .to(headingRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
        }, "-=0.6")
        // Subheading fades up
        .to(subheadingRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        }, "-=0.4")
        // Border scales down
        .to(borderRef.current, {
          scaleY: 1,
          duration: 0.5,
          ease: "power2.out",
        }, "-=0.3")
        // Description fades in
        .to(descriptionRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.3");

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-125 sm:h-200 overflow-hidden"
    >
      <div className="relative mx-auto h-full max-w-7xl">

        {/* Tree */}
        <div
          ref={treeRef}
          className="absolute inset-y-0 -right-54 xs:-right-45 sm:-right-38 md:-right-25 lg:right-0 overflow-hidden pointer-events-none"
        >
          <div className="relative w-full h-full">
            <Image
              ref={treePinkRef}
              src="/images/artcafe/tree-pink.svg"
              width={500}
              height={900}
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-left"
            />
            <Image
              ref={treeMainRef}
              src={imageSrc}
              alt={imageAlt}
              width={800}
              height={1000}
              className="relative w-full h-full object-cover object-left"
            />
          </div>
        </div>

        {/* Text */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
          <div className="flex flex-col gap-2 items-start mt-40 xs:mt-60 sm:mt-70">
            <div ref={headingRef} className="w-fit">
              <h1
                className="font-display text-[clamp(1.95rem,6vw,3.5rem)] uppercase mb-1 leading-tight"
                style={{ color }}
              >
                Ground-Floor{" "}
                <span className="relative inline-block">
                  space
                  <span
                    ref={subheadingRef}
                    className="h1-alt text-black absolute lowercase -bottom-2 sm:-bottom-1 -left-14 whitespace-nowrap"
                  >
                    {subheading}
                  </span>
                </span>
              </h1>
            </div>
          </div>

          <div
            ref={borderRef}
            style={{
              borderLeft: `3px solid ${color}`,
              paddingLeft: "0.75rem",
              marginTop: "2rem",
              width: "fit-content",
            }}
          >
            <p ref={descriptionRef} className="p-bold w-4/5 md:w-2/3">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}