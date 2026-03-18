"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface StaybodySectionProps {
  image1Src?: string;
  image2Src?: string;
}

export default function StaybodySection({
  image1Src = "/images/stay/img1.png",
  image2Src = "/images/stay/img2.png",
}: StaybodySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const photo1WrapRef = useRef<HTMLDivElement>(null);
  const photo2WrapRef = useRef<HTMLDivElement>(null);
  const photo1Ref = useRef<HTMLDivElement>(null);
  const photo2Ref = useRef<HTMLDivElement>(null);
  const shadow1Ref = useRef<HTMLDivElement>(null);
  const shadow2Ref = useRef<HTMLDivElement>(null);
  const xPatternRef = useRef<HTMLDivElement>(null);

  /* ── Scroll animations ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading word split
      const headingEl = headingRef.current;
      if (headingEl) {
        const elems = headingEl.querySelectorAll(".anim-word");
        const split = new SplitText(elems, { type: "words" });
        gsap.set(split.words, { y: 50, opacity: 0 });
        gsap.to(split.words, {
          y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.08,
          scrollTrigger: { trigger: headingEl, start: "top 80%", once: true },
        });
      }

      // Left column blocks
      if (col1Ref.current) {
        gsap.fromTo(col1Ref.current.querySelectorAll(".anim-block"),
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.15,
            scrollTrigger: { trigger: col1Ref.current, start: "top 75%", once: true }
          }
        );
      }

      // Right column blocks
      if (col2Ref.current) {
        gsap.fromTo(col2Ref.current.querySelectorAll(".anim-block"),
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.15,
            scrollTrigger: { trigger: col2Ref.current, start: "top 75%", once: true }
          }
        );
      }

      // Photo 1 pop
      if (photo1Ref.current && shadow1Ref.current) {
        gsap.set(photo1Ref.current, { opacity: 0, y: 24 });
        gsap.set(shadow1Ref.current, { opacity: 0, x: 0, y: 0 });
        const tl = gsap.timeline({ scrollTrigger: { trigger: photo1WrapRef.current, start: "top 70%", once: true } });
        tl.to(photo1Ref.current, { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" })
          .to(shadow1Ref.current, { opacity: 1, x: 10, y: 8, duration: 0.6, ease: "power2.out" }, "-=0.3");
      }

      // Photo 2 pop
      if (photo2Ref.current && shadow2Ref.current) {
        gsap.set(photo2Ref.current, { opacity: 0, y: 24 });
        gsap.set(shadow2Ref.current, { opacity: 0, x: 0, y: 0 });
        const tl = gsap.timeline({ scrollTrigger: { trigger: photo2WrapRef.current, start: "top 70%", once: true } });
        tl.to(photo2Ref.current, { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" })
          .to(shadow2Ref.current, { opacity: 1, x: 10, y: 8, duration: 0.6, ease: "power2.out" }, "-=0.3");
      }

      // X pattern
      if (xPatternRef.current) {
        gsap.fromTo(xPatternRef.current.querySelectorAll("span"),
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)",
            stagger: { each: 0.03, from: "random" },
            scrollTrigger: { trigger: xPatternRef.current, start: "top 85%", once: true }
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  /* ── Photo hover lifts ── */
  useEffect(() => {
    const pairs = [
      { photo: photo1Ref.current, shadow: shadow1Ref.current, wrap: photo1WrapRef.current },
      { photo: photo2Ref.current, shadow: shadow2Ref.current, wrap: photo2WrapRef.current },
    ];
    const cleanups: (() => void)[] = [];
    pairs.forEach(({ photo, shadow, wrap }) => {
      if (!photo || !shadow || !wrap) return;
      const onEnter = () => {
        gsap.to(photo, { y: -4, scale: 1.01, duration: 0.4, ease: "power2.out" });
        gsap.to(shadow, { x: 16, y: 14, duration: 0.4, ease: "power2.out" });
      };
      const onLeave = () => {
        gsap.to(photo, { y: 0, scale: 1, duration: 0.5, ease: "power2.inOut" });
        gsap.to(shadow, { x: 10, y: 8, duration: 0.5, ease: "power2.inOut" });
      };
      wrap.addEventListener("mouseenter", onEnter);
      wrap.addEventListener("mouseleave", onLeave);
      cleanups.push(() => { wrap.removeEventListener("mouseenter", onEnter); wrap.removeEventListener("mouseleave", onLeave); });
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);


  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-4 sm:px-6 lg:px-8 "

    >
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── HEADING ── */}
        <div ref={headingRef} className="my-40 w-full flex flex-col items-center">
          <div>
            <h2 className="uppercase leading-none" style={{ fontFamily: "var(--font-display)" }}>

              {/* Line 1 — A PLACE */}
              <div
                className="text-[clamp(2.8rem,6vw,9.5rem)]  md:-translate-x-10 lg:-translate-x-15 xl:-translate-x-20 leading-10 md:leading-10 lg:leading-18 xl:leading-22"
                style={{ color: "#A7937A" }}
              >
                A PLACE
              </div>

              {/* Line 2 — TO LAND indented + at sattya inline */}
              <div
                className="flex items-baseline gap-4"
                style={{ marginLeft: "clamp(2rem,10vw,9rem)" }}
              >
                <span className="text-black text-[clamp(2.8rem,6vw,9.5rem)] leading-none">
                  TO LAND
                </span>
                <span
                  className="text-black lowercase text-[clamp(2.8rem,5vw,8rem)] leading-none"
                  style={{ fontFamily: "var(--font-scratchy)" }}
                >
                  at sattya
                </span>
              </div>

            </h2>
          </div>
        </div>

        {/* ── BODY ROW ── */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 flex-row-reverse lg:gap-20 items-center">

          {/* LEFT */}
          <div ref={col1Ref} className="flex flex-col gap-8">
            {/* Block 1 — left border */}
            <p
              className="anim-block p-bold text-black"
              style={{ borderLeft: `3px solid #A7937A`, paddingLeft: "1rem" }}
            >
              Staying at Sattya is about having a solid, comfortable base in
              Kathmandu while being close to an active creative community.
              You're not staying inside every activity, but you're close enough
              that connection is easy, whether that's a conversation over
              coffee, a film screening in the evening, or meeting someone new
              through the space.
            </p>

            {/* Block 2 — boxed with square decoration */}
            <div className="anim-block relative ml-4 mt-8">
              <div className="absolute -top-4 -left-4 w-8 h-8 z-10 bg-stay" />
              <div className="relative z-10 border-2 border-black bg-white p-6">
                <p className="p text-black">
                  These stays tend to attract artists, curious travelers, researchers,
                  filmmakers, journalists, entrepreneurs, and remote workers, people
                  who want more than just a place to sleep and who enjoy being
                  around others doing interesting work.
                </p>
              </div>
              <div className="absolute bottom-[-8px] right-[-8px] w-full h-full bg-black/80 z-0" />
            </div>
          </div>

          {/* RIGHT — photo with two offset shadows */}
          <div className="anim-block relative" style={{ paddingBottom: "24px", paddingRight: "24px" }}>
            {/* Shadow back layer */}
            <div
              className="absolute z-0 bg-stay-shadow"
              style={{
                width: "calc(100% - 8px)",
                height: "calc(100% - 8px)",
                top: 25,
                left: 25,
              }}
            />
            {/* Shadow front layer */}
            <div
              className="absolute z-[1] bg-stay"
              style={{
                width: "calc(100% - 16px)",
                height: "calc(100% - 16px)",
                top: "15px",
                left: "15px",
              }}
            />
            {/* Photo */}
            <div className="relative z-10 border-2 border-black">
              <Image
                src={image1Src}
                alt="Stay at Sattya"
                width={800}
                height={600}
                className="w-full h-auto object-cover  block"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        {/* ── BODY ROW 2 ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mt-60">
          <div className="anim-block relative pl-15 pb-10">

            {/* Vertical X column — left side, stops before bottom row */}
            <div
              ref={xPatternRef}
              className="absolute left-0 top-0 bottom-10 z-0 flex flex-col gap-6 justify-end  "
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="text-sm xl:text-lg font-black leading-none select-none text-stay"
                >
                  ✕
                </span>
              ))}
            </div>
            <div
              ref={xPatternRef}
              className="absolute left-6.5 top-0 bottom-10 z-0 flex flex-col gap-6 justify-end "
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="text-sm xl:text-lg font-black leading-none select-none text-stay"
                >
                  ✕
                </span>
              ))}
            </div>
            <div
              ref={xPatternRef}
              className="absolute left-13 top-0 bottom-10 z-0 flex flex-col gap-6 justify-end "
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="text-sm xl:text-lg font-black leading-none select-none text-stay"
                >
                  ✕
                </span>
              ))}
            </div>

            {/* Horizontal X row — bottom, full width */}
            <div className="absolute bottom-0 left-0 right-0 z-0 flex justify-start gap-3 ">
              {Array.from({ length: 8 }).map((_, i) => (
                <span
                  key={i}
                  className="text-sm xl:text-lg font-black leading-none select-none"
                  style={{ color: "#F5B800" }}
                >
                  ✕
                </span>
              ))}
            </div>

            {/* Photo — on top */}
            <div className="relative z-10 border-2 border-black">
              <Image
                src={image2Src}
                alt="Stay at Sattya"
                width={800}
                height={600}
                className="w-full h-auto object-cover  block"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

          </div>
          {/* LEFT */}
          <div ref={col2Ref} className="flex flex-col gap-8">
            {/* Block 1 — drop cap */}
            <p className="anim-block p text-black">
              <span className="float-left text-[clamp(3.001rem,2.744rem_+_1.372vw,3.859rem)] leading-[0.75] mr-2 mt-1 text-stay" style={{ fontFamily: "var(--font-display)" }}>
                A
              </span>
              ll of the spaces are well maintained, clean, and thoughtfully set up,
              with responsive management and a lived-in, welcoming feel. It's
              meant to feel like a home away from home, somewhere you can settle
              in, focus, and also step out into community when you want to.
            </p>

            {/* Block 2 — plain paragraph */}
            <p className="anim-block p text-black">
              Downstairs and nearby, Sattya offers a coworking space, a cafe for
              coffee and casual meetings, and a regular rhythm of events, from
              screenings and workshops to informal gatherings in the Art Cafe.
              There's usually something happening, but never an obligation to
              participate.
            </p>

            {/* Block 3 — filled box with dark shadow */}
            <div className="anim-block relative mt-4">
              <div className="absolute z-0 bg-black" style={{ bottom: "-8px", right: "-8px", width: "100%", height: "100%" }} />
              <div className="relative z-10 p-8 bg-stay">
                <p className="p-bold text-white">
                  For guests working on specific projects, there may also be
                  opportunities for support, such as introductions,
                  translation, or local connections. These are arranged by
                  inquiry and advance planning, depending on timing and
                  capacity.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — photo 2 with X pattern L-shape */}

        </div>

      </div>


    </section>
  );
}