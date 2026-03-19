// configs/stay/stayOptions.ts

export type BookingType = "hospitable" | "inquire" | "apply";

export interface StayOption {
    slug: string;
    name: string;
    tagline: string;
    type: BookingType;
    badge?: string;           // e.g. "Work-Trade" | "Private" | "Shared Living"
    description: string;
    bestFor: string[];
    includes: string[];
    ctaLabel: string;
    ctaHref: string;
    available?: boolean;
    image?: string;
}

export const stayOptions: StayOption[] = [
    {
        slug: "residency-room",
        name: "Residency Room",
        tagline: "work-trade stay at sattya",
        type: "apply",
        badge: "Work-Trade",
        description:
            "A simple private room for artists, makers, and creatives contributing to Sattya. Accommodation covered in exchange for a set number of hours per week supporting Sattya's programs, spaces, or projects.",
        bestFor: [
            "Visiting artists",
            "Facilitators and collaborators",
            "Longer stays on a budget",
            "People who want to be actively involved",
        ],
        includes: [
            "Private room",
            "Shared bathroom",
            "Access to Sattya spaces during open hours",
            "Community meals (details vary)",
        ],
        ctaLabel: "Apply to Residency",
        ctaHref: "/stay/residency/apply",
        available: true,
        image: "/images/stay/residency.jpg",
    },
    {
        slug: "sattya-residence",
        name: "Sattya Residence",
        tagline: "private one-bedroom apartment",
        type: "hospitable",
        badge: "Private Apartment",
        description:
            "A quiet, well-appointed private one-bedroom apartment on the 3rd floor of Sattya. Functions as a fully private apartment — the founder's home when in residence, available at select times for short- or mid-term stays.",
        bestFor: [
            "Visiting artists and curators",
            "Creative professionals",
            "Researchers or remote workers",
            "Solo travelers or couples",
            "People who want privacy with easy access to the community",
        ],
        includes: [
            "Private one-bedroom apartment",
            "Living area and kitchen",
            "Dedicated workspace",
            "AC for heating and cooling",
            "Strong Wi-Fi",
            "Easy access to Sattya spaces",
        ],
        ctaLabel: "Check Availability",
        ctaHref: "/stay/sattya-residence",
        available: true,
        image: "/images/stay/residence.jpg",
    },
    {
        slug: "sattya-apartment",
        name: "Sattya Apartment",
        tagline: "three-bedroom shared living",
        type: "hospitable",
        badge: "Shared Living",
        description:
            "A three-bedroom shared apartment next to Sattya. Individual private rooms within a shared living space — suited to mid- to longer-term stays for people who want community-oriented living with independence.",
        bestFor: [
            "Visiting creatives and researchers",
            "Remote workers",
            "Longer stays",
            "People who enjoy shared living with personal space",
        ],
        includes: [
            "Private bedroom (3 options)",
            "Shared kitchen and living areas",
            "Strong Wi-Fi (~390 Mbps)",
            "Easy access to Sattya spaces",
            "Utilities and cleaning included",
        ],
        ctaLabel: "View Rooms",
        ctaHref: "/stay/sattya-apartment",
        available: true,
        image: "/images/stay/apt-1.jpg",
    },
];

