"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

export default function StartUpload() {
  return (
    <div className="w-full flex flex-col justify-center items-center p-8">
      <span className="sr-only">Click to start uploading...</span>
      <div className="p-4 cursor-pointer animate-bounce">
        <ChevronDown
          onClick={() => {
            const startSection = document.getElementById("upload");
            if (startSection) {
              startSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }}
          className="w-5 h-5"
        />
      </div>
    </div>
  );
}
