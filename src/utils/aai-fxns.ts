import { UploadProgress, FinalTranscript } from "../types";

type TranscriptionStartResult = {
  status: "success" | "failed";
  id?: string;
};
type UploadUrlResult =
  | { status: "success"; url: string }
  | { status: "failed" };

export async function ab3d2d3c1f7417(
  file: File,
  key: string,
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadUrlResult> {
  try {
    const response = await fetch(
      "/api/adfbd7d-e348-4d92-90db-6a1f1041499d/ab3d2d3-c1f7-417b-9762-282b7810e661",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key,
          contentType: file.type,
        }),
      }
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

    return { status: "success", url };
  } catch {
    return { status: "failed" };
  }
}

export const ac41bedb6ec4a9 = async (
  audioUrl: string
): Promise<TranscriptionStartResult> => {
  try {
    const start = await fetch(
      "/api/adfbd7d-e348-4d92-90db-6a1f1041499d/ac41bed-b6ec-4a91-9bef-8bd4e7cd2310",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audioUrl }),
      }
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
  id: string
): Promise<FinalTranscript | null> => {
  try {
    const response = await fetch(
      "/api/adfbd7d-e348-4d92-90db-6a1f1041499d/ad58ad087ed-b989-4257-88cc-e11a8b78",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      }
    );

    if (!response.ok) throw new Error(`HTTP error ${response.status}`);

    const result = await response.json();
    return result;
  } catch {
    return null;
  }
};
