// components/ui/InfoSection.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scribble from "./scribble";
import Exclamation from "./!";

gsap.registerPlugin(ScrollTrigger);

export interface InfoSectionProps {
  openingHoursLabel?: string;
  days?: string;
  openTime?: string;
  closeTime?: string;
  hoursNote?: string;
  spaceAccessLabel?: string;
  spaceAccessHeading?: string;
  spaceAccessNote?: string;
  locationLabel?: string;
  locationName?: string;
  locationAddress?: string;
  mapLabel?: string;
  mapHref?: string;
  heroHeading?: string;
  themeColor?: string;
}

export default function InfoSection({
  openingHoursLabel = "Opening Hours",
  days = "Wednesday – Sunday",
  openTime = "10:00",
  closeTime = "05:00",
  hoursNote = "* Note: Working hours may shift during special workshops or community sessions.",
  spaceAccessLabel = "Space Access",
  spaceAccessHeading = "Makerspace use is supervised. Introductions required for specific heavy machinery.",
  spaceAccessNote = "Prioritize safety at all times.",
  locationLabel = "Location",
  locationName = "Sattya Media Arts Collective",
  heroHeading = "Your home to\nexperiment\nand create",
  locationAddress = "Jawalakhel, Kathmandu, Nepal",
  mapLabel = "Map Location",
  mapHref = "#",
  themeColor = "makerspace",
}: InfoSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const scribbleRef = useRef<HTMLDivElement>(null);
  const spaceAccessRef = useRef<HTMLDivElement>(null);
  const hoursRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const excEl = section.querySelector(".exclamation-anim");
    gsap.set(excEl, { opacity: 0, scale: 0.8, transformOrigin: "right center" });
    const ctx = gsap.context(() => {

      // Initial states
      gsap.set(headingRef.current, { opacity: 0, x: -50 });
      gsap.set(scribbleRef.current, { opacity: 0 });
      gsap.set(spaceAccessRef.current, { opacity: 0, y: 30 });
      gsap.set(hoursRef.current, { opacity: 0, y: 30 });
      gsap.set(locationRef.current, { opacity: 0, y: 30 });
      gsap.set(timeRef.current, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      // Left panel — heading slides in
      tl.to(headingRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
      })

      tl.to(excEl, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.8)",
      }, "-=0.4")
        // Scribble slides in
        .to(scribbleRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }, "-=0.3")

        // Right panel — stagger blocks up
        .to(spaceAccessRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.3")
        .to(hoursRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.4")
        // Time counter animates up
        .to(timeRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        }, "-=0.3")
        .to(locationRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.3");

      // Count up animation for time digits
      const openNum = parseInt(openTime.split(":")[0]);
      const closeNum = parseInt(closeTime.split(":")[0]);
      const openEl = section.querySelector(".open-time");
      const closeEl = section.querySelector(".close-time");

      if (openEl && closeEl) {
        const openObj = { val: 0 };
        const closeObj = { val: 0 };

        gsap.to(openObj, {
          val: openNum,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.6,
          scrollTrigger: { trigger: section, start: "top 75%", once: true },
          onUpdate: () => {
            openEl.textContent = `${Math.round(openObj.val).toString().padStart(2, "0")}:00`;
          },
        });

        gsap.to(closeObj, {
          val: closeNum,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.7,
          scrollTrigger: { trigger: section, start: "top 75%", once: true },
          onUpdate: () => {
            closeEl.textContent = `${Math.round(closeObj.val).toString().padStart(2, "0")}:00`;
          },
        });
      }

    }, section);

    return () => ctx.revert();
  }, [openTime, closeTime]);

  return (
    <section
      ref={sectionRef}
      className={`w-full min-h-[70vh] flex flex-col md:flex-row border-y-2 border-${themeColor}`}
    >
      {/* LEFT — hero heading */}
      <div className={`md:w-3/5 xl:w-2/3 bg-${themeColor} text-white flex items-center justify-center relative overflow-hidden min-h-[50vh] md:min-h-0`}>
        <div className={`bg-${themeColor} text-white flex items-center justify-center relative overflow-visible min-h-[50vh] md:min-h-0`}>
          <div className="relative w-full">
            <div className="relative inline-block">
              <h2
                ref={headingRef}
                className="text-white uppercase leading-none z-20 relative text-[clamp(3rem,5vw,6rem)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {heroHeading.split("\n").map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </h2>

              <Exclamation
                color={themeColor}
                className="absolute hidden sm:block -right-15 xl:-right-[9em] top-0 h-full w-auto exclamation-anim"
              />
            </div>
          </div>

          <div ref={scribbleRef}>
            <Scribble
              color={themeColor}
              className="block translate-y-15 md:translate-y-0 md:-bottom-5 w-fit absolute -left-10 mt-1 h-[4em]"
            />
          </div>
        </div>
      </div>

      {/* RIGHT — Space Access + Location */}
      <div className={`md:w-2/5 lg:w-1/3 justify-evenly gap-10 bg-white p-8 md:p-12 flex flex-col border-t-2 md:border-t-0 md:border-l-2 border-${themeColor}`}>

        {/* Space Access */}
        <div ref={spaceAccessRef}>
          <p className={`caption uppercase text-${themeColor} flex items-center gap-2 mb-6`}>
            <span className={`w-2 h-2 bg-${themeColor} inline-block shrink-0`} />
            {spaceAccessLabel}
          </p>
          <p className="p-bold uppercase leading-snug mb-4">{spaceAccessHeading}</p>
          <p className={`caption text-${themeColor} opacity-80 uppercase`}>{spaceAccessNote}</p>
        </div>

        {/* Opening Hours */}
        <div ref={hoursRef}>
          <p className={`caption uppercase text-${themeColor} flex items-center gap-2 mb-6`}>
            <span className={`w-2 h-2 bg-${themeColor} inline-block shrink-0`} />
            {openingHoursLabel}
          </p>
          <p className="uppercase h3-off leading-snug mb-4">{days}</p>

          {/* Time — count up animation */}
          <div ref={timeRef} className="flex flex-wrap items-center mt-5">
            <div>
              <span className={`open-time text-[clamp(4.8rem,4vw,7.5rem)] font-display leading-none text-${themeColor}`}>
                00:00
              </span>
              <span className={`h1 ml-2 uppercase text-${themeColor}`}>AM</span>
              <span className={`font-display leading-0 text-[clamp(4.8rem,4vw,7.5rem)] text-${themeColor} mx-2`}>
                -
              </span>
            </div>
            <div>
              <span className={`close-time text-[clamp(4.8rem,4vw,7.5rem)] font-display leading-none text-${themeColor}`}>
                00:00
              </span>
              <span className={`h1 ml-2 uppercase text-${themeColor}`}>PM</span>
            </div>
          </div>

          <p className="caption text-black/50 uppercase mt-4 whitespace-pre-line">{hoursNote}</p>
        </div>

        {/* Location */}
        <div ref={locationRef} className="flex flex-col mb-10 gap-6">
          <p className={`caption uppercase text-${themeColor} flex items-center gap-2`}>
            <span className={`w-2 h-2 bg-${themeColor} inline-block shrink-0`} />
            {locationLabel}
          </p>
          <div className="flex flex-col gap-1">
            <p className="p-bold uppercase">{locationName}</p>
            <p className={`caption text-${themeColor}/50 uppercase`}>{locationAddress}</p>
          </div>
          <a
            href={mapHref}
            className={`underline-offset-6 hover:underline hover:text-${themeColor} flex items-center gap-1 mt-1 w-fit`}
          >
            {mapLabel}
            <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}