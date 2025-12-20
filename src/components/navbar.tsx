import React from "react";

export const NavBar: React.FC = () => {
  return (
    <nav>
      <div className="w-40">
        <a href="/home" className="w-full outline-none focus:outline-none">
          <img
            src="/transaudio.logo.png"
            alt="TransAudio Logo"
            width={2400}
            height={600}
            className="w-full aspect-[4/1] _img_"
          />
        </a>
      </div>
      <div>
        <h1 className="text-lg font-semibold">
          Transform Audio to Text with Ease
        </h1>
      </div>
    </nav>
  );
};
