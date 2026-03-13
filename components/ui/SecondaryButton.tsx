import Link from "next/link";
import type { ReactNode } from "react";

interface SecondaryButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  accentColor?: string;
}

export default function SecondaryButton({
  href,
  children,
  className = "",
  accentColor,
}: SecondaryButtonProps) {
  return (
    <Link
      href={href}
      className={`w-fit flex items-center p-bold text-sm bg-black text-white group hover:bg-${accentColor} border-black/30 px-4 py-1 transition-colors z-50 ${className}`}
    >
      {children}
      <svg
        className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M9 18l6-6-6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
