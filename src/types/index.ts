export type FileStatus =
  | "pending"
  | "uploading"
  | "uploaded"
  | "queued"
  | "processing"
  | "ready"
  | "completing"
  | "completed"
  | "redirect"
  | "error";

export interface TranscriptWord {
  text: string;
  start: number;
  end: number;
}

export interface Utterance {
  speaker: string;
  text: string;
  start: number;
  words: TranscriptWord[];
}

export interface TranscriptResponse {
  words?: TranscriptWord[];
  utterances?: Utterance[];
  confidence?: number;
  key: string;
  user_file: string;
  summary: string;
}

export interface FinalTranscript {
  transcript: TranscriptResponse;
  signed_url: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface ProcessingFile {
  file: File;
  key: string;
  user_file: string;
  uploadProgress: UploadProgress;
  status: FileStatus;
  error?: string;
}

export interface StoredTranscript {
  session: string;
  key: string;
  id: string;
  user_file: string;
  created: number;
}
