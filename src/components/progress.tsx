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
    <div className="flex flex-row items-center space-x-2 text-sm">
      <div className="text-terminal-cyan">{"Runs"}:</div>
      <div className="flex items-center space-x-0">
        <span className="opacity-100">{"=".repeat(filledBars)}</span>
        <span className="opacity-40">{"=".repeat(emptyBars)}</span>
      </div>
      <div>
        <span className="text-terminal-amber">
          {(decimal).toFixed(2)}
        </span>
      </div>
    </div>
  );
};
