// configs/apartment-info.ts
import { SessionsAccordionProps } from "../../components/ui/SessionsAccordion";

export const apartmentInfoConfig: SessionsAccordionProps = {
    heroLine1: "Stay at",
    heroLine2: "Sattya",
    subtext: "A shared home in the heart of Jawalakhel,",
    footnote: "Utilities, Wi-Fi, and shared space cleaning are all included — no extra monthly costs.",
    starSrc: "/images/star.png",
    accentColor: "text-stay",
    accentBg: "bg-stay",
    items: [
        {
            label: "Fast Internet &\nPower Backup",
            content: {
                format: " Always-on: ~390 Mbps connection, reliable for remote work and video calls.",
                body: "Strong Wi-Fi that continues to work during power cuts, with a light and charging point in each room. Paired with reliable hot water, secure building with parking, and responsive building management — the practical side of things is well sorted.",
                note: "*Reliable water supply included",
            },
        },
        {
            label: "Shared Spaces &\nBalconies",
            content: {
                format: " Shared living: 116 sq m (1,250 sq ft) across kitchen, dining, living room, and three balconies.",
                body: "All of the spaces are well maintained, clean, and thoughtfully set up, with responsive management and a lived-in, welcoming feel. It's meant to feel like a home away from home — somewhere you can settle in, focus, and also step out into community when you want to.",
                note: "*Regular cleaning of shared spaces included",
            },
        },
        {
            label: "Sattya Community\n& Coworking",
            content: {
                format: " Optional: Coworking, cafe, art events, film screenings, and workshops — right next door.",
                body: "Downstairs and nearby, Sattya offers a coworking space, a cafe for coffee and casual meetings, and a regular rhythm of events — from screenings and workshops to informal gatherings in the Art Cafe. There's usually something happening, but never an obligation to participate.",
                note: "*Alliance Française also located in the same building",
            },
        },
        {
            label: "Neighborhood &\nDaily Life",
            content: {
                format: " Walkable: Cafes, restaurants, grocery stores, music venues, and a gym all within walking distance.",
                body: "A lively, central part of Jawalakhel makes it easy to settle into daily life in Kathmandu. A local Nepali spot across the street serves affordable dal bhat and snacks. Everything you need for a comfortable, steady stay is close by.",
                note: "*Located on the 2nd floor of a new, well-managed building",
            },
        },
        {
            label: "Project Support\n& Local Connections",
            content: {
                format: " By Inquiry: Introductions, translation, and local connections for guests working on specific projects.",
                body: "For guests working on specific projects, there may also be opportunities for support — such as introductions, translation, or local connections. These are arranged by inquiry and advance planning, depending on timing and capacity.",
                note: "*Available depending on timing and capacity",
            },
        },
        {
            label: "House Culture\n& Long Stays",
            content: {
                format: " Shared living: Starts with a one-month initial period to find the right fit.",
                body: "The apartment is at its best when everyone feels comfortable and at home. Stays begin with a one-month initial period — a chance for both you and the household to see if the space and rhythm feel right. Longer stays are very welcome once the fit is clear, with flexibility to adjust things once you've settled in.",
                note: "*Your stay directly supports Sattya and the creative work happening next door",
            },
        },
    ],
};