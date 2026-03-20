// configs/artcafe-image-grid.ts

import { ImageGridProps } from "../../components/ui/ImageGrid";


export const artcafeImageGridConfig: ImageGridProps = {
    items: [
        {
            image: "/images/artcafe/img1.png",
            alt: "Tea or coffee",
            label: "Tea or\nCoffee",
            hoverText: "Sip something warm while you settle in — the café is as much about conversation as creation.",
            colSpan: 2
        },
        {
            image: "/images/artcafe/party.png",
            alt: "Solo or with a friend",
            label: "Solo or\nWith a Friend",
            hoverText: "Come alone for quiet focus or bring a friend to share ideas, tools, and laughter.",
            rowSpan: 2,
        },
        {
            image: "/images/artcafe/crafting.png",
            alt: "Hang out",
            label: "Hang Out",
            hoverText: "Relax in a welcoming space — browse, chat, or just enjoy the atmosphere.",

        },
        {
            image: "/images/artcafe/img5.png",
            alt: "Make something",
            label: "Make\nSomething",
            hoverText: "Pick up tools, materials, or inspiration to craft, repair, or experiment hands-on.",
            colSpan: 2
        },
        {
            image: "/images/artcafe/img1.png",
            alt: "See what's going on",
            label: "See What’s\nGoing On",
            hoverText: "Check out workshops, events, or spontaneous projects happening around the space.",
        },
    ],
    bannerText: "artcafe . SATTYA",
    color: "artcafe",
    logoSrc: "/images/Spacesartcafe.png",
    // hoverIcon: "/images/artcafe/hover-icon.svg",
    cols: 4,

};