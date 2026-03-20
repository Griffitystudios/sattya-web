
import HomeSearch from "../../../components/sections/stay/homeSearch";
import StayImageGrid from "../../../components/sections/stay/imageGrid";
import StaybodySection from "../../../components/sections/stay/stayBodysection";
import StaybodySection2 from "../../../components/sections/stay/stayBodysection2";
import StayBookingCTA from "../../../components/sections/stay/StayBookingCTA";
import StayOptionsSection from "../../../components/sections/stay/stayOptions";
import StaySection from "../../../components/sections/stay/staySection";
import { Hero } from "../../../components/ui/Hero";
import SessionsAccordion from "../../../components/ui/SessionsAccordion";
import { apartmentInfoConfig } from "../../../configs/stay/accordion";
import { stayBookingConfig } from "../../../configs/stay/stay-booking";
import { stayHeroConfig } from "../../../configs/stay/stay-hero";
import { stayImageGridConfig } from "../../../configs/stay/stay-image-grid";



export default function StayPage() {


  return (
    <div>
      <Hero {...stayHeroConfig} />


      <StaySection />
      <HomeSearch />
      <StaybodySection />
      <StayImageGrid {...stayImageGridConfig} />
      {/* <StaybodySection2 /> */}
      {/* <StayOptionsSection /> */}
      <SessionsAccordion {...apartmentInfoConfig} />
      <StayBookingCTA {...stayBookingConfig} />
    </div>
  );
}