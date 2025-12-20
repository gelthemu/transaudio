import { saveTranscript } from "./indexed-db-manager";
import { getSession } from "./session-manager";

export const save = async (id: string): Promise<void> => {
  const session = getSession();

  try {
    await saveTranscript(session, id);
    console.log(`✅ SUCCESSS!!!`);
    return;
  } catch (error) {
    console.error(`⛔ FAILED!!!:`, error);
    return;
  }
};

// Usage in browser console or code:
// await save("43391386-c6c2-4083-9597-53dc231f8b90");
