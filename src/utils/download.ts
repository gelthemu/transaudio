import { formatDate } from "../utils/format-date";
import { generateRandomId } from "../utils/random-id";
import { Utterance, TranscriptResponse } from "../types";
import { Document, Packer, Paragraph, TextRun } from "docx";

type DownloadParams = {
  transcript: TranscriptResponse;
  setError: (error: string) => void;
  format?: "txt" | "docx";
};

const formatTimestamp = (ms: number): string => {
  const minutes = Math.floor(ms / 60000)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((ms % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const createWordDocument = async (transcriptText: string): Promise<Blob> => {
  const lines = transcriptText.split("\n");
  const paragraphs: Paragraph[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      paragraphs.push(new Paragraph({ children: [new TextRun("")] }));
      i++;
      continue;
    }

    const newFormatMatch = line.match(/^([^:]+):\s*\[([^\]]+)\]\s*$/);

    if (newFormatMatch) {
      const speaker = newFormatMatch[1].trim();
      const timestamp = newFormatMatch[2].trim();

      i++;
      const contentLines: string[] = [];
      while (i < lines.length) {
        const nextLine = lines[i];
        if (
          nextLine.match(/^[^:]+:\s*\[[^\]]+\]\s*$/) ||
          nextLine.trim() === ""
        ) {
          break;
        }
        contentLines.push(nextLine.trim());
        i++;
      }

      const content = contentLines.join(" ").trim();

      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${speaker}: `,
              bold: true,
              font: "Calibri",
              size: 28,
            }),
            new TextRun({
              text: `[${timestamp}]`,
              italics: true,
              font: "Calibri",
              size: 20,
            }),
          ],
        })
      );

      if (content) {
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: content,
                font: "Calibri",
                size: 28,
              }),
            ],
          })
        );
      }

      paragraphs.push(new Paragraph({ children: [new TextRun("")] }));
      continue;
    }

    const oldFormatMatch = line.match(/^([^:]+):\s*\[([^\]]+)\]\s*(.*)$/);

    if (oldFormatMatch) {
      const speaker = oldFormatMatch[1].trim();
      const timeRange = oldFormatMatch[2].trim();
      const content = oldFormatMatch[3].trim();

      const startTime = timeRange.split(" - ")[0];

      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${speaker}: `,
              bold: true,
              font: "Calibri",
              size: 28,
            }),
            new TextRun({
              text: `[${startTime}]`,
              italics: true,
              font: "Calibri",
              size: 20,
            }),
          ],
        })
      );

      if (content) {
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: content,
                font: "Calibri",
                size: 28,
              }),
            ],
          })
        );
      }

      paragraphs.push(new Paragraph({ children: [new TextRun("")] }));
      i++;
      continue;
    }

    if (line.match(/^(Transcript for|Created|Accuracy):/i)) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line,
              font: "Calibri",
              size: 28,
            }),
          ],
        })
      );
      i++;
      continue;
    }

    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: line,
            font: "Calibri",
            size: 28,
          }),
        ],
      })
    );
    i++;
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          default: {
            font: {
              name: "Calibri",
              size: 28,
            },
          },
        },
        children: paragraphs,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  return blob;
};

const downloadAsText = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const downloadAsWord = async (
  content: string,
  filename: string
): Promise<void> => {
  const blob = await createWordDocument(content);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const iDownload = async ({
  transcript,
  setError,
  format = "docx",
}: DownloadParams): Promise<void> => {
  try {
    if (!transcript.id || !transcript) {
      setError("zero transcripts ready for download...");
      return;
    }

    if (!transcript?.utterances || transcript.utterances.length === 0) {
      setError("No transcript content available for download...");
      return;
    }

    let content = transcript.utterances
      .map((utterance: Utterance) => {
        const timestamp = formatTimestamp(utterance.start);
        return `Speaker ${utterance.speaker}: [${timestamp}]\n${utterance.text}`;
      })
      .join("\n\n");

    content = `Transcript for: ${transcript.id}\nCreated: ${formatDate(
      transcript.created || ""
    )}\nAccuracy: ${
      transcript?.confidence
        ? Math.round(transcript.confidence * 100).toFixed(2) + "%"
        : "-"
    }\n\n${content}`;

    const randomId = generateRandomId();
    const baseFilename = `transaudio-${randomId}-${transcript.id}`;

    if (format === "docx") {
      await downloadAsWord(content, `${baseFilename}.docx`);
    } else {
      downloadAsText(content, `${baseFilename}.txt`);
    }
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error occurred";
    setError(`Failed to download transcript: ${errorMessage}...`);
    console.error("Download error:", err);
  }
};

export const downloadAsWordDocument = async ({
  transcript,
  setError,
}: Omit<DownloadParams, "format">): Promise<void> => {
  return iDownload({ transcript, setError, format: "docx" });
};
