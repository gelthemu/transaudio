// npm install docx
// node src\scripts\format\format.js src\scripts\format\transcripts src\scripts\format\output docx

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Document, Packer, Paragraph, TextRun } from "docx";

const __filename = fileURLToPath(import.meta.url);

function formatTranscript(inputText) {
  const lines = inputText.split("\n");
  const formattedLines = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    
    if (line.trim() === "") {
      formattedLines.push("");
      i++;
      continue;
    }

    // Try new format: "Speaker A: [00:00]" on one line, content on next line(s)
    const newFormatMatch = line.match(/^([^:]+):\s*\[([^\]]+)\]\s*$/);
    
    if (newFormatMatch) {
      const speaker = newFormatMatch[1].trim();
      const timestamp = newFormatMatch[2].trim();
      
      // Get content from next line(s) until we hit another speaker line or empty line
      i++;
      const contentLines = [];
      while (i < lines.length) {
        const nextLine = lines[i];
        // Stop if we hit another speaker line or empty line
        if (nextLine.match(/^[^:]+:\s*\[[^\]]+\]\s*$/) || nextLine.trim() === "") {
          break;
        }
        contentLines.push(nextLine.trim());
        i++;
      }
      
      const content = contentLines.join(" ").trim();
      
      formattedLines.push(`${speaker}: [${timestamp}]`);
      if (content) {
        formattedLines.push(content);
      }
      formattedLines.push("");
      continue;
    }

    // Try old format: "Speaker: [00:05 - 00:37] Content text here"
    const oldFormatMatch = line.match(/^([^:]+):\s*\[([^\]]+)\]\s*(.*)$/);
    
    if (oldFormatMatch) {
      const speaker = oldFormatMatch[1].trim();
      const timeRange = oldFormatMatch[2].trim();
      const content = oldFormatMatch[3].trim();

      const startTime = timeRange.split(" - ")[0];

      formattedLines.push(`${speaker}: [${startTime}]`);
      if (content) {
        formattedLines.push(content);
      }
      formattedLines.push("");
      i++;
      continue;
    }

    // If it's a metadata line (like "Transcript for:", "Created:", "Accuracy:"), keep it
    if (line.match(/^(Transcript for|Created|Accuracy):/i)) {
      formattedLines.push(line);
      i++;
      continue;
    }

    // Otherwise, just add the line as-is
    formattedLines.push(line);
    i++;
  }

  return formattedLines.join("\n");
}

function createDocxFromTranscript(inputText, outputPath) {
  const lines = inputText.split("\n");
  const paragraphs = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    
    if (line.trim() === "") {
      paragraphs.push(new Paragraph({ children: [new TextRun("")] }));
      i++;
      continue;
    }

    // Try new format: "Speaker A: [00:00]" on one line, content on next line(s)
    const newFormatMatch = line.match(/^([^:]+):\s*\[([^\]]+)\]\s*$/);
    
    if (newFormatMatch) {
      const speaker = newFormatMatch[1].trim();
      const timestamp = newFormatMatch[2].trim();
      
      // Get content from next line(s) until we hit another speaker line or empty line
      i++;
      const contentLines = [];
      while (i < lines.length) {
        const nextLine = lines[i];
        // Stop if we hit another speaker line or empty line
        if (nextLine.match(/^[^:]+:\s*\[[^\]]+\]\s*$/) || nextLine.trim() === "") {
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

    // Try old format: "Speaker: [00:05 - 00:37] Content text here"
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

    // If it's a metadata line, format it as regular text
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

  return Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(outputPath, buffer);
    return outputPath;
  });
}

function processTranscriptFile(
  inputFilePath,
  outputFilePath = null,
  outputFormat = "txt"
) {
  try {
    const inputText = fs.readFileSync(inputFilePath, "utf8");

    if (!outputFilePath) {
      const dir = path.dirname(inputFilePath);
      const basename = path.basename(
        inputFilePath,
        path.extname(inputFilePath)
      );
      const ext = outputFormat === "docx" ? ".docx" : ".txt";
      outputFilePath = path.join(dir, `${basename}${ext}`);
    }

    if (outputFormat === "docx") {
      return createDocxFromTranscript(inputText, outputFilePath);
    } else {
      const formattedText = formatTranscript(inputText);
      fs.writeFileSync(outputFilePath, formattedText, "utf8");
      return Promise.resolve(outputFilePath);
    }
  } catch (error) {
    console.error(`❌ Error processing ${inputFilePath}:`, error.message);
    throw error;
  }
}

