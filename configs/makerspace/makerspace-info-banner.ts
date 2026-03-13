// configs/makerspace-info-banner.ts

import {InfoBannerProps} from "../../components/ui/InfoBanner";

export const makersInfoBannerConfig: InfoBannerProps = {
    bgColor: "bg-makerspace",
    textColor: "text-white",
    items: [
        {
            icon: "/images/ui/hours.svg",
            label: "HOURS",
            heading: "Wednesday to Sunday\n10:00 am to 5:00 pm.",
            body: "Hours may shift during workshops or sessions.",
        },
        {
            icon: "/images/ui/access.svg",
            label: "ACCESS",
            body: "Makerspace use is supervised.",
            caption: "Some tools require a short introduction before use.",
        },
        {
            icon: "/images/ui/location.svg",
            label: "Location",
            body: "Sattya Media Arts Collective\nJawalakhel, Kathmandu",
            footer: {
                label: "View on Google Maps",
                href: "https://maps.google.com/?q=Sattya+Media+Arts+Collective",
            },
        },
    ],
};