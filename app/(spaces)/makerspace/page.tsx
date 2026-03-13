import Makerspacesection from "../../../components/sections/makerspace/Makerspacesection";
import VibeGrid from "../../../components/ui/Vibegrid";
import { makersInfoBannerConfig } from "../../../configs/makerspace/makerspace-info-banner";
import InfoBanner from "../../../components/ui/InfoBanner";
import ImageGrid from "../../../components/ui/ImageGrid";
import { makersImageGridConfig } from "../../../configs/makerspace/makerspace-image-grid";
import SessionsAccordion from "../../../components/ui/SessionsAccordion";
import { makersSessionsConfig } from "../../../configs/makerspace/makerspace-sessions";
import GallerySlider from "../../../components/ui/GallerySlider";
import { artCafeEventsConfig } from "../../../configs/makerspace/makerspace-events";
import EventsSection from "../../../components/ui/EventsSection";
import BookingCTA from "../../../components/ui/BookingCTA";
import { makersBookingConfig } from "../../../configs/makerspace/makerspace-booking";
import { Hero } from "../../../components/ui/Hero";
import { makersGallerySliderConfig } from "../../../configs/makerspace/makerspace-gallery-slider";
import { makersHeroConfig } from "../../../configs/makerspace/makerspace-hero";
import { makersVibeConfig } from "../../../configs/makerspace/makerspace-vibe";
import { makerspaceInfoConfig } from "../../../configs/makerspace/makerspace-info";
import InfoSection from "../../../components/ui/InfoSection";
import ImageGridAlt from "../../../components/ui/ImageGridAlt";

export default function CoWork() {
  return (
    <div>
      <Hero {...makersHeroConfig} />
      <VibeGrid {...makersVibeConfig} />
      <Makerspacesection />
      {/* <InfoBanner {...makersInfoBannerConfig} /> */}
      <InfoSection {...makerspaceInfoConfig} />
      <ImageGridAlt {...makersImageGridConfig} />
      <SessionsAccordion {...makersSessionsConfig} />
      <GallerySlider {...makersGallerySliderConfig} />
      <EventsSection {...artCafeEventsConfig} />
      <BookingCTA {...makersBookingConfig} />
    </div>
  );
}
