// configs/artcafe-image-grid.ts

import {ImageGridProps} from "../../components/ui/ImageGrid";


export const coworkImageGridConfig: ImageGridProps = {
    items: [
        {
            image: "/images/artcafe/img1.png",
            alt: "Join workshops session",
            label: "Build &\nWoodworking",
            hoverText: "Work on furniture, models,\nsmall structures, or repair\nprojects using shared tools.",
            colSpan: 2
        },
        {
            image: "/images/artcafe/party.png",
            alt: "Repair and electronics workspace",
            label: "Repair &\nElectronics",
            hoverText: "Fix household items, experiment with basic electronics, and try repairing instead of replacing.",
            rowSpan: 2
        },
        {
            image: "/images/artcafe/crafting.png",
            alt: "Crafting and upcycling",
            label: "Crafting &\nUpcycling",
            hoverText: "Sew, paint, restore, and reuse materials you already have across textiles, objects, and mixed media.",
        },
        {
            image: "/images/artcafe/img5.png",
            alt: "Join workshops",
            label: "Use \nshared tools",
            hoverText: "Access communal tools and worktables without needing to own everything yourself.",
            colSpan: 2
        },
        {
            image: "/images/artcafe/img5.png",
            alt: "Join workshops",
            label: "Use \nshared tools",
            hoverText: "Access communal tools and worktables without needing to own everything yourself.",
        },
    ],
    bannerText: "cowork . SATTYA",
    color: "cowork",
    hoverIcon: "/images/makerspace/bulb.svg",
    logoSrc: "/images/cologob.png",


};