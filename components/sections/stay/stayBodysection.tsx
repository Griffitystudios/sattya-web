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
  image1Src = "/images/stay/temple.png",
  image2Src = "/images/stay/people.png",
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
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.15,
            scrollTrigger: { trigger: col1Ref.current, start: "top 75%", once: true } }
        );
      }

      // Right column blocks
      if (col2Ref.current) {
        gsap.fromTo(col2Ref.current.querySelectorAll(".anim-block"),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.15,
            scrollTrigger: { trigger: col2Ref.current, start: "top 75%", once: true } }
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
          { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)",
            stagger: { each: 0.03, from: "random" },
            scrollTrigger: { trigger: xPatternRef.current, start: "top 85%", once: true } }
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
      className="relative bg-white overflow-hidden"
      style={{ padding: "60px 48px 80px" }}
    >
      {/* Grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat", backgroundSize: "128px" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* ── HEADING ── */}
        <div ref={headingRef} className="mb-10 w-fit">
          <h2 className="anim-word h1 text-[#A7937A] uppercase leading-none">
            A Place{" "}
            <br />
            <span className="relative left-20 text-black">
              To Land
              <span className="h1-alt text-black  lowercase ">
                at sattya
              </span>
            </span>
          </h2>
        </div>

        {/* ── BODY: LEFT + RIGHT ── */}
        <div className="grid gap-8" style={{ gridTemplateColumns: "1fr 1fr" }}>

          {/* ── LEFT COLUMN ── */}
          <div ref={col1Ref} className="flex flex-col gap-5">

            {/* Box 1 — thin border, white bg */}
            <div className="anim-block" style={{ border: "1px solid #aaa", padding: "18px 20px" }}>
              <p style={{ fontSize: "0.88rem", lineHeight: 1.65, color: "#222", margin: 0 }}>
                Staying at Sattya is about having a solid, comfortable base in Kathmandu
                while being close to an active creative community. You're not staying inside
                every activity, but you're close enough that connection is easy, whether
                that's a conversation over coffee, a film screening in the evening, or
                meeting someone new through the space.
              </p>
            </div>

            {/* Box 2 — dashed border, white bg, with small tan square accent */}
            <div className="anim-block relative" style={{ border: "1px dashed #aaa", padding: "18px 20px" }}>
              {/* tan square top-left accent */}
              <div style={{ position: "absolute", top: -6, left: -6, width: 14, height: 14, background: "#C8A45A" }} />
              <p style={{ fontSize: "0.85rem", lineHeight: 1.65, color: "#333", margin: 0 }}>
                These stays tend to attract artists, curious travelers, researchers,
                filmmakers, journalists, entrepreneurs, and remote workers, people who
                want more than just a place to sleep and who enjoy being around others
                doing interesting work.
              </p>
            </div>

            {/* Gap / spacer to push next content down, matching Figma */}
            <div style={{ height: "40px" }} />

            {/* Drop-cap paragraph */}
            <div className="anim-block">
              <p style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "#222", margin: 0 }}>
                <span style={{ float: "left", fontFamily: "'Georgia', serif", fontSize: "3.2em", lineHeight: 0.75, marginRight: "6px", marginTop: "4px", fontWeight: 400, color: "#1a1a1a" }}>A</span>
                ll of the spaces are well maintained, clean, and thoughtfully set up,
                with responsive management and a lived-in, welcoming feel. It's meant to
                feel like a home away from home, somewhere you can settle in, focus, and
                also step out into community when you want to.
              </p>
            </div>

            {/* Plain paragraph */}
            <div className="anim-block">
              <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "#333", margin: 0 }}>
                Downstairs and nearby, Sattya offers a coworking space, a cafe for coffee
                and casual meetings, and a regular rhythm of events, from screenings and
                workshops to informal gatherings in the Art Cafe. There's usually something
                happening, but never an obligation to participate.
              </p>
            </div>

            {/* Tan highlight box */}
            <div className="anim-block" style={{ background: "#D4A96A4D", border: "1px solid #C8A45A80", padding: "18px 20px" }}>
              <p style={{ fontSize: "0.82rem", lineHeight: 1.65, color: "#333", margin: 0 }}>
                For guests working on specific projects, there may also be opportunities
                for support, such as introductions, translation, or local connections.
                These are arranged by inquiry and advance planning, depending on timing
                and capacity.
              </p>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div ref={col2Ref} className="flex flex-col gap-5">

            {/* Photo 1 — top, full width, taller */}
            <div ref={photo1WrapRef} className="anim-block relative cursor-pointer" style={{ width: "100%" }}>
              <div ref={shadow1Ref} className="absolute" style={{ inset: 0, background: "#C8B48A" }} />
              <div ref={photo1Ref} className="relative" style={{ zIndex: 10, border: "2px solid #1a1a1a", background: "#fff", padding: "4px", aspectRatio: "4/3" }}>
                <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
                  <Image
                    src={image1Src}
                    alt="Sattya exterior view"
                    fill
                    className="object-cover grayscale transition-all duration-700 hover:grayscale-0 hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* X pattern + Photo 2 side-by-side row */}
            <div className="anim-block flex items-start gap-4">

              {/* X grid — left of photo 2 */}
              <div ref={xPatternRef} style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px", paddingTop: "8px", flexShrink: 0 }}>
                {Array.from({ length: 20 }).map((_, i) => (
                  <span key={i} style={{ color: "#A7937A", fontSize: "0.85rem", fontWeight: 700, lineHeight: 1, userSelect: "none" }}>✕</span>
                ))}
              </div>

              {/* Photo 2 */}
              <div ref={photo2WrapRef} className="relative cursor-pointer" style={{ flex: 1 }}>
                <div ref={shadow2Ref} className="absolute" style={{ inset: 0, background: "#C8B48A" }} />
                <div ref={photo2Ref} className="relative" style={{ zIndex: 10, border: "2px solid #1a1a1a", background: "#fff", padding: "4px", aspectRatio: "4/3" }}>
                  <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
                    <Image
                      src={image2Src}
                      alt="Community gathering at Sattya"
                      fill
                      className="object-cover grayscale transition-all duration-700 hover:grayscale-0 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* X pattern row below photo 2 (the long horizontal row in Figma) */}
            <div className="anim-block" style={{ paddingLeft: "calc(2 * 14px + 2 * 8px + 4px)" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                {Array.from({ length: 9 }).map((_, i) => (
                  <span key={i} style={{ color: "#A7937A", fontSize: "0.85rem", fontWeight: 700, lineHeight: 1, userSelect: "none" }}>✕</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}