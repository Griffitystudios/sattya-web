"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface NewsletterSectionProps {
    substackUrl?: string;
    submitEventHref?: string;
    privacyText?: string;
    disclaimerText?: string;
    description?: string;
    subscribeNote?: string;
    submitNote?: string;
}

export default function NewsletterSection({
    substackUrl = "https://spottedbysattya.substack.com",
    submitEventHref = "/submit-event",
    privacyText = "We will never sell or give away your email address or any other information.",
    disclaimerText = "Events may change— always double-check with the organizer!",
    description = "A community-driven weekly dispatch of what's actually worth leaving the house for.",
    subscribeNote = "We respect your inbox. No spam, just local culture.",
    submitNote = "Keep us in the loop about what's happening in your corner of the city.",
}: NewsletterSectionProps) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const scratchyRef = useRef<HTMLSpanElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const footnotesRef = useRef<HTMLDivElement>(null);
    const subscribeRef = useRef<HTMLDivElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const submitRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            // Initial states
            gsap.set(headingRef.current, { opacity: 0, x: -40 });
            gsap.set(scratchyRef.current, { opacity: 0, y: 12 });
            gsap.set(descRef.current, { opacity: 0, y: 20 });
            gsap.set(footnotesRef.current, { opacity: 0, y: 20 });
            gsap.set(subscribeRef.current, { opacity: 0, y: 24 });
            gsap.set(dividerRef.current, { opacity: 0, scaleX: 0, transformOrigin: "left" });
            gsap.set(submitRef.current, { opacity: 0, y: 24 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    once: true,
                },
            });

            // Left column — heading then content
            tl.to(headingRef.current, {
                opacity: 1,
                x: 0,
                duration: 0.7,
                ease: "power3.out",
            })
                .to(scratchyRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out",
                }, "-=0.4")
                .to(descRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out",
                }, "-=0.3")
                .to(footnotesRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out",
                }, "-=0.3")

                // Right column — stagger in
                .to(subscribeRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out",
                }, "-=0.3")
                .to(dividerRef.current, {
                    opacity: 1,
                    scaleX: 1,
                    duration: 0.5,
                    ease: "power2.out",
                }, "-=0.2")
                .to(submitRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out",
                }, "-=0.2");

        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                {/* LEFT */}
                <div className="flex flex-col gap-6">

                    {/* Heading */}
                    <div className="w-fit mb-10">
                        <h2 className="uppercase leading-none">
                            <span ref={headingRef} className="font-display relative inline-block text-[clamp(3rem,7vw,6rem)]">
                                GET YOUR
                                <span
                                    ref={scratchyRef}
                                    className="font-scratchy text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-black absolute lowercase -bottom-5 lg:-bottom-8 xl:-bottom-12 -right-20"
                                >
                                    weekly drop
                                </span>
                            </span>
                        </h2>
                    </div>

                    {/* Description */}
                    <p ref={descRef} className="p-bold text-black max-w-sm">
                        {description}
                    </p>

                    {/* Footnotes */}
                    <div ref={footnotesRef} className="grid grid-cols-2 gap-6 mt-4">
                        <div>
                            <p className="p-bold text-black">Privacy Policy:</p>
                            <p className="caption text-black/60">{privacyText}</p>
                        </div>
                        <div>
                            <p className="p-bold text-black">Disclaimer:</p>
                            <p className="caption text-black/60">{disclaimerText}</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col gap-6">

                    {/* Subscribe */}
                    <div ref={subscribeRef} className="flex flex-col gap-2">
                        <a
                            href="https://spottedbysattya.substack.com/subscribe"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black w-full text-white px-6 py-3 p-bold text-center hover:bg-black/80 transition-colors shrink-0"
                        >
                            Subscribe
                        </a>
                        {status === "success" && (
                            <p className="caption text-green-600">Check your email to confirm!</p>
                        )}
                        <p className="caption text-black/50 text-center">{subscribeNote}</p>
                    </div>

                    {/* OR divider */}
                    <div ref={dividerRef} className="flex items-center gap-4">
                        <div className="flex-1 h-px bg-black/20" />
                        <p className="caption text-black/50 uppercase">OR</p>
                        <div className="flex-1 h-px bg-black/20" />
                    </div>

                    {/* Submit event */}
                    <div ref={submitRef} className="flex flex-col gap-3">
                        <Link
                            href={submitEventHref}
                            className="group relative inline-flex w-full items-center justify-center"
                        >
                            <div className="absolute translate-x-1 translate-y-1 w-full h-full border-2 border-black bg-black opacity-0 transition-all duration-200 group-hover:opacity-100" />
                            <div className="relative w-full text-center border-2 border-black px-6 py-3 font-bold bg-white text-black transition-all duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                                Submit your Event
                            </div>
                        </Link>
                        <p className="caption text-black/50 text-center">{submitNote}</p>
                    </div>

                </div>
            </div>
        </section>
    );
}