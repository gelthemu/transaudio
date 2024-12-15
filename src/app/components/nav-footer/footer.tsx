import React from "react";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  const month = new Date().toLocaleString("default", { month: "short" });
  const day = new Date().getDate();

  return (
    <footer className="w-full text-sm font-medium text-blue-light px-6 pt-10 pb-16 border-t border-beige/30">
      <div className="w-full max-w-4xl mx-auto flex flex-row justify-between items-center">
        <p>
          {month} {day}, {year} {" • "} TransAudio
        </p>
        <Link
          href="https://geltaverse.com"
          target="_blank"
          className=" hover:text-beige uppercase"
        >
          Geltaverse
        </Link>
      </div>
    </footer>
  );
}
