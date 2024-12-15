import React from "react";
import { CircleCheck } from "lucide-react";

export default function Requirements() {
    return (
        <>
          <div className="text-beige/70 mb-6">
            <p>
              Get started by uploading your audio file and watch TransAudio turn
              it into accurate, clear text in moments.
            </p>
            <p className="pt-4">Simply fullfil these requirements:</p>
          </div>
          <ul className="text-left text-blue-light font-medium space-y-3 mb-8">
            <li className="flex items-center">
              <CircleCheck className="w-4 h-4 mr-2" />
              <span>
                <span className="font-bold">Supported Format:</span> Audio/MP3
                files only
              </span>
            </li>
            <li className="flex items-center">
              <CircleCheck className="w-4 h-4 mr-2" />
              <span>
                <span className="font-bold">File Size Limit:</span> Maximum 8MB
              </span>
            </li>
            <li className="flex items-center">
              <CircleCheck className="w-4 h-4 mr-2" />
              <span>
                <span className="font-bold">Quality Tip:</span> Ensure clear
                audio for best results
              </span>
            </li>
          </ul>
        </>
    );
}