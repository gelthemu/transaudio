import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PromptHero } from "@/components/hero";
import { Section } from "@/components/layout/section";
import { HelpForm } from "@/components/help-form/help-form";
import { Progress } from "@/pages/i/files/progress";
import { sendNotice } from "@/lib/utils";
import {
  isValidUrl,
  isValidFile,
  getUrlError,
  getFileError,
} from "@/lib/validation";
import {
  processTranscription,
  uploadFileToStorage,
} from "./files/script-service";
import { FileUpload } from "./files/file-upload";
import { generateRandomId } from "@/utils/random-id";
import { InputMethod, TransAudioState } from "@/types";
import { cn } from "@/lib/utils";

const Prompt: React.FC = () => {
  const navigate = useNavigate();
  const [showView, setShowView] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [inputMethod, setInputMethod] = useState<InputMethod>(null);
  const [dragActive, setDragActive] = useState(false);

  const [uploadState, setTransAudioState] = useState<TransAudioState>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const getPromptRef = useRef<HTMLDivElement>(null);
  const getStartedRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleGetStarted = () => {
    setShowView(true);
    setTimeout(() => {
      if (getStartedRef.current) {
        const yOffset = -64;
        const element = getStartedRef.current;
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 500);
  };

  const handleTryAgain = () => {
    setShowView(false);
    setTimeout(() => {
      if (getPromptRef.current) {
        const yOffset = -64;
        const element = getPromptRef.current;
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 500);
  };

  const handleDrag = useCallback((e: React.DragEvent<Element>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<Element>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setFile(file);
      }
    },
    [],
  );

  const handleUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value) {
        setAudioUrl(value);
      }
    },
    [],
  );

  const handleUrlProcessing = async (url: string) => {
    if (url && !isValidUrl(url)) {
      setError("Invalid URL. Try Again");
      return;
    }

    try {
      setTransAudioState("processing");
      setError(null);

      const { task, session, timestamp } = await processTranscription(url);

      setTransAudioState("complete");

      await new Promise((resolve) => setTimeout(resolve, 3000));

      if (task) {
        await sendNotice({
          code: "6lE8y",
          task: task,
        });
      }

      setTimeout(() => {
        navigate(`/scripts/script?task=${task}&ss=${session}&dd=${timestamp}`);
      }, 500);
    } catch {
      setError("Failed. Try again");
      setTransAudioState("error");
    }
  };

  const handleUploadAndUrlSubmit = async () => {
    if ((audioUrl && !isValidUrl(audioUrl)) || (file && !isValidFile(file))) {
      setError("Invalid input. Try Again");
      return;
    }

    try {
      let finalAudioUrl: string;

      if (inputMethod === "file" && file) {
        setTransAudioState("uploading");
        setError(null);

        const key = `${generateRandomId()}-${file.name
          .toLowerCase()
          .replace(/[^a-z0-9.]+/g, "-")
          .replace(/^-+|-+$/g, "")}`;

        const uploadedUrl = await uploadFileToStorage(
          file,
          key,
          setUploadProgress,
        );

        finalAudioUrl = uploadedUrl;
        setAudioUrl(finalAudioUrl);
        setTransAudioState("idle");
      } else if (inputMethod === "url") {
        setTransAudioState("uploading");
        setError(null);

        finalAudioUrl = audioUrl;
        setUploadProgress(100);
        setTransAudioState("idle");
      } else {
        setTransAudioState("error");
        setError("No input method selected.");
      }

      await handleUrlProcessing(finalAudioUrl);
    } catch (err) {
      setTransAudioState("error");
      setError("Operation failed.");

      await sendNotice({
        code: "6lE8y",
        err: err instanceof Error ? err.message : "Unknown error",
      });

      setUploadProgress(0);
    }
  };

  const handleViewClose = () => {
    handleTryAgain();
    setFile(null);
    setAudioUrl("");
    setInputMethod(null);
    setTransAudioState("idle");
    setUploadProgress(0);
    setError(null);
  };

  const currentError =
    inputMethod === "file" ? getFileError(file) : getUrlError(audioUrl);

  return (
    <>
      <Helmet>
        <title>Get Started - TransAUDIO</title>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://transaudio.vercel.app/i/prompt" />
      </Helmet>
      <PromptHero
        ref={getPromptRef}
        showUploadView={() => {
          handleGetStarted();
          setInputMethod("file");
        }}
        showUrlView={() => {
          handleGetStarted();
          setInputMethod("url");
        }}
        disabled={
          isValidUrl(audioUrl) || isValidFile(file) || uploadState !== "idle"
        }
      />
      <div ref={getStartedRef} />
      {showView && (
        <AnimatePresence>
          <Section>
            <div className="w-full flex flex-col max-w-2xl mx-auto">
              <div className="flex flex-col items-center justify-center mb-6">
                <h3>
                  {inputMethod === "url"
                    ? "Paste Audio URL"
                    : "Upload Audio File"}{" "}
                  <span className="text-brand">*</span>
                </h3>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {inputMethod === "file" ? (
                  <FileUpload
                    file={file}
                    value={uploadProgress}
                    isError={!!currentError || !!error}
                    dragActive={dragActive}
                    inputRef={inputRef}
                    onFileSelect={handleFileSelect}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    state={uploadState}
                    disabled={uploadState !== "idle"}
                  />
                ) : (
                  <div>
                    <Input
                      type="url"
                      placeholder="https://example.com/audio.mp3"
                      value={audioUrl}
                      onChange={handleUrlChange}
                      autoComplete="off"
                      data-lpignore="true"
                      disabled={uploadState !== "idle"}
                    />
                  </div>
                )}
                <div className="flex flex-row items-center justify-between space-x-2 mt-2">
                  <div className="shrink-0">
                    {uploadState !== "idle" && uploadState !== "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                      >
                        <Progress value={uploadProgress} state={uploadState} />
                      </motion.div>
                    )}
                  </div>
                  <div>
                    {currentError || error ? (
                      <small className="text-error text-right">
                        {currentError || error}
                      </small>
                    ) : (
                      <CheckCheck
                        className={cn(
                          "h-4 w-4 stroke-success stroke-[3px]",
                          file || audioUrl ? "stroke-success" : "stroke-accent",
                        )}
                      />
                    )}
                  </div>
                </div>
                {(isValidUrl(audioUrl) || isValidFile(file)) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-row gap-2"
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleViewClose}
                      className={cn("flex-1")}
                      disabled={uploadState !== "idle"}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={
                        uploadState !== "error"
                          ? handleUploadAndUrlSubmit
                          : handleViewClose
                      }
                      className={cn(
                        "flex-1",
                        uploadState === "complete" &&
                          "!bg-success hover:!bg-success/90",
                        uploadState === "error" &&
                          "!bg-error hover:!bg-error/90",
                      )}
                      disabled={
                        uploadState !== "idle" && uploadState !== "error"
                      }
                    >
                      {uploadState === "uploading"
                        ? "Uploading..."
                        : uploadState === "processing"
                          ? "Processing..."
                          : uploadState === "complete"
                            ? "Completed..."
                            : uploadState === "error"
                              ? "Retry"
                              : "Transcribe"}
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </Section>
        </AnimatePresence>
      )}
      <HelpForm />
    </>
  );
};

export default Prompt;
