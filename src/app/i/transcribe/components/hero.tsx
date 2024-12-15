import React from "react";
import Requirements from "@/app/components/tiny/requirements";

export default function Hero() {
  return (
    <section className="w-full flex flex-col items-center justify-center px-5 md:px-10 pt-16 pb-0">
      <div className="flex flex-col items-center justify-center text-center uppercase text-2xl md:text-3xl font-extrabold mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-beige via-blue-light to-brick">
          Convert Your Speech
        </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-brick via-blue-light to-beige">
          to Text Today
        </span>
      </div>
      <div className="w-full md:w-9/12 mx-auto text-left">
        <Requirements />
      </div>
    </section>
  );
}
