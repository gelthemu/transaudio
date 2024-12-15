"use client";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4">
      <div className="flex flex-col justify-center items-center space-y-2 text-center">
        <h1 className="text-5xl font-bold text-brick">404</h1>
        <p className="text-lg font-semibold">Page Not Found</p>
        <p
          onClick={() => window.history.back()}
          className="underline cursor-pointer p-2"
        >
          Back
        </p>
      </div>
    </div>
  );
}
