"use client";

import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 border-r border-gray-300 pr-4 sm:pr-6 lg:pr-8 h-16 sm:h-18 lg:h-20"
      aria-label="Go to homepage"
    >
      <div className="flex items-baseline">
        <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-yellow-500 leading-none group-hover:scale-105 transition-transform duration-200">
          a
        </span>
        <span className="text-xl sm:text-2xl lg:text-3xl font-black text-primary tracking-tight leading-none group-hover:scale-105 transition-transform duration-200">
          mart
        </span>
      </div>
    </Link>
  );
}
