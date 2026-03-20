// components/sections/stay/PropertyBooking.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import ImageGallery from "../../ui/ImageGallery";
import { IconKey, icons } from "../../../configs/icons";
import gsap from "gsap";
import { BookingType } from "../../../configs/stay/stayOptions";
import Link from "next/link";

interface Room {
    name: string;
    subtitle: string;
    size: string;
    bed: string;
    bathroom: string;
    description: string;
}
export interface RelatedRoom {
    name: string;
    badge?: string;
    size?: string;
    bed?: string;
    image: string;
    href: string;
}
interface Amenity {
    icon: IconKey;
    label: string;
}


export interface PropertySection {
    title: string;
    content: string;
}

export interface PropertyBookingProps {
    badge?: string;
    name: string;
    tagline?: string;
    description?: string;
    iframeSrc?: string;
    images?: string[];
    rooms?: Room[];
    amenities?: Amenity[];
    location?: string;
    size?: string;
    maxGuests?: number;
    bedrooms?: number;
    bathrooms?: number;
    sections?: PropertySection[]; // ← new
    notes?: string[];             // ← new
    goodFor?: string[];           // ← new
    bookingType?: BookingType;
    inquireEmail?: string;
    inquireFormHref?: string;
    inquireLabel?: string;
    relatedRooms?: RelatedRoom[];
}
export default function PropertyBooking({
    name,
    bookingType,
    inquireEmail,
    inquireFormHref,
    inquireLabel,
    description,
    iframeSrc,
    images = [],
    rooms = [],
    amenities = [],
    location,
    size,
    maxGuests,
    bedrooms,
    badge,
    bathrooms,
    sections = [],
    notes = [],
    goodFor = [],
    relatedRooms = [],
}: PropertyBookingProps) {
    const searchParams = useSearchParams();
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [showAllSections, setShowAllSections] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const modalBackdropRef = useRef<HTMLDivElement>(null);

    const openModal = () => {
        setShowAllSections(true);
        // Animate in after render
        requestAnimationFrame(() => {
            if (!modalRef.current || !modalBackdropRef.current) return;
            gsap.fromTo(
                modalBackdropRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: "power2.out" }
            );
            gsap.fromTo(
                modalRef.current,
                { opacity: 0, y: 40, scale: 0.96 },
                { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" }
            );
        });
    };

    const closeModal = () => {
        if (!modalRef.current || !modalBackdropRef.current) return;
        gsap.to(modalRef.current, {
            opacity: 0,
            y: 30,
            scale: 0.97,
            duration: 0.3,
            ease: "power2.in",
        });
        gsap.to(modalBackdropRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => setShowAllSections(false),
        });
    };

    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe || !iframeSrc) return; // ← add !iframeSrc guard

        const checkin = searchParams.get("checkin");
        const checkout = searchParams.get("checkout");
        const adults = searchParams.get("adults");
        const children = searchParams.get("children");
        const infants = searchParams.get("infants");
        const pets = searchParams.get("pets");

        if (checkin || checkout || adults) {
            const separator = iframeSrc.includes("?") ? "&" : "?";
            iframe.src =
                iframeSrc +
                separator +
                `checkin=${checkin}&checkout=${checkout}&adults=${adults}&children=${children}&pets=${pets}&infants=${infants}`;
        }
    }, [searchParams, iframeSrc]);
    return (
        <div className="min-h-screen  ">
            <div className="relative">
                {/* Background image */}
                <div className="absolute inset-0 bg-[url('/images/stay/img1.png')] bg-cover bg-center"></div>

                {/* Black overlay */}
                <div className="absolute inset-0 bg-black/60"></div>

                {/* Content */}
                <div className="relative text-white px-6 sm:px-10 lg:px-16 py-40 lg:py-40 max-h-150">
                    <div className="max-w-7xl mx-auto flex flex-col gap-4">
                        <p className="caption uppercase tracking-widest text-white/60">
                            {badge}
                        </p>
                        <h1
                            className="uppercase leading-none text-[clamp(2.5rem,6vw,5.5rem)] text-white"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            {name}
                        </h1>
                        <div className="flex flex-wrap gap-6 mt-4">
                            {maxGuests && (
                                <div className="flex items-center gap-2">
                                    <span className="caption text-white/80 uppercase">Guests</span>
                                    <span className="p-bold">{maxGuests}</span>
                                </div>
                            )}
                            {bedrooms && (
                                <div className="flex items-center gap-2">
                                    <span className="caption text-white/80 uppercase">Bedrooms</span>
                                    <span className="p-bold">{bedrooms}</span>
                                </div>
                            )}
                            {bathrooms && (
                                <div className="flex items-center gap-2">
                                    <span className="caption text-white/80 uppercase">Bathrooms</span>
                                    <span className="p-bold">{bathrooms}</span>
                                </div>
                            )}
                            {size && (
                                <div className="flex items-center gap-2">
                                    <span className="caption text-white/80 uppercase">Size</span>
                                    <span className="p-bold">{size}</span>
                                </div>
                            )}
                        </div>
                        {/* <p className="p text-white/70 ">
                            {description}
                        </p> */}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16">

                    {/* LEFT — property details */}
                    <div className="flex flex-col gap-12">
                        {/* Description */}
                        {description && (
                            <div className="flex flex-col gap-4 pb-8 border-b border-black/10">
                                <h2 className="p-bold uppercase">About this space</h2>
                                <p className="p text-black/70">{description}</p>
                            </div>
                        )}

                        {/* Rooms */}
                        {rooms.length > 0 && (
                            <div className="flex flex-col gap-6 pb-8 border-b border-black/10">
                                <h2 className="p-bold uppercase">The Rooms</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {rooms.map((room, i) => (
                                        <div
                                            key={i}
                                            className="border-2 border-black/10 p-5 flex flex-col gap-2 hover:border-stay transition-colors"
                                        >
                                            <p className="p-bold uppercase">{room.name}</p>
                                            <p className="caption text-stay uppercase">{room.subtitle}</p>
                                            <div className="h-px bg-black/10 my-1" />
                                            <p className="caption text-black/60">{room.bed}</p>
                                            <p className="caption text-black/60">{room.bathroom}</p>
                                            <p className="caption text-black/60">{room.size}</p>
                                            <p className="caption text-black/50 mt-1">{room.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {/* Image gallery */}
                        {images.length > 0 && (
                            <ImageGallery images={images} name={name} />
                        )}

                        {/* Lightbox */}
                        {lightboxOpen && (
                            <div
                                className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                                onClick={() => setLightboxOpen(false)}
                            >
                                {/* Close */}
                                <button
                                    className="absolute top-6 right-6 text-white p-bold text-xl z-10"
                                    onClick={() => setLightboxOpen(false)}
                                >
                                    ✕
                                </button>

                                {/* Current image */}
                                <div
                                    className="relative w-full max-w-5xl h-[80vh] px-16"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Image
                                        src={images[lightboxIndex]}
                                        alt={`${name} ${lightboxIndex + 1}`}
                                        fill
                                        className="object-contain"
                                    />

                                    {/* Prev */}
                                    <button
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 transition-colors"
                                        onClick={() => setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)}
                                    >
                                        ←
                                    </button>

                                    {/* Next */}
                                    <button
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 transition-colors"
                                        onClick={() => setLightboxIndex((prev) => (prev + 1) % images.length)}
                                    >
                                        →
                                    </button>

                                    {/* Counter */}
                                    <p className="absolute bottom-4 left-1/2 -translate-x-1/2 caption text-white/60">
                                        {lightboxIndex + 1} / {images.length}
                                    </p>
                                </div>

                                {/* Thumbnails */}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-2xl px-4">
                                    {images.map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                                            className={`relative shrink-0 w-16 h-16 border-2 transition-colors ${i === lightboxIndex ? "border-white" : "border-transparent opacity-50 hover:opacity-100"
                                                }`}
                                        >
                                            <Image src={img} alt="" fill className="object-cover" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {/* Amenities */}
                        {amenities.length > 0 && (
                            <div className="flex flex-col gap-6 pb-8 border-b border-black/10">
                                <h2 className="p-bold uppercase">What this place offers</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {amenities.map((amenity, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <span className="text-xl">{icons[amenity.icon]}</span>
                                            <p className="caption text-black/70">{amenity.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {/* Detailed sections */}
                        {sections && sections.length > 0 && (
                            <div className="flex flex-col gap-4 pb-8 border-b border-black/10">
                                {/* First section — always visible, truncated */}
                                <div className="relative">
                                    <p className="p text-black/70 whitespace-pre-line line-clamp-6">
                                        {sections[0].content}
                                    </p>
                                    {/* Fade gradient over truncated text */}
                                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-white to-transparent pointer-events-none" />
                                </div>

                                <button
                                    onClick={openModal}
                                    className="w-fit flex items-center gap-2 p-bold underline underline-offset-4 hover:text-black/60 transition-colors"
                                >
                                    Show more
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                                {/* Modal — all sections */}
                                {showAllSections && (
                                    <div
                                        ref={modalBackdropRef}
                                        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 md:p-8"
                                        onClick={() => closeModal()}
                                    >
                                        <div
                                            ref={modalRef}
                                            className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-8 flex flex-col gap-6"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {/* Close */}
                                            <div className="flex items-center justify-between shrink-0">
                                                <h2 className="p-bold uppercase">About this space</h2>
                                                <button
                                                    onClick={() => closeModal()}
                                                    className="text-black/50 hover:text-black transition-colors text-xl leading-none"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                            {sections.map((section, i) => (
                                                <div key={i} className="flex flex-col gap-2">
                                                    {section.title && <h3 className="p-bold">{section.title}</h3>}
                                                    <p className="p text-black/70 whitespace-pre-line">{section.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Good to know notes */}
                        {notes && notes.length > 0 && (
                            <div className="flex flex-col gap-4 pb-8 border-b border-black/10">
                                <h2 className="p-bold uppercase">Good to know</h2>
                                <ul className="flex flex-col gap-2">
                                    {notes.map((note, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="text-stay mt-1 shrink-0">·</span>
                                            <p className="p text-black/70">{note}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Good for */}
                        {goodFor && goodFor.length > 0 && (
                            <div className="flex flex-col gap-4 pb-8 border-b border-black/10">
                                <h2 className="p-bold uppercase">A good fit if you</h2>
                                <ul className="flex flex-col gap-2">
                                    {goodFor.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="text-stay mt-1 shrink-0">✓</span>
                                            <p className="p text-black/70">{item}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {/* Location */}
                        {location && (
                            <div className="flex flex-col gap-4">
                                <h2 className="p-bold uppercase">Location</h2>
                                <p className="p text-black/70">{location}</p>
                            </div>
                        )}
                    </div>


                    {/* RIGHT — booking or inquiry */}
                    <div className="lg:sticky lg:top-8 h-fit">
                        {bookingType === "hospitable" && iframeSrc && (
                            <iframe
                                ref={iframeRef}
                                id="booking-iframe"
                                src={iframeSrc}
                                sandbox="allow-top-navigation allow-scripts allow-same-origin"
                                style={{ width: "100%", height: "700px" }}
                                className="md:ml-10"
                            />
                        )}

                        {(bookingType === "inquire" || bookingType === "apply") && (
                            <div className="md:ml-10 border-2 border-black p-8 flex flex-col gap-6">
                                {/* Header */}
                                <div className="flex flex-col gap-2">
                                    <span className="caption uppercase text-stay tracking-widest">
                                        {bookingType === "apply" ? "Work-Trade Residency" : "Inquire About This Space"}
                                    </span>
                                    <h3
                                        className="text-[clamp(1.5rem,3vw,2rem)] uppercase leading-none"
                                        style={{ fontFamily: "var(--font-display)" }}
                                    >
                                        {bookingType === "apply" ? "Apply to Stay" : "Get in Touch"}
                                    </h3>
                                    <p className="p text-black/60">
                                        {bookingType === "apply"
                                            ? "Tell us about yourself and what you'd like to contribute. We'll be in touch to discuss fit and availability."
                                            : "This space has limited availability. Reach out directly and we'll get back to you."}
                                    </p>
                                </div>

                                <div className="h-px bg-black/10" />

                                {/* Quick details */}
                                <div className="flex flex-col gap-3">
                                    {maxGuests && (
                                        <div className="flex justify-between">
                                            <span className="caption text-black/50 uppercase">Guests</span>
                                            <span className="p-bold">{maxGuests}</span>
                                        </div>
                                    )}
                                    {size && (
                                        <div className="flex justify-between">
                                            <span className="caption text-black/50 uppercase">Size</span>
                                            <span className="p-bold">{size}</span>
                                        </div>
                                    )}
                                    {location && (
                                        <div className="flex justify-between">
                                            <span className="caption text-black/50 uppercase">Location</span>
                                            <span className="p-bold text-right">{location}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="h-px bg-black/10" />

                                {/* CTA */}
                                <div className="flex flex-col gap-3">
                                    {inquireFormHref ? (
                                        <a
                                            href={inquireFormHref}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full text-center bg-black text-white p-bold py-3 hover:bg-stay transition-colors"
                                        >
                                            {inquireLabel ?? (bookingType === "apply" ? "Apply Now" : "Send Inquiry")}
                                        </a>
                                    ) : null}

                                    {inquireEmail && (
                                        <a
                                            href={`mailto:${inquireEmail}?subject=${encodeURIComponent(`Inquiry: ${name}`)}`}
                                            className="w-full text-center border-2 border-black p-bold py-3 hover:bg-black hover:text-white transition-colors"
                                        >
                                            Email us directly
                                        </a>
                                    )}
                                </div>

                                <p className="caption text-black/40 text-center">
                                    {bookingType === "apply"
                                        ? "Availability depends on current programs and capacity."
                                        : "We typically respond within 24 hours."}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* View other rooms */}
            {relatedRooms && relatedRooms.length > 0 && (
                <div className="flex flex-col gap-6 pt-8 border-t mx-auto border-black/10 max-w-7xl">
                    <p className="p-bold">Other rooms at Sattya</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {relatedRooms.slice(0, 3).map((room, i) => (
                            <a
                                key={i}
                                href={room.href}
                                className="group flex flex-col gap-3"
                            >
                                {/* Image */}
                                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                                    <Image
                                        src={room.image}
                                        alt={room.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 640px) 100vw, 33vw"
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex flex-col gap-0.5">
                                    <p className="p-bold text-black">{room.name}</p>
                                    {room.bed && (
                                        <p className="caption text-black/50">{room.bed}</p>
                                    )}
                                    {room.size && (
                                        <p className="caption text-black/40">{room.size}</p>
                                    )}
                                    {room.badge && (
                                        <p className="caption text-stay/70 uppercase tracking-widest mt-1">
                                            {room.badge}
                                        </p>
                                    )}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}