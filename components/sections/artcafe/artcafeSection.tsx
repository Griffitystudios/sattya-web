"use client";
import Image from "next/image";

interface ArtcafeSectionProps {
  heading?: string;
  subheading?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  color?: string;
}

export default function ArtcafeSection({
  subheading = "at Sattya for making",
  description = "The Art Cafe is a drop-in space with tables, materials, and a small menu. Grab something and settle in for a bit.",
  imageSrc = "/images/artcafe/tree.png",
  imageAlt = "Decorative tree illustration",
  color = "rgba(233, 175, 172, 1)",
}: ArtcafeSectionProps) {
  return (
    <section className="relative w-full h-200 overflow-hidden">
      <div className="relative mx-auto h-full max-w-7xl">
        {/* Tree — fixed width so it doesn't stretch too wide */}
        <div className="absolute inset-y-0 -right-54 xs:-right-45 sm:-right-38  md:-right-25 lg:right-0 overflow-hidden pointer-events-none">
          <div className="relative w-full h-full">
            <Image
              src="/images/artcafe/tree-pink.svg"
              width={500}
              height={900}
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-left"
            />
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={800}
              height={1000}
              className="relative w-full h-full object-cover object-left"
            />
          </div>
        </div>
        {/* Text — vertically centered */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
          <div className="flex flex-col gap-2 items-start mt-40 xs:mt-60 sm:mt-40">
            <div className="w-fit">
              <h1
                className="font-display text-[clamp(1.9rem,6vw,3.5rem)] uppercase mb-1 leading-tight"
                style={{ color }}
              >
                Ground-Floor{" "}
                <span className="relative inline-block">
                  space
                  <span className="h1-alt text-black absolute lowercase -bottom-2 sm:-bottom-1 -left-14 whitespace-nowrap">
                    {subheading}
                  </span>
                </span>
              </h1>
            </div>
          </div>
          <p
            className="p-bold w-4/5 md:w-2/3 mt-8"
            style={{
              borderLeft: `3px solid ${color}`,
              paddingLeft: "0.75rem",
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
