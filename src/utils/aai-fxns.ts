import { UploadProgress, TranscriptResponse } from "../types";

type TranscriptionStartResult = {
  status: "success" | "failed";
  id?: string;
};
type UrlResult = { status: "success"; url: string } | { status: "failed" };

export async function ab3d2d3c1f7417(
  file: File,
  key: string,
  onProgress?: (progress: UploadProgress) => void,
): Promise<UrlResult> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/transaudio/adfbd7d/ab3d2d3`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key,
          contentType: file.type,
        }),
      },
    );

    if (!response.ok) return { status: "failed" };

    const { status, url } = await response.json();
    if (status !== "success" || !url || typeof url !== "string") {
      return { status: "failed" };
    }

    await new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable && onProgress) {
          const percentage = Math.round((event.loaded / event.total) * 100);
          onProgress({
            loaded: event.loaded,
            total: event.total,
            percentage,
          });
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve();
        } else {
          reject(new Error("upload failed"));
        }
      });

      xhr.addEventListener("error", () => reject(new Error("network error")));
      xhr.addEventListener("timeout", () => reject(new Error("timeout")));

      xhr.open("PUT", url);
      xhr.setRequestHeader("Content-Type", file.type);
      xhr.timeout = 600000;
      xhr.send(file);
    });

    return { status: "success", url: "..." };
  } catch {
    return { status: "failed" };
  }
}

export const ab685aebf914a0 = async (key: string): Promise<UrlResult> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/transaudio/adfbd7d/ab685ae`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      },
    );

    if (!response.ok) return { status: "failed" };

    const { status, url } = await response.json();
    if (status !== "success" || !url || typeof url !== "string") {
      return { status: "failed" };
    }

    return { status: "success", url };
  } catch {
    return { status: "failed" };
  }
};

export const ac41bedb6ec4a9 = async (
  audioUrl: string,
): Promise<TranscriptionStartResult> => {
  try {
    const start = await fetch(
      `${import.meta.env.VITE_API_URL}/api/transaudio/adfbd7d/ac41bed`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audioUrl }),
      },
    );

    if (!start.ok) return { status: "failed" };

    const { status, id } = await start.json();
    if (status !== "success" || !id) {
      return { status: "failed" };
    }

    return { status: "success", id };
  } catch {
    return { status: "failed" };
  }
};

export const ad58ad087edb98 = async (
  id: string,
): Promise<TranscriptResponse | null> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/transaudio/adfbd7d/ad58ad0`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      },
    );

    if (!response.ok) throw new Error(`HTTP error ${response.status}`);

    const result = await response.json();
    return result;
  } catch {
    return null;
  }
};
