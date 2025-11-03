import { formatDate } from "../utils/format-date";
import { generateRandomId } from "../utils/random-id";
import { Utterance, TranscriptResponse } from "../types";

type DownloadParams = {
  id: string;
  user_file: string;
  date: number;
  transcript: TranscriptResponse;
  setError: (error: string) => void;
};

export const iDownload = async ({
  id,
  user_file,
  date,
  transcript,
  setError,
}: DownloadParams): Promise<void> => {
  try {
    if (!id || !transcript) {
      setError("zero transcripts ready for download...");
      return;
    }

    let content = "";

    if (transcript?.utterances && transcript?.utterances.length > 0) {
      content = transcript.utterances
        .map((utterance: Utterance) => {
          const startTime =
            Math.floor(utterance.start / 60000)
              .toString()
              .padStart(2, "0") +
            ":" +
            Math.floor((utterance.start % 60000) / 1000)
              .toString()
              .padStart(2, "0");

          return `${utterance.speaker}: [${startTime}]\n${utterance.text}`;
        })
        .join("\n\n");
    }

    content = `Transcript for: ${id}.${user_file}\nCreated: ${formatDate(
      date || ""
    )}\nAccuracy: ${
      transcript?.confidence
        ? Math.round(transcript.confidence * 100).toFixed(2) + "%"
        : "-"
    }\n\n${content}`;

    const randomId = generateRandomId();
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transaudio-${randomId}-${id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    setError(`failed to download transcript: ${err}...`);
  }
};
