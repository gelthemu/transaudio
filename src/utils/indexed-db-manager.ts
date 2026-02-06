import Dexie, { type EntityTable } from "dexie";
import { StoredScript } from "@/types";

class TransAudioDatabase extends Dexie {
  runs!: EntityTable<StoredScript, "id">;

  constructor() {
    super("transaudio");
    this.version(1).stores({
      runs: "id, session, created",
    });
  }
}

const db = new TransAudioDatabase();

export const saveScript = async (
  session: string,
  id: string,
): Promise<number> => {
  const dd = Date.now();
  const st: StoredScript = {
    session,
    id,
    created: dd,
  };

  await db.runs.add(st);

  return dd;
};

export const getScriptsBySession = async (
  session: string,
): Promise<StoredScript[]> => {
  const fiveDaysAgo = Date.now() - 5 * 24 * 60 * 60 * 1000;

  const transcripts = await db.runs
    .where("session")
    .equals(session)
    .and((t) => t.created >= fiveDaysAgo)
    .reverse()
    .sortBy("created");

  return transcripts.slice(0, 18);
};

export const getScriptById = async (
  id: string,
): Promise<StoredScript | null> => {
  const transcript = await db.runs.get(id);

  if (!transcript) return null;

  const fiveDaysAgo = Date.now() - 5 * 24 * 60 * 60 * 1000;
  if (transcript.created < fiveDaysAgo) {
    return null;
  }

  return transcript;
};

export const cleanExpiredScripts = async (): Promise<void> => {
  const fiveDaysAgo = Date.now() - 5 * 24 * 60 * 60 * 1000;

  await db.runs.where("created").below(fiveDaysAgo).delete();
};

export const getAllScripts = async (): Promise<StoredScript[]> => {
  const scripts = await db.runs
    .orderBy("created")
    .reverse()
    .limit(18)
    .toArray();

  return scripts;
};

export const getAllActiveScripts = async (): Promise<StoredScript[]> => {
  const fiveDaysAgo = Date.now() - 5 * 24 * 60 * 60 * 1000;

  const transcripts = await db.runs
    .where("created")
    .aboveOrEqual(fiveDaysAgo)
    .reverse()
    .sortBy("created");

  return transcripts.slice(0, 18);
};

export const getScriptCount = async (): Promise<number> => {
  return await db.runs.count();
};

export const deleteScriptById = async (id: string): Promise<boolean> => {
  const deleted = await db.runs.delete(id);
  return deleted !== undefined;
};

export const deleteScriptsBySession = async (
  session: string,
): Promise<number> => {
  return await db.runs.where("session").equals(session).delete();
};

export const deleteMultipleScripts = async (
  ids: string[],
): Promise<{ deleted: number; notFound: number }> => {
  if (ids.length === 0) {
    return { deleted: 0, notFound: 0 };
  }

  const existing = await db.runs.bulkGet(ids);
  const deleted = existing.filter((item) => item !== undefined).length;
  const notFound = ids.length - deleted;

  await db.runs.bulkDelete(ids);

  return { deleted, notFound };
};

export const deleteAllScripts = async (): Promise<number> => {
  const count = await db.runs.count();
  await db.runs.clear();
  return count;
};

// deleteAllScripts();
