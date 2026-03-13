"use client";

import { useState, useEffect, useRef } from "react";
import SliderStatus from "./SliderStatus";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SecondaryButton from "./SecondaryButton";
import PrimaryButton from "./PrimaryButton";

gsap.registerPlugin(ScrollTrigger);

export interface Event {
  date: string;
  month: string;
  title: string;
  description: string;
  href?: string;
}

export interface EventsSectionProps {
  heading?: string;
  subheading?: string;
  caption?: string;
  calendarLabel?: string;
  calendarHref?: string;
  calendarIconSrc?: string; // kept for API compat, intentionally unused
  accentColor?: string;
  events: Event[];
}

export function WaveGroup({ count = 8 }) {
  return (
    <div className="flex gap-[clamp(0.5rem,2vw,1rem)] -translate-y-[clamp(0.5rem,1vw,0.75rem)]">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 12 24"
          className="overflow-visible transform -rotate-12 w-[clamp(0.5rem,2vw,0.75rem)] h-[clamp(1rem,4vw,1.5rem)]"
        >
          <circle cx="6" cy="24" r="clamp(2, 1vw, 4)" fill="#d9d9d9" />
          <path
            d="M6,24 C-4,18 -4,6 6,0"
            fill="none"
            stroke="black"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      ))}
    </div>
  );
}

/* =========================
   COUNTING DATE
========================= */
function CountingDate({ date }: { date: string }) {
  const targetNum = parseInt(date, 10);
  const isNumber = !isNaN(targetNum);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isNumber || !spanRef.current) return;
    const obj = { val: 0 };
    const anim = gsap.to(obj, {
      val: targetNum,
      duration: 1.2,
      ease: "power2.out",
      paused: true,
      onUpdate: () => {
        if (spanRef.current)
          spanRef.current.textContent = String(Math.round(obj.val));
      },
    });
    ScrollTrigger.create({
      trigger: spanRef.current,
      start: "top 88%",
      once: true,
      onEnter: () => anim.play(),
    });
    return () => {
      anim.kill();
    };
  }, [targetNum, isNumber]);

  return (
    <span
      ref={spanRef}
      className="text-8xl sm:text-9xl leading-none text-black"
      style={{ fontFamily: "var(--font-display)" }}
    >
      {isNumber ? "0" : date}
    </span>
  );
}

/* =========================
   NAV ARROW BUTTON
========================= */
function NavArrow({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous events" : "Next events"}
      className={[
        "hidden sm:flex",
        "absolute top-1/2 -translate-y-1/2 z-20",
        direction === "left" ? "-left-5 lg:-left-10" : "-right-5 lg:-right-10",
        "items-center justify-center",
        "w-10 h-10 lg:w-12 lg:h-12",
        "border-2 border-black bg-white",
        "shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
        "transition-all duration-100",
        "shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
"transition-all duration-100",
"active:shadow-none active:translate-x-[2px] active:translate-y-[2px]",
"disabled:opacity-30 disabled:cursor-not-allowed",
"disabled:active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
"disabled:active:translate-x-0 disabled:active:translate-y-0",
      ].join(" ")}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {direction === "left" ? (
          <polyline points="10,3 5,8 10,13" />
        ) : (
          <polyline points="6,3 11,8 6,13" />
        )}
      </svg>
    </button>
  );
}

