import React, { useState, useEffect, useRef } from "react";
import { FinalTranscript } from "../types";
import { AudioPlayer } from "./audio-player";
import { Bucket } from "./bucket";

interface TranscriptViewerProps {
  transcript: FinalTranscript;
}

export const TranscriptViewer: React.FC<TranscriptViewerProps> = ({
  transcript,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [highlightedWordIndex, setHighlightedWordIndex] = useState(-1);
  const audioRef = useRef<HTMLAudioElement>(null);

  const t = transcript.transcript;
  const f = transcript.signed_url;

  useEffect(() => {
    if (t?.words) {
      const words = t.words;
      const currentTimeMs = currentTime * 1000;

      const wordIndex = words.findIndex(
        (word) => currentTimeMs >= word.start && currentTimeMs <= word.end
      );

      setHighlightedWordIndex(wordIndex);
    }
  }, [currentTime, t]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const renderTranscriptWithHighlights = () => {
    if (!t?.utterances) return null;

    return (
      <div className="flex flex-col space-y-4">
        {t.utterances.map((utterance, uttIndex) => (
          <div key={uttIndex}>
            <div>
              <span className="text-terminal-amber font-semibold">
                Speaker {utterance.speaker}:
              </span>
            </div>
            <div className="ml-2 md:ml-4 mt-1 leading-relaxed opacity-80">
              {utterance.words?.map((word, wordIndex) => {
                const globalWordIndex =
                  t?.words?.findIndex(
                    (w) => w.text === word.text && w.start === word.start
                  ) ?? -1;

                const isHighlighted = globalWordIndex === highlightedWordIndex;

                return (
                  <span
                    key={wordIndex}
                    id={isHighlighted ? "highlight-index" : undefined}
                    className={`${
                      isHighlighted
                        ? "bg-terminal-cyan/20 text-terminal-cyan font-semibold pl-2 -ml-2 opacity-100"
                        : ""
                    } transition-all duration-200`}
                  >
                    {word.text}
                    {wordIndex < utterance.words.length - 1 ? " " : ""}
                  </span>
                );
              }) || utterance.text}
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (!t) return null;

  return (
    <div className="p-px">
      <div className="w-full relative border-4 border-double border-terminal-amber/20">
        <AudioPlayer
          file={f}
          audioRef={audioRef}
          timeUpdate={handleTimeUpdate}
        />
        <Bucket
          maxHeight="70vh"
          id="transcript"
          className="transcript-text flex flex-col space-y-2 text-sm py-6"
        >
          {renderTranscriptWithHighlights()}
        </Bucket>
        {t?.summary && t.summary.trim() !== "" && (
          <div className="p-4 text-sm border-t-4 border-double border-terminal-amber/20">
            <div>
              <span className="font-semibold">Summary:</span>
            </div>
            <div>
              <p className="opacity-80 leading-relaxed">{t.summary}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
