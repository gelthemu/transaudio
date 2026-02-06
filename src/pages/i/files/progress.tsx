import { Check, Loader2 } from "lucide-react";
import { TransAudioState } from "@/types";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  className?: string;
  state: TransAudioState;
}

export const Progress = ({
  value,
  className,
  state = "idle",
}: ProgressProps) => {
  const percentage = value;

  return (
    <p
      className={cn(
        "w-full mt-1 inline-flex flex-row items-center space-x-1.5",
        className,
      )}
    >
      {(state === "uploading" || state === "processing") && (
        <Loader2 className="h-3 w-3 stroke-mute stroke-[3px] animate-spin opacity-60" />
      )}
      {state === "complete" && (
        <Check className="h-3 w-3 stroke-success stroke-[3px]" />
      )}
      <small className="text-muted">
        {state === "uploading"
          ? `Uploading... ${Math.round(percentage).toFixed(1)}%`
          : state === "processing"
            ? "Processing..."
            : state === "complete"
              ? "COMPLETED. Redirecting..."
              : null}
      </small>
    </p>
  );
};
