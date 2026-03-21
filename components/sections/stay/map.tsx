
'use client'
import React, { useEffect, useRef } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const MapComponent = () => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<Map | null>(null);

    const defaultCenter: [number, number] = [85.313090, 27.675543];
    const defaultZoom = 18;

    useEffect(() => {
        if (map.current) return;
        if (mapContainer.current) {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/light-v11",
                center: defaultCenter,
                zoom: defaultZoom,
            });

            const el = document.createElement("div");
            el.className = "custom-marker";
            el.style.backgroundImage = "url('/images/ui/logosattyab.png')";
            el.style.width = "70px";
            el.style.height = "70px";
            el.style.backgroundSize = "cover";
            el.style.borderRadius = "50%";

            new mapboxgl.Marker(el)
                .setLngLat(defaultCenter)
                .addTo(map.current);
        }
    }, []);

    const handleReset = () => {
        if (map.current) {
            map.current.flyTo({
                center: defaultCenter,
                zoom: defaultZoom,
                essential: true,
            });
        }
    };

    return (
        <div className=" w-full px-30 mb-20 mt-20">

            {/* Address bar */}
            <div className="flex items-end uppercase justify-between mb-4">
                <div className="flex flex-col gap-1">
                    <p className="h3 text-black">
                        Sattya Media Arts Collective
                    </p>
                    <p className="h3 text-black">
                        Jawalakhel, Lalitpur, Bagmati Province
                    </p>
                    <a
                        href="https://maps.google.com/?q=27.675543,85.313090"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p text-black underline underline-offset-8 hover:text-stay transition-colors flex items-center gap-1 w-fit mt-1"
                    >
                        View on Google Maps {" "}
                        {/* <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg> */}
                        ↗
                    </a>
                </div>

                <p className="h3 text-black shrink-0">+977-987777787</p>
            </div>

            {/* Map */}
            <div
                ref={mapContainer}
                className="w-full relative h-[30vh] border border-stay/30"
            ><button
                onClick={handleReset}
                className="absolute top-0 right-0 z-100 px-4 py-2 bg-stay text-white hover:bg-stay/80 transition-all duration-300 ease-in-out"
            >
                    Reset Map
                </button></div>

        </div>
    );
};

export default MapComponent;