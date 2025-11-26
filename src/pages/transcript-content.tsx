import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Spinner } from "../components/spinner";
import { TranscriptViewer } from "../components/transcript-viewer";
import { ad58ad087edb98 } from "../utils/aai-fxns";
import { TranscriptResponse } from "../types";
import { formatDate } from "../utils/format-date";
import { iDownload } from "../utils/download";

// import transcriptData from "../data/test.json";
// const t = transcriptData as TranscriptResponse;

export const TranscriptContent: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [transcript, setTranscript] = useState<TranscriptResponse | null>(null);

  useEffect(() => {
    const loadTranscript = async () => {
      if (!id) {
        setError("Invalid transcript ID.");
        setLoading(false);
        return;
      }

      try {
        const data = await ad58ad087edb98(id);
        if (!data) {
          setError("Transcript not found or expired.");
        } else {
          setTranscript(data);
        }
      } catch {
        setError("Failed to load transcript.");
      }

      setLoading(false);
    };

    loadTranscript();
  }, [id]);

  if (loading) {
    return (
      <>
        <Helmet>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div>
          <Spinner />
        </div>
      </>
    );
  }

  if (error || !transcript) {
    return (
      <>
        <Helmet>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="flex flex-col space-y-4">
          <div>
            <p className="text-red">
              Error: {error || "Transcript not available"}
            </p>
          </div>
          <div className="opacity-90 flex flex-row space-x-2">
            <button
              className="px-4 py-2 text-sm font-bold bg-light text-dark border-none decoration-none"
              type="button"
              onClick={() => navigate("/home")}
            >
              Go Home
            </button>
            <button
              className="px-4 py-2 border border-light bg-transparent"
              type="button"
              onClick={() => navigate("/transcripts")}
            >
              View all transcripts
            </button>
          </div>
        </div>
      </>
    );
  }

  const handleDownload = async () => {
    if (!transcript) {
      return;
    }

    await iDownload({
      transcript: transcript,
      setError,
    });
  };

  const handleViewSummary = () => {
    if (!transcript?.summary) {
      return;
    }

    const summaryEl = document.getElementById("summary");
    if (summaryEl) {
      summaryEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Helmet>
        <title>Transcript | {transcript.id}</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://transaudio.vercel.app/transcript" />
      </Helmet>
      <div>
        <div className="flex flex-col space-y-4">
          <h1 className="text-lg font-bold">{transcript.id}</h1>
          <div className="text-sm opacity-70">
            <p>Created: {formatDate(transcript.created)}</p>
            <p>
              Accuracy:{" "}
              {transcript?.confidence
                ? (transcript?.confidence * 100).toFixed(2) + "%"
                : "-"}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row space-x-2">
              <button
                className="px-2 py-1 font-bold bg-light text-dark border-none"
                type="button"
                onClick={handleDownload}
              >
                Download Transcript
              </button>
              <button
                className="px-2 py-1 border border-light bg-transparent"
                type="button"
                onClick={() => navigate(-1)}
              >
                Go Back
              </button>
            </div>
            {transcript?.summary && (
              <div>
                <button
                  className="p-1 font-semibold underline bg-transparent opacity-75"
                  type="button"
                  onClick={handleViewSummary}
                >
                  View Summary
                </button>
              </div>
            )}
          </div>
          <TranscriptViewer t={transcript} />
        </div>
      </div>
    </>
  );
};
