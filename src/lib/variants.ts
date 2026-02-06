import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex flex-row items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors duration-200 [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer transaudio-btn disabled:transaudio-none",
  {
    variants: {
      variant: {
        default: "bg-brand text-light hover:bg-brand/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:opacity-90",
        outline:
          "border border-accent bg-light hover:bg-accent/10 text-muted",
        dropdown:
          "bg-accent/20 text-dark/80 border border-accent/40 hover:bg-muted/40",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-3 py-1.5 text-sm",
        xs: "px-3 py-1 text-sm",
        sm: "px-5 py-2 text-sm",
        md: "px-8 py-3 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export { buttonVariants };
