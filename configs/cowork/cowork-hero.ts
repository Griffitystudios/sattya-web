// configs/cowork-hero.ts
import { HeroProps } from "../../components/ui/Hero";

export const coworkHeroConfig: HeroProps = {
  // brandName: "SATTYA\nMEDIA ARTS\nCOLLECTIVE",
  logoSrc: "/images/cowork/logo.png",

  scrollText: "SCROLL TO EXPLORE",
  autoPlayInterval: 2000,
  slides: [
    {
      backgroundImage: "/images/cowork/img1.png",
    },
    {
      backgroundImage: "/images/cowork/img2.png",
    },
  ],
};
