import React, { useState, useEffect } from "react";
import { getSession } from "../utils/session-manager";
import {
  getTranscriptsBySession,
  cleanExpiredTranscripts,
} from "../utils/indexed-db-manager";

export const Progress: React.FC = () => {
  const [transcriptCount, setTranscriptCount] = useState(0);

  const session_id = getSession();

  useEffect(() => {
    const loadTranscripts = async () => {
      await cleanExpiredTranscripts();
      const transcripts = await getTranscriptsBySession(session_id);
      setTranscriptCount(transcripts.length);
    };

    loadTranscripts();

    const interval = setInterval(() => {
      loadTranscripts();
    }, 5000);

    return () => clearInterval(interval);
  }, [session_id]);

  const decimal = Math.min(transcriptCount / 10, 1);
  const filledBars = Math.floor(decimal * 10);
  const emptyBars = 10 - filledBars;

  return (
    <div className="flex flex-col space-y-1">
      <div className="flex flex-row items-center space-x-2">
        <div>{"Runs"}:</div>
        <div className="flex items-center space-x-0">
          <span className="opacity-100">{"=".repeat(filledBars)}</span>
          <span className="opacity-40">{"=".repeat(emptyBars)}</span>
        </div>
        <div>
          <span className="font-bold">{decimal.toFixed(2)}</span>
        </div>
      </div>
      {transcriptCount >= 1 && (
        <div>
          <a href="/transcripts" className="underline">
            View all transcripts
          </a>
        </div>
      )}
    </div>
  );
};
