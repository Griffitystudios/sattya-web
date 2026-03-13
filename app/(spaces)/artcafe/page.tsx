import ArtcafeSection from "../../../components/sections/artcafe/artcafeSection";
import BookingCTA from "../../../components/ui/BookingCTA";
import EventsSection from "../../../components/ui/EventsSection";
import GallerySlider from "../../../components/ui/GallerySlider";
import { Hero } from "../../../components/ui/Hero";
import ImageGrid from "../../../components/ui/ImageGrid";
import InfoBanner from "../../../components/ui/InfoBanner";
import SessionsAccordion from "../../../components/ui/SessionsAccordion";
import VibeGrid from "../../../components/ui/Vibegrid";
import { artcafeBookingConfig } from "../../../configs/artcafe/artcafe-booking";
import { artcafeGallerySliderConfig } from "../../../configs/artcafe/artcafe-gallery-slider";
import { artcafeHeroConfig } from "../../../configs/artcafe/artcafe-hero";
import { artcafeImageGridConfig } from "../../../configs/artcafe/artcafe-image-grid";
import { artcafeInfoBannerConfig } from "../../../configs/artcafe/artcafe-info-banner";
import { artcafeSessionsConfig } from "../../../configs/artcafe/artcafe-sessions";
import { artVibeConfig } from "../../../configs/artcafe/artcafe-vibe";
import { artCafeEventsConfig } from "../../../configs/artcafe/artcafe-events";

export default function CoWork() {
  return (
    <div>
      <Hero {...artcafeHeroConfig} />
      <VibeGrid {...artVibeConfig} />
      <ArtcafeSection />
      <InfoBanner {...artcafeInfoBannerConfig} />
      <ImageGrid {...artcafeImageGridConfig} />
      <SessionsAccordion {...artcafeSessionsConfig} />
      <GallerySlider {...artcafeGallerySliderConfig} />
      <EventsSection {...artCafeEventsConfig} />
      <BookingCTA {...artcafeBookingConfig} />
    </div>
  );
}
