import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Sign from "./components/Sign";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Sign />
  </StrictMode>
);
