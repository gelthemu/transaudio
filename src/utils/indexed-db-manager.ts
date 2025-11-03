import { StoredTranscript } from "../types";
import { generateRandomId } from "./random-id";

const DB_NAME = "transaudio";
const DB_VERSION = 1;
const STORE_NAME = "runs";

export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("session", "session", { unique: false });
      }
    };
  });
};

export const saveTranscript = async (
  session: string,
  key: string,
  user_file: string
): Promise<string> => {
  const db = await initDB();
  const random_id = generateRandomId();
  const id = `${key}-${random_id}`;

  const st: StoredTranscript = {
    session,
    key,
    id,
    user_file: user_file,
    created: Date.now(),
  };

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(st);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(id);
  });
};

export const getTranscriptsBySession = async (
  session: string
): Promise<StoredTranscript[]> => {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index("session");
    const request = index.getAll(session);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const transcripts = request.result
        .filter((t) => Date.now() - t.created < 5 * 24 * 60 * 60 * 1000)
        .sort((a, b) => {
          const dateA = new Date(a.created);
          const dateB = new Date(b.created);
          return dateB.getTime() - dateA.getTime();
        })
        .slice(0, 18);
      resolve(transcripts);
    };
  });
};

export const getTranscriptById = async (
  id: string
): Promise<StoredTranscript | null> => {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const transcript = request.result;
      if (
        transcript &&
        Date.now() - transcript.created < 5 * 24 * 60 * 60 * 1000
      ) {
        resolve(transcript);
      } else {
        resolve(null);
      }
    };
  });
};

export const cleanExpiredTranscripts = async (): Promise<void> => {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const transcripts = request.result;

      transcripts.forEach((transcript) => {
        if (Date.now() - transcript.created > 5 * 24 * 60 * 60 * 1000) {
          store.delete(transcript.id);
        }
      });

      resolve();
    };
  });
};

/**
 * Get ALL transcripts from the database (including expired ones)
 */
export const getAllTranscripts = async (): Promise<StoredTranscript[]> => {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const sortedTranscripts = request.result
        .filter((t) => t.created)
        .sort((a, b) => {
          const dateA = new Date(a.created);
          const dateB = new Date(b.created);
          return dateB.getTime() - dateA.getTime();
        })
        .slice(0, 18);
      resolve(sortedTranscripts);
    };
  });
};

/**
 * Get ALL active (non-expired) transcripts from the database
 */
export const getAllActiveTranscripts = async (): Promise<
  StoredTranscript[]
> => {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const transcripts = request.result
        .filter((t) => Date.now() - t.created < 5 * 24 * 60 * 60 * 1000)
        .sort((a, b) => {
          const dateA = new Date(a.created);
          const dateB = new Date(b.created);
          return dateB.getTime() - dateA.getTime();
        })
        .slice(0, 18);
      resolve(transcripts);
    };
  });
};

/**
 * Get count of all transcripts in database (including expired ones)
 */
export const getTranscriptCount = async (): Promise<number> => {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.count();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

/**
 * Delete a specific transcript by its ID
 */
export const deleteTranscriptById = async (id: string): Promise<boolean> => {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    const getRequest = store.get(id);

    getRequest.onerror = () => reject(getRequest.error);
    getRequest.onsuccess = () => {
      if (!getRequest.result) {
        resolve(false);
        return;
      }

      const deleteRequest = store.delete(id);

      deleteRequest.onerror = () => reject(deleteRequest.error);
      deleteRequest.onsuccess = () => resolve(true);
    };
  });
};

/**
 * Delete all transcripts for a specific session
 */
export const deleteTranscriptsBySession = async (
  session: string
): Promise<number> => {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index("session");
    const request = index.getAll(session);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const transcripts = request.result;
      let deletedCount = 0;

      transcripts.forEach((transcript) => {
        const deleteRequest = store.delete(transcript.id);
        deleteRequest.onsuccess = () => {
          deletedCount++;
          if (deletedCount === transcripts.length) {
            resolve(deletedCount);
          }
        };
        deleteRequest.onerror = () => reject(deleteRequest.error);
      });

      if (transcripts.length === 0) {
        resolve(0);
      }
    };
  });
};

/**
 * Delete multiple transcripts by their IDs
 */
export const deleteMultipleTranscripts = async (
  ids: string[]
): Promise<{ deleted: number; notFound: number }> => {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    let completed = 0;
    let deleted = 0;
    let notFound = 0;

    if (ids.length === 0) {
      resolve({ deleted: 0, notFound: 0 });
      return;
    }

    ids.forEach((id) => {
      const getRequest = store.get(id);

      getRequest.onerror = () => reject(getRequest.error);
      getRequest.onsuccess = () => {
        if (getRequest.result) {
          const deleteRequest = store.delete(id);
          deleteRequest.onerror = () => reject(deleteRequest.error);
          deleteRequest.onsuccess = () => {
            deleted++;
            completed++;
            if (completed === ids.length) {
              resolve({ deleted, notFound });
            }
          };
        } else {
          notFound++;
          completed++;
          if (completed === ids.length) {
            resolve({ deleted, notFound });
          }
        }
      };
    });
  });
};

/**
 * Delete ALL transcripts from the database (use with caution!)
 */
export const deleteAllTranscripts = async (): Promise<number> => {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    const getAllRequest = store.getAll();

    getAllRequest.onerror = () => reject(getAllRequest.error);
    getAllRequest.onsuccess = () => {
      const transcripts = getAllRequest.result;
      const totalCount = transcripts.length;

      if (totalCount === 0) {
        resolve(0);
        return;
      }

      const clearRequest = store.clear();

      clearRequest.onerror = () => reject(clearRequest.error);
      clearRequest.onsuccess = () => resolve(totalCount);
    };
  });
};

// deleteAllTranscripts();

// saveTranscript(
//   "942c7710-b28a-4d1e-b83a-76db1b4d7664",
//   "t54ot69zxt8u-20230607-me-canadian-wildfires",
//   "mp3"
// );

// deleteTranscriptById(
//   "5e13cdaa-1e80-4b12-be5f-05aa4f834ffb-p9az0x6e-1758532243657"
// );

// deleteMultipleTranscripts([
//   "5e13cdaa-1e80-4b12-be5f-05aa4f834ffb-hou04o2o-1758532240167",
//   "5e13cdaa-1e80-4b12-be5f-05aa4f834ffb-p1z9b20m-1758532186876",
//   "5e13cdaa-1e80-4b12-be5f-05aa4f834ffb-ym5wrnkc-1758532184819",
//   "5e13cdaa-1e80-4b12-be5f-05aa4f834ffb-2ets0gwz-1758532174038",
//   "5e13cdaa-1e80-4b12-be5f-05aa4f834ffb-e5or0wa2-1758531855914",
// ]);
