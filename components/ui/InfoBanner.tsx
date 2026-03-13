"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FooterLink {
  label: string;
  href: string;
}

export interface InfoItem {
  icon: string;
  label: string;
  heading?: string;
  body: string;
  caption?: string;
  footer?: FooterLink;
}

export interface InfoBannerProps {
  items?: InfoItem[];
  bgColor?: string;
  textColor?: string;
}

function InfoCard({ item, index }: { item: InfoItem; index: number }) {
  const borderClasses = [
    index === 0 &&
      "sm:row-span-2 lg:row-span-1 sm:border-r lg:border-r-0 lg:border-l-0 border-white/20",
    index === 1 &&
      "border-t sm:col-start-2 lg:col-start-auto sm:border-0 border-white/20",
    index === 2 &&
      "border-t sm:col-start-2 lg:col-start-auto sm:border-0 border-white/20",
    "lg:first:pl-0 lg:last:pr-0",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={[
        "info-card",
        "flex flex-col gap-3 px-3 lg:px-10 py-8 sm:py-6 lg:py-0",
        "relative overflow-hidden cursor-default select-none",
        borderClasses,
      ].join(" ")}
    >
      {/* Content */}
      <div className="flex flex-col gap-3 relative z-10">
        {/* Label row */}
        <div className="flex items-center gap-2">
          <Image
            src={item.icon}
            alt=""
            width={18}
            height={18}
            className="opacity-90"
          />
          <span className="h3 uppercase tracking-wider">{item.label}</span>
        </div>

        {/* Heading */}
        {item.heading && (
          <h3 className="h2 text-white whitespace-pre-line">{item.heading}</h3>
        )}

        {/* Body */}
        <div>
          <p className="p whitespace-pre-line leading-relaxed">{item.body}</p>
          {item.caption && (
            <p className="caption mt-1 whitespace-pre-line opacity-70">
              {item.caption}
            </p>
          )}
        </div>

        {/* Footer link */}
        {item.footer && (
          <a
            href={item.footer.href}
            target="_blank"
            rel="noopener noreferrer"
            className="caption text-white underline-offset-2 hover:underline flex items-center gap-1 mt-1 w-fit"
          >
            <span>[{item.footer.label}]</span>
            <span>↗</span>
          </a>
        )}
      </div>
    </div>
  );
}

export default function InfoBanner({
  items = [],
  bgColor = "bg-makerspace",
  textColor = "text-white",
}: InfoBannerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const topLine = topLineRef.current;
    const bottomLine = bottomLineRef.current;
    const grid = gridRef.current;
    if (!section || !topLine || !bottomLine || !grid) return;

    const cards = grid.querySelectorAll<HTMLElement>(".info-card");

    // Set initial states
    gsap.set([topLine, bottomLine], { scaleX: 0 });
    gsap.set(cards, { opacity: 0, y: 36 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 78%",
        once: true,
      },
    });

    tl.to(topLine, {
      scaleX: 1,
      duration: 1,
      ease: "expo.out",
    })
      .to(
        bottomLine,
        {
          scaleX: 1,
          duration: 1,
          ease: "expo.out",
        },
        "<",
      )
      .to(
        cards,
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.14,
        },
        "-=0.6",
      );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${bgColor} ${textColor} px-3 md:px-6 lg:px-16 py-18 relative overflow-hidden`}
    >
      <div
        ref={topLineRef}
        className="absolute top-0 left-0 w-full h-px bg-white/25"
        style={{ transformOrigin: "left center" }}
      />
      <div
        ref={bottomLineRef}
        className="absolute bottom-0 right-0 w-full h-px bg-white/25"
        style={{ transformOrigin: "right center" }}
      />

      <div
        ref={gridRef}
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((item, index) => (
          <InfoCard key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
