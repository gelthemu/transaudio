import React, { useState, useEffect } from "react";
import { StoredTranscript } from "../types";
import { getSession } from "../utils/session-manager";
import {
  getTranscriptsBySession,
  cleanExpiredTranscripts,
} from "../utils/indexed-db-manager";

export const Progress: React.FC = () => {
  const [transcripts, setTranscripts] = useState<StoredTranscript[]>([]);

  useEffect(() => {
    const loadTranscripts = async () => {
      const id = getSession();
      await cleanExpiredTranscripts();
      const storedTranscripts = await getTranscriptsBySession(id);
      setTranscripts(storedTranscripts);
    };

    const interval = setInterval(() => {
      loadTranscripts();
    }, 7500);

    return () => clearInterval(interval);
  }, []);

  const decimal = Math.min(transcripts.length / 10, 1);
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
      {transcripts.length >= 1 && (
        <div>
          <a href="/transcripts" className="underline">
            View all transcripts
          </a>
        </div>
      )}
    </div>
  );
};
