"use client";

import React, { useEffect, useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

function NoFrillSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const line1Ref = useRef<HTMLParagraphElement>(null);
    const line2Ref = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const split1 = new SplitText(line1Ref.current, { type: "words" });
            const split2 = new SplitText(line2Ref.current, { type: "words" });

            const allWords = [...split1.words, ...split2.words];

            gsap.set(allWords, { y: 80, opacity: 0, filter: "blur(6px)" });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    once: true,
                },
            });

            tl.to(split1.words, {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 0.8,
                ease: "back.out(1.2)",
                stagger: 0.3,
            }).to(
                split2.words,
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 0.8,
                    ease: "back.out(1.2)",
                    stagger: 0.3,
                },
                "-=0.5"
            );

            return () => {
                split1.revert();
                split2.revert();
            };
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="bg-black h-[calc(100vh-40rem)] min-h-100 sm:h-180 py-12 md:py-18 lg:py-28 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden"
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
                        className="text-white text-right lg:translate-x-30 sm:translate-x-5 lowercase text-[clamp(2.8rem,5vw,8rem)] leading-0 lg:-translate-y-2 xl:-translate-y-3"
                        style={{ fontFamily: "var(--font-scratchy)" }}
                    >
                        community newsletter
                    </p>
                </h2>
            </div>
        </section>
    );
}

export default NoFrillSection;