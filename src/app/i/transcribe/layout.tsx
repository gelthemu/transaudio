import React from "react";
import "@/app/styles/globals.css";

export default function TranscribeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
