// components/ui/ComingSoon.tsx
import Podlab from "@app/(spaces)/podlab/page";
import Link from "next/link";

export interface ComingSoonProps {
  heading?: string;
  subheading?: string;
  paragraphs?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  accentColor?: string;
}

export default function ComingSoon({
  heading = "COMING",
  subheading = "SOON",
  paragraphs = [],
  ctaLabel = "Get in touch",
  ctaHref = "#",
  accentColor = "#6b7c5c",
}: ComingSoonProps) {
  return (
    <section className="w-full  text-hero-xl font-display flex flex-col items-center justify-center  px-5 sm:px-20 pt-34 mb-15">

      {/* Big heading */}
      <div className="text-center mb-16 text-hero-xl uppercase">
        <h1
          className="  block"
        >
          {heading}
        </h1>

        {/* SOON + !! exclamation marks */}
        <div className="flex items-end  font-display translate-x-4 justify-end gap-2 mt-3">
          <h1
            className=""
          >
            {subheading}
          </h1>
          <h1
            className={` ml-1 rotate-7 translate-y-3 text-${accentColor} `}
          >
            !!
          </h1>

        </div>

      </div>

      {/* Body text */}
      <div className="max-w-3xl text-center flex flex-col gap-6">
        {paragraphs.map((para, i) => (
          <p key={i} className="p text-black/70">
            {para}
          </p>
        ))}
      </div>

      {/* CTA */}
      <Link
        href={ctaHref}
        className="mt-12 flex items-center gap-2 caption underline underline-offset-4 hover:opacity-60 transition-opacity"
        style={{ color: accentColor }}
      >
        {ctaLabel}
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="square" strokeLinejoin="miter" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </section>
  );
}