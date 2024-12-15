import React from "react";
import TryItBtn from "../tiny/try-it-btn";

export default function Hero() {
  return (
    <section className="w-full border-b border-blue-light/60">
      <div className="flex flex-col items-center justify-center px-5 md:px-10 py-16 text-center">
        <div className="flex flex-col items-center justify-center uppercase text-2xl md:text-3xl font-extrabold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-beige via-blue-light to-brick">
            AI-Powered Transcription.
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brick via-blue-light to-beige">
            Precision Redefined.
          </span>
        </div>
        <p className="w-full sm:w-10/12 mb-5">
          Experience seamless, high-accuracy transcriptions powered by advanced
          AI. With TransAudio, convert your audio files into text effortlessly.
          Choose between automatic or professional services.
        </p>
        <TryItBtn />
      </div>
    </section>
  );
}
