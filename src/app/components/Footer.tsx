import React from "react";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full text-sm text-brandBlue-light px-8 pt-8 pb-16 border-t border-brandBeige/50">
      <div className="flex justify-between items-center w-full max-w-3xl mx-auto">
        <p>&copy; {year} TransAudio</p>
        <Link
          href="https://geltaverse.com"
          target="_blank"
          className=" hover:text-brandBeige mt-4 md:mt-0"
        >
          Geltaverse
        </Link>
      </div>
    </footer>
  );
}
