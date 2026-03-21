"use client";

import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
interface FloatingItem {
  icon: string;
  alt: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}

export interface StaySectionProps {
  floatingItems?: FloatingItem[];
  bgColor?: string;
  caption?: string;
  heading?: string;
  boldImages?: Record<string, string>;
  boldLinks?: Record<string, string>;
}

const positionClasses = {
  "top-left": "top-0 left-0",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "bottom-right": "bottom-0 right-0",
};

export default function StaySection({
  floatingItems = [
    { icon: "/images/stay/leaves.svg", alt: "Leaves", position: "top-left", className: "w-24 sm:w-32 md:w-40 lg:w-52 opacity-60" },
    { icon: "/images/stay/fruits.svg", alt: "Fruits", position: "top-right", className: "w-24 sm:w-32 md:w-40 lg:w-52 opacity-40" },
    { icon: "/images/stay/plant.svg", alt: "Plant", position: "bottom-left", className: "w-16 sm:w-22 md:w-28 lg:w-36 opacity-60" },
    { icon: "/images/stay/flower.svg", alt: "Flower", position: "bottom-right", className: "w-24 sm:w-32 md:w-40 lg:w-52 opacity-40" },
  ],
  bgColor = "bg-stay",
  caption = "A PLACE TO LAND, A SPACE TO BREATHE",
  heading = `Find home in the warmth of **Marigold**,\nthe peace of **Tulsi**, or the hope of **Aasha**,\nenjoy the flow of ideas in our collective residence,\nand let our history become a part of yours.`,
  boldImages = {
    Marigold: "/images/stay/img4.png",
    Tulsi: "/images/stay/img5.png",
    Aasha: "/images/stay/img7.png",
  },
  boldLinks = {
    Marigold: "/stay/large-room",
    Tulsi: "/stay/mid-size-room",
    Aasha: "/stay/small-room",
  },
}: StaySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [imagePos, setImagePos] = useState({ x: 0, y: 0 });
  const isTouchDevice = useRef(false);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLParagraphElement>(null);
  const floatingRefs = useRef<(HTMLDivElement | null)[]>([]);


  const showImage = useCallback((word: string, el: HTMLElement) => {
    const img = boldImages[word];
    if (!img) return;

    if (hideTimeout.current) clearTimeout(hideTimeout.current);

    const rect = el.getBoundingClientRect();
    const sectionRect = sectionRef.current?.getBoundingClientRect();
    if (!sectionRect) return;

    const x = rect.left - sectionRect.left + rect.width / 2;
    const y = rect.top - sectionRect.top + rect.height / 2;

    setActiveWord(word);
    setActiveImage(img);
    setImagePos({ x, y });

    setTimeout(() => {
      if (!imageRef.current) return;
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.92, y: 8 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }, 10);


    // Animate underline
    const underline = el.querySelector(".underline-bar") as HTMLElement;
    if (underline) {
      gsap.fromTo(
        underline,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [boldImages]);

  const hideImage = useCallback((el?: HTMLElement) => {
    if (!imageRef.current) {
      setActiveWord(null);
      setActiveImage(null);
      return;
    }

    // Animate underline out
    if (el) {
      const underline = el.querySelector(".underline-bar") as HTMLElement;
      if (underline) {
        gsap.to(underline, {
          scaleX: 0,
          transformOrigin: "right",
          duration: 0.5,
          ease: "power2.in",
        });
      }
    }

    gsap.to(imageRef.current, {
      opacity: 0,
      scale: 0.92,
      y: 8,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setActiveWord(null);
        setActiveImage(null);
      },
    });
  }, []);

  const renderHeading = (text: string) => {
    return text.split("\n").map((line, lineIdx) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <span key={lineIdx} className="block">
          {parts.map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              const word = part.slice(2, -2);
              const hasImage = !!boldImages[word];
              const isActive = activeWord === word;
              const isOtherActive = activeWord !== null && activeWord !== word;
              const link = boldLinks?.[word];
              return (
                <strong
                  key={i}
                  className="relative inline-block font-bold cursor-pointer"
                  style={{
                    color: isOtherActive ? "rgba(255,255,255,0.4)" : "white",
                    transition: "color 0.5s ease",
                    zIndex: isActive ? 20 : isOtherActive ? 1 : "auto",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    if (!isTouchDevice.current && hasImage)
                      showImage(word, e.currentTarget);
                  }}
                  onMouseLeave={(e) => {
                    if (!isTouchDevice.current)
                      hideImage(e.currentTarget);
                  }}
                  onTouchStart={(e) => {
                    isTouchDevice.current = true;
                    if (hasImage) showImage(word, e.currentTarget);
                    if (hideTimeout.current) clearTimeout(hideTimeout.current);
                    hideTimeout.current = setTimeout(() => hideImage(e.currentTarget), 1500);
                  }}
                >
                  {link ? (
                    <Link href={link} className="hover:opacity-80 transition-opacity">
                      {word}
                    </Link>
                  ) : (
                    word
                  )}
                  {hasImage && (
                    <span
                      className="underline-bar absolute bottom-0 left-0 right-0 h-[2px] bg-white block"
                      style={{ transform: "scaleX(0)", transformOrigin: "left" }}
                    />
                  )}
                </strong>
              );
            }

            // Normal text — fades when a word is active
            return (
              <span
                key={i}
                style={{
                  color: activeWord !== null ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,1)",
                  transition: "color 0.5s ease",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {part}
              </span>
            );
          })}
        </span>
      );
    });
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Floating corner items drift in from their corners
      floatingRefs.current.forEach((el, i) => {
        if (!el) return;
        const positions = [
          { x: -40, y: -40 }, // top-left
          { x: 40, y: -40 },  // top-right
          { x: -40, y: 40 },  // bottom-left
          { x: 40, y: 40 },   // bottom-right
        ];
        gsap.fromTo(
          el,
          { opacity: 0, x: positions[i]?.x ?? 0, y: positions[i]?.y ?? 0 },
          {
            opacity: el.dataset.opacity ? parseFloat(el.dataset.opacity) : 1,
            x: 0,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: section, start: "top 40%", once: true },
          }
        );
      });

      // Caption fades up
      gsap.fromTo(
        captionRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 60%", once: true },
          delay: 0.3,
        }
      );

      // Heading lines stagger up
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 60%", once: true },
          delay: 0.5,
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${bgColor} h-screen max-h-300 relative overflow-hidden flex items-center justify-center`}
    >
      {/* Decorative corner items */}
      {floatingItems.map((item, index) => (
        <div
          key={index}
          ref={(el) => { floatingRefs.current[index] = el; }}
          data-opacity={item.className?.includes("opacity-40") ? "0.4" : "0.6"}
          className={`absolute pointer-events-none ${positionClasses[item.position]} ${item.className ?? "w-24 opacity-50"}`}
          style={{ opacity: 0 }} // hidden until GSAP animates in
        >
          <Image src={item.icon} alt={item.alt} width={200} height={200} className="w-full h-auto object-contain" />
        </div>
      ))}

      {/* Hover image — sits behind text at word position */}
      {activeImage && (
        <div
          ref={imageRef}
          className="absolute z-[5] pointer-events-none"
          style={{
            left: `${imagePos.x}px`,
            top: `${imagePos.y}px`,
            transform: "translate(-20%, -50%)",
            opacity: 0, // ← hidden on mount, GSAP animates it in
          }}
        >
          <div className="relative w-64 sm:w-80 min-h-30 md:min-h-40 lg:w-110 lg:min-h-64 overflow-hidden shadow-2xl ">
            <Image
              src={activeImage}
              alt="Room preview"
              fill
              className="object-cover"
              sizes="400px"
            />
          </div>
        </div>
      )}
      {/* Center content — z-10 so text is above image */}
      <div className="relative  flex flex-col items-center text-center px-6 sm:px-12 lg:px-24 py-20 mx-auto">
        {/* Caption */}
        <p
          ref={captionRef}
          className="font-light mb-4 sm:mb-6 uppercase tracking-[0.2em] text-[clamp(0.6rem,1vw,0.75rem)]"
          style={{
            color: activeWord !== null ? "rgba(255,255,255,0.4" : "rgba(255,255,255,1)",
            transition: "color 0.5s ease",
            opacity: 0, // hidden until GSAP animates in
          }}
        >
          {caption}
        </p>

        {/* Heading */}
        <p
          ref={headingRef}
          className="font-extralight text-[clamp(1.8rem,4vw,4.5rem)] leading-tight"
          style={{ fontFamily: "var(--font-body)", opacity: 0 }}
        >
          {renderHeading(heading)}
        </p>
      </div>
    </section>
  );
}