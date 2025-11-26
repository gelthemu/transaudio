import React, { useState, useEffect } from "react";

export const Spinner: React.FC = () => {
  const [spinnerIndex, setSpinnerIndex] = useState(0);
  const spinnerChars = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  // const spinnerChars = ["-", "\\", "|", "/"];

  useEffect(() => {
    const interval = setInterval(() => {
      setSpinnerIndex((prev) => (prev + 1) % spinnerChars.length);
    }, 250);

    return () => clearInterval(interval);
  }, [spinnerChars.length]);

  return <div>{spinnerChars[spinnerIndex]}</div>;
};
