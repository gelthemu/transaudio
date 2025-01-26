"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("transaudio@geltaverse.com");
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <>
      <div className="max-w-sm mx-auto">
        <div className="flex items-center justify-between p-2 bg-blue-light/20 border border-beige/50 rounded-md">
          <div className="text-sm text-blue-light font-medium font-mono pl-2">
            <span>transaudio@geltaverse.com</span>
          </div>
          <div
            title="copy"
            className="flex p-2 text-blue-light cursor-pointer hover:bg-brick/10 transition-colors duration-200 rounded-md"
            onClick={handleCopy}
          >
            <span className="sr-only">Copy Email</span>
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </div>
        </div>
        <p className="text-beige/40 mt-1.5 text-sm text-left pl-4">
          Email replies fast.
        </p>
      </div>
    </>
  );
}