function getTranscriptFiles(folderPath) {
  try {
    const files = fs.readdirSync(folderPath);

    return files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return [".txt", ".md", ".text", ".transcript"].includes(ext);
      })
      .map((file) => path.join(folderPath, file));
  } catch (error) {
    console.error(`❌ Error reading folder ${folderPath}:`, error.message);
    return [];
  }
}

async function processFolderOfTranscripts(
  folderPath,
  outputFolder = null,
  outputFormat = "txt"
) {
  const results = {
    successful: [],
    failed: [],
    total: 0,
  };

  const transcriptFiles = getTranscriptFiles(folderPath);
  results.total = transcriptFiles.length;

  if (transcriptFiles.length === 0) {
    console.log(`📂 No transcript files found in: ${folderPath}`);
    console.log(
      "   Looking for files with extensions: .txt, .md, .text, .transcript"
    );
    return results;
  }

  console.log(
    `📂 Found ${transcriptFiles.length} transcript files to process...`
  );
  console.log(`📄 Output format: ${outputFormat.toUpperCase()}`);
  console.log("");

  for (let i = 0; i < transcriptFiles.length; i++) {
    const filePath = transcriptFiles[i];
    try {
      const fileName = path.basename(filePath);
      console.log(
        `[${i + 1}/${transcriptFiles.length}] Processing: ${fileName}`
      );

      let outputPath = null;
      if (outputFolder) {
        if (!fs.existsSync(outputFolder)) {
          fs.mkdirSync(outputFolder, { recursive: true });
        }

        const basename = path.basename(filePath, path.extname(filePath));
        const ext = outputFormat === "docx" ? ".docx" : ".txt";
        outputPath = path.join(outputFolder, `${basename}${ext}`);
      }

      const processedFile = await processTranscriptFile(
        filePath,
        outputPath,
        outputFormat
      );
      results.successful.push({
        input: filePath,
        output: processedFile,
      });

      console.log(`   ✅ Success: ${path.basename(processedFile)}`);
    } catch (error) {
      results.failed.push({
        file: filePath,
        error: error.message,
      });
      console.log(`   ❌ Failed: ${error.message}`);
    }

    console.log("");
  }

  console.log("=".repeat(50));
  console.log("📊 PROCESSING SUMMARY");
  console.log("=".repeat(50));
  console.log(`Total files: ${results.total}`);
  console.log(`✅ Successful: ${results.successful.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);

  if (results.successful.length > 0) {
    console.log("\n✅ Successfully processed files:");
    results.successful.forEach((result) => {
      console.log(
        `   📁 ${path.basename(result.input)} → ${path.basename(result.output)}`
      );
    });
  }

  if (results.failed.length > 0) {
    console.log("\n❌ Failed to process:");
    results.failed.forEach((failure) => {
      console.log(`   📁 ${path.basename(failure.file)}: ${failure.error}`);
    });
  }

  return results;
}

const isMainModule = process.argv[1] === __filename;

if (isMainModule) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(
      "Usage: node format.js <transcript-folder> [output-folder] [format]"
    );
    console.log("");
    console.log("Examples:");
    console.log("  node format.js ./transcripts");
    console.log("  node format.js ./transcripts ./formatted-transcripts");
    console.log("  node format.js ./transcripts ./formatted-transcripts docx");
    console.log("  node format.js ./transcripts ./formatted-transcripts txt");
    console.log("");
    console.log("Supported file types: .txt, .md, .text, .transcript");
    console.log("Output formats: txt (default), docx");
    process.exit(1);
  }

  const transcriptFolder = args[0];
  const outputFolder = args[1];
  const outputFormat = args[2] || "txt";

  if (!["txt", "docx"].includes(outputFormat.toLowerCase())) {
    console.error(
      `❌ Invalid output format: ${outputFormat}. Use 'txt' or 'docx'`
    );
    process.exit(1);
  }

  if (!fs.existsSync(transcriptFolder)) {
    console.error(`❌ Transcript folder does not exist: ${transcriptFolder}`);
    process.exit(1);
  }

  if (!fs.statSync(transcriptFolder).isDirectory()) {
    console.error(`❌ Path is not a directory: ${transcriptFolder}`);
    process.exit(1);
  }

  try {
    const results = await processFolderOfTranscripts(
      transcriptFolder,
      outputFolder,
      outputFormat.toLowerCase()
    );

    if (results.failed.length > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Unexpected error:", error.message);
    process.exit(1);
  }
}

export {
  formatTranscript,
  processTranscriptFile,
  processFolderOfTranscripts,
  getTranscriptFiles,
};
