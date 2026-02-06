import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sendNotice = async (params: Record<string, string>) => {
  try {
    const queryParams = new URLSearchParams(params);
    await fetch(
      `${import.meta.env.VITE_API_URL}/v1/notice?${queryParams.toString()}`,
    );
  } catch {
    // fail silently
  }
};
