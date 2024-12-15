import React from "react";
import Hero from "./components/hero";
import StartUpload from "./components/chevron-down";
import Transcribe from "./components/transcribe";
import Statement from "@/app/components/stuff/statement";

export const metadata = {
  title: "Transcribe Now / TransAudio",
};

export default async function GalleryPage() {
  return (
    <>
      <div className="w-full md:max-w-screen-md mx-auto min-h-screen">
        <Hero />
        <StartUpload />
        <Transcribe />
        <Statement />
      </div>
    </>
  );
}
