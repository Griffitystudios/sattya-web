// configs/makerspace-sessions.ts
import {SessionsAccordionProps} from "../../components/ui/SessionsAccordion";

export const makersSessionsConfig: SessionsAccordionProps = {
    heroLine1: "Sessions",
    heroLine2: "& Pricing",
    subtext: "Makerspace access happens through",
    footnote: "Pricing and session details vary depending on the activity and tools used.",
    starSrc: "/images/star.png",
    accentColor: "text-makerspace",
    accentBg: "bg-makerspace",
    items: [
        {
            label: "Open Sessions",
            content: {
                format: "Format: Instructor-Led. Learn from masters. Ceramics, CNC routing, screen printing, and welding.",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                note: "*Parental waiver required",
            },
        },
        {
            label: "Guided Workshops",
            content: {
                format: "Format: Instructor-Led. Learn from masters. Ceramics, CNC routing, screen printing, and welding.",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                note: "*Parental waiver required",
            },
        },
        {
            label: "Youth Programme &\nGroup Bookings",
            content: {
                format: "Format: Instructor-Led. Learn from masters. Ceramics, CNC routing, screen printing, and welding.",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                note: "*Parental waiver required",
            },
        },
    ],
};