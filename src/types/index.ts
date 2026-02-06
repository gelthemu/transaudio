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

export interface Word {
  text: string;
  start: number;
  end: number;
}

export interface Utterance {
  speaker: string;
  text: string;
  start: number;
  words: Word[];
}

export interface ScriptInfo {
  id: string;
  created: number;
  confidence?: number;
  words?: Word[];
  utterances?: Utterance[];
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface StoredScript {
  session: string;
  id: string;
  created: number;
}
