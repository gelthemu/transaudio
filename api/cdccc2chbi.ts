import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Utterance, TranscriptWord } from "../src/types";

const BUCKET_NAME = process.env.S3_BUCKET;
const s3Client = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ status: "failed" });
  }

  const API_KEY = process.env.TRANSAUDIO_API_KEY;
  const { id, key, user_file } = req.body;

  if (!id || !key || !user_file || !API_KEY) {
    return res.status(400).json({ status: "failed" });
  }

  try {
    const response = await fetch(
      `https://api.assemblyai.com/v2/transcript/${id}`,
      {
        headers: {
          Authorization: `${API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      return res.status(500).json({ status: "failed" });
    }

    const transcript = await response.json();

    if (transcript.status !== "completed") {
      return res.status(500).json({ status: "failed" });
    }

    const lemur_data = {
      transcript_ids: [transcript.id],
      final_model: "anthropic/claude-sonnet-4-20250514",
      max_output_size: 2000,
      temperature: 0.5,
    };

    let summary_text = "";

    try {
      const result = await fetch(
        "https://api.assemblyai.com/lemur/v3/generate/summary",
        {
          method: "POST",
          headers: {
            Authorization: `${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(lemur_data),
        }
      );

      if (result.ok) {
        const summary = await result.json();
        summary_text = summary.response;
      } else {
        summary_text = "";
      }
    } catch {
      console.error("LeMUR error");
    }

    const completeTranscript = {
      words: transcript.words || [],
      utterances:
        transcript.utterances?.map((u: Utterance) => ({
          speaker: u.speaker || "Speaker",
          text: u.text,
          start: u.start,
          words:
            u.words?.map((w: TranscriptWord) => ({
              text: w.text,
              start: w.start,
              end: w.end,
            })) || [],
        })) || [],
      confidence: transcript.confidence,
      key: key,
      user_file: user_file,
      summary: summary_text,
    };

    const f_key = `uploads/${key}.json`;

    const params = {
      Bucket: BUCKET_NAME,
      Key: f_key,
      Body: JSON.stringify(completeTranscript, null, 2),
      ContentType: "application/json",
    };

    await s3Client.send(new PutObjectCommand(params));

    res.status(200).json({ status: "success" });
  } catch {
    res.status(500).json({ status: "failed" });
  }
}
