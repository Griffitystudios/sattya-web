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
}: StaybodySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const photoWrapRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const shadow1Ref = useRef<HTMLDivElement>(null);
  const shadow2Ref = useRef<HTMLDivElement>(null);

  /* ── Scroll animations ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {

      // Left column blocks stagger in
      if (col1Ref.current) {
        gsap.fromTo(
          col1Ref.current.querySelectorAll(".anim-block"),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: col1Ref.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      }

      // Photo + shadows pop in
      if (photoRef.current && shadow1Ref.current && shadow2Ref.current) {
        gsap.set(photoRef.current, { opacity: 0, y: 30 });
        gsap.set(shadow1Ref.current, { opacity: 0, x: 0, y: 0 });
        gsap.set(shadow2Ref.current, { opacity: 0, x: 0, y: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: photoWrapRef.current,
            start: "top 70%",
            once: true,
          },
        });

        tl.to(photoRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
        })
          .to(shadow1Ref.current, {
            opacity: 1,
            x: 15,
            y: 15,
            duration: 0.6,
            ease: "power2.out",
          }, "-=0.3")
          .to(shadow2Ref.current, {
            opacity: 1,
            x: 25,
            y: 25,
            duration: 0.6,
            ease: "power2.out",
          }, "-=0.4");
      }

    }, section);

    return () => ctx.revert();
  }, []);

  /* ── Photo hover — shadow spreads outward ── */
  useEffect(() => {
    const wrap = photoWrapRef.current;
    const photo = photoRef.current;
    const s1 = shadow1Ref.current;
    const s2 = shadow2Ref.current;
    if (!wrap || !photo || !s1 || !s2) return;

    const onEnter = () => {
      gsap.to(photo, { y: -6, scale: 1.02, duration: 0.4, ease: "power2.out" });
      gsap.to(s1, { x: 22, y: 22, opacity: 0.9, duration: 0.4, ease: "power2.out" });
      gsap.to(s2, { x: 38, y: 38, opacity: 0.7, duration: 0.4, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.to(photo, { y: 0, scale: 1, duration: 0.5, ease: "power2.inOut" });
      gsap.to(s1, { x: 15, y: 15, opacity: 1, duration: 0.5, ease: "power2.inOut" });
      gsap.to(s2, { x: 25, y: 25, opacity: 1, duration: 0.5, ease: "power2.inOut" });
    };

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
      className="relative px-4 sm:px-6 lg:px-8 mb-50 mt-30"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT */}
          <div ref={col1Ref} className="flex flex-col gap-8">
            {/* Block 1 */}
            <p
              className="anim-block p-bold text-black"
              style={{ borderLeft: "3px solid #A7937A", paddingLeft: "1rem" }}
            >
              Staying at Sattya is about having a solid, comfortable base in
              Kathmandu while being close to an active creative community.
              You're not staying inside every activity, but you're close enough
              that connection is easy, whether that's a conversation over
              coffee, a film screening in the evening, or meeting someone new
              through the space.
            </p>

            {/* Block 2 */}
            <div className="anim-block relative ml-4 mt-8">
              <div className="absolute border -top-4 -left-4 w-8 h-8 z-10 bg-stay" />
              <div className="relative z-10 border-2 border-black bg-white p-6">
                <p className="p text-black">
                  These stays tend to attract artists, curious travelers,
                  researchers, filmmakers, journalists, entrepreneurs, and
                  remote workers — people who want more than just a place to
                  sleep and who enjoy being around others doing interesting
                  work.
                </p>
              </div>
              <div className="absolute bottom-[-8px] right-[-8px] w-full h-full bg-black/80 z-0" />
            </div>
          </div>

          {/* RIGHT — photo with spreading shadows */}
          <div
            ref={photoWrapRef}
            className="relative cursor-pointer"
            style={{ paddingBottom: "48px", paddingRight: "48px" }}
          >
            {/* Shadow layer 2 — furthest back */}
            <div
              ref={shadow2Ref}
              className="absolute z-0 bg-stay-shadow"
              style={{
                width: "calc(100% - 48px)",
                height: "calc(100% - 48px)",
                top: 0,
                left: 0,
                opacity: 0,
              }}
            />

            {/* Shadow layer 1 */}
            <div
              ref={shadow1Ref}
              className="absolute z-[1] bg-stay"
              style={{
                width: "calc(100% - 48px)",
                height: "calc(100% - 48px)",
                top: 0,
                left: 0,
                opacity: 0,
              }}
            />

            {/* Photo */}
            <div
              ref={photoRef}
              className="relative z-10 border-2 border-black"
              style={{ opacity: 0 }}
            >
              <Image
                src={image1Src}
                alt="Stay at Sattya"
                width={800}
                height={600}
                className="w-full h-auto object-cover block"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}