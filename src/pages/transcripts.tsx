import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  cleanExpiredTranscripts,
  getAllTranscripts,
} from "../utils/indexed-db-manager";
import { FocusManager } from "../utils/focus-manager";
import { PromptDisplay } from "../components/prompts/prompt-display";
import { PromptTranscripts } from "../components/prompts/prompt-transcripts";
import { StoredTranscript } from "../types";

export const Transcripts: React.FC = () => {
  const [transcripts, setTranscripts] = useState<StoredTranscript[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTranscripts = async () => {
      await cleanExpiredTranscripts();
      const storedTranscripts = await getAllTranscripts();
      setTranscripts(storedTranscripts);
      setLoading(false);
    };

    loadTranscripts();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>
          Your Transcripts | TransAudio - Effortless Audio-to-Text Conversion
        </title>
        <meta name="robots" content="noindex, nofollow" />
        <link
          rel="canonical"
          href="https://transaudio.geltaverse.com/transcripts"
        />
      </Helmet>
      <FocusManager
        transcript_id="transcripts"
        highlight_id="transcript-index"
      />
      <div className="p-px">
        <div className="flex flex-col space-y-2 text-left">
          <h1 className="text-2xl text-terminal-green font-bold">
            Your Transcripts
          </h1>
          {transcripts.length === 0 ? (
            <div className="flex flex-col space-y-4 py-8">
              <div className="opacity-60">
                You haven't converted any speech to text, yet!
              </div>
              <PromptDisplay />
            </div>
          ) : (
            <div className="py-4">
              <PromptTranscripts data={transcripts} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
