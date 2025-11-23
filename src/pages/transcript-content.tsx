import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { Spinner } from "../components/spinner";
import { TranscriptViewer } from "../components/transcript-viewer";
import { PromptDisplay } from "../components/prompts/prompt-display";
import { PromptTranscript } from "../components/prompts/prompt-transcript";
import { getTranscriptById } from "../utils/indexed-db-manager";
import { FocusManager } from "../utils/focus-manager";
import { jprx74abrm } from "../utils/aai-fxns";
import { StoredTranscript, FinalTranscript } from "../types";
import { formatDate } from "../utils/format-date";
import { iDownload } from "../utils/download";
import { cleanFileName } from "../utils/random-id";

export const TranscriptContent: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [storedTranscript, setStoredTranscript] =
    useState<StoredTranscript | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [transcript, setTranscript] = useState<FinalTranscript | null>(null);

  useEffect(() => {
    const loadTranscript = async () => {
      const start_time = Date.now();

      if (!id) {
        setError("invalid transcript id...");
        setLoading(false);
        return;
      }

      try {
        const storedTranscript = await getTranscriptById(id);
        if (!storedTranscript) {
          setError("transcript not found or expired...");
        } else {
          setStoredTranscript(storedTranscript);
          const key = storedTranscript.key;
          const user_file = storedTranscript.user_file;
          const data = await jprx74abrm(key, user_file);
          setTranscript(data);
        }
      } catch {
        setError("failed to load transcript...");
      }

      const elapsed_time = Date.now() - start_time;
      const remaining_time = Math.max(0, 3200 - elapsed_time);

      setTimeout(() => setLoading(false), remaining_time);
    };

    loadTranscript();
  }, [id]);

  const t = transcript?.transcript;

  if (error || !storedTranscript || !t || loading) {
    return (
      <>
        <Helmet>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <FocusManager />
        <div className="flex flex-col space-y-4 py-8">
          {loading ? (
            <Spinner />
          ) : error || !storedTranscript || !t ? (
            <>
              <div className="opacity-60">
                <span>ERROR: {error}</span>
              </div>
              <PromptDisplay />
            </>
          ) : (
            <div className="opacity-40">
              <span>{"😑"}</span>
            </div>
          )}
        </div>
      </>
    );
  }

  const handleDownload = async () => {
    if (!storedTranscript || !t) {
      return;
    }

    await iDownload({
      id: storedTranscript.key,
      user_file: storedTranscript.user_file,
      date: storedTranscript.created,
      transcript: t,
      setError,
    });
  };

  return (
    <>
      <Helmet>
        <title>Transcript | {cleanFileName(storedTranscript.key)} ...</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://transaudio.vercel.app/transcript" />
      </Helmet>
      <FocusManager />
      <div className="p-px">
        <div className="flex flex-col space-y-2 text-left">
          <h1 className="text-2xl text-terminal-green font-bold text-wrap">
            File: "{cleanFileName(storedTranscript.key)}"
          </h1>
          <div className="flex flex-col opacity-60 text-sm">
            <span>Created: {formatDate(storedTranscript.created)}</span>
            <span>
              Accuracy:{" "}
              {t?.confidence ? (t?.confidence * 100).toFixed(2) + "%" : "-"}
            </span>
          </div>
          <div className="py-2">
            <PromptTranscript onDownload={handleDownload} />
          </div>
          <TranscriptViewer transcript={transcript} />
        </div>
      </div>
    </>
  );
};
