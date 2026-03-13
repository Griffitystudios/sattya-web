"use client";

import { useEffect, useRef } from "react";

const IMAGES = {
  room: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=260&fit=crop",
  residence: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=260&fit=crop",
  apartment: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=260&fit=crop",
};

const cards = [
  {
    image: IMAGES.room,
    title: "Residency Room",
    subtitle: "(Work-Trade Stay)",
    quote: '"For artists, makers, and creatives contributing to Sattya"',
    bestFor: ["Visiting artists", "Facilitators and collaborators", "Longer stays on a budget", "People who want to be actively involved"],
    includes: ["Private room", "Shared bathroom", "Access to Sattya spaces during open hours", "Community meals (details vary)"],
  },
  {
    image: IMAGES.residence,
    title: "Sattya Residence",
    subtitle: "(One-Bedroom Apartment)",
    quote: '"A quiet, well-appointed place to stay"',
    bestFor: ["Visiting artists and curators", "Creative professionals", "Researchers or remote workers", "Solo travelers or couples", "People who want privacy with easy access to the community"],
    includes: ["Private one-bedroom apartment", "Living area and kitchen", "Dedicated workspace", "AC for heating and cooling", "Strong Wi-Fi", "Easy access to Sattya spaces"],
  },
  {
    image: IMAGES.apartment,
    title: "Sattya Apartment",
    subtitle: "(Three-Bedroom, Shared)",
    quote: '"Shared living with room to settle in"',
    bestFor: ["Visiting creatives and researchers", "Remote workers", "Longer stays", "People who enjoy shared living with personal space"],
    includes: ["Private bedroom", "Shared kitchen and living areas", "Strong Wi-Fi", "Easy access to Sattya and nearby spaces"],
  },
];

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="flex flex-col gap-1 list-none p-0 m-0">
    {items.map((item, i) => (
      <li key={i} className="relative pl-3.5 text-[0.82rem] text-neutral-700 leading-snug">
        <span className="absolute left-0 top-0 text-[#A7937A] text-[0.6rem] leading-snug">•</span>
        {item}
      </li>
    ))}
  </ul>
);

function Card({ card }: { card: typeof cards[0] }) {
  return (
    <div
      className="card-item group flex flex-col bg-white border border-neutral-800"
      style={{ boxShadow: "4px 4px 0 #1a1a1a", willChange: "transform, opacity" }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "7px 7px 0 #1a1a1a"; e.currentTarget.style.transform = "translate(-2px, -2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "4px 4px 0 #1a1a1a"; e.currentTarget.style.transform = "translate(0, 0)"; }}
    >
      <div className="w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <img src={card.image} alt={card.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>

      <div className="flex flex-col flex-1 gap-3 px-5 pt-5 pb-7">
        <div className="text-center mb-1">
          <h3 className="font-['Caveat',_cursive] text-[1.65rem] font-normal text-neutral-900 leading-tight m-0">{card.title}</h3>
          <p className="font-serif text-xs text-neutral-500 italic mt-1 mb-0">{card.subtitle}</p>
        </div>

        <blockquote className="border-l-[3px] border-[#C8A45A] pl-3 m-0">
          <p className="font-serif text-sm leading-snug m-0 text-neutral-700">{card.quote}</p>
        </blockquote>

        <div>
          <p className="font-serif text-[0.82rem] font-bold text-neutral-900 mb-1.5 mt-0">Best for</p>
          <BulletList items={card.bestFor} />
        </div>

        <div>
          <p className="font-serif text-[0.82rem] font-bold text-neutral-900 mb-1.5 mt-0">Includes</p>
          <BulletList items={card.includes} />
        </div>

        <div className="flex-1" />

        <div className="text-center border-t border-neutral-200 pt-3.5 mt-1.5">
          <a href="#" className="font-serif text-[0.82rem] italic underline text-neutral-500 tracking-wide transition-colors duration-200 hover:text-[#A7937A]">
            View details →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function StayOptionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Set initial hidden state immediately (no flash)
        gsap.set(headingRef.current, { opacity: 0, y: 30 });
        gsap.set(".card-item", { opacity: 0, y: 60, scale: 0.96 });

        // Heading slides in
        gsap.to(headingRef.current, {
          opacity: 1, y: 0,
          duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 88%", once: true },
        });

        // Cards rise up one by one as a group
        gsap.to(".card-item", {
          opacity: 1, y: 0, scale: 1,
          duration: 1, ease: "expo.out",
          stagger: { each: 0.18, ease: "power1.inOut" },
          scrollTrigger: { trigger: ".cards-grid", start: "top 82%", once: true },
        });
      }, sectionRef);
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500&display=swap');`}</style>

      <section ref={sectionRef} className="relative overflow-hidden px-12 py-20">
        {/* Grain overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundSize: "128px" }}
        />

        {/* Corner dots */}
        {["top-5 left-5", "top-5 right-5", "bottom-5 left-5", "bottom-5 right-5"].map((pos, i) => (
          <div key={i} className={`absolute ${pos} grid grid-cols-4 gap-1.5 opacity-20 z-0`}>
            {Array.from({ length: 16 }).map((_, j) => <span key={j} className="w-1 h-1 rounded-full bg-[#A7937A] block" />)}
          </div>
        ))}

        <div className="relative z-10 max-w-5xl mx-auto">
          <div ref={headingRef} className="text-center mb-14">
            <h2 className="font-offset text-[2.2rem] font-bold tracking-[0.14em] uppercase m-0">
              <span className="text-[#A7937A]">STAY</span> <span className="text-neutral-900">OPTIONS</span>
            </h2>
            <div className="w-14 h-0.5 bg-neutral-900 mx-auto mt-3.5" />
          </div>

          <div className="cards-grid grid grid-cols-3 gap-7 items-start">
            {cards.map((card, i) => <Card key={i} card={card} />)}
          </div>
        </div>
      </section>
    </>
  );
}