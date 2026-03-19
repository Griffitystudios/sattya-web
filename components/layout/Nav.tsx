// components/ui/Nav.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface NavContact {
  email?: string;
  phones?: string[];
  address?: string;
}

export interface NavSocials {
  instagram?: string;
  x?: string;
  pinterest?: string;
}

export interface NavProps {
  brandName?: string;
  illustrationSrc?: string;
  sattyaLogoSrc?: string;
  sattyaLogoTopSrc?: string; // top-left logo
  spaceLogos?: { src: string; alt: string }[];
  tagline?: string;
  links: NavLink[];
  contact?: NavContact;
  socials?: NavSocials;
}
export default function Nav({
  brandName = "SATTYA MEDIA ARTS COLLECTIVE",
  illustrationSrc,
  sattyaLogoSrc,
  sattyaLogoTopSrc,
  spaceLogos = [],
  tagline,
  links,
  contact,
  socials,
}: NavProps) {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const overlayRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip on first render — refs may not be ready and we don't want to animate on mount
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!overlayRef.current) return;

    const tl = gsap.timeline();

    if (open) {
      gsap.set(overlayRef.current, { display: "block" });

      tl.fromTo(
        leftPanelRef.current,
        { x: "-100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.6, ease: "power3.out" },
      )
        .fromTo(
          rightPanelRef.current,
          { x: "100%", opacity: 0 },
          { x: "0%", opacity: 1, duration: 0.6, ease: "power3.out" },
          "<",
        )
        .fromTo(
          illustrationRef.current,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
          "-=0.2",
        )
        .fromTo(
          linksRef.current.filter(Boolean),
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.06,
            ease: "power2.out",
          },
          "-=0.3",
        )
        .fromTo(
          bottomRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
          "-=0.2",
        );
    } else {
      tl.to(linksRef.current.filter(Boolean), {
        y: -16,
        opacity: 0,
        duration: 0.25,
        stagger: 0.03,
        ease: "power2.in",
      })
        .to(
          bottomRef.current,
          { y: 12, opacity: 0, duration: 0.2, ease: "power2.in" },
          "<",
        )
        .to(
          [leftPanelRef.current, rightPanelRef.current],
          {
            x: (i: number) => (i === 0 ? "-100%" : "100%"),
            opacity: 0,
            duration: 0.45,
            ease: "power3.in",
          },
          "-=0.1",
        )
        .set(overlayRef.current, { display: "none" });
    }
  }, [open]);

  return (
    <>
      {/* Top Left Logo */}
      {sattyaLogoTopSrc && (
        <div className="absolute top-6 left-6 md:top-10 md:left-12 z-[100]">
          <Image
            src={sattyaLogoTopSrc}
            alt="Sattya Arts"
            width={196}
            height={90}
            priority
            className="h-12 md:h-16 w-auto object-contain"
          />
        </div>
      )}
      {/* Hamburger */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        className="absolute top-16 right-15 z-[100] flex flex-col gap-[6px] h-10"
      >
        <span
          className={`block w-8 h-[3px] bg-white shadow-2xl shadow-black transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[5px]" : ""
            }`}
        />
        <span
          className={`block w-8 h-[3px] bg-white shadow-2xl shadow-black transition-all duration-300 ${open ? "-rotate-45 -translate-y-[4px]" : ""
            }`}
        />
      </button>

      {/* Fullscreen overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50"
        style={{ display: "none" }}
      >
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 h-full">
          {/* LEFT */}
          <div
            ref={leftPanelRef}
            className="hidden md:flex flex-col h-full bg-white overflow-hidden p-6"
          >
            <p className="p-bold uppercase tracking-widest text-black shrink-0">
              {brandName}
            </p>

            <div
              ref={illustrationRef}
              className="flex-1 min-h-0 flex items-center justify-center py-4 overflow-hidden"
            >
              {illustrationSrc && (
                <Image
                  src={illustrationSrc}
                  alt="Sattya illustration"
                  width={900}
                  height={500}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            <div className="shrink-0 flex items-end gap-4 pt-2">
              <div className="flex-1 min-h-0 flex items-end">
                <div className="flex items-center w-11/12 gap-2">
                  {sattyaLogoSrc && (
                    <div className="flex-[1.8] min-w-0 flex items-center">
                      <Image
                        src={sattyaLogoSrc}
                        alt="Sattya"
                        width={128}
                        height={128}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  )}
                  {spaceLogos.map((logo, i) => (
                    <div key={i} className="flex-1 min-w-0 flex items-center">
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={100}
                        height={100}
                        quality={75}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div
            ref={rightPanelRef}
            className="flex flex-col h-full bg-black overflow-y-auto p-8 md:p-10"
          >
            <nav className="flex flex-col gap-8 flex-1 mt-4">
              {links.map((link, i) => (
                <div
                  key={link.label}
                  ref={(el) => {
                    if (el) linksRef.current[i] = el;
                  }}
                >
                  {link.children ? (
                    <>
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === link.label ? null : link.label,
                          )
                        }
                        className="flex items-center gap-2 group"
                      >
                        <h2 className="h2 text-white group-hover:text-white/80 transition-colors">
                          {link.label}
                        </h2>
                        <span className="font-display text-display-hm  text-white group-hover:text-white/80 mt-1">
                          {openDropdown === link.label ? "-" : "+"}
                        </span>
                      </button>
                      {openDropdown === link.label && (
                        <div className="flex flex-col gap-2 pl-4 mt-4">
                          {link.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={() => setOpen(false)}
                              className="p-bold text-white hover:text-white/70 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block group"
                    >
                      <h2 className="h2 text-white group-hover:text-white/80 transition-colors">
                        {link.label}
                      </h2>
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Bottom — contact + socials */}
            <div
              ref={bottomRef}
              className="flex flex-col w-full  gap-6 text-nowrap mt-8 pt-6 border-t border-white/10 shrink-0"
            >
              {contact && (
                <div className="flex w-full">
                  <p className="caption mr-5 text-white/40  uppercase tracking-widest w-1/3 sm:w-2/3 shrink-0">
                    Contact
                  </p>
                  <div className="flex flex-col gap-1">
                    {contact.email && (
                      <a
                        href={`mailto:${contact.email}`}
                        className="p-bold text-white hover:text-white/80 transition-colors"
                      >
                        {contact.email}
                      </a>
                    )}
                    {contact.phones?.map((phone, i) => (
                      <a
                        key={i}
                        href={`tel:${phone}`}
                        className="p-bold text-white hover:text-white/80 transition-colors"
                      >
                        {phone}
                      </a>
                    ))}
                    {contact.address && (
                      <p className="p-bold whitespace-pre-line text-white mt-1">
                        {contact.address}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {socials && (
                <div className="flex w-full">
                  <p className="caption mr-5 text-white/40 uppercase tracking-widest w-1/3  sm:w-2/3 shrink-0">
                    Socials
                  </p>
                  <div className="flex flex-col gap-1">
                    {socials.instagram && (
                      <a
                        href={socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-bold text-white hover:text-white/80 transition-colors"
                      >
                        Instagram
                      </a>
                    )}
                    {socials.x && (
                      <a
                        href={socials.x}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-bold text-white hover:text-white/80 transition-colors"
                      >
                        X
                      </a>
                    )}
                    {socials.pinterest && (
                      <a
                        href={socials.pinterest}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-bold text-white hover:text-white/80 transition-colors"
                      >
                        Pinterest
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
