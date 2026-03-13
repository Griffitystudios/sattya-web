// configs/footer.ts
import {FooterProps} from "../components/layout/Footer";

export const footerConfig: FooterProps = {
    sattyaLogoSrc: "/images/sattyalogo.png",
    sattyaBrandName: "SATTYA\nMEDIA ARTS\nCOLLECTIVE",
    spaceLogos: [
        {src: "/images/makerspace/logo.png", alt: "Maker Art Space"},
        {src: "/images/artcafe/logo.png", alt: "Art Cafe"},
        {src: "/images/cologo.png", alt: "Cowork"},
        {src: "/images/stay/logo.png", alt: "Stay"},
        {src: "/images/podlab/logo.png", alt: "The Pod Lab"},
        {src: "/images/aloft/logo.png", alt: "Loft"},
        {src: "/images/roof/logo.png", alt: "Roof"},
    ],
    email: "hello@sattya.org",
    phones: ["+1 (312) 555-0193 ", "+1 (312) 555-0193"],
    address: "Jawalakhel, Lalitpur",
    navColumns: [
        [
            {label: "Home", href: "/"},
            {label: "Calendar", href: "/calendar"},
            {label: "Spaces", href: "/spaces"},
        ],
        [
            {label: "Programs", href: "/programs"},
            {label: "Stay at Sattya", href: "/stay"},
            {label: "Spotted", href: "/spotted"},
        ],
        [
            {label: "About", href: "/about"},
            {label: "Work", href: "/work"},
        ],
        [
            {label: "Terms", href: "/terms"},
            {label: "Privacy", href: "/privacy"},
        ],
        [
            {label: "X", href: "https://twitter.com", external: true},
            {label: "Instagram", href: "https://instagram.com", external: true},
            {label: "Pinterest", href: "https://pinterest.com", external: true},
        ],
    ],
    developerLabel: "GRIFFITYSTUDIOS",
    developerHref: "https://griffitystudios.com",
    companyName: "Sattya INC",
};
