import React from "react";

export const NavBar: React.FC = () => {
  return (
    <>
      <nav className="flex flex-col p-1">
        <div className="w-40 flex items-center justify-center">
          <img
            src="/transaudio.logo.png"
            alt="TransAudio Logo"
            width={2400}
            height={600}
            className="w-full aspect-[4/1] _img_"
          />
        </div>
        <div>
          <span>Transform Audio to Text with Ease</span>
        </div>
      </nav>
    </>
  );
};
