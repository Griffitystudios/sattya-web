// configs/cowork-image-grid.ts

import { ImageGridProps } from "../../components/ui/ImageGrid";


export const coworkImageGridConfig: ImageGridProps = {
    items: [
        {
            image: "/images/cowork/img3.png",
            alt: "Meeting Rooms",
            label: "Meeting\nRooms",
            hoverText: "Book private meeting rooms for focused discussions, client presentations, or team collaborations.",
            colSpan: 2
        },
        {
            image: "/images/cowork/img1.png",
            alt: "Office Space",
            label: "Office\nSpace",
            hoverText: "Rent dedicated office spaces for teams of 2–6 people, offering privacy and professional amenities.",
            rowSpan: 2
        },
        {
            image: "/images/cowork/img2.png",
            alt: "Desk Space",
            label: "Desk\nSpace",
            hoverText: "Shared Desk space for daily co-working with high-speed internet and comfortable seating.",
        },
        {
            image: "/images/cowork/img4.png",
            alt: "Call Booths",
            label: "Call\nBooths",
            hoverText: "Soundproof booths for private phone calls, video meetings, or focused work sessions.",
            colSpan: 2
        },
        {
            image: "/images/cowork/img5.png",
            alt: "Refreshment Breaks",
            label: "Refreshment\nBreaks",
            hoverText: "A focused work area connected to the rest of Sattya. Take breaks into events, the cafe, or whatever’s happening elsewhere in the building.",
        },
    ],
    bannerText: "cowork . SATTYA",
    color: "cowork",
    logoSrc: "/images/cologob.png",


};