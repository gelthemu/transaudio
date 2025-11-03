import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Prompt } from "./prompt";

export const PromptDisplay: React.FC = () => {
  const navigate = useNavigate();
  const [quake, setQuake] = useState(false);

  const handlePrompt = (prompt: string) => {
    if (prompt === "BACK") {
      navigate(-1);
    } else if (prompt === "HELP") {
      setQuake(true);
      setTimeout(() => setQuake(false), 1000);
    }
  };

  const getValidPrompts = () => ["HELP", "BACK"];

  return (
    <div className="p-px flex flex-col space-y-4 text-left">
      <div>
        <Prompt
          prompt={"Enter Prompt:"}
          onPrompt={handlePrompt}
          validPrompts={getValidPrompts()}
          valueLength={4}
        />
      </div>
      <div>
        <div className="text-terminal-green mb-1">Available Prompts:</div>
        <table className={`ml-4 p-2 border-none ${quake ? "quake" : ""}`}>
          <tbody>
            <tr className="border-none">
              <td className="border-none">HOME</td>
              <td className="border-none px-4"></td>
              <td className="border-none opacity-60 text-sm">Navigates Home</td>
            </tr>
            <tr className="border-none">
              <td className="border-none">BACK</td>
              <td className="border-none px-4"></td>
              <td className="border-none opacity-60 text-sm">
                Navigates to Previous Page
              </td>
            </tr>
            <tr className="border-none">
              <td className="border-none pe-0">HELP</td>
              <td className="border-none px-4"></td>
              <td className="border-none opacity-60 text-sm">
                Quakes this Message
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
