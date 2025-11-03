import React from "react";
import { useNavigate } from "react-router-dom";
import { Prompt } from "./prompt";

interface PromptDisplayProps {
  onDownload: () => void;
}

export const PromptTranscript: React.FC<PromptDisplayProps> = ({
  onDownload,
}) => {
  const navigate = useNavigate();

  const handlePrompt = (prompt: string) => {
    if (prompt === "ALL") {
      navigate("/transcripts");
    } else if (prompt === "BACK") {
      navigate(-1);
    } else if (prompt === "DOWNLOAD") {
      onDownload();
    }
  };

  const getValidPrompts = () => ["ALL", "DOWNLOAD", "BACK"];

  return (
    <div className="p-px flex flex-col space-y-4 text-left">
      <div>
        <Prompt
          prompt={"Enter Prompt:"}
          onPrompt={handlePrompt}
          validPrompts={getValidPrompts()}
        />
      </div>
      <div>
        <div className="text-terminal-cyan mb-1">Available Prompts:</div>
        <table className="ml-4 p-2 border-none">
          <tbody>
            <tr className="border-none">
              <td className="border-none pe-0">DOWNLOAD</td>
              <td className="border-none px-4"></td>
              <td className="border-none opacity-60 text-sm">
                Saves this Transcript
              </td>
            </tr>
            <tr className="border-none">
              <td className="border-none pe-0">ALL</td>
              <td className="border-none px-4"></td>
              <td className="border-none opacity-60 text-sm">
                Navigates to all transcripts
              </td>
            </tr>
            <tr className="border-none">
              <td className="border-none">BACK</td>
              <td className="border-none px-4"></td>
              <td className="border-none opacity-60 text-sm">
                Navigates to Previous Page
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
