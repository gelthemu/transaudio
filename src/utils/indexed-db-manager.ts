import Dexie, { type EntityTable } from "dexie";
import { StoredScript } from "@/types";

class TransAudioDatabase extends Dexie {
  runs!: EntityTable<StoredScript, "task">;

  constructor() {
    super("transaudio");
    this.version(1).stores({
      runs: "task, session, timestamp",
    });
  }
}

const db = new TransAudioDatabase();

export const saveScript = async (
  session: string,
  task: string,
): Promise<number> => {
  const timestamp = Date.now();
  const st: StoredScript = {
    session,
    task,
    timestamp,
  };

  await db.runs.add(st);

  return timestamp;
};

export const getScriptsBySession = async (
  session: string,
): Promise<StoredScript[]> => {
  const fiveDaysAgo = Date.now() - 5 * 24 * 60 * 60 * 1000;

  const transcripts = await db.runs
    .where("session")
    .equals(session)
    .and((t) => t.timestamp >= fiveDaysAgo)
    .reverse()
    .sortBy("timestamp");

  return transcripts.slice(0, 18);
};

export const getScriptById = async (
  task: string,
): Promise<StoredScript | null> => {
  const transcript = await db.runs.get(task);

  if (!transcript) return null;

  const fiveDaysAgo = Date.now() - 5 * 24 * 60 * 60 * 1000;
  if (transcript.timestamp < fiveDaysAgo) {
    return null;
  }

  return transcript;
};

export const cleanExpiredScripts = async (): Promise<void> => {
  const fiveDaysAgo = Date.now() - 5 * 24 * 60 * 60 * 1000;

  await db.runs.where("timestamp").below(fiveDaysAgo).delete();
};

export const getAllScripts = async (): Promise<StoredScript[]> => {
  const scripts = await db.runs
    .orderBy("timestamp")
    .reverse()
    .limit(18)
    .toArray();

  return scripts;
};

export const getAllActiveScripts = async (): Promise<StoredScript[]> => {
  const fiveDaysAgo = Date.now() - 5 * 24 * 60 * 60 * 1000;

  const transcripts = await db.runs
    .where("timestamp")
    .aboveOrEqual(fiveDaysAgo)
    .reverse()
    .sortBy("timestamp");

  return transcripts.slice(0, 18);
};

export const getScriptCount = async (): Promise<number> => {
  return await db.runs.count();
};

export const deleteScriptById = async (task: string): Promise<boolean> => {
  const deleted = await db.runs.delete(task);
  return deleted !== undefined;
};

export const deleteScriptsBySession = async (
  session: string,
): Promise<number> => {
  return await db.runs.where("session").equals(session).delete();
};

export const deleteMultipleScripts = async (
  tasks: string[],
): Promise<{ deleted: number; notFound: number }> => {
  if (tasks.length === 0) {
    return { deleted: 0, notFound: 0 };
  }

  const existing = await db.runs.bulkGet(tasks);
  const deleted = existing.filter((item) => item !== undefined).length;
  const notFound = tasks.length - deleted;

  await db.runs.bulkDelete(tasks);

  return { deleted, notFound };
};

export const deleteAllScripts = async (): Promise<number> => {
  const count = await db.runs.count();
  await db.runs.clear();
  return count;
};

// deleteAllScripts();
