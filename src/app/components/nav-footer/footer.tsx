"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Footer() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.toLocaleString("default", { month: "short" });
  const day = currentDate.getDate();

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