// components/ui/InfoSection.tsx
import Link from "next/link";

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
  locationAddress = "Jawalakhel, Kathmandu, Nepal",
  mapLabel = "Map Location",
  mapHref = "#",
}: InfoSectionProps) {
  return (
    <section className="w-full min-h-[70vh] flex flex-col md:flex-row border-y-2 border-makerspace">
      {/* LEFT — Opening Hours */}
      <div className="md:w-3/5 lg:w-2/3 bg-makerspace text-white p-8 md:p-16 flex flex-col justify-between">
        <p className="uppercase caption text-white flex items-center gap-2 mb-12">
          <span className="w-2 h-2  bg-white inline-block shrink-0" />
          {openingHoursLabel}
        </p>

        <div className="flex flex-col gap-8 md:gap-12">
          <div className="border-b border-white/20 pb-8 md:pb-12">
            <p className="h3-off uppercase text-white mb-4">{days}</p>
            <div className="flex flex-wrap items-baseline gap-x-4">
              <span>
                <span className="text-7xl font-display md:text-9xl lg:text-[12rem] leading-none text-white">
                  {openTime}
                </span>
                <span className="h1 ml-2 uppercase text-white">AM</span>
              </span>
              <span className=" font-display text-6xl  lg:text-7xl text-white mx-2">
                -
              </span>
              <span className="text-7xl font-display md:text-9xl lg:text-[12rem] leading-none text-white">
                {closeTime}
              </span>
              <span className="h1 ml-2 uppercase text-white">PM</span>
            </div>
          </div>
        </div>

        <p className="caption text-white uppercase mt-12 max-w-sm">
          {hoursNote}
        </p>
      </div>

      {/* RIGHT — Space Access + Location */}
      <div className="md:w-2/5 lg:w-1/3 bg-white p-8 md:p-12 flex flex-col  border-t-2 md:border-t-0 md:border-l-2 border-makerspace">
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

        {/* Location */}
        <div className="mt-auto flex flex-col mb-10 gap-6">
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
