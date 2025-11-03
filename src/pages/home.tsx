import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { PromptTranscript } from "../components/prompts/prompt-home";
import { getSession } from "../utils/session-manager";
import { an59k1jab2, axpsfoxdmc } from "../utils/aai-fxns";
import { FocusManager } from "../utils/focus-manager";
import {
  saveTranscript,
  getTranscriptsBySession,
  cleanExpiredTranscripts,
} from "../utils/indexed-db-manager";
import { generateRandomId } from "../utils/random-id";
import { Separator } from "../components/separator";
import { ProcessingFile, UploadProgress } from "../types";

type AppStep =
  | "initial"
  | "selected"
  | "uploading"
  | "processing"
  | "completed"
  | "redirect";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<AppStep>("initial");
  const [file, setFile] = useState<ProcessingFile | null>(null);
  const [error, setError] = useState<string>("");
  const [transcriptCount, setTranscriptCount] = useState(0);

  const random_id = generateRandomId();
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

  const handleRedirection = async (file_id: string) => {
    setCurrentStep("redirect");
    setFile((prev) => (prev ? { ...prev, status: "redirect" as const } : null));

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const referer = document.referrer || window.location.href;
    const page_ref = referer.split("/").pop() || "home";
    navigate(`/transcript?ss=${session_id}&id=${file_id}&pg_ref=${page_ref}`);
  };

  const handleSelectPrompt = async () => {
    if (transcriptCount >= 10) {
      setError("limit reached; delete old transcripts...");
      return;
    }

    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".mp3,.m4a,audio/mp3,audio/mpeg,audio/m4a";
    input.multiple = false;

    input.onchange = async (e) => {
      const selectedFiles = Array.from(
        (e.target as HTMLInputElement).files || []
      );

      if (selectedFiles.length === 0) return;

      const selectedFile = selectedFiles[0];

      const validTypes = ["audio/mp3", "audio/mpeg", "audio/m4a"];
      const isValidType =
        validTypes.includes(selectedFile.type) ||
        selectedFile.name.toLowerCase().match(/\.(mp3|m4a)$/);

      if (!isValidType) {
        setError(`invalid; allows MP3/M4A only...`);
        return;
      }

      if (selectedFile.size > 60 * 1024 * 1024) {
        setError(`file too large; 60MB max...`);
        return;
      }

      const user_file = (
        selectedFile.name.split(".").pop() || ""
      ).toLowerCase();
      const sanitized_name = selectedFile.name
        .toLowerCase()
        .replace(/[^a-z0-9.]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .replace(/\.[^/.]+$/, "");
      const key = `${random_id}-${sanitized_name}`;

      const processingFile: ProcessingFile = {
        file: selectedFile,
        status: "pending",
        key,
        user_file,
        uploadProgress: {
          loaded: 0,
          total: selectedFile.size,
          percentage: 0,
        },
      };

      setFile(processingFile);
      setCurrentStep("selected");
      setError("");
    };

    input.click();
  };

  const handleStartPrompt = async () => {
    if (!file) {
      setError("no file SELECT-ed...");
      return;
    }

    if (transcriptCount >= 10) {
      setError("limit reached; delete old transcripts...");
      return;
    }

    setCurrentStep("uploading");
    await uploadAndTranscribe();
  };

  const uploadAndTranscribe = async () => {
    if (!file) return;

    try {
      const updated_file = { ...file, status: "uploading" as const };
      setFile(updated_file);

      const uploadResult = await an59k1jab2(
        file.file,
        file.key,
        file.user_file,
        (progress: UploadProgress) => {
          setFile((prev) =>
            prev
              ? {
                  ...prev,
                  uploadProgress: progress,
                }
              : null
          );
        }
      );

      if (uploadResult !== "success") {
        throw new Error("file upload failed...");
      }

      const uploaded_file = {
        ...updated_file,
        status: "uploaded" as const,
        uploadProgress: {
          loaded: updated_file.file.size,
          total: updated_file.file.size,
          percentage: 100,
        },
      };
      setFile(uploaded_file);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setCurrentStep("processing");

      const handleTranscriptionStatus = () => {
        setFile((prev) =>
          prev ? { ...prev, status: "processing" as const } : null
        );
      };

      const transcriptionResult = await axpsfoxdmc(
        file.key,
        file.user_file,
        handleTranscriptionStatus
      );

      if (transcriptionResult !== "success") {
        throw new Error("transcription failed...");
      }

      const completedFile: ProcessingFile = {
        ...uploaded_file,
        status: "completed" as const,
      };
      setFile(completedFile);
      setCurrentStep("completed");

      const redirect_id = await saveTranscript(
        session,
        completedFile.key,
        completedFile.user_file
      );

      if (!redirect_id) {
        throw new Error("failed to save transcript...");
      }

      setTranscriptCount((prev) => prev + 1);

      await handleRedirection(redirect_id);
    } catch (err) {
      const errorFile = {
        ...file,
        status: "error" as const,
        error: err instanceof Error ? err.message : "operation failed...",
        uploadProgress: {
          loaded: 0,
          total: 0,
          percentage: 0,
        },
      };

      setFile(errorFile);
      setCurrentStep("initial");
      setError(err instanceof Error ? err.message : "operation failed...");
    }
  };

  const handleCancel = () => {
    setFile(null);
    setCurrentStep("initial");
    setError("");
  };

  const clearError = () => setError("");

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
        <link rel="canonical" href="https://transaudio.geltaverse.com/home" />
      </Helmet>
      <FocusManager />
      <div className="p-px">
        <div className="flex flex-col text-left">
          <div>
            <h1 className="text-2xl text-terminal-amber font-bold">
              <span>{"Try"}</span>
              <span className="text-terminal-green">{" It "}</span>
              <span>{"for"}</span>
              <span className="text-terminal-green">{" Free"}</span>
              <span>{"!"}</span>
            </h1>
            <div className="opacity-60">Get started by selecting a file.</div>
          </div>
          <Separator limit={10} margin="my-2" />
          <PromptTranscript
            file={file}
            step={currentStep}
            error={error}
            onSelect={handleSelectPrompt}
            onStart={handleStartPrompt}
            onCancel={handleCancel}
            onClearError={clearError}
            hasFile={!!file}
          />
        </div>
      </div>
    </>
  );
};
