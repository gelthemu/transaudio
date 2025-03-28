import React from "react";
import { TranscriptDisplayProps } from "@/types";
import { TranscriptActions } from "./transcript-actions";

export const TranscriptArea = ({
  text,
  confidence,
  duration,
  copied,
  onCopy,
  onDownload,
  onReset,
}: TranscriptDisplayProps) => (
  <div className="bg-dark/50 border border-blue-light/40 rounded-md p-3 mt-10">
    <div className="w-full mb-2 p-2">
      <div className="text-left">
        <h4 className="font-bold text-xl">Finally 🎉</h4>
        <p className="text-sm">Your transcript is ready.</p>
        <p className="text-sm">Copy it, or download it as a text file (.txt)</p>
      </div>
    </div>
    <div className="w-full relative text-sm bg-dark border border-blue-light/40 rounded-md">
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-dark to-transparent pointer-events-none z-10 rounded-t-md" />
      <div className="h-max max-h-[50vh] sm:max-h-[80vh] md:max-h-[60vh] overflow-y-auto relative my-2">
        <div
          className="transcript-text font-geistMono text-sm px-5 py-6"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-dark to-transparent pointer-events-none z-10 rounded-b-md" />
    </div>
    <TranscriptActions
      onCopy={onCopy}
      onDownload={onDownload}
      onReset={onReset}
      copied={copied}
      confidence={confidence}
      duration={duration}
    />
  </div>
);
