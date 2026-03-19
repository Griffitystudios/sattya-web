"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

interface ImageGalleryProps {
    images: string[];
    name: string;
}

export default function ImageGallery({ images, name }: ImageGalleryProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const lightboxRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const imageWrapRef = useRef<HTMLDivElement>(null);
    const thumbnailsRef = useRef<HTMLDivElement>(null);
    const controlsRef = useRef<HTMLDivElement>(null);

    if (!images || images.length === 0) return null;

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    /* =========================
       NAVIGATION (GSAP animated)
    ========================== */

    const animateChange = (direction: "next" | "prev") => {
        if (!imageRef.current) return;

        const dir = direction === "next" ? 1 : -1;

        gsap.to(imageRef.current, {
            x: -50 * dir,
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
            onComplete: () => {
                setLightboxIndex((prev) =>
                    direction === "next"
                        ? (prev + 1) % images.length
                        : (prev - 1 + images.length) % images.length
                );

                gsap.fromTo(
                    imageRef.current,
                    { x: 50 * dir, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.3, ease: "power3.out" }
                );
            },
        });
    };

    const next = () => animateChange("next");
    const prev = () => animateChange("prev");

    /* =========================
       KEYBOARD ACCESSIBILITY
    ========================== */

    useEffect(() => {
        if (!lightboxOpen) return;

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "Escape") closeLightbox();
        };

        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [lightboxOpen]);

    /* =========================
       FOCUS HANDLING
    ========================== */

    useEffect(() => {
        if (lightboxOpen) {
            lightboxRef.current?.focus();
        }
    }, [lightboxOpen]);

    /* =========================
       OPEN ANIMATION — SWOOP FROM BOTTOM WITH MORPH
    ========================== */

    useEffect(() => {
        if (!lightboxOpen) return;

        const tl = gsap.timeline();

        // 1. Fade in the blurred overlay
        tl.fromTo(
            overlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.35, ease: "power2.out" }
        )

            // 2. Image wrapper swoops up from below with a morphing clip-path
            .fromTo(
                imageWrapRef.current,
                {
                    y: 120,
                    opacity: 0,
                    scale: 0.88,
                    clipPath: "inset(40% 12% 0% 12% round 24px)",
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    clipPath: "inset(0% 0% 0% 0% round 0px)",
                    duration: 0.65,
                    ease: "expo.out",
                },
                "-=0.15"
            )

            // 3. The inner image fades + rises slightly for depth
            .fromTo(
                imageRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
                "-=0.45"
            )

            // 4. Thumbnails slide up last
            .fromTo(
                thumbnailsRef.current,
                { y: 24, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" },
                "-=0.25"
            )

            // 5. Nav controls pop in
            .fromTo(
                controlsRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.25, ease: "power1.out" },
                "-=0.2"
            );
    }, [lightboxOpen]);

    /* =========================
       CLOSE WITH REVERSE SWOOP
    ========================== */

    const closeLightbox = () => {
        const tl = gsap.timeline({
            onComplete: () => setLightboxOpen(false),
        });

        tl.to(thumbnailsRef.current, {
            y: 16,
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
        })
            .to(
                imageWrapRef.current,
                {
                    y: 80,
                    opacity: 0,
                    scale: 0.9,
                    clipPath: "inset(20% 8% 0% 8% round 20px)",
                    duration: 0.35,
                    ease: "power3.in",
                },
                "-=0.1"
            )
            .to(
                overlayRef.current,
                { opacity: 0, duration: 0.25, ease: "power1.in" },
                "-=0.2"
            );
    };

    /* =========================
       SWIPE SUPPORT (MOBILE)
    ========================== */

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        touchEndX.current = e.changedTouches[0].screenX;
        const diff = touchStartX.current - touchEndX.current;

        if (diff > 50) next();
        if (diff < -50) prev();
    };

    return (
        <>
            {/* =========================
                GRID VIEW
            ========================== */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 h-[50vh] md:h-[60vh]">
                {/* Main */}
                <button
                    className="col-span-2 row-span-2 relative w-full h-full"
                    onClick={() => openLightbox(0)}
                    aria-label={`Open ${name} image 1`}
                >
                    <Image src={images[0]} alt={name} fill className="object-cover" priority />
                </button>

                {/* Second */}
                {images[1] && (
                    <button
                        className="relative w-full h-full"
                        onClick={() => openLightbox(1)}
                        aria-label={`Open ${name} image 2`}
                    >
                        <Image src={images[1]} alt={`${name} 2`} fill className="object-cover" />
                    </button>
                )}

                {/* Third */}
                {images[2] && (
                    <button
                        className="relative group w-full h-full"
                        onClick={() => openLightbox(2)}
                        aria-label="Open image gallery"
                    >
                        <Image src={images[2]} alt={`${name} 3`} fill className="object-cover" />

                        {images.length > 3 && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/60 transition">
                                <p className="text-white text-center">
                                    View all photos
                                    <br />
                                    <span className="text-2xl">+{images.length - 3}</span>
                                </p>
                            </div>
                        )}
                    </button>
                )}
            </div>

            {/* =========================
                LIGHTBOX
            ========================== */}
            {lightboxOpen && (
                <div
                    ref={overlayRef}
                    tabIndex={-1}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image gallery lightbox"
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center outline-none"
                    onClick={closeLightbox}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Close */}
                    <button
                        aria-label="Close gallery"
                        className="absolute top-6 right-6 text-white text-2xl z-10"
                        onClick={closeLightbox}
                    >
                        ✕
                    </button>

                    {/* Image wrapper — swoop target */}
                    <div
                        ref={imageWrapRef}
                        className="relative w-full max-w-5xl h-[80vh] px-6 md:px-16"
                        onClick={(e) => e.stopPropagation()}
                        style={{ willChange: "transform, clip-path, opacity" }}
                    >
                        {/* Inner image — secondary depth animation target */}
                        <div ref={imageRef} className="relative w-full h-full">
                            <Image
                                src={images[lightboxIndex]}
                                alt={`${name} ${lightboxIndex + 1}`}
                                fill
                                className="object-contain"
                            />
                        </div>

                        {/* Nav controls */}
                        <div ref={controlsRef}>
                            {/* Prev */}
                            <button
                                aria-label="Previous image"
                                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-3 text-xl"
                                onClick={prev}
                            >
                                ←
                            </button>

                            {/* Next */}
                            <button
                                aria-label="Next image"
                                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-3 text-xl"
                                onClick={next}
                            >
                                →
                            </button>

                            {/* Counter */}
                            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
                                {lightboxIndex + 1} / {images.length}
                            </p>
                        </div>
                    </div>

                    {/* Thumbnails */}
                    <div
                        ref={thumbnailsRef}
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2  max-w-2xl px-4"
                    >
                        {images.map((img, i) => (
                            <button
                                key={i}
                                aria-label={`Go to image ${i + 1}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setLightboxIndex(i);
                                }}
                                className={`relative w-14 h-14 border-2 ${i === lightboxIndex
                                    ? "border-white"
                                    : "border-transparent opacity-50 hover:opacity-100"
                                    }`}
                            >
                                <div className="relative w-14 h-14">
                                    <Image src={img} alt={`Thumbnail ${i + 1}`} fill className="object-cover" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}