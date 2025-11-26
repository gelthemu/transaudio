import React from "react";

export const Statement: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 p-px text-left opacity-80">
      <div>
        <h1 className="text-lg font-bold mb-1">How It Works</h1>
        <div>
          <ul className="list-disc list-inside">
            <li>
              You upload a file of type MP3 or MP4, below 60MB; or use a URL on
              the web of similar format
            </li>
            <li>TransAudio converts it to text, with high accuracy</li>
            <li>Finally, you download your transcript (.txt)</li>
          </ul>
        </div>
      </div>
      <div>
        <h1 className="text-lg font-bold mb-1">Need a bit More Help?</h1>
        <p>Send an email to:</p>
        <p>
          <a
            href="mailto:gelthemu@gmail.com"
            className="font-bold text-green-500"
          >
            gelthemu@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};
