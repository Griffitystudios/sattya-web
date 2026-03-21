// components/ui/SessionsAccordion.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export interface AccordionItem {
  label: string;
  content?: {
    format?: string;
    body?: string;
    note?: string;
    noteHref?: string;
  };
}

export interface SessionsAccordionProps {
  heroLine1: string;
  heroLine2: string;
  subtext?: string;
  footnote?: string;
  starSrc?: string;
  items: AccordionItem[];
  accentColor?: string;
  accentBg?: string;
}

export default function SessionsAccordion({
  heroLine1,
  heroLine2,
  subtext,
  footnote,
  starSrc,
  items,
  accentColor,
  accentBg,
}: SessionsAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  const heroLine2BgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const heroLine1Ref = useRef<HTMLHeadingElement>(null);
  const heroLine2Ref = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const footnoteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const line1 = heroLine1Ref.current;
    const line2 = heroLine2Ref.current;
    const sub = subtextRef.current;
    const accordion = accordionRef.current;
    const foot = footnoteRef.current;
    if (!section || !line1 || !line2 || !accordion) return;

    const rows = accordion.querySelectorAll<HTMLElement>(".accordion-row");

    // Initial states
    gsap.set([line1, line2], { opacity: 0, y: 40 });
    if (sub) gsap.set(sub, { opacity: 0, y: 20 });
    gsap.set(rows, { opacity: 0, y: 28 });
    if (foot) gsap.set(foot, { opacity: 0, y: 16 });
    if (heroLine2BgRef.current)
      gsap.set(heroLine2BgRef.current, { scaleX: 0, transformOrigin: "left" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 65%",
        once: true,
      },
    });

    tl.to(line1, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
      .to(
        line2,
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        "-=0.45",
      )
      .to(
        heroLine2BgRef.current,
        { scaleX: 1, duration: 0.3, ease: "power3.out" },
        "<", // starts at same time as line2
      )
      .to(
        line2,
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        "-=0.45",
      )

      .to(
        sub ?? [],
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        "-=0.3",
      )
      .to(
        rows,
        { opacity: 1, y: 0, duration: 0.35, ease: "power3.out", stagger: 0.3 },
        "-=0.35",
      )
      .to(
        foot ?? [],
        { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" },
        "-=0.2",
      );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 px-6 lg:px-16"
    >
      <div className="z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* ── LEFT: Hero heading ── */}
        <div className="flex relative flex-col mx-auto gap-3 lg:sticky lg:top-36">
          {starSrc && (
            <div className="absolute -z-10 -translate-x-48 -top-10 lg:translate-0 lg:-top-8 left-20 lg:-left-36 w-40 h-40 sm:w-64 sm:h-64 pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={starSrc}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
          )}

          <h1 ref={heroLine1Ref} className={`hero-xl uppercase `}>
            {heroLine1}
          </h1>

          <div ref={heroLine2Ref} className="relative w-fit">
            {/* Expanding background */}
            <div
              ref={heroLine2BgRef}
              className={`absolute -top-2 inset-0 ${accentBg} py-2 `} // add vertical padding
              style={{ transformOrigin: "left" }}
            />
            {/* Text sits on top */}
            <span className="relative   hero-lg uppercase text-white px-3 py-1">
              {heroLine2}
            </span>
          </div>

          {subtext && (
            <p ref={subtextRef} className="p text-black/60">
              {subtext}
            </p>
          )}
        </div>

        {/* ── RIGHT: Accordion ── */}
        <div ref={accordionRef} className="flex flex-col lg:mt-0">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const hasContent = !!item.content;

            return (
              <div
                key={index}
                className="accordion-row border-b-4 border-dashed border-black/20 last:border-b-0"
              >
                <button
                  onClick={() => hasContent && toggle(index)}
                  className={`w-full flex items-center justify-between py-8 text-left ${hasContent ? "cursor-pointer" : "cursor-default"
                    }`}
                  aria-expanded={isOpen}
                >
                  <h2 className={`h2-off uppercase ${accentColor}`}>
                    {item.label}
                  </h2>
                  {hasContent && (
                    <span className="text-black h1 ml-4 shrink-0 transition-transform duration-300">
                      {isOpen ? "-" : "+"}
                    </span>
                  )}
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"
                    }`}
                >
                  {item.content && (
                    <div className="flex flex-col gap-3 pr-8">
                      {item.content.format && (
                        <p className="p">
                          <span className="p-bold">
                            {item.content.format.split(":")[0]}:
                          </span>
                          {item.content.format.slice(
                            item.content.format.indexOf(":") + 1,
                          )}
                        </p>
                      )}
                      {item.content.body && (
                        <p className="p text-black/70">{item.content.body}</p>
                      )}
                      {item.content.note && (
                        item.content.noteHref ? (
                          <Link href={item.content.noteHref} className="caption text-black/50 italic hover:text-black/80 hover:underline transition-colors w-fit">
                            {item.content.note}
                          </Link>
                        ) : (
                          <p className="caption text-black/50 italic">
                            {item.content.note}
                          </p>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {footnote && (
        <p
          ref={footnoteRef}
          className="relative z-10 caption text-black/40 text-center mt-16"
        >
          {footnote}
        </p>
      )}
    </section>
  );
}
