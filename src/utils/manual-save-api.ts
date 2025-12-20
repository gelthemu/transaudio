import { saveTranscript } from "./indexed-db-manager";
import { getSession } from "./session-manager";

/**
 * Browser-side API to manually save transcripts to IndexedDB
 * Automatically detects the current session and only requires the transcript ID
 *
 * @param transcriptId - The ID of the transcript to save
 * @returns Promise that resolves to the saved transcript ID
 *
 * @example
 * // Usage in browser console or code:
 * await save("43391386-c6c2-4083-9597-53dc231f8b90");
 */
export const save = async (
  transcriptId: string
): Promise<string> => {
  const session = getSession();

  try {
    const savedId = await saveTranscript(session, transcriptId);
    console.log(`✅ Transcript saved successfully!`);
    console.log(`Session: ${session}`);
    console.log(`Transcript ID: ${savedId}`);
    return savedId;
  } catch (error) {
    console.error(`❌ Failed to save transcript:`, error);
    throw error;
  }
};
