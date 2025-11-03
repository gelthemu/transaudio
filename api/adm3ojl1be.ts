import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const BUCKET_NAME = process.env.S3_BUCKET;
const s3Client = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.AWS_REGION || 'us-east-1',
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
  const { key, user_file } = req.body;

  if (!key || !user_file || !API_KEY) {
    return res.status(400).json({ status: "failed" });
  }

  try {
    const f_key = `uploads/${key}.${user_file}`;

    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: f_key,
    });

    const url = await getSignedUrl(s3Client, command, {
      expiresIn: 7200,
    });

    const params = {
      audio_url: url,
      speaker_labels: true,
      content_safety: true,
      disfluencies: true,
    };

    const response = await fetch("https://api.assemblyai.com/v2/transcript", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      return res.status(500).json({ status: "failed" });
    }

    const transcript = await response.json();

    res.status(200).json({
      status: transcript.status,
      id: transcript.id,
    });
  } catch {
    res.status(500).json({ status: "failed" });
  }
}
