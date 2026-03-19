// configs/stay/stay-image-grid.ts
import { ImageGridProps } from "../../components/sections/stay/imageGrid";

export const stayImageGridConfig: ImageGridProps = {
    items: [
        {
            image: "/images/stay/img1.png",
            alt: "Sattya Apartment",
            label: "Sattya\nApartment",
            href: "/stay/sattya-apartment",
            hoverText: "A full three-bedroom shared apartment next to Sattya. Two queen rooms, one double, two bathrooms, kitchen, living area, and three balconies. 116 sq m of real space to settle into Kathmandu.",
            colSpan: 2,
        },
        {
            image: "/images/stay/img3.png",
            alt: "Creative Residency",
            label: "Creative\nResidency",
            hoverText: "A work-trade stay for artists, makers, and creatives contributing to Sattya. Private room in exchange for a set number of hours supporting Sattya's programs and spaces.",
        },
        {
            image: "/images/stay/img2.png",
            alt: "Sattya Residence",
            label: "Sattya\nResidence",
            hoverText: "A quiet, private one-bedroom apartment on the 3rd floor of Sattya. AC, dedicated workspace, full kitchen, and strong Wi-Fi. Privacy with easy access to the community below.",
            rowSpan: 2,
        },
        {
            image: "/images/stay/img4.png",
            alt: "Marigold Room",
            label: "Marigold\nRoom",
            href: "/stay/large-room",
            hoverText: "The largest room in the Sattya Apartment. Queen bed, private bathroom, built-in closets, and a small desk. 152 sq ft of comfortable, self-contained space for longer stays.",
        },
        {
            image: "/images/stay/img5.png",
            alt: "Tulsi Room",
            label: "Tulsi\nRoom",
            href: "/stay/mid-size-room",
            hoverText: "A mid-sized room in the Sattya Apartment. Queen bed, built-in storage, and a shared bathroom with just one other room — cleaned daily. 110 sq ft, a good balance of space and value.",
        },
        {
            image: "/images/stay/img7.png",
            alt: "Aasha Room",
            label: "Aasha\nRoom",
            href: "/stay/small-room",
            hoverText: "A compact, affordable room in the Sattya Apartment. Double bed, best for one person. Shared bathroom with one other room. 90 sq ft — the most affordable way to stay at Sattya.",
        },
    ],
    bannerText: "stay . SATTYA",
    color: "stay",
    logoSrc: "/images/cologob.png",
};