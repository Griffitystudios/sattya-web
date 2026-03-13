import StaybodySection from "../../../components/sections/stay/stayBodysection";
import StayOptionsSection from "../../../components/sections/stay/stayOptions";
import { StaySection } from "../../../components/sections/stay/staySection";
import BookingCTA from "../../../components/ui/BookingCTA";
import { Hero } from "../../../components/ui/Hero";
import { stayBookingConfig } from "../../../configs/stay/stay-booking";
import { stayHeroConfig } from "../../../configs/stay/stay-hero";

export default function StayPage() {
  return (
    <div>
      <Hero {...stayHeroConfig} />
      <StaySection />
      <StaybodySection />
      <StayOptionsSection />
      <BookingCTA {...stayBookingConfig} />
    </div>
  );
}
