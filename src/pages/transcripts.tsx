import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import {
  cleanExpiredTranscripts,
  getAllTranscripts,
  deleteTranscriptById,
} from "../utils/indexed-db-manager";
import { StoredTranscript } from "../types";
import { formatDate } from "../utils/format-date";
import { cleanFileName } from "../utils/random-id";
import { Spinner } from "../components/spinner";

export const Transcripts: React.FC = () => {
  const navigate = useNavigate();
  const [transcripts, setTranscripts] = useState<StoredTranscript[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => {
    const loadTranscripts = async () => {
      await cleanExpiredTranscripts();
      const storedTranscripts = await getAllTranscripts();
      setTranscripts(storedTranscripts);
      setLoading(false);
    };

    loadTranscripts();
  }, []);

  const handleView = (id: string, ss: string) => {
    navigate(`/transcript?id=${id}&ss=${ss}`);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteTranscriptById(id);
      await cleanExpiredTranscripts();
      const freshTranscripts = await getAllTranscripts();
      setTranscripts(freshTranscripts);
    } catch {
      alert("Failed to delete transcript.");
    } finally {
      setDeletingId(null);
    }
  };

  const openConfirm = (id: string) => {
    setConfirmId(id);
  };

  const closeConfirm = () => {
    setConfirmId(null);
  };

  const confirmDelete = () => {
    if (!confirmId) return;
    handleDelete(confirmId);
    setConfirmId(null);
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>
            Your Transcripts | TransAudio - Effortless Audio-to-Text Conversion
          </title>
          <meta name="robots" content="noindex, nofollow" />
          <link
            rel="canonical"
            href="https://transaudio.vercel.app/transcripts"
          />
        </Helmet>
        <div>
          <Spinner />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          Your Transcripts | TransAudio - Effortless Audio-to-Text Conversion
        </title>
        <meta name="robots" content="noindex, nofollow" />
        <link
          rel="canonical"
          href="https://transaudio.vercel.app/transcripts"
        />
      </Helmet>
      <div>
        {transcripts.length === 0 ? (
          <div className="opacity-90 flex flex-col space-y-4">
            <p>You haven't converted any speech to text yet!</p>
            <div>
              <a
                href="/home"
                className="px-4 py-2 text-sm font-bold bg-light text-dark border-none decoration-none"
              >
                Get Started
              </a>
            </div>
          </div>
        ) : (
          <div>
            <table className="transcripts">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Transcript Details</th>
                </tr>
              </thead>
              <tbody>
                {transcripts.map((transcript, index) => (
                  <tr key={transcript.id}>
                    <td>{index + 1}</td>
                    <td className="flex flex-col space-y-2">
                      <div>
                        <span>{cleanFileName(transcript.id)}</span> <br />
                        <span className="text-xs opacity-60">
                          {formatDate(transcript.created)}
                        </span>
                      </div>
                      {confirmId === transcript.id ? (
                        <div>
                          <div className="flex flex-row items-center space-x-2 text-xs font-semibold">
                            <div>
                              <span className="text-sm">Are you sure?</span>
                            </div>
                            <div>
                              <button
                                type="button"
                                className="px-2 py-1 border border-light bg-transparent opacity-90"
                                onClick={closeConfirm}
                                disabled={deletingId !== null}
                              >
                                Cancel
                              </button>
                            </div>
                            <div>
                              <button
                                type="button"
                                className="px-4 py-1 bg-light text-dark border-none"
                                onClick={confirmDelete}
                                disabled={deletingId !== null}
                              >
                                YES
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-row space-x-2 text-xs font-semibold">
                          <button
                            className="px-2 py-1 bg-light text-dark border-none"
                            type="button"
                            onClick={() =>
                              handleView(transcript.id, transcript.session)
                            }
                          >
                            View
                          </button>
                          <button
                            className="px-2 py-1 text-red border border-red bg-transparent opacity-90"
                            type="button"
                            onClick={() => openConfirm(transcript.id)}
                            disabled={deletingId === transcript.id}
                          >
                            {deletingId === transcript.id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};
