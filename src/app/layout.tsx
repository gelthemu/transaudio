import React from "react";
import GoogleAnalytics from "../lib/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import type { Viewport } from "next";
import ToastProvider from "./providers/ToastProvider";
import "./styles/globals.css";

const ga_id = "G-C2Y1PEW0HW";

export const viewport: Viewport = {
  themeColor: "#0c161c",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "TransAudio - Effortless Audio-to-Text Transcription",
  description:
    "TransAudio is your go-to web app for seamless speech-to-text conversion. Upload your audio files and let TransAudio quickly transcribe them with high accuracy. Whether you're a journalist, researcher, or content creator, TransAudio makes transcription easy, efficient, and accessible. Experience smooth audio processing and precise text output today.",
  keywords:
    "audio transcription, speech-to-text, audio-to-text converter, transcription tool, TransAudio, convert audio to text, transcription app, voice-to-text, audio file transcription, online transcription tool, convert speech to text, automatic transcription service",
  metadataBase: new URL("https://transcribe.geltaverse.com"),
  generator: "Next.js",
  authors: [{ name: "Gelthem Mucunguzi", url: "https://geltaverse.com" }],
  creator: "Gelthem Mucunguzi",
  publisher: "Gelthem Mucunguzi",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/_io/favicon.ico",
    shortcut: "/_io/favicon-16x16.png",
    apple: "/_io/apple-touch-icon.png",
  },
  manifest: "/_io/site.webmanifest",

  alternates: {
    canonical: "https://transcribe.geltaverse.com",
    languages: {
      "en-US": "/en-US",
    },
  },
  category: "technology",
  classification: "Speech to Text",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics ga_id={ga_id} />
      </head>
      <body className="font-geist text-brandBeige">
        <ToastProvider />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
