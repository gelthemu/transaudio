import React from "react";
import { TranscriptResponse } from "../types";

interface TranscriptViewerProps {
  t: TranscriptResponse;
}

export const TranscriptViewer: React.FC<TranscriptViewerProps> = ({ t }) => {
  if (!t) return null;

  const renderTranscript = () => {
    if (!t?.utterances) {
      return <div>No transcript available.</div>;
    }

    return (
      <div className="flex flex-col space-y-4">
        {t.utterances.map((utterance, uttIndex) => (
          <div key={uttIndex}>
            <div className="font-semibold">
              <span>Speaker {utterance.speaker}:</span>
            </div>
            <div className="ml-2 md:ml-4 mt-1 leading-relaxed opacity-80">
              {utterance.text}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col space-y-12">
      {renderTranscript()}
      {t?.summary && t.summary.trim() !== "" && (
        <div
          id="summary"
          className="px-1 py-8 border-t-2 border-double border-light/20"
        >
          <div>
            <span className="font-semibold">Summary:</span>
          </div>
          <div>
            <p className="opacity-90 leading-relaxed">{t.summary}</p>
          </div>
        </div>
      )}
    </div>
  );
};
