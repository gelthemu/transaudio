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
  id: string;
  created: number;
  confidence?: number;
  summary: string;
  words?: TranscriptWord[];
  utterances?: Utterance[];
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface StoredTranscript {
  session: string;
  id: string;
  created: number;
}
