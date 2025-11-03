import React from "react";

export const Statement: React.FC = () => {
  const metrics = [
    {
      value: "50+",
      label: "Languages",
    },
    {
      value: "90%",
      label: "Accuracy",
    },
  ];

  return (
    <div className="flex flex-col space-y-4 p-px text-left opacity-80">
      <div>
        <h1 className="text-2xl text-terminal-amber font-bold mb-1">About</h1>
        <p>
          As a simple & powerful web app, TransAudio makes it easy to convert
          speech to clear, readable text. Using powerful AI, TransAudio
          accurately captures every word, every speaker for smooth, polished
          transcripts.
        </p>
        <div className="flex flex-row items-center space-x-6 p-2">
          {metrics.map((metric, index) => (
            <div className="flex flex-row items-center space-x-2" key={index}>
              <h2 className="text-lg text-terminal-cyan font-bold">
                {metric.value}
              </h2>
              <p className="opacity-60">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-2xl text-terminal-amber font-bold mb-1">
          How It Works
        </h1>
        <div>
          <ul className="list-disc list-inside">
            <li>You upload a file of type MP3 or MP4, below 60MB</li>
            <li>TransAudio converts it to text, with high accuracy</li>
            <li>Finally, you download your transcript (.txt)</li>
          </ul>
        </div>
      </div>
      <div>
        <h1 className="text-2xl text-terminal-amber font-bold mb-1">
          <span>{"Need a bit"}</span>
          <span className="text-terminal-red">{" More Help"}</span>
          <span>{"?"}</span>
        </h1>
        <p>
          You have larger files? Are they taking too long to process? Or perhaps
          you could use some assistance with refining your transcripts? Send an
          email to:
        </p>
        <p>
          <span className="text-terminal-cyan font-bold">
            transaudio@geltaverse.com
          </span>
        </p>
      </div>
    </div>
  );
};
