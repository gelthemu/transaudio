"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import TryItBtn from "../tiny/try-it-btn";

export default function NavBar() {
  const links = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/how-it-works",
      label: "How It Works",
    },
    {
      href: "/notes",
      label: "Notes",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="w-full sticky top-0 z-50 backdrop-blur-sm bg-blue-dark/80 border-b border-beige/40">
        <div className="w-full max-w-5xl mx-auto flex items-center justify-between px-4 md:px-8 py-5 md:py-4">
          <Link
            href="/"
            className="flex items-center justify-center p-2 text-3xl md:text-2xl font-extrabold"
          >
            Trans
            <span className="text-brick">Audio</span>
          </Link>
          <div
            className="p-1.5 border border-beige/10 hover:bg-brick/20 transition-colors duration-300 rounded-sm cursor-pointer"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(true)}
          >
            <span className="sr-only">open menu</span>
            <Menu className="w-5 h-5 hover:rotate-1 transition-all duration-300" />
          </div>
        </div>
      </nav>
      <div
        className={`fixed top-0 right-0 w-full h-full z-50 backdrop-blur-sm bg-dark/60 ${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        } transition-all duration-300`}
      >
        <div className="canvas w-[340px] md:w-2/5 min-h-screen flex flex-col justify-between items-center px-8 py-20 border-r border-beige/20">
          <div
            className="group p-1.5 border border-beige/10 hover:bg-brick/10 transition-colors duration-300 rounded-sm cursor-pointer"
            aria-expanded={!isOpen}
            onClick={() => setIsOpen(false)}
          >
            <span className="sr-only">close menu</span>
            <X className="w-5 h-5 group-hover:rotate-90 transition-all duration-300" />
          </div>
          <ul className="flex flex-col items-center space-y-4 list-none">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-lg hover:text-blue-light transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
            <TryItBtn onClick={() => setIsOpen(false)} />
        </div>
      </div>
    </>
  );
}
