import { UploadProgress, FinalTranscript } from "../types";

export async function an59k1jab2(
  file: File,
  key: string,
  user_file: string,
  onProgress?: (progress: UploadProgress) => void
): Promise<"success" | "failed"> {
  try {
    const response = await fetch("/api/0n59k1jab2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key,
        user_file,
        contentType: file.type,
      }),
    });

    if (!response.ok) {
      return "failed";
    }

    const { status, url } = await response.json();

    if (status !== "success" || !url) {
      return "failed";
    }

    return new Promise((resolve, reject) => {
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
          resolve("success");
        } else {
          reject(new Error("upload failed..."));
        }
      });

      xhr.addEventListener("error", () => reject(new Error("network error")));
      xhr.addEventListener("timeout", () => reject(new Error("timeout")));

      xhr.open("PUT", url);
      xhr.setRequestHeader("Content-Type", file.type);
      xhr.timeout = 480000;
      xhr.send(file);
    });
  } catch {
    return "failed";
  }
}

export const axpsfoxdmc = async (
  key: string,
  user_file: string,
  onStatusUpdate?: (status: string) => void
): Promise<"success" | "failed"> => {
  try {
    const start = await fetch("/api/adm3ojl1be", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key, user_file }),
    });

    if (!start.ok) {
      if (onStatusUpdate) onStatusUpdate("error");
      return "failed";
    }

    const { status, id } = await start.json();

    let new_status = status;

    while (new_status === "queued" || new_status === "processing") {
      if (onStatusUpdate) onStatusUpdate(new_status);

      await new Promise((resolve) => setTimeout(resolve, 3000));

      const poll = await fetch("/api/ba9q96b3r4", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!poll.ok) {
        if (onStatusUpdate) onStatusUpdate("error");
        return "failed";
      }

      const check_result = await poll.json();

      new_status = check_result.status;

      if (new_status === "ready") break;
    }

    if (onStatusUpdate) onStatusUpdate("completing");

    const saveResponse = await fetch("/api/cdccc2chbi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, key, user_file }),
    });

    if (!saveResponse.ok) {
      if (onStatusUpdate) onStatusUpdate("error");
      return "failed";
    }

    const save_result = await saveResponse.json();

    if (save_result.status === "success") {
      if (onStatusUpdate) onStatusUpdate("completed");
      return "success";
    } else {
      if (onStatusUpdate) onStatusUpdate("error");
      return "failed";
    }
  } catch {
    if (onStatusUpdate) onStatusUpdate("error");
    return "failed";
  }
};

export const jprx74abrm = async (
  key: string,
  user_file: string
): Promise<FinalTranscript | null> => {
  try {
    const response = await fetch("/api/drtc2chbioy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key, user_file }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const result = await response.json();

    return {
      transcript: result.data,
      signed_url: result.url,
    };
  } catch {
    return null;
  }
};
