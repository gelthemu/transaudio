import React, { RefObject } from "react";
import { Upload, FileAudio } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatFileSize } from "@/lib/validation";
import { cleanFileName } from "@/utils/random-id";

interface FileUploadProps {
  file: File | null;
  isError: boolean;
  dragActive: boolean;
  inputRef: RefObject<HTMLInputElement>;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDragEnter: (e: React.DragEvent<Element>) => void;
  onDragLeave: (e: React.DragEvent<Element>) => void;
  onDragOver: (e: React.DragEvent<Element>) => void;
  onDrop: (e: React.DragEvent<Element>) => void;
  disabled?: boolean;
}

const ACCEPTED_EXTENSIONS = [".mp3", ".m4a"];

export const FileUpload: React.FC<FileUploadProps> = ({
  file,
  isError,
  dragActive,
  inputRef,
  onFileSelect,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  disabled = false,
}) => {
  return (
    <div
      key="dropzone"
      className={cn(
        "relative p-8 flex flex-col items-center justify-center gap-3",
        "border-2 border-dashed cursor-pointer",
        dragActive
          ? "border-brand bg-brand/5"
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
      <div className="flex flex-col items-center text-center">
        <div className={cn("p-3 mb-2 transition-all duration-200")}>
          {file ? (
            <FileAudio
              className={cn("h-8 w-8", isError ? "text-error" : "text-success")}
            />
          ) : (
            <Upload className="h-8 w-8 text-accent" />
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
