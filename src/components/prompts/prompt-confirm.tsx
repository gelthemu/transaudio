import React from "react";
import { Prompt } from "./prompt";

interface PromptConfirmProps {
  isOpen: boolean;
  onCancel: () => void;
  onClearError: () => void;
  closePrompt: () => void;
}

export const PromptConfirm: React.FC<PromptConfirmProps> = ({
  isOpen,
  onCancel,
  onClearError,
  closePrompt,
}) => {
  const handlePrompt = (prompt: string) => {
    if (prompt === "YES") {
      onCancel();
      closePrompt();
    } else if (prompt === "NO") {
      onClearError();
      closePrompt();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="p-px text-left">
      <Prompt
        prompt={"['YES' or 'NO']"}
        onPrompt={handlePrompt}
        validPrompts={["YES", "NO"]}
        valueLength={4}
      />
    </div>
  );
};
