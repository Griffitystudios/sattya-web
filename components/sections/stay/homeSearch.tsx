"use client";

import Script from "next/script";
import { useState, useEffect } from "react";

function BookingWidgetSkeleton() {
    return (
        <div className="flex flex-col sm:flex-row gap-3 animate-pulse py-15">
            <div className="flex-1 h-13 bg-stay/20 rounded-xl border border-stay/20" />
            <div className="flex-1 h-13 bg-stay/20 rounded-xl border border-stay/20" />
            <div className="w-full sm:w-28 h-13 bg-stay/40 rounded-xl" />
        </div>
    );
}

export default function HomeSearch() {
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        // If navigating back to this page, script is already loaded
        // Check if the custom element is already registered
        if (customElements.get("hospitable-direct-mps")) {
            setScriptLoaded(true);
        }
    }, []);

    return (
        <div className="max-w-7xl mx-auto mt-30  ">
            {/* Heading */}
            <div className="w-fit mb-10 mx-auto">
                <h2 className="text-h2 font-regular text-black uppercase leading-none">
                    Book your Accomodation at Sattya
                </h2>
            </div>

            {/* Widget area */}
            <div className="relative min-h-[48px] z-30">
                {!scriptLoaded && <BookingWidgetSkeleton />}
                <div className={scriptLoaded ? "block" : "hidden"}>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: `<hospitable-direct-mps identifier="83f73e42-8f5d-4ebf-9683-dd3078a96cec" type="custom" results-url="/stay/search"></hospitable-direct-mps>`,
                        }}
                    />
                </div>
            </div>

            <Script
                src="https://hospitable.b-cdn.net/direct-property-search-widget/hospitable-search-widget.prod.js"
                strategy="lazyOnload"
                onLoad={() => setScriptLoaded(true)}
            />
        </div>
    );
}