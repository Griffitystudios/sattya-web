"use client";

import Image from "next/image";
import { useScrollAnimation } from "../../../hooks/use-scroll-animation";

interface floatingItem {
  icon: string;
  alt: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}

export interface StaySectionProps {
  floatingItems?: floatingItem[];
  bgColor?: string;
  className?: string;
}

const positionClasses = {
  "top-left": "top-0 left-0",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "bottom-right": "bottom-0 right-0",
};

export default function StaySection({
  floatingItems = [
    {
      icon: "/images/stay/house.svg",
      alt: "Stay Image",
      position: "top-right",
    },

  ],
  bgColor = "bg-stay",
}: StaySectionProps) {
  const { ref } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className={`${bgColor} py-12 md:py-18 lg:py-28 px-2 sm:px-6 lg:px-8 relative overflow-hidden `}
    >
      {/* Decorative corner items */}
      {floatingItems.map((featured, index) => (
        <div
          key={index}
          className={`absolute hidden sm:block pointer-events-none 
              w-20 sm:w-28 md:w-36 lg:w-44 
              ${positionClasses[featured.position]} 
              ${featured.className ?? ""}`}
        >
          <Image
            src={featured.icon}
            alt={featured.alt}
            width={192}
            height={192}
            className="w-full h-auto object-contain"
          />
        </div>
      ))}

      <div className="max-w-7xl mx-auto relative z-10 px-4">
        <div className=" justify-center ">
          <p className="text-lg md:text-xl text-center text-white mt-4">
            There are different options to explore if you want to stay at Sattya, with
            mid-term and longer-term stays in Kathmandu.<br /> These stays are suited to people
            who want a comfortable base,  access to shared spaces,<br /> and proximity to an active
            creative community.
          </p>
        </div>
      </div>
    </section>
  );
}
