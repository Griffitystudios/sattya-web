// configs/makerspace.ts

import {VibeGridProps} from "../../components/ui/Vibegrid";

export const makersVibeConfig: VibeGridProps = {
    bgColor: "bg-makerspace",
    textColor: "text-white",
    textOpacity: "text-white/90",
    items: [
        {
            icon: "/images/makerspace/repair.svg",
            title: "Repair",
            description: "Adjust, fix, reuse.",
        },
        {
            icon: "/images/makerspace/build.svg",
            title: "Build",
            description: "Models, objects, parts.",
        },
        {
            icon: "/images/makerspace/sew.svg",
            title: "Sew",
            description: "Textiles and soft materials.",
        },
        {
            icon: "/images/makerspace/test.svg",
            title: "Test",
            description: "Ideas in progress.",
        },
        {
            icon: "/images/makerspace/tools.svg",
            title: "Tools",
            description: "Shared and hands-on.",
        },
        {
            icon: "/images/makerspace/work.svg",
            title: "Work",
            description: "Space to focus.",
        },
    ],
    floatingItems: [
        {
            icon: "/images/makerspace/tape.svg",
            alt: "Featured 1",
            position: "bottom-left",

        },
        {
            icon: "/images/makerspace/hand.svg",
            alt: "Featured 2",
            position: "top-right",
        },
    ],
};