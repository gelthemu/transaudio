import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileAudio,
  X,
  AlertCircle,
  Check,
  Loader2,
  Link as LinkIcon,
  Circle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "../../pages/i/files/progress";
import { UploadProgress } from "@/types";
import {
  ab3d2d3c1f7417,
  ab685aebf914a0,
  ac41bedb6ec4a9,
} from "@/utils/aai-fxns";
import { saveTranscript } from "@/utils/indexed--db--manager";
import { getSessionId } from "@/utils/session--manager";
import { generateTimestampId } from "@/utils/random-id";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ACCEPTED_TYPES = [
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/wave",
  "audio/x-wav",
  "audio/mp4",
  "audio/m4a",
  "audio/x-m4a",
  "audio/ogg",
  "audio/webm",
  "audio/flac",
];

const ACCEPTED_EXTENSIONS = [".mp3", ".m4a", ".wav", ".flac", ".ogg"];
const MAX_FILE_SIZE = 80 * 1024 * 1024; // 80MB

type UploadState = "idle" | "uploading" | "processing" | "complete" | "error";

interface ProcessingStep {
  id: string;
  label: string;
  status: "pending" | "active" | "complete";
}

interface FileUploadProps {
  showUrlModal?: boolean;
  onCloseUrlModal?: () => void;
}

