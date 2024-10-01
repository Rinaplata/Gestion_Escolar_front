import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/routes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Navbar />
      <AppRoutes />
    </Router>
  </StrictMode>
);
