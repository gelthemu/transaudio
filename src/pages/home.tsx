import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getSession } from "../utils/session-manager";
import { ab3d2d3c1f7417, ac41bedb6ec4a9 } from "../utils/aai-fxns";
import {
  saveTranscript,
  getTranscriptsBySession,
  cleanExpiredTranscripts,
} from "../utils/indexed-db-manager";
import { generateRandomId } from "../utils/random-id";
import { Spinner } from "../components/spinner";

type InputMethod = "file" | "url" | null;
type AppStep = "initial" | "uploading" | "processing" | "completed";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<AppStep>("initial");
  const [inputMethod, setInputMethod] = useState<InputMethod>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [transcriptCount, setTranscriptCount] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);

  const session_id = getSession();

  useEffect(() => {
    const initializeSession = async () => {
      setSession(session_id);
      await cleanExpiredTranscripts();
      const transcripts = await getTranscriptsBySession(session_id);
      setTranscriptCount(transcripts.length);
    };
    initializeSession();
  }, [session_id]);

  const validateUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      const path = urlObj.pathname.toLowerCase();
      return path.endsWith(".mp3") || path.endsWith(".m4a");
    } catch {
      return false;
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["audio/mp3", "audio/mpeg", "audio/m4a"];
    const isValidType =
      validTypes.includes(file.type) ||
      file.name.toLowerCase().match(/\.(mp3|m4a)$/);

    if (!isValidType) {
      setError("Invalid file type. Select MP3 or M4A files...");
      return;
    }

    if (file.size > 60 * 1024 * 1024) {
      setError("File too large. Max size is 60MB...");
      return;
    }

    setSelectedFile(file);
    setError("");
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAudioUrl(e.target.value);
    setError("");
  };

  const handleStartTranscription = async () => {
    if (transcriptCount >= 10) {
      setError("Limit reached. Please delete some old transcripts...");
      return;
    }

    if (inputMethod === "file" && !selectedFile) {
      setError("Please select a file first...");
      return;
    }

    if (inputMethod === "url") {
      if (!audioUrl.trim()) {
        setError("Please enter a valid audio URL...");
        return;
      }
      if (!validateUrl(audioUrl)) {
        setError("Invalid URL. Must be a direct link to an MP3 or M4A file...");
        return;
      }
    }

    setError("");
    setCurrentStep("uploading");

    try {
      let key: string;

      if (inputMethod === "file" && selectedFile) {
        const random_id = generateRandomId();
        const sanitized_name = selectedFile.name
          .toLowerCase()
          .replace(/[^a-z0-9.]+/g, "-")
          .replace(/^-+|-+$/g, "");
        key = `${random_id}-${sanitized_name}`;

        const uploadResult = await ab3d2d3c1f7417(
          selectedFile,
          key,
          (progress) => {
            setUploadProgress(progress.percentage);
          }
        );

        if (uploadResult.status !== "success" || !uploadResult.url) {
          throw new Error("File upload failed.");
        }

        setAudioUrl(uploadResult.url);

        setCurrentStep("processing");
        setUploadProgress(100);

        const response = await ac41bedb6ec4a9(audioUrl);

        if (response.status !== "success" || !response.id) {
          throw new Error("Transcription failed...");
        }

        setCurrentStep("completed");

        const redirect_id = await saveTranscript(session, response.id);

        setTranscriptCount((prev) => prev + 1);
        navigate(`/transcript?id=${redirect_id}&ss=${session}`);
        return;
      } else if (inputMethod === "url") {
        setCurrentStep("processing");
        setUploadProgress(100);

        const response = await ac41bedb6ec4a9(audioUrl);

        if (response.status !== "success" || !response.id) {
          throw new Error("Transcription failed.");
        }

        setCurrentStep("completed");

        const redirect_id = await saveTranscript(session, response.id);

        setTranscriptCount((prev) => prev + 1);
        navigate(`/transcript?id=${redirect_id}&ss=${session}`);
      } else {
        throw new Error("No input method selected.");
      }
    } catch (err) {
      setCurrentStep("initial");
      setError(err instanceof Error ? err.message : "Operation failed.");
      setUploadProgress(0);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setAudioUrl("");
    setInputMethod(null);
    setError("");
    setCurrentStep("initial");
    setUploadProgress(0);
  };

  return (
    <>
      <Helmet>
        <title>TransAudio - Effortless Audio-to-Text Conversion</title>
        <meta
          name="description"
          content="TransAudio makes it easy to convert speech to clear, readable text. Using powerful AI, TransAudio accurately captures every word, every speaker for smooth, polished transcripts."
        />
        <meta
          name="keywords"
          content="transaudio, geltaverse, audio transcription, speech to text, ai transcription, mp3 transcription, m4a transcription, free speech to text conversion"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://transaudio.vercel.app/home" />
      </Helmet>
      <div className="flex flex-col space-y-4">
        {currentStep === "initial" && !error && (
          <div>
            {!inputMethod ? (
              <div>
                <div className="pb-4 flex gap-2 text-sm font-bold">
                  <button
                    className="px-4 py-2 bg-light text-dark border-none"
                    type="button"
                    onClick={() => setInputMethod("file")}
                    disabled={transcriptCount >= 10}
                  >
                    Upload File
                  </button>
                  <button
                    className="px-4 py-2 border border-light bg-transparent"
                    type="button"
                    onClick={() => setInputMethod("url")}
                    disabled={transcriptCount >= 10}
                  >
                    Provide URL
                  </button>
                </div>
                {transcriptCount >= 10 && (
                  <p className="flex flex-col space-y-0 font-semibold text-sm">
                    <span className="text-red">Limit reached.</span>
                    <span className="text-light/60">
                      Please delete old transcripts first.
                    </span>
                  </p>
                )}
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                {inputMethod === "file" ? (
                  <div>
                    <form>
                      <div className="flex flex-col space-y-4">
                        <label htmlFor="file-input">
                          Select MP3 or M4A file (max 60MB)
                        </label>
                        <input
                          className="text-sm max-w-sm border-none outline-none focus:outline-none"
                          type="file"
                          id="file-input"
                          accept=".mp3,.m4a,audio/mp3,audio/mpeg,audio/m4a"
                          onChange={handleFileSelect}
                        />
                      </div>
                      {selectedFile && (
                        <div>
                          <p className="opacity-80">
                            Size: {(selectedFile.size / 1024 / 1024).toFixed(2)}{" "}
                            MB
                          </p>
                        </div>
                      )}
                    </form>
                  </div>
                ) : (
                  <div>
                    <form>
                      <div className="flex flex-col space-y-4">
                        <label htmlFor="url-input">
                          Enter URL to MP3 or M4A file
                        </label>
                        <input
                          className="text-sm text-dark font-semibold max-w-sm px-2 py-1 border-none outline-none focus:outline-none"
                          type="url"
                          id="url-input"
                          autoFocus
                          value={audioUrl}
                          onChange={handleUrlChange}
                          placeholder="https://sitename.com/audio.mp3"
                          autoCapitalize="off"
                          autoComplete="off"
                          autoCorrect="off"
                          spellCheck="false"
                        />
                      </div>
                    </form>
                  </div>
                )}
                <div className="flex gap-2 text-sm font-bold">
                  <button
                    className="px-2 py-1 bg-light text-dark border-none"
                    type="button"
                    onClick={handleStartTranscription}
                  >
                    Start Transcription
                  </button>
                  <button
                    className="px-2 py-1 border border-light bg-transparent"
                    type="button"
                    onClick={handleReset}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        {(currentStep === "uploading" || currentStep === "processing") &&
          !error && (
            <div className="flex flex-col space-y-2">
              {selectedFile && (
                <div>
                  <p className="opacity-60">File: {selectedFile.name}</p>
                </div>
              )}
              <div className="flex flex-row items-center space-x-2">
                <Spinner />
                <p className="text-sm font-semibold">
                  {currentStep === "uploading"
                    ? `Uploading... ${uploadProgress}%`
                    : "Processing..."}
                </p>
              </div>
            </div>
          )}
        {error && (
          <div className="flex flex-col space-y-2">
            <div>
              <p className="">
                Error: <span className="text-red font-bold">{error}</span>
              </p>
            </div>
            <div>
              <button
                className="px-2 py-1 border border-light bg-transparent"
                type="button"
                onClick={handleReset}
              >
                Start again . . .
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
