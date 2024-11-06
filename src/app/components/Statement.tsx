import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

const Statement = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("transaudio@geltaverse.com");
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <>
      <div className="w-full md:w-4/5 mx-auto text-center px-5 py-12 border-b border-brandBlue-light/50">
        <h2 className="text-xl md:text-3xl font-thin mb-8">
          Bring Your <span className="text-brandBrick font-light">Audio</span>{" "}
          to Life with
          <span className="text-brandBrick font-light"> TransAudio</span>
        </h2>
        <p className="text-brandBeige/60 mb-6">
          TransAudio makes it easy to turn your audio files into clear, readable
          text. Using powerful AI, TransAudio accurately captures every word,
          separates speakers, and removes filler words for smooth, polished
          transcripts.{" "}
        </p>
        <p className="text-brandBeige/60">
          Make sure to check the file requirements before uploading for the best
          results! Once done, you can copy or download your transcript as a text
          file. Contact me via email for a full transcript json file which
          contains more details about the transcript.
        </p>
      </div>
      <div className="w-full md:w-4/5 mx-auto text-center px-5 py-12">
        <h2 className="text-xl md:text-3xl font-thin mb-8">
          Need a bit more{" "}
          <span className="text-brandBrick font-light">help</span> with your
          transcripts?
        </h2>
        <p className="text-brandBeige/60 mb-6">
          Are your audio files larger than 10MB? Do they take longer to process?
          Or maybe you need a bit more help with cleaning up your transcripts?
          Just reach out, and I&apos;ll add the finishing touches. I&apos;m not
          that expensive, so don&apos;t worry about the cost!
        </p>
        <div className="flex items-center justify-between border border-brandBlue-light/50 max-w-sm mx-auto font-mono text-sm py-2 px-2 rounded-md">
          <div className="pl-2">
            <span>transaudio@geltaverse.com</span>
          </div>
          <span
            title="Copy"
            className="flex cursor-pointer hover:bg-brandBrick/20 transition-colors duration-200 p-2 rounded-md"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </span>
        </div>
        <p className="text-brandBeige/50 mt-1 text-[2px]">
          Email replies fast, usually within 24 hours.
        </p>
      </div>
    </>
  );
};

export default Statement;
