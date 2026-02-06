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

  if (response.status !== "success") {
    throw new Error("Failed. Please try again or contact us");
  }

  await new Promise((resolve) => setTimeout(resolve, 1500));

  onProgress(100);

  await new Promise((resolve) => setTimeout(resolve, 1500));

  let accessUrlResult = await ab685aebf914a0(key);

  if (accessUrlResult.status !== "success") {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    accessUrlResult = await ab685aebf914a0(key);

    if (accessUrlResult.status !== "success") {
      throw new Error("Failed to generate access URL.");
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const url = accessUrlResult.url;

  return url;
};

export const processTranscription = async (url: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response = await ac41bedb6ec4a9(url);

  if (response.status !== "success" || !response.id) {
    throw new Error("Failed. Please try again or contact us");
  }

  await new Promise((resolve) => setTimeout(resolve, 3000));

  const id = response.id;
  const session = getSession();

  const dd = await saveScript(session, id);

  return { id, session, dd };
};
