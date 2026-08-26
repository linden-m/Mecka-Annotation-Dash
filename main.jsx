import React from "react";
import { createRoot } from "react-dom/client";
import PilotDashboard from "./PilotDashboard.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PilotDashboard />
  </React.StrictMode>,
);
