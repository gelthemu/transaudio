"use client";

import React from "react";
import { useRef, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import type { AudioUploaderProps } from "@/types";

type AcceptedFile = "audio/mpeg" | "audio/mp3";

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
    return fileType === "audio/mpeg" || fileType === "audio/mp3";
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
    },
    multiple: false,
    disabled,
  });

  const getUploaderClassName = (): string => {
    const baseClasses =
      "relative p-8 border-2 border-dashed rounded-lg transition-colors duration-200 ease-in-out";
    const dragClasses = isDragActive
      ? "border-brandBlue-light bg-brandBeige/20"
      : "border-brandBlue-light/80 hover:border-brandBlue-light bg-brandBeige/5 hover:bg-brandBeige/10";
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
        <div className="space-y-4 text-center">
          <Upload className="mx-auto h-12 w-12 text-brandBlue-light/90" />

          {isUploading ? (
            <>
              <div>
                <p className="text-brandBlue-dark font-medium">
                  UPLOADING . . .
                </p>
                <p className="text-brandBlue-dark">please wait</p>
              </div>
              <p className="text-sm text-brandBlue-light/90 font-semibold">
                File Accepted
              </p>
            </>
          ) : isDragActive ? (
            <>
              <div>
                <p className="text-brandBlue-light/90 font-medium">
                  Drop the audio file here...
                </p>
              </div>
              <p className="text-sm text-brandBlue-light/90 font-semibold">
                Format: MP3 (&lt; 10MB).
              </p>
            </>
          ) : (
            <>
              <div>
                <p className="text-brandBlue-light/90 font-medium">
                  Drag and drop a file here
                </p>
                <p className="text-brandBlue-light/90">
                  or click to select one
                </p>
              </div>
              <p className="text-sm text-brandBlue-light/90 font-semibold">
                Format: MP3 (&lt; 10MB).
              </p>
            </>
          )}
        </div>
      </div>

      {audioUrl && displayAudio && (
        <div className="w-full py-8">
          <p className="text-brandBeige/90 bg-brandBrick/50 text-sm mb-4 px-3 py-2 rounded-lg max-w-max">
            {fileName}
          </p>
          <audio
            ref={audioRef}
            controls
            controlsList="nodownload"
            src={audioUrl}
            className="w-full bg-[#3a3b3b] rounded-lg"
            onEnded={handleAudioEnded}
          />
        </div>
      )}
    </div>
  );
}
