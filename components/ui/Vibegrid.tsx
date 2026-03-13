"use client";

import Image from "next/image";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

interface floatingItem {
  icon: string;
  alt: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}

export interface VibeGridProps {
  items: FeatureItem[];
  floatingItems?: floatingItem[];
  bgColor?: string;
  textColor?: string;
  textOpacity?: string;
  className?: string;
  widthClass?: string;
}

const positionClasses = {
  "top-left": "top-0 left-0",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "bottom-right": "bottom-0 right-0",
};

export default function VibeGrid({
  items,
  floatingItems = [],
  bgColor,
  textColor,
  textOpacity,
  className,
  widthClass = "w-8 sm:w-10 md:w-14",
}: VibeGridProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className={`${bgColor} py-12 md:py-18 lg:py-28 px-2 sm:px-6 lg:px-8 relative overflow-hidden ${className}`}
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
        <div className="grid justify-center grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {items.map((item, index) => (
            <div
              key={index}
              className={`flex items-start justify-center gap-3 md:gap-5 transition-all duration-500 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 200}ms` : "0ms",
              }}
            >
              <div className={`${widthClass} shrink-0`}>
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={56}
                  height={56}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="w-52">
                <h3 className={`${textColor} mb-1.5 h3`}>{item.title}</h3>
                <p className={`${textOpacity} text-p`}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
