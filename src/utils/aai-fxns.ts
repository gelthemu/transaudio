import { UploadProgress, ScriptInfo } from "@/types";

export async function ab3d2d3c1f7417(
  file: File,
  key: string,
  onProgress?: (progress: UploadProgress) => void,
): Promise<string> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/v1/transaudio/adfbd7d/ab3d2d3`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key,
          contentType: file.type,
        }),
      },
    );

    if (!response.ok) return "";

    const url = await response.json();
    if (!url || typeof url !== "string") {
      return "";
    }

    await new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable && onProgress) {
          const percentage =
            Math.round((event.loaded / event.total) * 100 * 100) / 100;
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

    return "...";
  } catch {
    return "";
  }
}

export const ab685aebf914a0 = async (key: string): Promise<string> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/v1/transaudio/adfbd7d/ab685ae`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      },
    );

    if (!response.ok) return "";

    const url = await response.json();
    if (!url || typeof url !== "string") {
      return "";
    }

    return url;
  } catch {
    return "";
  }
};

export const ac41bedb6ec4a9 = async (url: string): Promise<string> => {
  try {
    const start = await fetch(
      `${import.meta.env.VITE_API_URL}/v1/transaudio/adfbd7d/ac41bed`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      },
    );

    if (!start.ok) return "";

    const task = await start.json();
    if (!task) {
      return "";
    }

    return task;
  } catch {
    return "";
  }
};

export const ad58ad087edb98 = async (
  task: string,
): Promise<ScriptInfo | null> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/v1/transaudio/adfbd7d/ad58ad0`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: task }),
      },
    );

    if (!response.ok) return null;

    const result = await response.json();
    return result;
  } catch {
    return null;
  }
};
