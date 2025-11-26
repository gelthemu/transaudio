import { v4 as uuidv4 } from "uuid";

interface SessionData {
  id: string;
  expires: number;
}

export const getSession = (): string => {
  const stored = localStorage.getItem("session");

  if (stored) {
    try {
      const sessionData: SessionData = JSON.parse(stored);

      if (Date.now() < sessionData.expires) {
        return sessionData.id;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const generatedSession = uuidv4();
  const newSession = `transaudio-${generatedSession}`;
  const sessionData: SessionData = {
    id: newSession,
    expires: Date.now() + 5 * 24 * 60 * 60 * 1000,
  };

  localStorage.setItem("session", JSON.stringify(sessionData));
  return newSession;
};

export const refreshSession = (): string => {
  localStorage.removeItem("session");
  return getSession();
};

// refreshSession();
