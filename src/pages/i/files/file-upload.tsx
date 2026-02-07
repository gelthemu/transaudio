import React, { RefObject } from "react";
import { Upload, FileAudio } from "lucide-react";
import { formatFileSize } from "@/lib/validation";
import { cleanFileName } from "@/utils/random-id";
import { TransAudioState } from "@/types";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  file: File | null;
  value: number;
  isError: boolean;
  dragActive: boolean;
  inputRef: RefObject<HTMLInputElement>;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDragEnter: (e: React.DragEvent<Element>) => void;
  onDragLeave: (e: React.DragEvent<Element>) => void;
  onDragOver: (e: React.DragEvent<Element>) => void;
  onDrop: (e: React.DragEvent<Element>) => void;
  state: TransAudioState;
  disabled?: boolean;
}

const ACCEPTED_EXTENSIONS = [".mp3", ".m4a"];

export const FileUpload: React.FC<FileUploadProps> = ({
  file,
  value,
  isError,
  dragActive,
  inputRef,
  onFileSelect,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  state = "idle",
  disabled = false,
}) => {
  return (
    <div
      key="dropzone"
      className={cn(
        "relative w-full p-8 flex flex-col items-center justify-center gap-3",
        "border-2 border-dashed cursor-pointer",
        dragActive
          ? "border-brand bg-brand/10"
          : file && !isError
            ? "border-success bg-success/10"
            : file && isError
              ? "border-error bg-error/10"
              : "border-accent hover:border-brand/50 hover:bg-brand/5",
        disabled ? "disabled" : "",
      )}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_EXTENSIONS.join(",")}
        onChange={onFileSelect}
        className="hidden"
        disabled={disabled}
      />
      {state !== "idle" && state !== "error" && value > 0 && (
        <div className="absolute inset-0 z-0 h-full bg-transparent overflow-hidden">
          <div
            className="h-full bg-success/50 transition-all duration-300 ease-out"
            style={{ width: `${value}%` }}
          />
        </div>
      )}
      <div className="flex flex-col items-center text-center z-10">
        <div className={cn("p-2 transition-all duration-200")}>
          {file ? (
            <FileAudio
              className={cn("h-6 w-6", isError ? "text-error" : "text-success")}
            />
          ) : (
            <Upload className="h-6 w-6 text-accent" />
          )}
        </div>
        {file ? (
          <>
            <h3 className="max-w-xs font-semibold text-base leading-[1] tracking-tight mb-1">
              {cleanFileName(file.name)}
            </h3>
            <p className="text-muted text-sm">{formatFileSize(file.size)}</p>
          </>
        ) : (
          <>
            <h3 className="font-semibold text-base mb-1">
              {dragActive
                ? "Drop Your File Here..."
                : "Drag and Drop Your File"}
            </h3>
            <p className="text-muted text-sm">
              or click to browse from your computer
            </p>
          </>
        )}
      </div>
    </div>
  );
};
