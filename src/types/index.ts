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
  id: string;
  summary: string;
  created: number;
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
