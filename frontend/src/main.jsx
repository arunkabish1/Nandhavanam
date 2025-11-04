import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Optional — register PWA service worker (vite-plugin-pwa exposes helper)
if (import.meta.env.PROD) {
  // runtime registration handled by the plugin's generated sw, but ensure registration:
  import("virtual:pwa-register").then(({ registerSW }) => {
    registerSW({ immediate: true });
  });
}

createRoot(document.getElementById("root")).render(<App />);
