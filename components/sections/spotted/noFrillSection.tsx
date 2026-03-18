"use client";

import React, { useEffect, useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function noFrillSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const line1Ref = useRef<HTMLParagraphElement>(null);
    const line2Ref = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    once: true,
                }
            });

            tl.fromTo(
                line1Ref.current,
                { y: 80, opacity: 0, filter: "blur(6px)" },
                { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "back.out(1.2)" }
            ).fromTo(
                line2Ref.current,
                { y: 80, opacity: 0, filter: "blur(6px)" },
                { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "back.out(1.2)" },
                "-=0.6" // start before the first animation fully ends for nice stagger
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`bg-black h-[calc(100vh-40rem)] min-h-100 sm:h-180 py-12 md:py-18 lg:py-28  sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden `}
        >

            <div>
                <h2 className="uppercase leading-none" style={{ fontFamily: "var(--font-display)" }}>
                    <p
                        ref={line1Ref}
                        className="text-white text-[clamp(2.8rem,6vw,9.5rem)] leading-none text-center sm:text-left"
                    >
                        Your no frills
                    </p>
                    <p
                        ref={line2Ref}
                        className="text-white text-right lg:translate-x-30 sm:translate-x-5 lowercase text-[clamp(2.8rem,5vw,8rem)] leading-0 lg:-translate-y-2 xl:-translate-y-3 "
                        style={{ fontFamily: "var(--font-scratchy)" }}
                    >
                        community newsletter
                    </p>
                </h2>
            </div>
        </section>
    )
}

export default noFrillSection
