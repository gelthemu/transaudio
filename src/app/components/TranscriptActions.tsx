import React from "react";
import { Copy, Check, RefreshCcw, Download } from "lucide-react";
import { TranscriptActionsProps } from "@/types";

export const TranscriptActions = ({
  onCopy,
  onDownload,
  onReset,
  copied,
  confidence,
  duration,
}: TranscriptActionsProps) => (
  <div className="w-full flex justify-between items-center mt-2 p-2">
    <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-2 font-medium">
      <p className="flex items-center justify-center text-xs">
        Accuracy: <span className="ml-1 text-brandBrick">{confidence}</span>
      </p>
      <p className="flex items-center justify-center text-xs">
        Runtime: <span className="ml-1 text-brandBrick">{duration}</span>
      </p>
    </div>
    <div className="flex">
      <button
        onClick={onCopy}
        className="flex items-center justify-center text-brandBeige/90 p-2 rounded bg-brandBrick/15 hover:bg-brandBrick/50 transition-colors duration-200 ease-in-out"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
      <button
        onClick={onDownload}
        className="flex items-center justify-center text-brandBeige/90 p-2 mx-1 rounded bg-brandBrick/15 hover:bg-brandBrick/50 transition-colors duration-200 ease-in-out"
      >
        <Download className="w-4 h-4" />
      </button>
      <button
        onClick={onReset}
        className="flex items-center justify-center text-brandBeige/90 p-2 rounded bg-brandBrick/15 hover:bg-brandBrick/50 transition-colors duration-200 ease-in-out"
      >
        <RefreshCcw className="w-4 h-4" />
      </button>
    </div>
  </div>
);
