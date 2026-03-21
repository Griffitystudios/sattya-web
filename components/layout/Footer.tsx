import Link from "next/link";
import Image from "next/image";

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterProps {
  sattyaLogoSrc?: string;
  sattyaBrandName?: string;
  spaceLogos?: { src: string; alt: string; link: string }[];
  email?: string;
  phones?: string[];
  address?: string;
  navColumns?: FooterLink[][];
  developerLabel?: string;
  developerHref?: string;
  companyName?: string;
}

export default function Footer({
  sattyaLogoSrc = "/images/sattyalogo.png",
  sattyaBrandName = "SATTYA\nMEDIA ARTS\nCOLLECTIVE",
  spaceLogos = [],
  email = "hello@sattya.org",
  phones = ["+1 (312) 555-0193 .", "+1 (312) 555-0193"],
  address = "Jawalakhel, Lalitpur",
  navColumns = [],
  developerLabel = "GRIFFITYSTUDIOS",
  developerHref = "#",
  companyName = "Sattya INC",
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-white mt-20 lg:mt-40">
      {/* Split hero — top half white, bottom half black, logo straddling */}
      <div className="relative bg-black">
        {/* Remove the white top half */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Logo */}
          <div className="relative z-10 flex items-end justify-center gap-6 -mt-26 lg:-mt-36">
            <Image
              src={sattyaLogoSrc}
              alt="Sattya Logo"
              width={400}
              height={300}
              className="h-48 sm:h-56 lg:h-72 w-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Main footer body */}
      <div className="bg-black pb-8">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-8">
          {/* Space logos */}
          {spaceLogos.length > 0 && (
            <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
              {spaceLogos.map((logo, i) => (
                <Link href={logo.link} key={i}>
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={120}
                    quality={75}
                    height={40}
                    className="h-6 sm:h-7 lg:h-9 w-auto object-contain"
                  />
                </Link>
              ))}
            </div>
          )}

          {/* Contact */}
          <div className="text-center flex flex-col gap-4">
            <a
              href={`mailto:${email}`}
              className="h2-off text-white hover:text-white/70 transition-colors"
            >
              {email}
            </a>
            <div className="flex flex-col md:flex-row gap-5">
              {phones &&
                phones.map((phone, index) => (
                  <p key={index} className="h2-off w-fit text-white">
                    {phone}
                  </p>
                ))}
            </div>

            <p className="h2-off text-white">{address}</p>
          </div>

          {/* Nav grid */}
          {navColumns.length > 0 && (
            <div
              className="grid gap-x-8 gap-y-4 caption text-white/80 text-center"
              style={{
                gridTemplateColumns: `repeat(${Math.min(navColumns.length, 5)}, minmax(0, 1fr))`,
              }}
            >
              {navColumns.map((col, i) => (
                <div key={i} className="flex flex-col gap-1">
                  {col.map((link) =>
                    link.external ? (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    ),
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Copyright */}
          <div className="font-offset text-caption tracking-wider text-white/40 text-center">
            © {currentYear} {companyName}, All Rights Reserved &nbsp;·&nbsp;
            Developed by:{" "}
            <a
              href={developerHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-300 hover:text-amber-200 transition-colors"
            >
              {developerLabel}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
