"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="group fixed bottom-6 right-6 z-50"
        >
            {/* Shadow */}
            <div className="absolute translate-x-1 translate-y-1 w-full h-full border-2 border-black bg-black opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />

            {/* Button */}
            <div className="relative border-2 border-black bg-white px-4 py-2 font-bold uppercase text-sm transition-all duration-200 group-hover:-translate-x-1 group-hover:-translate-y-1">
                ↑ Top
            </div>
        </button>
    );
}