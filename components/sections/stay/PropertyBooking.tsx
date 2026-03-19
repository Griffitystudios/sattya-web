// components/sections/stay/PropertyBooking.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import ImageGallery from "../../ui/ImageGallery";
import { IconKey, icons } from "../../../configs/icons";

interface Room {
    name: string;
    subtitle: string;
    size: string;
    bed: string;
    bathroom: string;
    description: string;
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
    iframeSrc: string;
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
}
export default function PropertyBooking({
    name,
    tagline,
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
}: PropertyBookingProps) {
    const searchParams = useSearchParams();
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

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
        <div className="min-h-screen bg-white">

            {/* Image gallery */}
            {/* {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-1 h-[50vh] md:h-[60vh]">
                    <div className="col-span-2 md:col-span-2 row-span-2 relative">
                        <Image
                            src={images[0]}
                            alt={name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    {images.slice(1, 3).map((img, i) => (
                        <div key={i} className="relative">
                            <Image src={img} alt={`${name} ${i + 2}`} fill className="object-cover" />
                        </div>
                    ))}
                </div>
            )} */}
            {/* Hero header */}
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

                        {/* Header */}
                        {/* <div className="flex flex-col gap-3 pb-8 border-b border-black/10">
                            <p className="caption uppercase text-stay tracking-widest">
                                Sattya Appartment· {location}
                            </p>
                            <h1
                                className="uppercase leading-none text-[clamp(2rem,5vw,4rem)]"
                                style={{ fontFamily: "var(--font-display)", color: "#A7937A" }}
                            >
                                {name}
                            </h1>
                            {tagline && (
                                <p
                                    className="text-black lowercase text-[clamp(1.2rem,2.5vw,2rem)] leading-none"
                                    style={{ fontFamily: "var(--font-scratchy)" }}
                                >
                                    {tagline}
                                </p>
                            )} */}

                        {/* Quick stats */}
                        {/* <div className="flex flex-wrap gap-6 mt-4">
                                {maxGuests && (
                                    <div className="flex items-center gap-2">
                                        <span className="caption text-black/40 uppercase">Guests</span>
                                        <span className="p-bold">{maxGuests}</span>
                                    </div>
                                )}
                                {bedrooms && (
                                    <div className="flex items-center gap-2">
                                        <span className="caption text-black/40 uppercase">Bedrooms</span>
                                        <span className="p-bold">{bedrooms}</span>
                                    </div>
                                )}
                                {bathrooms && (
                                    <div className="flex items-center gap-2">
                                        <span className="caption text-black/40 uppercase">Bathrooms</span>
                                        <span className="p-bold">{bathrooms}</span>
                                    </div>
                                )}
                                {size && (
                                    <div className="flex items-center gap-2">
                                        <span className="caption text-black/40 uppercase">Size</span>
                                        <span className="p-bold">{size}</span>
                                    </div>
                                )}
                            </div>
                        </div> */}

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
                            <div className="flex flex-col gap-10 pb-8 border-b border-black/10">
                                {sections.map((section, i) => (
                                    <div key={i} className="flex flex-col gap-3">
                                        <h2 className="p-bold uppercase">{section.title}</h2>
                                        <p className="p text-black/70 whitespace-pre-line">{section.content}</p>
                                    </div>
                                ))}
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

                    {/* RIGHT — sticky booking widget */}
                    <div className="lg:sticky lg:top-8 h-fit">

                        <iframe
                            ref={iframeRef}
                            id="booking-iframe"
                            src={iframeSrc}
                            sandbox="allow-top-navigation allow-scripts allow-same-origin"
                            style={{ width: "100%", height: "700px" }}
                            className="ml-10"
                        />

                    </div>

                </div>
            </div>
        </div>
    );
}