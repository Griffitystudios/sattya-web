import BookingCTA from "../../../components/ui/BookingCTA";
import EventsSection from "../../../components/ui/EventsSection";
import GallerySlider from "../../../components/ui/GallerySlider";
import { Hero } from "../../../components/ui/Hero";
import ImageGrid from "../../../components/ui/ImageGrid";
import InfoBanner from "../../../components/ui/InfoBanner";
import SessionsAccordion from "../../../components/ui/SessionsAccordion";
import VibeGrid from "../../../components/ui/Vibegrid";
import { coworkHeroConfig } from "../../../configs/cowork/cowork-hero";
import CoworkSection from "../../../components/sections/cowork/coworkSection";
import { coworkVibeConfig } from "../../../configs/cowork/cowork-vibe";
// import { coworkInfoBannerConfig } from "../../../configs/cowork/cowork-info-banners";
import { coworkBookingConfig } from "../../../configs/cowork/cowork-booking";
import { coworkSessionsConfig } from "../../../configs/cowork/cowork-sessions";
import { coworkImageGridConfig } from "../../../configs/cowork/cowork-gallery-grid";
import InfoSectionAlt from "../../../components/ui/InfoSectionAlt";
import { makerspaceInfoAltConfig } from "../../../configs/cowork/cowork-info-alt";
import ImageGridAlt from "../../../components/ui/ImageGridAlt";

export default function CoWork() {
  return (
    <div>
      <Hero {...coworkHeroConfig} />
      <VibeGrid {...coworkVibeConfig} />
      <CoworkSection />
      {/* <InfoBanner {...coworkInfoBannerConfig} /> */}
      {/* <InfoBanner {...coworkInfoBannerConfig} /> */}

      <InfoSectionAlt {...makerspaceInfoAltConfig} />
      <ImageGrid {...coworkImageGridConfig} />
      <SessionsAccordion {...coworkSessionsConfig} />
      <BookingCTA {...coworkBookingConfig} />
    </div>
  );
}
