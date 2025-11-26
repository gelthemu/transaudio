import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Utterance, TranscriptWord } from "../src/types";

const BUCKET_NAME = process.env.S3_BUCKET;
const API_KEY = process.env.TRANSAUDIO_API_KEY;

const s3Client = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export default async function transcribeAudio(
  req: VercelRequest,
  res: VercelResponse
) {
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

  if (!API_KEY || !BUCKET_NAME) {
    return res.status(400).json({ status: "failed" });
  }

  const { audioUrl } = req.body as { audioUrl?: string };

  if (!audioUrl) {
    return res.status(400).json({ status: "failed" });
  }

  try {
    const params = {
      audio_url: audioUrl,
      speaker_labels: true,
      content_safety: true,
      disfluencies: true,
    };
    const startResp = await fetch("https://api.assemblyai.com/v2/transcript", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!startResp.ok) {
      return res.status(500).json({ status: "failed" });
    }

    const started = await startResp.json();
    const transcriptId: string = started.id;
    let status: string = started.status;

    while (status === "queued" || status === "processing") {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const pollResp = await fetch(
        `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
        {
          headers: { Authorization: `Bearer ${API_KEY}` },
        }
      );

      if (!pollResp.ok) {
        return res.status(500).json({ status: "failed" });
      }

      const polled = await pollResp.json();
      status = polled.status;

      if (status === "completed") {
        let summary_text = "";
        try {
          const lemurData = {
            transcript_ids: [polled.id],
            final_model: "anthropic/claude-sonnet-4-20250514",
            max_output_size: 2000,
            temperature: 0.5,
          };

          const lemurResp = await fetch(
            "https://api.assemblyai.com/lemur/v3/generate/summary",
            {
              method: "POST",
              headers: {
                Authorization: `${API_KEY}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(lemurData),
            }
          );

          if (lemurResp.ok) {
            const summary = await lemurResp.json();
            summary_text = summary.response;
          } else {
            summary_text = "";
          }
        } catch {
          summary_text = "";
        }

        const completeTranscript = {
          id: transcriptId,
          created: Date.now(),
          confidence: polled.confidence,
          summary: summary_text,
          words:
            polled.words?.map((w: TranscriptWord) => ({
              text: w.text,
              start: w.start,
              end: w.end,
            })) || [],
          utterances:
            polled.utterances?.map((u: Utterance) => ({
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
        };

        const jsonKey = `transcripts/${transcriptId}.json`;

        await s3Client.send(
          new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: jsonKey,
            Body: JSON.stringify(completeTranscript, null, 2),
            ContentType: "application/json",
          })
        );

        return res.status(200).json({ status: "success", id: transcriptId });
      }

      if (status === "error") {
        return res.status(500).json({ status: "failed" });
      }
    }

    return res.status(500).json({ status: "failed" });
  } catch {
    res.status(500).json({ status: "failed" });
  }
}
