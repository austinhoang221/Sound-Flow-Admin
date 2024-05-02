import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <React.Suspense fallback={<div>Loading...</div>}>
        <App />
        <Toaster />
      </React.Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
