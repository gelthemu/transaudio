import type { VercelRequest, VercelResponse } from "@vercel/node";

const CACHE_SECONDS = 30;

export default async function getUserData(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  res.setHeader(
    "Cache-Control",
    `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=60`
  );

  try {
    // Get client IP (Vercel provides it in headers)
    const ip =
      req.headers["x-forwarded-for"]?.toString().split(",")[0].trim() ||
      req.headers["x-real-ip"]?.toString() ||
      // Fallback (should rarely happen on Vercel)
      req.socket?.remoteAddress ||
      null;

    if (!ip || ip === "127.0.0.1" || ip.startsWith("::ffff:127.")) {
      return res
        .status(400)
        .json({ status: "failed", message: "IP not detectable" });
    }

    // Fetch geolocation from ipwho.is (free, no keyless)
    const response = await fetch(
      `https://ipwho.is/${ip}?fields=ip,city,region,country,continent,postal,latitude,longitude,timezone,connection`
    );

    if (!response.ok) {
      throw new Error(`ipwho.is responded with ${response.status}`);
    }

    const data = await response.json();

    if (!data.success && data.message) {
      throw new Error(data.message);
    }

    const ipData = {
      ip: data.ip,
      city: data.city || null,
      region: data.region || null,
      country: data.country || null,
      continent: data.continent || null,
      postal: data.postal || null,
      latitude: data.latitude || null,
      longitude: data.longitude || null,
      timezone: data.timezone?.id || null,
      isp: data.connection?.org || data.connection?.isp || null,
    };

    return res.status(200).json({
      status: "success",
      ipData,
    });
  } catch (error) {
    console.error("IP lookup failed:", error);
    return res.status(500).json({
      status: "failed",
      message: "Could not retrieve location data",
    });
  }
}
