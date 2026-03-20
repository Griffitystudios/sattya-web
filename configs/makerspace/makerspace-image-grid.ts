// configs/makerspace-image-grid.ts

import { ImageGridProps } from "../../components/ui/ImageGrid";


export const makersImageGridConfig: ImageGridProps = {
    items: [
        {
            image: "/images/makerspace/sew.png",
            alt: "Join workshops session",
            label: "Build &\nWoodworking",
            hoverText: "Work on furniture, models,\nsmall structures, or repair\nprojects using shared tools.",
        },
        {
            image: "/images/makerspace/repair.png",
            alt: "Repair and electronics workspace",
            label: "Repair &\nElectronics",
            hoverText: "Fix household items, experiment with basic electronics, and try repairing instead of replacing.",
        },
        {
            image: "/images/makerspace/crafting.png",
            alt: "Crafting and upcycling",
            label: "Crafting &\nUpcycling",
            hoverText: "Sew, paint, restore, and reuse materials you already have across textiles, objects, and mixed media.",
        },
        {
            image: "/images/makerspace/join.png",
            alt: "Join workshops",
            label: "Use \nshared tools",
            hoverText: "Access communal tools and worktables without needing to own everything yourself.",
        },
    ],
    bannerText: "MAKERSPACE . SATTYA",
    color: "makerspace",
    logoSrc: "/images/SpacesMakerspace.png",
    // hoverIcon: "/images/makerspace/hover-icon.svg",


};