/* =========================
   EVENT CARD
========================= */
function EventCard({
  event,
  accentColor = "border-makerspace",
  innerRef,
}: {
  event: Event;
  accentColor?: string;
  innerRef?: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={innerRef}
      className="flex flex-col max-w-60 mx-auto gap-4 text-left opacity-0"
    >
      <div className="relative w-full mx-auto max-w-52 lg:max-w-50 aspect-square">
        <div
          className={`absolute inset-0 border-2 bg-${accentColor} rotate-3`}
        />
        <div className="relative z-10 w-full h-full border-2 bg-white flex flex-col">
          <div className="flex gap-2.5 -translate-y-2 md:-translate-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <svg
                key={i}
                viewBox="0 0 12 24"
                className="overflow-visible transform w-[2vw] sm:w-3 h-[4vw] sm:h-6 -rotate-12"
              >
                <circle cx="6" cy="24" r="4" fill="#d9d9d9" />
                <path
                  d="M6,24 C-4,18 -4,6 6,0"
                  fill="none"
                  stroke="black"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            ))}
          </div>
          <div className="flex-1 h-full flex flex-col items-center justify-center pb-4">
            <CountingDate date={event.date} />
            <span
              className="text-4xl tracking-tight leading-0 sm:text-5xl uppercase text-black"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {event.month}
            </span>
          </div>
        </div>
      </div>

      <h3
        className="text-2xl lg:text-3xl text-left font-medium mt-6 text-black"
        style={{ fontFamily: "var(--font-offset)" }}
      >
        {event.title}
      </h3>
      <p className="p text-left text-black/70">{event.description}</p>
      {event.href && (
        <SecondaryButton
          href={event.href}
          accentColor={accentColor}
          className="mt-2 sm:mt-4"
        >
          Read More
        </SecondaryButton>
      )}
    </div>
  );
}

