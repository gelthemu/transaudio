import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const BUCKET_NAME = process.env.S3_BUCKET;
const DURATION = 7500;

const s3Client = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export default async function getTranscript(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", `public, max-age=${DURATION}`);

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ status: "failed", error: "method not allowed" });
  }

  const { id } = req.body as { id?: string };

  if (!id || !BUCKET_NAME) {
    return res
      .status(400)
      .json({ status: "failed", error: "missing required fields" });
  }

  try {
    const key = `uploads/${id}.json`;
    const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key });
    const response = await s3Client.send(command);
    const bodyContents = await response.Body?.transformToString();
    
    console.log("Raw body:", bodyContents);
  const data = JSON.parse(bodyContents || "{}");

  console.log("Created value:", data.created);
  console.log("Created type:", typeof data.created);
  
  res.status(200).json({ data });
  } catch {
    res.status(500).json({ status: "failed", error: "internal server error" });
  }
}
