import React from "react";

export default function Start() {
  return (
    <>
      <div className="w-full md:w-4/5 mx-auto text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-thin mb-8">
          Try It Out Today{" "}
          <span className="text-brandBrick font-light">for Free</span>
        </h2>
        <p className="text-brandBeige/60 mb-6">
          Get started by uploading your audio file and watch TransAudio turn it
          into accurate, clear text in moments. Simply follow these
          requirements:
        </p>
        <ul className="text-left text-brandBlue-light text-sm mb-6 space-y-3">
          <li className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-4 mr-1"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              <strong>Supported Format:</strong> Audio/MP3 files only
            </span>
          </li>
          <li className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-4 mr-1"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              <strong>File Size Limit:</strong> Maximum 10MB
            </span>
          </li>
          <li className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-4 mr-1"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              <strong>Quality Tip:</strong> Ensure clear audio for best results
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}
