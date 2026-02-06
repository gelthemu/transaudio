import React from "react";
import { Upload, FileAudio } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatFileSize } from "@/lib/validation";

interface FileUploadSectionProps {
  file: File | null;
  dragActive: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDragEnter: (e: React.DragEvent<Element>) => void;
  onDragLeave: (e: React.DragEvent<Element>) => void;
  onDragOver: (e: React.DragEvent<Element>) => void;
  onDrop: (e: React.DragEvent<Element>) => void;
}

const ACCEPTED_EXTENSIONS = [".mp3", ".m4a"];

export const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  file,
  dragActive,
  inputRef,
  onFileSelect,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
}) => {
  return (
    <div
      key="dropzone"
      className={cn(
        "relative p-8 flex flex-col items-center justify-center gap-3",
        "border-2 border-dashed cursor-pointer",
        dragActive
          ? "border-brand bg-brand/5"
          : "border-accent hover:border-brand/50 hover:bg-brand/5",
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
      />
      <div className="flex flex-col items-center text-center">
        <div className={cn("p-4 mb-2 transition-all duration-200")}>
          {file ? (
            <FileAudio className="h-8 w-8 text-success" />
          ) : (
            <Upload className="h-8 w-8 text-accent" />
          )}
        </div>
        {file ? (
          <>
            <h3 className="font-semibold text-base mb-1">{file.name}</h3>
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
