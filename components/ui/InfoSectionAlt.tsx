// components/ui/InfoSectionAlt.tsx
import Link from "next/link";

export interface InfoSectionAltProps {
  openingHoursLabel?: string;
  days?: string;
  time?: string;
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

export default function InfoSectionAlt({
  openingHoursLabel = "Opening Hours",
  days = "Wednesday – Sunday",
  time = "10:00 AM – 5:00 PM",
  hoursNote = "* Hours may shift during workshops or special sessions.",
  spaceAccessLabel = "Space Access",
  spaceAccessHeading = "Use is supervised and community driven.",
  spaceAccessNote = "Introductory sessions required for heavy tool usage.",
  locationLabel = "Location",
  locationName = "Sattya Collective",
  locationAddress = "Jawalakhel, Kathmandu",
  mapLabel = "Open Map",
  mapHref = "#",
}: InfoSectionAltProps) {
  return (
    <section className="w-full border-b-2 border-black bg-white">
      {/* Opening Hours */}
      <div className="w-full py-20 px-6 md:px-12 border-b-2 border-black bg-cowork flex flex-col justify-center items-center text-center">
        <p className="caption uppercase flex text-white items-center gap-4 mb-12">
          <span className="w-3 h-3 bg-white  inline-block shrink-0" />
          {openingHoursLabel}
        </p>

        <div className="max-w-7xl">
          <p
            className="text-[clamp(2.5rem,8vw,7rem)] uppercase text-white leading-none mb-4 tracking-tighter"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {days}
          </p>
          <p
            className="text-[clamp(2rem,6vw,5rem)] uppercase  leading-none tracking-tighter text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {time}
          </p>
        </div>

        <p className="caption text-white uppercase mt-12">{hoursNote}</p>
      </div>

      {/* Space Access + Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-black">
        {/* Space Access */}
        <div className="p-12 md:p-24 flex flex-col justify-between items-start gap-10">
          <div className="flex flex-col gap-8">
            <p className="caption uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-black inline-block shrink-0" />
              {spaceAccessLabel}
            </p>
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)] uppercase leading-[0.9] tracking-tighter"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {spaceAccessHeading}
            </h2>
          </div>
          <p className="p text-black/50 uppercase">{spaceAccessNote}</p>
        </div>

        {/* Location */}
        <div className="p-12 md:p-24 flex flex-col justify-between items-start gap-10">
          <div className="flex flex-col gap-8">
            <p className="caption uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-black inline-block shrink-0" />
              {locationLabel}
            </p>
            <div className="flex flex-col gap-2">
              <p
                className="text-[clamp(1.8rem,3.5vw,3rem)] uppercase tracking-tight leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {locationName}
              </p>
              <p
                className="text-[clamp(1.4rem,2.5vw,2rem)] uppercase tracking-tight text-black/50"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {locationAddress}
              </p>
            </div>
          </div>

         <a
            href={mapHref}
            className="group inline-flex items-center gap-4 p-bold uppercase  transition-colors underline-offset-6 hover:underline hover:text-makerspace flex items-center gap-1 mt-1 w-fit"
          >
            {mapLabel}
            <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
