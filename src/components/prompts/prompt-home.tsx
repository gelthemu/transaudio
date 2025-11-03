import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Prompt } from "./prompt";
import { PromptConfirm } from "./prompt-confirm";
import { Spinner } from "../spinner";
import { cleanFileName } from "../../utils/random-id";
import { ProcessingFile } from "../../types";

type AppStep =
  | "initial"
  | "selected"
  | "uploading"
  | "processing"
  | "completed"
  | "redirect";

interface PromptTranscriptProps {
  file: ProcessingFile | null;
  step: AppStep;
  error: string;
  onSelect: () => Promise<void>;
  onStart: () => Promise<void>;
  onCancel: () => void;
  onClearError: () => void;
  hasFile: boolean;
}

export const PromptTranscript: React.FC<PromptTranscriptProps> = ({
  file,
  step,
  error,
  onSelect,
  onStart,
  onCancel,
  onClearError,
  hasFile,
}) => {
  const navigate = useNavigate();
  const [quake, setQuake] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onClosePrompt = () => {
    setIsOpen(false);
    onClearError();
  };

  const handlePrompt = async (prompt: string) => {
    onClearError();

    try {
      switch (prompt) {
        case "ALL":
          navigate("/transcripts");
          break;

        case "HELP":
          setQuake(true);
          setTimeout(() => setQuake(false), 6000);
          break;

        case "SELECT":
          await onSelect();
          break;

        case "START":
          await onStart();
          break;

        case "CANCEL":
          setIsOpen(true);
          break;

        default:
          break;
      }
    } catch {
      console.error("prompt error:");
    }
  };

  const getPromptText = () => {
    switch (step) {
      case "initial":
      case "selected":
        return "Enter Prompt:";
      case "uploading":
        return "Uploading...";
      case "processing":
        return "Processing...";
      case "completed":
      case "redirect":
        return "Redirecting...";
      default:
        return "Enter Prompt:";
    }
  };

  const getValidPrompts = () => {
    switch (step) {
      case "initial":
        return ["SELECT", "ALL", "HELP"];
      case "selected":
        return ["START", "CANCEL", "ALL", "HELP"];
      case "uploading":
      case "processing":
      case "completed":
      case "redirect":
        return [""];
      default:
        return ["ALL", "HELP"];
    }
  };

  const isProcessing =
    step === "uploading" ||
    step === "processing" ||
    step === "completed" ||
    step === "redirect";

  const isDisabled = isProcessing || quake;

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const generateProgressBar = (percentage: number, width = 20) => {
    const filled = Math.round((percentage / 100) * width);
    const empty = width - filled;
    const filledBar = "#".repeat(filled);
    const emptyBar = "-".repeat(empty);
    return `[${filledBar}${emptyBar}] ${percentage}%`;
  };

  return (
    <div className="p-px flex flex-col space-y-4 text-left">
      <div>
        <div className="text-terminal-amber text-sm opacity-60">
          {isOpen ? (
            <div>
              "Okay to <span className="font-bold">PROCEED</span>?"
            </div>
          ) : (
            <>
              {step === "initial" && (
                <div>
                  "Ready to<span className="font-bold">{" SELECT "}</span>a
                  file"
                </div>
              )}
              {step === "selected" && hasFile && (
                <div>
                  "Ready to<span className="font-bold">{" START "}</span>or
                  <span className="font-bold">{" CANCEL "}</span>to refresh"
                </div>
              )}
              {step === "uploading" && <div>"Uploading file to server..."</div>}
              {step === "processing" && (
                <div>"TransAudio is doing some magic..."</div>
              )}
              {(step === "completed" || step === "redirect") && (
                <div>"Done! Your transcript is ready"</div>
              )}
            </>
          )}
        </div>
        {isOpen ? (
          <PromptConfirm
            isOpen={isOpen}
            onClearError={onClearError}
            onCancel={onCancel}
            closePrompt={onClosePrompt}
          />
        ) : (
          <div className="flex flex-row items-center space-x-1">
            <Prompt
              prompt={getPromptText()}
              onPrompt={handlePrompt}
              onClearError={onClearError}
              validPrompts={getValidPrompts()}
              disabled={isDisabled}
              valueLength={6}
            />
            {isProcessing && (
              <div>
                {(step === "uploading" || step === "processing") && <Spinner />}
              </div>
            )}
          </div>
        )}
      </div>
      {error && (
        <div className="text-terminal-red text-sm">
          <span>{error}</span>
        </div>
      )}
      {file && file.status !== "completed" && step !== "redirect" && (
        <div className="flex flex-col text-sm">
          <div>
            <span className="text-terminal-green">
              {cleanFileName(file.file.name)}
            </span>
            <span className="mx-1.5 opacity-60 lowercase">[{file.status}]</span>
            <span className="opacity-60">{formatFileSize(file.file.size)}</span>
          </div>
          {isProcessing && (
            <div className="text-terminal-cyan">
              {generateProgressBar(file.uploadProgress.percentage)}
            </div>
          )}
        </div>
      )}
      <div>
        <div className="text-terminal-cyan mb-1">Available Prompts:</div>
        <table className={`ml-4 p-2 border-none ${quake ? "quake" : ""}`}>
          <tbody>
            <tr className="border-none">
              <td className="border-none pe-0">SELECT</td>
              <td className="border-none px-4"></td>
              <td className="border-none opacity-60 text-sm">
                Chooses a file (MP3/M4A)
              </td>
            </tr>
            <tr className="border-none">
              <td className="border-none pe-0">START</td>
              <td className="border-none px-4"></td>
              <td className="border-none opacity-60 text-sm">
                Converts speech to text
              </td>
            </tr>
            <tr className="border-none">
              <td className="border-none pe-0">ALL</td>
              <td className="border-none px-4"></td>
              <td className="border-none opacity-60 text-sm">
                Navigates to all transcripts
              </td>
            </tr>
            <tr className="border-none">
              <td className="border-none pe-0">CANCEL</td>
              <td className="border-none px-4"></td>
              <td className="border-none opacity-60 text-sm">
                Clears current selection
              </td>
            </tr>
            <tr className="border-none">
              <td className="border-none pe-0">HELP</td>
              <td className="border-none px-4"></td>
              <td className="border-none opacity-60 text-sm">
                {quake ? "🤡".repeat(1) : "Quakes this message"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