export const FileUpload = ({
  showUrlModal = false,
  onCloseUrlModal,
}: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [progress, setProgress] = useState<UploadProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [urlModalOpen, setUrlModalOpen] = useState(showUrlModal);
  const [audioUrl, setAudioUrl] = useState("");
  const [urlError, setUrlError] = useState<string | null>(null);
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([
    { id: "validate", label: "File validated", status: "pending" },
    { id: "upload", label: "Uploaded to cloud", status: "pending" },
    { id: "transcribe", label: "Transcribing audio...", status: "pending" },
    { id: "timestamps", label: "Generating timestamps", status: "pending" },
    { id: "speakers", label: "Identifying speakers", status: "pending" },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUrlModalOpen(showUrlModal);
  }, [showUrlModal]);

  const handleUrlModalClose = () => {
    setUrlModalOpen(false);
    setAudioUrl("");
    setUrlError(null);
    onCloseUrlModal?.();
  };

  const updateStep = (stepId: string, status: ProcessingStep["status"]) => {
    setProcessingSteps((steps) =>
      steps.map((step) => (step.id === stepId ? { ...step, status } : step)),
    );
  };

  const resetSteps = () => {
    setProcessingSteps((steps) =>
      steps.map((step) => ({ ...step, status: "pending" })),
    );
  };

  const validateFile = (file: File): string | null => {
    const extension = "." + file.name.split(".").pop()?.toLowerCase();
    const isValidExtension = ACCEPTED_EXTENSIONS.includes(extension);
    const isValidType = ACCEPTED_TYPES.includes(file.type);

    if (!isValidExtension && !isValidType) {
      return "Format not supported. Please use MP3, M4A, WAV, FLAC, or OGG";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File exceeds 80 MB limit. Need help? Contact us";
    }
    return null;
  };

  const handleFile = useCallback((file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    resetSteps();
    setFile(file);
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    [handleFile],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
      }
    },
    [handleFile],
  );

  const clearFile = () => {
    setFile(null);
    setProgress(null);
    setError(null);
    setUploadState("idle");
    resetSteps();
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploadState("uploading");
    setError(null);

    try {
      // Step 1: Validate
      updateStep("validate", "active");
      await new Promise((resolve) => setTimeout(resolve, 300));
      updateStep("validate", "complete");

      // Step 2: Upload to S3
      updateStep("upload", "active");
      const key = `${generateTimestampId()}-${file.name}`;

      const uploadResult = await ab3d2d3c1f7417(file, key, (p) => {
        setProgress(p);
      });

      if (uploadResult.status === "failed") {
        throw new Error("Connection lost. Please try again");
      }

      updateStep("upload", "complete");
      setUploadState("processing");
      setProgress(null);

      // Step 3: Get the audio URL
      const urlResult = await ab685aebf914a0(key);
      if (urlResult.status === "failed") {
        throw new Error("Failed to process file");
      }

      // Step 4: Start transcription
      updateStep("transcribe", "active");
      const transcriptionResult = await ac41bedb6ec4a9(urlResult.url);
      if (transcriptionResult.status === "failed" || !transcriptionResult.id) {
        throw new Error(
          "Processing failed. Please try again or contact support",
        );
      }

      updateStep("transcribe", "complete");
      updateStep("timestamps", "active");
      await new Promise((resolve) => setTimeout(resolve, 500));
      updateStep("timestamps", "complete");
      updateStep("speakers", "active");
      await new Promise((resolve) => setTimeout(resolve, 500));
      updateStep("speakers", "complete");

      // Step 5: Save to IndexedDB
      const sessionId = getSessionId();
      await saveTranscript({
        session: sessionId,
        id: transcriptionResult.id,
        created: Date.now(),
      });

      setUploadState("complete");

      // Navigate to transcript page
      setTimeout(() => {
        navigate(`/transcript?id=${transcriptionResult.id}`);
      }, 1000);
    } catch (err) {
      setUploadState("error");
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleUrlSubmit = async () => {
    setUrlError(null);

    // Basic URL validation
    try {
      const url = new URL(audioUrl);
      if (!url.protocol.startsWith("http")) {
        throw new Error("Invalid protocol");
      }
    } catch {
      setUrlError("Please enter a valid audio file URL");
      return;
    }

    handleUrlModalClose();
    setUploadState("processing");
    resetSteps();

    try {
      updateStep("validate", "active");
      await new Promise((resolve) => setTimeout(resolve, 300));
      updateStep("validate", "complete");
      updateStep("upload", "complete");

      updateStep("transcribe", "active");
      const transcriptionResult = await ac41bedb6ec4a9(audioUrl);
      if (transcriptionResult.status === "failed" || !transcriptionResult.id) {
        throw new Error(
          "Processing failed. Please try again or contact support",
        );
      }

      updateStep("transcribe", "complete");
      updateStep("timestamps", "active");
      await new Promise((resolve) => setTimeout(resolve, 500));
      updateStep("timestamps", "complete");
      updateStep("speakers", "active");
      await new Promise((resolve) => setTimeout(resolve, 500));
      updateStep("speakers", "complete");

      const sessionId = getSessionId();
      await saveTranscript({
        session: sessionId,
        id: transcriptionResult.id,
        created: Date.now(),
      });

      setUploadState("complete");

      setTimeout(() => {
        navigate(`/transcript?id=${transcriptionResult.id}`);
      }, 1000);
    } catch (err) {
      setUploadState("error");
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const renderStepIcon = (status: ProcessingStep["status"]) => {
    switch (status) {
      case "complete":
        return <Check className="h-4 w-4 text-primary" />;
      case "active":
        return <Loader2 className="h-4 w-4 text-primary animate-spin" />;
      default:
        return <Circle className="h-4 w-4 text-muted-foreground/50" />;
    }
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {!file && uploadState === "idle" ? (
            <motion.div
              key="dropzone"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={cn(
                "relative border-2 border-dashed p-8 md:p-12 transition-all duration-200 cursor-pointer bg-card",
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/50",
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
            >
              <input
                ref={inputRef}
                type="file"
                accept={ACCEPTED_EXTENSIONS.join(",")}
                onChange={handleChange}
                className="hidden"
              />

              <div className="flex flex-col items-center text-center">
                <div
                  className={cn(
                    "p-4 mb-4 transition-all duration-200",
                    dragActive ? "bg-primary" : "bg-muted",
                  )}
                >
                  <Upload
                    className={cn(
                      "h-8 w-8 transition-colors",
                      dragActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground",
                    )}
                  />
                </div>

                <h3 className="font-display font-semibold text-lg mb-2">
                  {dragActive
                    ? "Drop your file here"
                    : "Drag and drop your audio file"}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  or click to browse from your computer
                </p>
                <div className="flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Check className="h-3 w-3 text-primary" />
                    Up to 80 MB
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="h-3 w-3 text-primary" />
                    MP3, M4A supported
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="h-3 w-3 text-primary" />
                    90-min max
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="file-preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="border border-border p-6 bg-card"
            >
              {file && (
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-primary">
                    <FileAudio className="h-6 w-6 text-primary-foreground" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{file.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>

                  {uploadState === "idle" && (
                    <button
                      onClick={clearFile}
                      className="p-2 hover:bg-muted transition-colors"
                    >
                      <X className="h-5 w-5 text-muted-foreground" />
                    </button>
                  )}
                </div>
              )}

              {progress && uploadState === "uploading" && (
                <div className="mb-6">
                  <Progress value={progress.percentage} showLabel />
                </div>
              )}

              {(uploadState === "processing" ||
                uploadState === "complete" ||
                uploadState === "uploading") && (
                <div className="space-y-3">
                  {processingSteps.map((step) => (
                    <div
                      key={step.id}
                      className={cn(
                        "flex items-center gap-3 py-2 px-3 transition-colors",
                        step.status === "active" && "bg-primary/5",
                        step.status === "complete" && "bg-muted/50",
                      )}
                    >
                      {renderStepIcon(step.status)}
                      <span
                        className={cn(
                          "text-sm",
                          step.status === "pending" &&
                            "text-muted-foreground/50",
                          step.status === "active" &&
                            "text-foreground font-medium",
                          step.status === "complete" && "text-muted-foreground",
                        )}
                      >
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {uploadState === "complete" && (
                <div className="mt-6 text-center py-4">
                  <p className="text-sm text-primary font-medium">
                    ✓ Transcription complete! Redirecting...
                  </p>
                </div>
              )}

              {uploadState === "idle" && file && (
                <div className="mt-2">
                  <Button
                    onClick={handleUpload}
                    className="w-full bg-primary hover:opacity-90 text-primary-foreground"
                  >
                    Start Transcription
                  </Button>
                </div>
              )}

              {uploadState === "error" && (
                <div className="mt-6">
                  <Button
                    onClick={clearFile}
                    variant="outline"
                    className="w-full"
                  >
                    Try Again
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-destructive/10 border border-destructive/20 flex items-start gap-3"
          >
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-destructive">Error</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
            <button
              onClick={clearFile}
              className="p-1 rounded hover:bg-destructive/10 transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </motion.div>
        )}
      </div>

      {/* URL Modal */}
      <Dialog open={urlModalOpen} onOpenChange={handleUrlModalClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-primary" />
              Paste Audio URL
            </DialogTitle>
            <DialogDescription>
              Enter a direct link to an audio file (MP3, M4A, WAV, etc.)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <Input
                placeholder="https://example.com/audio.mp3"
                value={audioUrl}
                onChange={(e) => setAudioUrl(e.target.value)}
                className={cn(urlError && "border-destructive")}
              />
              {urlError && (
                <p className="text-sm text-destructive mt-2">{urlError}</p>
              )}
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleUrlModalClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUrlSubmit}
                className="flex-1 gradient-bg text-primary-foreground"
                disabled={!audioUrl.trim()}
              >
                Transcribe
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
