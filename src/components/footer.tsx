import React, { useState, useEffect } from "react";
import { getSession } from "../utils/session-manager";

export const Footer: React.FC = () => {
  const [session, setSession] = useState<string>("");

  useEffect(() => {
    const id = getSession();
    setSession(id);
  }, []);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.toLocaleString("default", { month: "short" });
  const day = currentDate.getDate();

  return (
    <footer className="flex flex-col space-y-4 p-1 text-sm opacity-60">
      <div className="text-terminal-amber">Session ID: {session}</div>
      <div>
        <span>
          {month} {day}, {year} {" | "} TransAudio
        </span>
      </div>
    </footer>
  );
};
