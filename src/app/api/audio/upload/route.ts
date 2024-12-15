import { handleUpload } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
    const body = await request.json();

    try {
        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async (pathname, clientPayload, multipart) => {
                // Validate user session
                return {
                    allowedContentTypes: ["audio/mp3", "audio/mpeg", "video/mp4", "audio/mp4"],
                    maximumSizeInBytes: 8000000,
                    maximumDurationInSeconds: 300,
                    validUntil: Date.now() + 1000 * 60 * 60 * 3,
                    cacheControlMaxAge: 60 * 60 * 3,
                    tokenPayload: JSON.stringify({
                        userId: Math.random().toString(36).substring(2, 15),
                        pathname,
                        clientPayload,
                        multipart,
                    }),
                };
            },
            onUploadCompleted: async ({ blob, tokenPayload }) => {
                // Store URL
                console.log("Upload completed:", blob, tokenPayload);
            },
        });

        return NextResponse.json(jsonResponse);
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}