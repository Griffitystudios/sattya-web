// components/ui/InfoSection.tsx
import Link from "next/link";
import Image from "next/image";

export interface InfoSectionProps {
  openingHoursLabel?: string;
  days?: string;
  openTime?: string;
  closeTime?: string;
  hoursNote?: string;
  spaceAccessLabel?: string;
  spaceAccessHeading?: string;
  spaceAccessNote?: string;
  locationLabel?: string;
  locationName?: string;
  locationAddress?: string;
  mapLabel?: string;
  mapHref?: string;
  heroHeading?: string;
}

export default function InfoSection({
  openingHoursLabel = "Opening Hours",
  days = "Wednesday – Sunday",
  openTime = "10:00",
  closeTime = "05:00",
  hoursNote = "* Note: Working hours may shift during special workshops or community sessions.",
  spaceAccessLabel = "Space Access",
  spaceAccessHeading = "Makerspace use is supervised. Introductions required for specific heavy machinery.",
  spaceAccessNote = "Prioritize safety at all times.",
  locationLabel = "Location",
  locationName = "Sattya Media Arts Collective",
  heroHeading = "Your home to\nexperiment\nand create",
  locationAddress = "Jawalakhel, Kathmandu, Nepal",
  mapLabel = "Map Location",
  mapHref = "#",
}: InfoSectionProps) {
  return (
    <section className="w-full min-h-[70vh] flex flex-col md:flex-row border-y-2 border-makerspace">
      {/* LEFT — hero heading */}
      <div className="md:w-3/5 lg:w-2/3 bg-makerspace text-white p-8  flex items-center justify-center relative overflow-hidden min-h-[50vh] md:min-h-0">


        {/* Heading + scribble */}
        <div className="relative w-full xl:w-2/3 mx-auto">
          <h2
            className="text-white uppercase leading-none z-20 relative text-[clamp(3rem,5vw,6rem)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {heroHeading.split("\n").map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </h2>

        </div>

      </div>
      {/* RIGHT — Space Access + Location */}
      <div className="md:w-2/5 lg:w-1/3 justify-evenly gap-10 bg-white p-8 md:p-12 flex flex-col  border-t-2 md:border-t-0 md:border-l-2 border-makerspace">
        {/* Space Access */}
        <div>
          <p className="caption uppercase text-makerspace flex items-center gap-2 mb-6">
            <span className="w-2 h-2 bg-makerspace inline-block shrink-0" />
            {spaceAccessLabel}
          </p>
          <p className="p-bold uppercase leading-snug mb-4">
            {spaceAccessHeading}
          </p>
          <p className="caption text-makerspace/50 uppercase">
            {spaceAccessNote}
          </p>
        </div>
        {/* Opening Hours */}
        <div>
          <p className="caption uppercase text-makerspace flex items-center gap-2 mb-6">
            <span className="w-2 h-2 bg-makerspace  inline-block shrink-0" />
            {openingHoursLabel}
          </p>
          <p className="uppercase h3-off leading-snug mb-4">
            {days}
          </p>
          <span className="text-[clamp(4.8rem,5vw,7.5rem)] font-display
 leading-none text-makerspace">
            {openTime}
          </span>
          <span className="h1 ml-2 uppercase text-makerspace">AM</span>
          <span className=" font-display text-[clamp(4.8rem,5vw,7.5rem)]  lg:text-[4.8rem] text-makerspace mx-2">
            -
          </span>
          <span className="text-[clamp(4.8rem,5vw,7.5rem)] font-display
 leading-none text-makerspace">
            {closeTime}
          </span>
          <span className="h1 ml-2 uppercase text-makerspace">PM</span>
          <p className="caption text-black/50 uppercase">
            {hoursNote}
          </p>
        </div>

        {/* Location */}
        <div className="flex flex-col mb-10 gap-6">
          <p className="caption uppercase text-makerspace flex items-center gap-2">
            <span className="w-2 h-2 bg-makerspace inline-block shrink-0" />
            {locationLabel}
          </p>
          <div className="flex flex-col gap-1">
            <p className="p-bold uppercase">{locationName}</p>
            <p className="caption text-makerspace/50 uppercase">
              {locationAddress}
            </p>
          </div>
          <a
            href={mapHref}
            className=" underline-offset-6 hover:underline hover:text-makerspace flex items-center gap-1 mt-1 w-fit"
          >
            {mapLabel}
            <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
