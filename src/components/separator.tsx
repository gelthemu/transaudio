import React from "react";

interface SeparatorProps {
  limit?: number;
  margin?: string;
}

export const Separator: React.FC<SeparatorProps> = ({ limit = 80, margin }) => {
  const separator = "—·".repeat(limit);

  return (
    <div
      className={`${
        margin ? margin : "my-4 md:my-6"
      } opacity-20 overflow-hidden whitespace-nowrap`}
    >
      {separator}
    </div>
  );
};
