// components/ui/SpottedSection.tsx
import KathmanduCollage from "./collage";
export interface SpottedSectionProps {
    paragraphs?: {
        text: string;
        boldWord?: string; // word to make bold at start
    }[];
}

export default function SpottedSection({
    paragraphs = [
        {
            text: "Spotted is only as strong as our community: we gather, organize, and share; you bring exciting things to life and keep us in the loop.",
            boldWord: "Spotted",
        },
        {
            text: "We hope you enjoy spotted and give us feedback! we don't endorse every event, nor can we make it to all of them so it's helpful when you let us know what's good.",
            boldWord: "spotted",
        },
        {
            text: "Please submit and keep making ktm a lively and creative place to be.",
        },
    ],
}: SpottedSectionProps) {
    return (
        <section className="w-full px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* LEFT — text */}
                <div className="flex flex-col gap-6">
                    {paragraphs.map((para, i) => {
                        if (!para.boldWord) {
                            return <p key={i} className="p text-black">{para.text}</p>;
                        }

                        // Split text using the boldWord, case-insensitive
                        const parts = para.text.split(new RegExp(`(${para.boldWord})`, "gi"));

                        return (
                            <p key={i} className="p text-black">
                                {parts.map((part, j) =>
                                    part.toLowerCase() === para.boldWord!.toLowerCase() ? (
                                        <span key={j} className="p-bold">{part}</span>
                                    ) : (
                                        part
                                    )
                                )}
                            </p>
                        );
                    })}
                </div>

                {/* RIGHT — collage */}
                <div className="flex items-center justify-center">
                    <KathmanduCollage className="w-full max-w-lg" />
                </div>

            </div>
        </section>
    );
}