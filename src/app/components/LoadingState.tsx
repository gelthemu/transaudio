import React from "react";
import { Circles } from "react-loader-spinner";

export const LoadingState = () => (
  <div className="bg-brandBeige/5 border border-brandBlue-light/50 rounded-md px-3 py-2 mt-8">
    <div className="flex flex-col gap-2 p-4">
      <div className="w-fit bg-brandBrick/20 rounded-full p-2">
        <Circles width="20" height="20" color="#fcfaee" />
      </div>
      <ul className="text-sm space-y-1 list-disc list-outside">
        <li>Please wait while the process completes.</li>
        <li>
          Remember, the longer your audio, the longer it will take. However, it
          should be done under 10 minutes.
        </li>
        <li>
          Once complete, you can download your transcript as a text file. Or
          copy it to your clipboard.
        </li>
      </ul>
    </div>
  </div>
);
