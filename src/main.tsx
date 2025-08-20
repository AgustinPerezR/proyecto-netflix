//main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import App from "./App";
import "./index.css"; // ⚠️ No te olvides de esto si usás Tailwind u otros estilos globales

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
