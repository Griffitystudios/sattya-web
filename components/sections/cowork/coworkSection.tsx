"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface MakerspaceSectionProps {
  imageSrc?: string;
  imageAlt?: string;
  starSrc?: string;
  quoteSrc?: string;
}

export default function CoWorkSection({
  imageSrc = "/images/cowork/para-image.svg",
  imageAlt = "Hands working on a woodworking project",
  starSrc = "/images/star.png",
  quoteSrc = "/images/quote.svg",
}: MakerspaceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Left column refs
  const headingRef = useRef<HTMLDivElement>(null);
  const togetherRef = useRef<HTMLSpanElement>(null);
  const para1Ref = useRef<HTMLParagraphElement>(null);
  const para2Ref = useRef<HTMLParagraphElement>(null);
  const dashRowRef = useRef<HTMLDivElement>(null);

  // Right column refs
  const starRef = useRef<HTMLDivElement>(null);
  const photoWrapRef = useRef<HTMLDivElement>(null);
  const orangeShadowRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const quotesRef = useRef<HTMLDivElement>(null);

  /* ─────────────────────────────────────
     Scroll animations
  ───────────────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // ── Heading words slide up
      const headingEl = headingRef.current;
      if (headingEl) {
        const split = new SplitText(
          headingEl.querySelectorAll(".h1, .h1-alt"),
          { type: "words" },
        );

        gsap.set(split.words, { y: 40, opacity: 0 });

        gsap.to(split.words, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.6 / split.words.length,
          scrollTrigger: {
            trigger: headingEl,
            start: "top 79%",
            once: true,
          },
        });
      }

      // ── "together"
      const together = togetherRef.current;
      if (together) {
        gsap.fromTo(
          together,
          { x: 20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: 0.5,
            scrollTrigger: {
              trigger: together,
              start: "top 76%",
              once: true,
            },
          },
        );
      }

      // ── Paragraphs
      [para1Ref.current, para2Ref.current].forEach((p, i) => {
        if (!p) return;
        gsap.fromTo(
          p,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            delay: i * 0.12,
            scrollTrigger: {
              trigger: p,
              start: "top 70%",
              once: true,
            },
          },
        );
      });

      // ── Dash row
      const dashes = dashRowRef.current?.querySelectorAll("span");
      if (dashes) {
        gsap.fromTo(
          dashes,
          { scaleX: 0, opacity: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: dashRowRef.current,
              start: "top 60%",
              once: true,
            },
          },
        );
      }

      // ── Star fade-in (rotation removed)
      const star = starRef.current;
      if (star) {
        gsap.fromTo(
          star,
          { opacity: 0, rotate: -15, scale: 0.9 },
          {
            opacity: 1,
            rotate: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: star,
              start: "top 25%",
              once: true,
            },
          },
        );
      }

      // ── Photo pop
      const photo = photoRef.current;
      const orangeShadow = orangeShadowRef.current;

      if (photo && orangeShadow) {
        gsap.set(photo, { opacity: 0, y: 24 });
        gsap.set(orangeShadow, { opacity: 0, x: 0, y: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: photoWrapRef.current,
            start: "top 60%",
            once: true,
          },
        });

        tl.to(photo, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
        }).to(
          orangeShadow,
          {
            opacity: 1,
            x: 15,
            y: 12,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3",
        );
      }

      // ── Quotes
      const quotes = quotesRef.current;
      if (quotes) {
        const imgs = quotes.querySelectorAll("img");
        gsap.fromTo(
          imgs,
          { y: -12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.5)",
            stagger: 0.1,
            scrollTrigger: {
              trigger: photoWrapRef.current,
              start: "top 50%",
              once: true,
            },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  /* ─────────────────────────────────────
     ALWAYS-ON PARALLAX (mouse move anywhere)
  ───────────────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current;
    const star = starRef.current;
    const photo = photoRef.current;
    const quote = quotesRef.current;
    if (!section || !star || !photo) return;

    const moveStrength = 30; // stronger global movement

    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * moveStrength;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * moveStrength;

      // Soft photo parallax
      gsap.to(photo, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.5,
        ease: "power3.out",
      });
      // Soft photo parallax
      gsap.to(quote, {
        x: x * -0.8,
        y: y * 0.9,
        duration: 0.5,
        ease: "power3.out",
      });

      // Stronger star parallax (depth)
      gsap.to(star, {
        x: -x * 1.2,
        y: -y * 1.2,
        rotationY: x * 1.5, // tilt horizontally
        rotationX: y * 1, // tilt vertically
        z: -50, // push slightly into 3D space
        transformPerspective: 800, // gives depth
        duration: 0.7,
        ease: "power3.out",
      });
    };

    section.addEventListener("mousemove", handleMove);

    return () => {
      section.removeEventListener("mousemove", handleMove);
    };
  }, []);

  /* ─────────────────────────────────────
     Photo hover lift (kept from your code)
  ───────────────────────────────────── */
  useEffect(() => {
    const photo = photoRef.current;
    if (!photo) return;

    const onEnter = () =>
      gsap.to(photo, {
        y: -4,
        scale: 1.01,
        duration: 0.4,
        ease: "power2.out",
      });

    const onLeave = () =>
      gsap.to(photo, {
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.inOut",
      });

    photo.addEventListener("mouseenter", onEnter);
    photo.addEventListener("mouseleave", onLeave);

    return () => {
      photo.removeEventListener("mouseenter", onEnter);
      photo.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* ─────────────────────────────────────
     Orange shadow hover animation
  ───────────────────────────────────── */
  useEffect(() => {
    const wrap = photoWrapRef.current;
    const shadow = orangeShadowRef.current;
    if (!wrap || !shadow) return;

    const onEnter = () =>
      gsap.to(shadow, { x: 22, y: 18, duration: 0.4, ease: "power2.out" });

    const onLeave = () =>
      gsap.to(shadow, { x: 15, y: 12, duration: 0.5, ease: "power2.inOut" });

    wrap.addEventListener("mouseenter", onEnter);
    wrap.addEventListener("mouseleave", onLeave);

    return () => {
      wrap.removeEventListener("mouseenter", onEnter);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 lg:py-48 px-3 sm:px-6 lg:px-16"
    >
      {/* Noise/Grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' 
            xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence 
            type='fractalNoise' baseFrequency='0.9' numOctaves='4' 
            stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' 
            height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* LEFT TEXT */}
        <div className="flex flex-col gap-2 items-start">
          <div className="w-fit" ref={headingRef}>
            <h2 className="h1 text-cowork uppercase leading-none">
              <span className="relative inline-block">
                WORKSHOP{" "}
                <span
                  ref={togetherRef}
                  className="h1-alt text-black absolute lowercase -bottom-5 lg:-bottom-4 lg:-right-40 whitespace-nowrap"
                >
                  for getting things done.
                </span>
              </span>
            </h2>
          </div>

          <div className="mt-10" />

          <div className="flex flex-col gap-4 lg:max-w-lg">
            <p ref={para1Ref} className="p-bold text-black/80">
              Desks, call booths, a private office, and meeting rooms.
            </p>
            <p ref={para2Ref} className="p-bold text-black/80">
              Drop in to work for few hours, or stay most of the day.
            </p>
          </div>

          <div ref={dashRowRef} className="flex gap-6 mt-8">
            {[0, 1, 2].map((i) => (
              <span key={i} className="block w-4 h-px bg-black/20" />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative mt-20 lg:mt-0 flex items-center justify-center">
          {/* STAR */}
          <div
            ref={starRef}
            className="absolute pointer-events-none -top-28 lg:-top-20 lg:-left-24 xl:-left-48 w-full h-full sm:w-[120%] sm:h-[120%]"
          >
            <Image src={starSrc} alt="" fill className="object-contain" />
          </div>

          {/* PHOTO */}
          <div
            ref={photoWrapRef}
            className="relative z-10 w-80 sm:w-full max-w-120 cursor-pointer"
          >
            <div
              ref={orangeShadowRef}
              className="absolute bg-cowork"
              style={{ inset: 0 }}
            />

            <div
              ref={photoRef}
              className="relative p-1 z-10 aspect-4/3 border-3 bg-white border-black"
            >
              <div className="w-full h-full relative overflow-hidden">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover grayscale transition-transform duration-700 ease-out hover:scale-105 hover:grayscale-0"
                />
              </div>
            </div>

            <div
              ref={quotesRef}
              className="absolute flex gap-1 z-20 -top-8 right-0 p-1"
            >
              <Image src={quoteSrc} alt="" width={40} height={30} />
              <Image src={quoteSrc} alt="" width={40} height={30} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
