"use client";

import confetti from "canvas-confetti";

export default function Confetti() {
  confetti({
    particleCount: 100,
    spread: 80,
    origin: { y: 1 },
  });
}
