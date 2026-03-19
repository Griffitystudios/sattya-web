// components/ui/NewsletterSection.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

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
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    return (
        <section className="w-full px-6 sm:px-10 lg:px-16 py-16 lg:py-24 ">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                {/* LEFT — heading + description + footnotes */}
                <div className="flex flex-col gap-6">

                    {/* Heading
                    <div>
                        <h2
                            className="uppercase leading-none text-[clamp(3rem,7vw,6rem)]"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            GET YOUR
                        </h2>
                        <p
                            className="text-black lowercase text-[clamp(1.5rem,3.5vw,3rem)] leading-none -mt-2"
                            style={{ fontFamily: "var(--font-scratchy)" }}
                        >
                            weekly drop
                        </p>
                    </div> */}
                    {/* Heading */}
                    <div className="w-fit mb-10">
                        <h2 className=" uppercase leading-none">
                            <span className="font-display relative inline-block text-[clamp(3rem,7vw,6rem)]">
                                GET YOUR
                                <span className="font-scratchy text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-black absolute lowercase -bottom-5 lg:-bottom-8 xl:-bottom-12 -right-20">
                                    weekly drop
                                </span>
                            </span>
                        </h2>
                    </div>

                    {/* Description */}
                    <p className="p-bold text-black max-w-sm">{description}</p>

                    {/* Footnotes */}
                    <div className="grid grid-cols-2 gap-6 mt-4">
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

                {/* RIGHT — subscribe form + OR + submit event */}
                <div className="flex flex-col gap-6">

                    {/* Email form */}
                    <div className="flex flex-col gap-2">

                        <a
                            href="https://spottedbysattya.substack.com/subscribe"
                            className="bg-black w-full text-white px-6 py-3 p-bold text-center hover:bg-black/80 transition-colors shrink-0 disabled:opacity-50"
                        >
                            Subscribe
                        </a>

                        {status === "success" && (
                            <p className="caption text-green-600">Check your email to confirm!</p>
                        )}
                        <p className="caption text-black/50 text-center">{subscribeNote}</p>
                    </div>

                    {/* OR divider */}
                    <div className="flex items-center gap-4">
                        <div className="flex-1 h-px bg-black/20" />
                        <p className="caption text-black/50 uppercase">OR</p>
                        <div className="flex-1 h-px bg-black/20" />
                    </div>

                    {/* Submit event */}
                    <div className="flex flex-col gap-3">


                        <Link
                            href={submitEventHref}
                            className="group relative inline-flex w-full items-center justify-center"
                        >
                            {/* Shadow layer */}
                            <div className="absolute translate-x-1 translate-y-1 w-full h-full border-2 border-black bg-black opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1 group-hover:translate-y-1" />

                            {/* Main button */}
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