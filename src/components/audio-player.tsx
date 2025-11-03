import React from "react";

interface AudioProps {
  file: string;
  audioRef: React.RefObject<HTMLAudioElement>;
  timeUpdate: () => void;
}

export const AudioPlayer: React.FC<AudioProps> = ({
  file,
  audioRef,
  timeUpdate,
}) => {
  if (!file) return null;

  return (
    <div>
      <audio
        ref={audioRef}
        controls
        className="w-full border-none"
        onTimeUpdate={timeUpdate}
        controlsList="nodownload nodownload noplaybackrate"
      >
        <source src={file} type="audio/mpeg" />
        ...
      </audio>
    </div>
  );
};
