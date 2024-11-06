export const MAX_FILE_SIZE = 10000000;

export const sanitizeFilename = (filename: string, timestamp: string): string => {
    const sanitizedName = filename
        .replace(/\.mp3$/, "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-");
    return `${sanitizedName}-${timestamp}`;
};

export const calculateDuration = (start: number): string => {
    const durationMs = Date.now() - start;
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${String(seconds)}s`;
};
