import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const BUCKET_NAME = process.env.S3_BUCKET;
const s3Client = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export default async function generateGetUrl(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: "failed" });
  }

  try {
    const { key } = req.body;

    if (!key || !BUCKET_NAME) {
      return res.status(400).json({ status: "failed" });
    }

    const objectKey = `uploads/${key}`;

    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: objectKey,
    });

    const url = await getSignedUrl(s3Client, command, {
      expiresIn: 7500,
    });

    res.status(200).json({ status: "success", url });
  } catch {
    res.status(500).json({ status: "failed" });
  }
}
