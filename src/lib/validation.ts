import { ACCEPTED_TYPES, MAX_FILE_SIZE } from "./constants";

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const isValidUrl = (url: string): boolean => {
  if (!url.trim()) return false;

  try {
    const urlObj = new URL(url.trim());
    const path = urlObj.pathname.toLowerCase();
    return (
      (urlObj.protocol === "https:" || urlObj.protocol === "http:") &&
      (path.endsWith(".mp3") || path.endsWith(".m4a"))
    );
  } catch {
    return false;
  }
};

export const isValidFile = (file: File | null): boolean => {
  if (!file) return false;

  const hasValidExtension = file.name.toLowerCase().match(/\.(mp3|m4a)$/);

  if (!hasValidExtension) return false;

  const hasValidType = ACCEPTED_TYPES.includes(file.type);
  const isM4aFile = file.name.toLowerCase().endsWith(".m4a");

  const typeIsValid = hasValidType || isM4aFile;

  return typeIsValid && file.size <= MAX_FILE_SIZE;
};

export const getUrlError = (url: string): string | null => {
  if (!url.trim()) return null;

  try {
    const urlObj = new URL(url.trim());
    const path = urlObj.pathname.toLowerCase();

    if (urlObj.protocol !== "https:" && urlObj.protocol !== "http:") {
      return "URL must use HTTP or HTTPS protocol";
    }

    if (!path.endsWith(".mp3") && !path.endsWith(".m4a")) {
      return "URL must point to an MP3 or M4A file";
    }

    return null;
  } catch {
    return "Invalid URL format";
  }
};

export const getFileError = (file: File | null): string | null => {
  if (!file) return null;

  const hasValidExtension = file.name.toLowerCase().match(/\.(mp3|m4a)$/);

  if (!hasValidExtension) {
    return "Invalid file type. Only MP3 and M4A are supported";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "File exceeds 80 MB limit. Need help? Contact us";
  }

  return null;
};
