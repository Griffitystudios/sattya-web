// app/stay/booking/page.tsx
import Image from "next/image";
import BookingWidget from "../../../../components/sections/stay/bookingWidget";

export default function BookingPage() {
    return (
        <main
            className="min-h-screen"
            style={{
                backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
            }}
        >
            {/* Hero */}
            <div className="relative h-[40vh] min-h-[300px]">
                <div className="absolute inset-0 bg-[url('/images/stay/img1.png')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative h-full flex items-center text-white px-6 sm:px-10 lg:px-16">
                    <div className="max-w-7xl mx-auto flex flex-col gap-4">
                        <p className="caption uppercase tracking-widest text-white/60">Stay at Sattya</p>
                        <h1
                            className="uppercase leading-none text-[clamp(2.5rem,6vw,5.5rem)] text-white"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            Find Your Room
                        </h1>
                        <p className="p text-white/70 max-w-lg">
                            Simple, comfortable stays in the heart of Kathmandu's creative community.
                        </p>
                    </div>
                </div>
            </div>


            {/* Widget — fills remaining viewport height */}
            <div
                className="max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-16"
            >

                <BookingWidget />

            </div>
            {/* Footer note */}
            <div className="px-6 sm:px-10 lg:px-16 py-16 max-w-5xl mx-auto">
                <p className="caption text-black/30 text-center">
                    All stays include access to common areas.
                    <br />
                    For group bookings or extended stays, contact us directly.
                </p>
            </div>
        </main>
    );
}