import {
  ab3d2d3c1f7417,
  ab685aebf914a0,
  ac41bedb6ec4a9,
} from "@/utils/aai-fxns";
import { getSession } from "@/utils/session-manager";
import { saveScript } from "@/utils/indexed-db-manager";

export const uploadFileToStorage = async (
  file: File,
  key: string,
  onProgress: (progress: number) => void,
): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const response = await ab3d2d3c1f7417(file, key, (progress) => {
    onProgress(progress.percentage);
  });

  if (!response) {
    throw new Error("Failed. Please try again or contact us");
  }

  await new Promise((resolve) => setTimeout(resolve, 1500));

  onProgress(100);

  await new Promise((resolve) => setTimeout(resolve, 1500));

  let url = await ab685aebf914a0(key);

  if (!url) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    url = await ab685aebf914a0(key);

    if (!url) {
      throw new Error("Failed to generate access URL.");
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const finalUrl = url.split("?")[0];

  return finalUrl;
};

export const processTranscription = async (url: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const task = await ac41bedb6ec4a9(url);

  if (!task) {
    throw new Error("Failed. Please try again or contact us");
  }

  await new Promise((resolve) => setTimeout(resolve, 3000));

  const session = getSession();

  const timestamp = await saveScript(session, task);

  return { task, session, timestamp };
};
