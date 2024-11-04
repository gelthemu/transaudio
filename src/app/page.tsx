"use client";

import React from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Transcript from "./components/Transcript";
import Statement from "./components/Statement";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="w-full md:max-w-screen-md mx-auto">
        <Hero />
        <Features />
        <Transcript />
        <Statement />
      </main>
      <Footer />
    </>
  );
}
