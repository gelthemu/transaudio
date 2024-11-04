export interface TranscriptionResponse {
    status: string;
    text: string;
    confidence: string;
}

export interface AudioUploaderProps {
    onUpload: (formData: FormData) => Promise<void>;
    disabled: boolean;
    displayAudio: boolean;
}

export interface TranscriptDisplayProps {
    text: string;
    confidence: string | number;
    duration: string;
    onCopy: () => void;
    onDownload: () => void;
    onReset: () => void;
    copied: boolean;
}

export interface TranscriptActionsProps {
    onCopy: () => void;
    onDownload: () => void;
    onReset: () => void;
    copied: boolean;
    confidence: string | number;
    duration: string;
}

export interface TranscriptState {
    loading: boolean;
    formData: FormData | null;
    status: string;
    text: string;
    confidence: number | string;
    duration: string;
    copied: boolean;
}

export interface UploadConfig {
    access: 'public' | 'private';
    contentType: string;
    handleUploadUrl: string;
}

export interface UploadResponse {
    url: string;
}
