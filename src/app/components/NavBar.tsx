import React from "react";
import Link from "next/link";
import { ScanBarcode } from "lucide-react";

export default function NavBar() {
  return (
    <nav className="w-full sticky top-0 z-50 backdrop-blur-sm bg-brandBlue-dark/80 border-b border-brandBeige/50">
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between px-8 py-2">
        <div className="flex items-center justify-center p-2 text-2xl font-extrabold">
          Trans
          <span className="text-brandBrick">Audio</span>
        </div>
        <Link
          href="https://www.geltaverse.com/projects/transaudio.app"
          target="_blank"
          className="p-2 hover:bg-brandBrick/20 rounded-md"
        >
          <ScanBarcode className="w-5 h-5" />
        </Link>
      </div>
    </nav>
  );
}
