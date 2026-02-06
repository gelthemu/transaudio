import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "w-full flex text-sm font-medium px-3 py-2 border border-accent bg-accent/5 file:border-0 file:bg-transparent file:text-muted placeholder:text-muted/80 placeholder:font-normal transaudio-btn",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
