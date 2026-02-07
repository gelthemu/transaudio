export type InputMethod = "file" | "url" | null;
export type TransAudioState =
  | "idle"
  | "uploading"
  | "processing"
  | "complete"
  | "error";

export interface ProcessingStep {
  id: string;
  label: string;
  status: "pending" | "active" | "complete";
}

export interface Segment {
  id: string;
  text: string;
  timestamp: number;
}

export interface ScriptInfo {
  task: string;
  timestamp: number;
  accuracy?: number;
  words?: number;
  segments?: Segment[];
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface StoredScript {
  session: string;
  task: string;
  timestamp: number;
}
