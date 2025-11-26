import React from "react";

interface SeparatorProps {
  limit?: number;
  margin?: string;
}

export const Separator: React.FC<SeparatorProps> = ({ limit = 12, margin }) => {
  const separator = "—·".repeat(limit);

  return (
    <div
      className={`${
        margin ? margin : "my-6 md:my-8"
      } opacity-20 overflow-hidden whitespace-nowrap`}
    >
      {separator}
    </div>
  );
};
