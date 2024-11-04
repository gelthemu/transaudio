import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full border-b border-brandBlue-light/50">
      <div className="flex flex-col items-center justify-center px-5 md:px-10 py-12 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col text-2xl md:text-3xl mb-4">
            <span className="font-extrabold">AI-Powered Transcription.</span>
            <span className="text-brandBlue-light font-extrabold">
              Precision Redefined.
            </span>
          </div>
        </div>
        <p className="mb-5">
          Experience seamless, high-accuracy transcriptions powered by advanced
          AI. With TransAudio, convert your audio files into text effortlessly.
        </p>
        <Link
          href="#start"
          className="text-sm bg-brandBrick hover:bg-brandBlue-light/10 px-4 py-2 rounded-md transition-colors duration-300"
        >
          Try It Out for Free
        </Link>
      </div>
    </section>
  );
}
