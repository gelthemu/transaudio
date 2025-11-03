import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const BUCKET_NAME = process.env.S3_BUCKET;
const DURATION = 7200;

const s3Client = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const fetchJson = async (key: string): Promise<Record<string, unknown>> => {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  const response = await s3Client.send(command);
  const bodyContents = await response.Body?.transformToString();
  return JSON.parse(bodyContents || "{}");
};

const generateSignedUrl = async (key: string): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  return await getSignedUrl(s3Client, command, {
    expiresIn: DURATION,
  });
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
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

  const { key, user_file } = req.body;

  if (!key || !user_file) {
    return res
      .status(400)
      .json({ status: "failed", error: "missing required fields" });
  }

  try {
    const json_key = `uploads/${key}.json`;
    const file_key = `uploads/${key}.${user_file}`;

    const [data, url] = await Promise.all([
      fetchJson(json_key),
      generateSignedUrl(file_key),
    ]);

    res.status(200).json({ data, url });
  } catch {
    res.status(500).json({ status: "failed", error: "internal server error" });
  }
}
