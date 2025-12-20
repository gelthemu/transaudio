import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { save } from "./utils/manual-save-api";

declare global {
  interface Window {
    save: typeof save;
  }
}

window.save = save;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
