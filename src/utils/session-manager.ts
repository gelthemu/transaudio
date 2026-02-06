import { v4 as uuidv4 } from "uuid";

interface SessionData {
  id: string;
  created: number;
  expires: number;
}

const SESSION_KEY = "session";
const SESSION_EXPIRY_DAYS = 5;

export const fetchSession = (): SessionData | null => {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return null;

    const session: SessionData = JSON.parse(stored);

    if (Date.now() > session.expires) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }

    return session;
  } catch {
    return null;
  }
};

export const createSession = (): SessionData => {
  const now = Date.now();
  const expires = now + SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

  const session: SessionData = {
    id: uuidv4(),
    created: now,
    expires,
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
};

export const getOrCreateSession = (): SessionData => {
  const existing = fetchSession();
  if (existing) return existing;
  return createSession();
};

export const getSession = (): string => {
  return getOrCreateSession().id;
};

export const refreshSession = (): string => {
  localStorage.removeItem(SESSION_KEY);
  return getSession();
};

// refreshSession();
