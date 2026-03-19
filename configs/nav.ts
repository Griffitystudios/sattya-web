// configs/nav.ts
import { NavProps } from "../components/layout/Nav";

export const navConfig: NavProps = {
    brandName: "SATTYA MEDIA ARTS COLLECTIVE",
    illustrationSrc: "/images/ui/sattys-illu.png",
    sattyaLogoSrc: "/images/logosattyb.png",
    sattyaLogoTopSrc: "/images/sattyaarts.png",
    tagline: "{tagline placeholder}",
    spaceLogos: [
        { src: "/images/makerspace/logob.png", alt: "Maker Art Space" },
        { src: "/images/cologob.png", alt: "Cowork" },
        { src: "/images/stay/logob.png", alt: "Stay" },
        { src: "/images/aloft/logob.png", alt: "Loft" },
        { src: "/images/roof/logob.png", alt: "Roof" },
        { src: "/images/artcafe/logob.png", alt: "Art Cafe" },
        { src: "/images/podlab/logob.png", alt: "Pod Lab" },
    ],
    links: [
        { label: "Home", href: "/" },
        { label: "Calendar", href: "/calendar" },
        {
            label: "Spaces",
            href: "/spaces",
            children: [
                { label: "Art Cafe", href: "/artcafe" },
                { label: "Makerspace", href: "/makerspace" },
                { label: "Cowork", href: "/cowork" },
                { label: "Podlab", href: "/podlab" },

                { label: "Loft", href: "/loft" },
                { label: "Roof", href: "/roof" },
            ],
        },
        { label: "Programs", href: "/programs" },
        { label: "Stay at Sattya", href: "/stay" },
        { label: "Spotted", href: "/spotted" },
        { label: "Get Involved", href: "/get-involved" },
        { label: "Blogs", href: "/blogs" },
        { label: "About", href: "/about" },
    ],
    contact: {
        email: "hello@sattya.org",
        phones: ["+977-9873675846", "+977-9873675846"],
        address: "Jawalakhel, Lalitpur \nBP, 44600",
    },
    socials: {
        instagram: "https://instagram.com/sattya",
        x: "https://x.com/sattya",
        pinterest: "https://pinterest.com/sattya",
    },
};