/* =========================
   EVENTS SECTION
========================= */
export default function EventsSection({
  heading = "UPCOMING EVENTS",
  subheading,
  calendarLabel = "View Calendar",
  calendarHref = "#",
  accentColor = "border-makerspace",
  events = [],
  caption,
}: EventsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isDragging, setIsDragging] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // All drag state in refs — avoids stale closures, no re-renders mid-drag
  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);
  const dragStartIndex = useRef(0);
  const isDraggingRef = useRef(false);
  const hasDragged = useRef(false);

  // Keep maxIndex available to plain (non-memoized) handlers without stale closure issues
  const maxIndex = Math.max(0, events.length - cardsPerView);
  const maxIndexRef = useRef(maxIndex);
  maxIndexRef.current = maxIndex;

  /* ---- helpers ---- */
  const applyTransform = (index: number, dragOffsetPx = 0, animate = true) => {
    const track = trackRef.current;
    if (!track) return;
    const percent = -(index * (100 / cardsPerView));
    track.style.transition = animate
      ? "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      : "none";
    track.style.transform = `translateX(calc(${percent}% + ${dragOffsetPx}px))`;
  };

  const snapFromDelta = (startIdx: number, deltaX: number) => {
    const threshold = 60;
    const max = maxIndexRef.current;
    let next = startIdx;
    if (deltaX < -threshold && next < max) next += 1;
    else if (deltaX > threshold && next > 0) next -= 1;
    setCurrentIndex(next);
    applyTransform(next, 0, true);
  };

  const beginDrag = (clientX: number) => {
    isDraggingRef.current = true;
    hasDragged.current = false;
    dragStartX.current = clientX;
    dragCurrentX.current = clientX;
    dragStartIndex.current = currentIndex;
    setIsDragging(true);
    applyTransform(currentIndex, 0, false);
  };

  const moveDrag = (clientX: number) => {
    if (!isDraggingRef.current) return;
    dragCurrentX.current = clientX;
    const delta = clientX - dragStartX.current;
    if (Math.abs(delta) > 5) hasDragged.current = true;
    const atStart = dragStartIndex.current === 0 && delta > 0;
    const atEnd = dragStartIndex.current === maxIndexRef.current && delta < 0;
    applyTransform(
      dragStartIndex.current,
      atStart || atEnd ? delta * 0.2 : delta,
      false,
    );
  };

  const endDrag = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    if (hasDragged.current) {
      snapFromDelta(
        dragStartIndex.current,
        dragCurrentX.current - dragStartX.current,
      );
    } else {
      applyTransform(dragStartIndex.current, 0, true);
    }
  };

  const cancelDrag = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    applyTransform(dragStartIndex.current, 0, true);
  };

  /* ---- Pointer events — mouse only (touch handled below) ---- */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    beginDrag(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    moveDrag(e.clientX);
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    endDrag();
  };
  const onPointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    cancelDrag();
  };

  /* ---- Touch events — mobile / tablet ---- */
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    beginDrag(e.touches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    moveDrag(e.touches[0].clientX);
  };
  const onTouchEnd = () => {
    endDrag();
  };
  const onTouchCancel = () => {
    cancelDrag();
  };

  /* ---- resize ---- */
  useEffect(() => {
    const handleResize = () => {
      const cpv = window.innerWidth >= 640 ? 3 : 2;
      setCardsPerView(cpv);
      const newMax = Math.max(0, events.length - cpv);
      setCurrentIndex((prev) => Math.min(prev, newMax));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [events.length]);

  /* ---- sync track with currentIndex ---- */
  useEffect(() => {
    applyTransform(currentIndex, 0, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, cardsPerView]);

  /* ---- scroll entrance: heading ---- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const el = headingRef.current;
        const innerSpans = el.querySelectorAll("span > span");
        if (innerSpans.length > 0) {
          gsap.to(innerSpans, {
            y: "0%",
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.07,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        }
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [events.length]);

  /* ---- card entrance on slide change ---- */
  useEffect(() => {
    const visible = cardRefs.current
      .slice(currentIndex, currentIndex + cardsPerView)
      .filter(Boolean);
    if (visible.length > 0) {
      gsap.fromTo(
        visible,
        { opacity: 0.3, scale: 0.97, y: 10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
          stagger: 0.07,
        },
      );
    }
  }, [currentIndex, cardsPerView]);

  /* ---- nav buttons ---- */
  const goToPrevious = () =>
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndexRef.current));
  const goToNext = () =>
    setCurrentIndex((prev) => (prev < maxIndexRef.current ? prev + 1 : 0));

  return (
    <section ref={sectionRef} className="py-16 px-1 lg:px-16 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 ref={headingRef} className={`h2-off uppercase text-${accentColor}`}>
          {heading.split(" ").map((word, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "bottom",
                marginRight: "0.3em",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  transform: "translateY(110%)",
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </h2>
        {subheading && (
          <p ref={subheadingRef} className="p-bold text-black/80 mt-9">
            {subheading}
          </p>
        )}
        {caption && (
          <p ref={captionRef} className="caption text-black/50 mt-6">
            {caption}
          </p>
        )}
      </div>

      {/* Slider wrapper */}
      <div className="relative max-w-6xl mx-auto">
        <NavArrow
          direction="left"
          onClick={goToPrevious}
          disabled={events.length <= cardsPerView}
        />
        <NavArrow
          direction="right"
          onClick={goToNext}
          disabled={events.length <= cardsPerView}
        />

        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className={`flex pt-6 will-change-transform select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            style={{
              transform: `translateX(-${(currentIndex * 100) / cardsPerView}%)`,
              WebkitUserSelect: "none",
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchCancel}
          >
            {events.map((event, idx) => (
              <div
                key={idx}
                className="shrink-0 px-4"
                style={{ width: `${100 / cardsPerView}%` }}
                onClick={(e) => {
                  if (hasDragged.current) e.preventDefault();
                }}
              >
                <EventCard
                  event={event}
                  accentColor={accentColor}
                  innerRef={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {events.length > cardsPerView && (
        <div ref={dotsRef} className="flex justify-center gap-2 mt-12 md:mt-24">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="h-6 w-6"
            >
              <SliderStatus
                variant={index === currentIndex ? "dark" : "light"}
              />
            </button>
          ))}
        </div>
      )}

      <div ref={ctaRef} className="flex justify-center mt-10">
        <PrimaryButton href={calendarHref} accentColor={accentColor}>
          {calendarLabel}
        </PrimaryButton>
      </div>
    </section>
  );
}
