import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PromptProps {
  prompt: string;
  onPrompt: (prompt: string) => void;
  onClearError?: () => void;
  disabled?: boolean;
  validPrompts?: string[];
  valueLength?: number;
}

export const Prompt: React.FC<PromptProps> = ({
  prompt,
  onPrompt,
  onClearError,
  disabled = false,
  validPrompts = [],
  valueLength = 8,
}) => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const q_prompt = input.trim();
  const allValidPrompts = [...validPrompts, "HOME"];

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled || !q_prompt) {
      setError("");
      setInput("");
      if (onClearError) onClearError();
      return;
    }

    if (allValidPrompts.length > 0) {
      const regex = new RegExp(`^(${allValidPrompts.join("|")})$`);
      if (!regex.test(q_prompt)) {
        setError(`Received: "${q_prompt}"`);
        setInput("");
        if (onClearError) onClearError();
        return;
      }
    }

    setError("");
    setInput("");

    if (onClearError) onClearError();

    if (q_prompt === "HOME") {
      navigate("/");
    } else {
      onPrompt(q_prompt);
    }
  };

  return (
    <div className="px-px flex flex-row">
      <div>
        <span className="text-terminal-green mr-2">{">>"}</span>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="flex items-center">
          <label htmlFor="prompt" className="mr-1">
            {prompt}
          </label>
          <input
            ref={inputRef}
            type="text"
            id="prompt"
            name="prompt"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPaste={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              if (input.value.length > valueLength) {
                input.value = input.value.slice(0, valueLength);
              }
            }}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            data-lpignore="true"
            disabled={disabled}
            className={`${
              disabled ? "w-4" : "w-24"
            } px-1 text-terminal-cyan font-bold bg-transparent border-none outline-none focus:outline-none`}
            style={{
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
              userSelect: "none",
            }}
          />
        </form>
        {error && (
          <div className="text-terminal-red text-sm">
            <div>
              <span>{error}</span>
            </div>
            <div>
              <span>Expected: [{allValidPrompts.join(", ")}]</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
