import React from "react";
import MetricDisplay from "../tiny/metric-display";
import CopyEmail from "../tiny/copy-email";

const Statement = () => {
  return (
    <>
      <div className="w-full md:w-4/5 mx-auto text-center px-5 py-16 border-b border-blue-light/60">
        <h2 className="text-3xl font-light mb-8">
          Bring Your <span className="text-brick font-medium">Audio</span> to{" "}
          <span className="text-brick font-medium">Life</span>
        </h2>
        <p className="text-beige/70">
          TransAudio makes it easy to turn your audio files into clear, readable
          text. Using powerful AI, TransAudio accurately captures every word,
          separates speakers, and removes filler words for smooth, polished
          transcripts.
        </p>
        <MetricDisplay />
        <p className="text-beige/70">
          Make sure to check the file requirements before uploading for the best
          results! Once done, you can copy or download your transcript as a text
          file. Contact me via email for a full transcript json file which
          contains more details about the transcript.
        </p>
      </div>
      <div className="w-full md:w-4/5 mx-auto text-center px-5 py-16">
        <h2 className="text-3xl font-light mb-8">
          Need a bit <span className="text-brick font-medium">More Help</span>?
        </h2>
        <p className="text-beige/70 mb-6">
          Do your audio files exceed 8MB? Are they taking too long to process?
          Or perhaps you could use some assistance with refining your
          transcripts? Feel free to contact me; I&apos;ll put the final touches
          on them!
        </p>
        <CopyEmail />
      </div>
    </>
  );
};

export default Statement;
