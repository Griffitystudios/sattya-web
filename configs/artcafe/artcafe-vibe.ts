// configs/artcafe.ts

import { VibeGridProps } from "../../components/ui/Vibegrid";

export const artVibeConfig: VibeGridProps = {
  bgColor: "bg-artcafe",
  textColor: "text-white",
  textOpacity: "text-white/90",
  widthClass: "w-8 md:w-12",
  items: [
    {
      icon: "/images/artcafe/diy.svg",
      title: "DIY",
      description: "Adjust, fix, reuse.",
    },
    {
      icon: "/images/artcafe/coffee.svg",
      title: "Coffee",
      description: "Models, objects, parts.",
    },
    {
      icon: "/images/artcafe/everyday.svg",
      title: "Everyday",
      description: "Textiles and soft materials.",
    },
    {
      icon: "/images/artcafe/messy.svg",
      title: "Messy",
      description: "Ideas in progress.",
    },
    {
      icon: "/images/artcafe/shared.svg",
      title: "Shared",
      description: "Shared and hands-on.",
    },
    {
      icon: "/images/artcafe/stay.svg",
      title: "Stay",
      description: "Space to focus.",
    },
  ],
  floatingItems: [
    {
      icon: "/images/artcafe/mug.svg",
      alt: "Featured 1",
      position: "bottom-left",
      className: "-rotate-35"
    },
    {
      icon: "/images/artcafe/coffee-plant.svg",
      alt: "Featured 2",
      position: "top-right",
      className: 'rotate-30'
    },
  ],
};
