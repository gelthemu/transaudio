import React from "react";

interface BucketProps {
  maxHeight?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Bucket: React.FC<BucketProps> = ({
  maxHeight = "70vh",
  children,
  className = "",
  id,
}) => {
  return (
    <div className="w-full relative">
      <div className="absolute top-0 left-0 right-[4px] h-12 bg-gradient-to-b from-terminal-bg to-transparent pointer-events-none z-10" />
      <div
        id={id}
        className={`h-max overflow-y-auto relative`}
        style={{ maxHeight }}
      >
        <div className={`px-4 ${className}`}>{children}</div>
      </div>
      <div className="absolute bottom-0 left-0 right-[4px] h-12 bg-gradient-to-t from-terminal-bg to-transparent pointer-events-none z-0" />
    </div>
  );
};
