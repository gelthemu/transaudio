"use client";

import React from "react";
import { useRef, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import type { AudioUploaderProps } from "@/types";

type AcceptedFile = "audio/mpeg" | "audio/mp3" | "video/mp4" | "audio/mp4";

export default function AudioUploader({
  onUpload,
  disabled,
  displayAudio,
}: AudioUploaderProps): JSX.Element {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileUpload = async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append("audio", file);
    await onUpload(formData);
  };

  const validateFile = (fileType: string): fileType is AcceptedFile => {
    return ["audio/mpeg", "audio/mp3", "video/mp4", "audio/mp4"].includes(fileType);
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) {
        toast.error("Upload a supported file", {
          icon: false,
        });
        return;
      }

      try {
        setIsUploading(true);
        setFileName(file.name);

        if (!validateFile(file.type)) {
          toast.error("Unsupported file format", {
            icon: false,
          });
          return;
        }

        const url = URL.createObjectURL(file);
        setAudioUrl(url);
        await handleFileUpload(file);
      } catch (error) {
        toast.error(`${error}`, {
          icon: false,
        });
        console.error("Upload error:", error);
      } finally {
        setIsUploading(false);
      }
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "audio/mpeg": [".mp3"],
      "audio/mp3": [".mp3"],
      "video/mp4": [".mp4"],
      "audio/mp4": [".mp4"],
    },
    multiple: false,
    disabled,
  });

  const getUploaderClassName = (): string => {
    const baseClasses =
      "relative p-8 border-2 border-dashed border-blue-light/60 hover:border-blue-light rounded-md transition-colors duration-200 ease-in-out";
    const dragClasses = isDragActive
      ? "bg-dark/60"
      : " bg-dark/30 hover:bg-dark/60";
    const stateClasses = isUploading
      ? "opacity-50 cursor-not-allowed"
      : disabled
      ? "opacity-30 cursor-progress"
      : "cursor-pointer";

    return `${baseClasses} ${dragClasses} ${stateClasses}`;
  };

  const handleAudioEnded = (): void => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
  };

  return (
    <div className="w-full mx-auto transition-all duration-200 ease-in-out">
      <div {...getRootProps()} className={getUploaderClassName()}>
        <input {...getInputProps()} />
        <div className="space-y-4 text-center text-beige/80">
          <Upload className="h-10 w-10 mx-auto" />

          {isDragActive ? (
            <>
              <div>
                <p className="font-medium">Drop the audio file here...</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="font-semibold">Drag and drop a file here</p>
                <p>or click to select one</p>
              </div>
              <p className="text-sm font-semibold">Format: MP3/MP4 (&lt; 8MB).</p>
            </>
          )}
        </div>
      </div>

      {audioUrl && displayAudio && (
        <div className="w-full pt-8">
          <p className="text-beige/90 bg-brick/50 text-sm font-semibold mb-4 px-3 py-2 rounded-md max-w-max">
            {fileName}
          </p>
          <audio
            ref={audioRef}
            controls
            controlsList="nodownload noplaybackrate"
            src={audioUrl}
            className="w-full bg-[#3a3b3b] rounded-md"
            onEnded={handleAudioEnded}
          />
        </div>
      )}
    </div>
  );
}
