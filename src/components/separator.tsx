import { cn } from "@/lib/utils";

interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export const Separator = ({
  orientation = "horizontal",
  className,
}: SeparatorProps) => {
  return (
    <div
      className={cn(
        orientation === "horizontal"
          ? "w-full h-px border-t"
          : "w-px h-full border-r",
        "border-muted/40 bg-transparent",
        className,
      )}
    />
  );
};
