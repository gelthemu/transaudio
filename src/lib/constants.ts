export const ACCEPTED_TYPES = [
  "audio/mp3",
  "audio/mpeg",
  "audio/m4a",
  "audio/x-m4a",
  "audio/mp4",
  "video/mp4",
];

export const ACCEPTED_EXTENSIONS = [".mp3", ".m4a"];

export const MAX_FILE_SIZE = 80 * 1024 * 1024;

export const INITIAL_PROCESSING_STEPS = [
  { id: "validate", label: "Validated", status: "pending" as const },
  {
    id: "transcribe",
    label: "TransAUDIO is doing some magic...",
    status: "pending" as const,
  },
  {
    id: "timestamps",
    label: "Generating timestamps",
    status: "pending" as const,
  },
  { id: "speakers", label: "Identifying speakers", status: "pending" as const },
];
