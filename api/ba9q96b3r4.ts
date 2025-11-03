import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const { id } = req.body;
  const API_KEY = process.env.TRANSAUDIO_API_KEY;

  if (!id || !API_KEY) {
    return res.status(400).json({ status: "failed" });
  }

  try {
    const response = await fetch(
      `https://api.assemblyai.com/v2/transcript/${id}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      return res.status(500).json({ status: "failed" });
    }

    const transcript = await response.json();

    res.status(200).json({
      status: transcript.status === "completed" ? "ready" : transcript.status,
    });
  } catch {
    res.status(500).json({ status: "failed" });
  }
}
