// configs/makerspace-gallery-slider.ts

import {GallerySliderProps} from "../../components/ui/GallerySlider";

export const makersGallerySliderConfig: GallerySliderProps = {
    color: "makerspace",
    sliderVariant: "light",
    instagramLabel: "More from the Makerspace on Instagram.",
    instagramHref: "https://instagram.com/sattya",
    instagramIcon: "/icons/instagram.svg",
    autoPlayInterval: 4000,
    slides: [
        {
            image: "/images/makersbg.png",
            alt: "Sattya Makerspace interior with tree mural",
        },
        {
            image: "/images/makerspace/crafting.png",
            alt: "Makerspace workspace",
        },
        {
            image: "/images/makerspace/join.png",
            alt: "Makerspace tools and projects",
        },
    ],
};