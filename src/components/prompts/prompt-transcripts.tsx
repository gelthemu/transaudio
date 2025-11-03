import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Prompt } from "./prompt";
import { PromptConfirm } from "./prompt-confirm";
import {
  cleanExpiredTranscripts,
  getAllTranscripts,
  deleteTranscriptById,
} from "../../utils/indexed-db-manager";
import { formatDate } from "../../utils/format-date";
import { cleanFileName } from "../../utils/random-id";
import { Bucket } from "../bucket";
import { StoredTranscript } from "../../types";

interface PromptDisplayProps {
  data: StoredTranscript[];
}

export const PromptTranscripts: React.FC<PromptDisplayProps> = ({ data }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [transcripts, setTranscripts] = useState<StoredTranscript[]>(
    data || []
  );
  const [isDelete, setIsDelete] = useState(false);
  const [isTranscriptToDelete, setIsTranscriptToDelete] =
    useState<StoredTranscript | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const clearOperation = () => {
    setIsDelete(false);
    setIsTranscriptToDelete(null);
  };

  const handlePrompt = (prompt: string) => {
    const number = parseInt(prompt);
    const transcript = transcripts[number - 1];
    if (prompt === "DELETE") {
      setIsDelete(true);
    } else if (!isNaN(number) && number >= 1 && number <= transcripts.length) {
      const id = transcript.id;
      const session = transcript.session;
      const referer = document.referrer || window.location.href;
      const page_ref = referer.split("/").pop() || "home";
      navigate(`/transcript?ss=${session}&id=${id}&pg_ref=${page_ref}`);
    }
  };

  const handleDeletePrompt = (prompt: string) => {
    const number = parseInt(prompt);
    const transcript = transcripts[number - 1];

    if (prompt === "CANCEL") {
      clearOperation();
    } else if (!isNaN(number) && number >= 1 && number <= transcripts.length) {
      setIsOpen(true);
      setIsTranscriptToDelete(transcript);
    }
  };

  const getValidPrompts = () => {
    const numbers = transcripts.map((_, index) => (index + 1).toString());
    return isDelete ? [...numbers, "CANCEL"] : [...numbers, "DELETE"];
  };

  const onClosePrompt = () => {
    setIsOpen(false);
    clearOperation();
  };

  const onTranscriptToDelete = async () => {
    if (isTranscriptToDelete && isTranscriptToDelete.id) {
      try {
        await deleteTranscriptById(isTranscriptToDelete.id);
        await cleanExpiredTranscripts();
        const freshTranscripts = await getAllTranscripts();
        setTranscripts(freshTranscripts);
      } catch {
        console.error("Error");
      } finally {
        clearOperation();
        navigate(location.pathname, { replace: true });
      }
    }
  };

  return (
    <div className="p-px flex flex-col space-y-4 text-left">
      <div>
        {isOpen ? (
          <div>
            "Okay to <span className="text-terminal-red">PROCEED</span>?"
          </div>
        ) : (
          <div>
            To{" "}
            <span
              className={`${
                isDelete ? "text-terminal-red" : "text-terminal-amber"
              }`}
            >
              {isDelete ? "delete some" : "view each"}
            </span>{" "}
            transcript{isDelete ? "s" : ""},
          </div>
        )}
        {isOpen ? (
          <PromptConfirm
            isOpen={isOpen}
            onClearError={clearOperation}
            onCancel={onTranscriptToDelete}
            closePrompt={onClosePrompt}
          />
        ) : (
          <>
            <Prompt
              prompt={"Enter a number:"}
              onPrompt={isDelete ? handleDeletePrompt : handlePrompt}
              validPrompts={getValidPrompts()}
              valueLength={6}
            />
          </>
        )}
        <div className="pt-1 opacity-60">
          {isOpen ? (
            <div>
              This is <span className="text-terminal-red">irreversible</span>!!!
            </div>
          ) : (
            <div>
              Or enter{" "}
              <span className="font-bold">
                {isDelete ? "CANCEL" : "DELETE"}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="w-full md:w-3/4 relative">
        <Bucket
          maxHeight="50vh"
          id="transcripts"
          className="flex flex-col py-6"
        >
          {transcripts.length === 0 ? (
            <div className="flex flex-col space-y-4 py-2">
              <div className="opacity-40">
                <span>{"nothing to see here..."}</span>
              </div>
            </div>
          ) : (
            <div className="grid gap-1 grid-cols-1">
              {transcripts.map((transcript, index) => (
                <div
                  key={transcript.id}
                  id={
                    isTranscriptToDelete?.id === transcript.id
                      ? "transcript-index"
                      : undefined
                  }
                  className={`${
                    isTranscriptToDelete?.id === transcript.id
                      ? "bg-terminal-red/60 border border-terminal-amber/20"
                      : "border-none"
                  } p-1 flex flex-row items-start`}
                >
                  <div className="shrink-0 flex flex-row items-center text-terminal-cyan font-semibold truncate">
                    {index + 1}
                    <span className="me-1 opacity-50">{"."}</span>
                  </div>
                  <div>
                    <div className="text-terminal-amber font-semibold line-clamp-1 lowercase">
                      {cleanFileName(transcript.id)}
                    </div>
                    <div className="opacity-40 text-xs">
                      <span>{formatDate(transcript.created)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Bucket>
      </div>
    </div>
  );
};
