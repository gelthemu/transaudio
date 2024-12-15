"use client";

import React, { useState, useEffect } from "react";
import { upload } from "@vercel/blob/client";
import { toast } from "react-toastify";
import { transcribeAudio } from "@/app/actions";
import AudioUploader from "./t/audio-uploader";
import { LoadingState } from "./t/loading-state";
import { TranscriptArea } from "./t/transcript-area";
import {
  MAX_FILE_SIZE,
  sanitizeFilename,
  calculateDuration,
} from "@/utils/transcription";
import type {
  TranscriptState,
  TranscriptionResponse,
  UploadResponse,
} from "@/types";
import FireConfetti from "./confetti";

export default function Transcribe() {
  const [state, setState] = useState<TranscriptState>({
    loading: false,
    formData: null,
    status: "",
    text: "",
    confidence: "",
    duration: "",
    copied: false,
  });

  const handleUpload = async (formData: FormData) => {
    setState((prev) => ({ ...prev, loading: true, formData }));
  };

  useEffect(() => {
    if (!state.loading || !state.formData) return;

    const processUpload = async () => {
      if (!state.formData) return;

      const start = Date.now();
      const file = state.formData.get("audio") as File;

      if (file.size > MAX_FILE_SIZE) {
        toast.error("Limit is 8MB. Got it?", {
          icon: false,
        });
        setState((prev) => ({ ...prev, loading: false }));
        return;
      }

      try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const filename = sanitizeFilename(file.name, timestamp);

        const { url }: UploadResponse = await toast.promise(
          upload(`audio/${filename}.mp3`, file, {
            access: "public",
            contentType: file.type,
            handleUploadUrl: "/api/audio/upload",
          }),
          {
            pending: "Uploading file...",
            success: {
              render() {
                return "File uploaded. Please wait...";
              },
              autoClose: 3000,
            },
            error: "Failed to upload file.",
          }
        );

        const audioForm = new FormData();
        audioForm.append("audioUrl", url);

        const response = (await toast.promise(transcribeAudio(audioForm), {
          pending: "TransAudio is doing the magic...",
          success: {
            render() {
              return "Transcription completed.";
            },
            autoClose: 1000,
          },
          error: "Transcription failed.",
        })) as TranscriptionResponse;

        if (typeof response === "object") {
          setTimeout(() => {
            FireConfetti();
          }, 500);
          setState((prev) => ({
            ...prev,
            status: response.status || "",
            text: response.text || "",
            confidence: response.confidence || "",
            duration: calculateDuration(start),
          }));
        } else {
          toast.error("Transcription failed. Please try again.", {
            icon: false,
            autoClose: 2000,
          });
          setState((prev) => ({ ...prev, loading: false }));
        }
      } catch (error) {
        console.error("Failed: ", error);
        handleReset();
      }
      setState((prev) => ({ ...prev, loading: true }));
    };

    processUpload();
  }, [state.loading, state.formData]);

  const handleCopy = () => {
    const transcriptText = document.querySelector(
      ".transcript-text"
    ) as HTMLDivElement;
    navigator.clipboard
      .writeText(transcriptText.innerText)
      .then(() => {
        setState((prev) => ({ ...prev, copied: true }));
        setTimeout(() => {
          setState((prev) => ({ ...prev, copied: false }));
        }, 3000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const handleDownload = () => {
    const transcriptText = document.querySelector(
      ".transcript-text"
    ) as HTMLDivElement;
    const blob = new Blob([transcriptText.innerText], {
      type: "text/plain;charset=utf-8",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transcript-${Math.random()
      .toString(36)
      .substring(2, 15)}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setState({
      loading: false,
      formData: null,
      status: "",
      text: "",
      confidence: "",
      duration: "",
      copied: false,
    });
    window.location.reload();
    const startSection = document.getElementById("upload");
    if (startSection) {
      startSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      id="upload"
      className="scroll-mt-28 w-11/12 mx-auto bg-gradient-to-br from-blue-dark/20 to-brick/10 p-8 md:p-10 border border-blue-light/30 rounded-md"
    >
      <AudioUploader
        onUpload={handleUpload}
        disabled={state.loading}
        displayAudio={state.status === "completed"}
      />

      {state.loading &&
        (state.status === "completed" ? (
          <TranscriptArea
            text={state.text}
            confidence={state.confidence}
            duration={state.duration}
            onCopy={handleCopy}
            onDownload={handleDownload}
            onReset={handleReset}
            copied={state.copied}
          />
        ) : (
          <LoadingState />
        ))}
    </section>
  );
}
