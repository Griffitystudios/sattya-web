import Link from "next/link";
import type { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  accentColor: string;
  href?: string;
  className?: string;
}

const calendarIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#000000"
    viewBox="0 0 256 256"
    className="h-5 w-5 sm:h-6 sm:w-6"
    aria-hidden="true"
  >
    <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z"></path>
  </svg>
);

export default function PrimaryButton({
  children,
  accentColor,
  href,
  className = "",
}: PrimaryButtonProps) {
  const content = (
    <>
      <div
        className={`absolute translate-y-1 translate-x-1 w-full h-full bg-${accentColor} opacity-0 group-hover:opacity-100 transition-opacity border border-black`}
      />
      <div className="relative bg-white border border-black px-4 py-1.5 text-sm font-bold text-black flex items-center gap-2 transition-transform group-hover:-translate-y-0.5 group-hover:-translate-x-0.5">
        {calendarIcon}
        {children}
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`group relative inline-flex items-center justify-center ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={`group relative inline-flex items-center justify-center ${className}`}
    >
      {content}
    </button>
  );
}
