import type { VercelRequest, VercelResponse } from "@vercel/node";

const API_KEY = process.env.IPDATA_API_KEY;
const URL = "https://ipwho.is/";
const DURATION = 7500;

export default async function getUserData(
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

  if (!API_KEY || !URL) {
    return res.status(400).json({ status: "failed" });
  }

  let ipData = null;

  try {
    const response = await fetch(URL);
    const s = await response.json();

    if (!response.ok && s.success !== true) {
      return res.status(500).json({ status: "failed" });
    }

    ipData = {
      ip: s.ip,
      city: s.city,
      region: s.region,
      country: s.country,
      continent: s.continent,
      postal: s.postal,
      latitude: s.latitude,
      longitude: s.longitude,
      timezone: s.timezone?.id,
      isp: s.connection?.org || s.connection?.isp || "",
    };

    return res.status(200).json({ status: "success", ipData });
  } catch {
    res.status(500).json({ status: "failed" });
  }
}
