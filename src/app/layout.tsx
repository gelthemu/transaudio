import React from "react";
import GoogleAnalytics from "../lib/GoogleAnalytics";
import NavBar from "./components/nav-footer/navbar";
import Footer from "./components/nav-footer/footer";
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
    "TransAudio is your go-to web app for seamless speech-to-text conversion. Upload your audio files and let TransAudio quickly transcribe them with high accuracy. Experience smooth audio processing and precise text output today.",
  keywords:
    "audio transcription, speech-to-text, audio-to-text converter, transcription tool, TransAudio, convert audio to text, transcription app, voice-to-text, audio file transcription, online transcription tool, convert speech to text, automatic transcription service",
  metadataBase: new URL("https://transcribe.geltaverse.com"),
  generator: "Next.js",
  applicationName: "TransAudio",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "Gelthem Mucunguzi", url: "https://geltaverse.com" }],
  creator: "Gelthem Mucunguzi",
  publisher: "Gelthem Mucunguzi",
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
        <link rel="manifest" href="/io/site.webmanifest" />
        <link
          rel="icon"
          type="image/ico"
          href="/io/favicon.ico"
          sizes="48x48"
        />
        <link
          rel="icon"
          type="image/png"
          href="/io/favicon-16x16.png"
          sizes="16x16"
        />
        <link
          rel="shortcut icon"
          type="image/png"
          href="/io/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="apple-touch-icon"
          href="/io/apple-touch-icon.png"
          type="image/png"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jura:wght@300..700&display=swap"
          rel="stylesheet"
        />
        <GoogleAnalytics ga_id={ga_id} />
      </head>
      <body className="font-jura text-beige">
        <ToastProvider />
        <NavBar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
