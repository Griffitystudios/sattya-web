import Image from "next/image";

export const StaySection = () => {
    return (
        <section className="w-full h-[515px] bg-[#A7937A] relative flex items-center justify-center">
            <div className="text-center">
                <p className="text-lg md:text-xl text-white mt-4">
                  There are different options to explore if you want to stay at Sattya, with
                  mid-term and longer-term stays in Kathmandu.<br/> These stays are suited to people
                  who want a comfortable base,  access to shared spaces,<br/> and proximity to an active
                  creative community.
                </p>
            </div>
            <Image
                  src="/images/stay/house.svg"
                  alt="Stay Image"
                  width={192}
                  height={218}
                  className="absolute bottom-0 right-5 z-50"
                />
                <Image
                  src="/images/stay/stairs.svg"
                  alt="Stay Image"
                  width={100}
                  height={200}
                  className="absolute bottom-0 left-5 z-50"
                />
        </section>
    );
};
