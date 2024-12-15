"use client";

import React from "react";
import Hero from "./components/stuff/hero";
import Features from "./components/stuff/features";
import TryIt from "./components/stuff/try-it";
import Statement from "./components/stuff/statement";

export default function Home() {
  return (
    <>
      <main className="w-full md:max-w-screen-md mx-auto min-h-screen">
        <Hero />
        <Features />
        <TryIt />
        <Statement />
      </main>
    </>
  );
}
