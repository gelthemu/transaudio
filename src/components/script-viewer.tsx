import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { formatTimestamp } from "@/utils/format-date";
import { ScriptInfo } from "@/types";
import { cn } from "@/lib/utils";

interface ScriptViewerProps {
  t: ScriptInfo;
}

const SPEAKER_COLORS = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-green-500",
  "bg-pink-500",
  "bg-cyan-500",
];

export const ScriptViewer: React.FC<ScriptViewerProps> = ({ t }) => {
  const speakerColorMap = useMemo(() => {
    if (!t?.segments) return {};
    const speakers = [...new Set(t.segments.map((s) => s.id))];

    const shuffledColors = [...SPEAKER_COLORS].sort(() => Math.random() - 0.5);

    return speakers.reduce(
      (acc, speaker, index) => {
        acc[speaker] = shuffledColors[index % shuffledColors.length];
        return acc;
      },
      {} as Record<string, string>,
    );
  }, [t]);

  return (
    <div className="flex flex-col space-y-12">
      {t.segments.length !== 0 ? (
        <div className="flex flex-col space-y-5">
          {t.segments.map((segment, segIndex) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: segIndex * 0.01 }}
              key={segIndex}
            >
              <div className="flex flex-row items-end space-x-2 transaudio-none">
                <div
                  className={cn(
                    "inline-flex border border-accent/80",
                    speakerColorMap[segment.id] || "bg-accent/80",
                  )}
                >
                  <span className="text-base font-semibold bg-light/60 px-1.5">
                    Speaker {segment.id}:
                  </span>
                </div>
                <div>
                  <span className="text-sm text-muted">
                    [{formatTimestamp(segment.timestamp)}]
                  </span>
                </div>
              </div>
              <div className="ml-2.5 md:ml-4 mt-1 text-base leading-relaxed select-text border-none opacity-95">
                {segment.text}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-sm text-error">No script content available</div>
      )}
    </div>
  );
};
