import { formatDate } from "@/utils/format-date";
import { generateRandomId } from "@/utils/random-id";
import { Segment, ScriptInfo } from "@/types";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  Footer,
  Header,
} from "docx";

type DownloadParams = {
  script: ScriptInfo;
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

const createWordDocument = async (scriptText: string): Promise<Blob> => {
  const lines = scriptText.split("\n");
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
              font: "Calibri",
              size: 20,
            }),
          ],
        }),
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
          }),
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
              font: "Calibri",
              size: 20,
            }),
          ],
        }),
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
          }),
        );
      }

      paragraphs.push(new Paragraph({ children: [new TextRun("")] }));
      i++;
      continue;
    }

    if (line.match(/^(Script for|Accuracy):/i)) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line,
              font: "Calibri",
              size: 28,
            }),
          ],
        }),
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
      }),
    );
    i++;
  }

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: "Calibri",
            size: 28,
          },
        },
      },
    },
    sections: [
      {
        properties: {},
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Trans",
                    font: "Calibri",
                    size: 16,
                    color: "A9A9A9",
                  }),
                  new TextRun({
                    text: "AUDIO",
                    font: "Calibri",
                    size: 16,
                    color: "A9A9A9",
                  }),
                ],
                alignment: AlignmentType.RIGHT,
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Try it Out, for Free at",
                    font: "Calibri",
                    size: 16,
                    color: "A9A9A9",
                  }),
                  new TextRun({
                    text: " ",
                    size: 16,
                  }),
                  new TextRun({
                    text: `${import.meta.env.VITE_BASE_URL}`,
                    font: "Calibri",
                    size: 16,
                    bold: true,
                    color: "A9A9A9",
                  }),
                ],
                alignment: AlignmentType.LEFT,
              }),
            ],
          }),
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
  filename: string,
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
  script,
  setError,
  format = "docx",
}: DownloadParams): Promise<void> => {
  try {
    if (!script.task || !script) {
      setError("zero scripts ready for download...");
      return;
    }

    if (!script?.segments || script.segments.length === 0) {
      setError("No script content available for download...");
      return;
    }

    let content = script.segments
      .map((segment: Segment) => {
        const timestamp = formatTimestamp(segment.timestamp);
        return `Speaker ${segment.id}: [${timestamp}]\n${segment.text}`;
      })
      .join("\n\n");

    content = `Script for: ${script.task.slice(0, 8)}, Created: ${formatDate(
      script.timestamp || "-",
    )}\nAccuracy: ${
      script?.accuracy ? (script.accuracy * 100).toFixed(2) + "%" : "-"
    }\n\n${content}`;

    const randomId = generateRandomId();
    const baseFilename = `transaudio-${randomId}-${script.task.slice(0, 8)}`;

    if (format === "docx") {
      await downloadAsWord(content, `${baseFilename}.docx`);
    } else {
      downloadAsText(content, `${baseFilename}.txt`);
    }
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error occurred";
    setError(`Failed to download script: ${errorMessage}...`);
    console.error("Download error:", err);
  }
};

export const downloadAsWordDocument = async ({
  script,
  setError,
}: Omit<DownloadParams, "format">): Promise<void> => {
  return iDownload({ script, setError, format: "docx" });
};
