
import HomeSearch from "../../../components/sections/stay/homeSearch";
import StayImageGrid from "../../../components/sections/stay/imageGrid";
import StaybodySection from "../../../components/sections/stay/stayBodysection";
import StaybodySection2 from "../../../components/sections/stay/stayBodysection2";
import StayOptionsSection from "../../../components/sections/stay/stayOptions";
import StaySection from "../../../components/sections/stay/staySection";
import BookingCTA from "../../../components/ui/BookingCTA";
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

      <HomeSearch />

      <StaySection />
      <StaybodySection />
      <StayImageGrid {...stayImageGridConfig} />
      {/* <StaybodySection2 /> */}
      {/* <StayOptionsSection /> */}
      <SessionsAccordion {...apartmentInfoConfig} />
      <BookingCTA {...stayBookingConfig} />
    </div>
  );
}