// index.js
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/routes";
import AuthProvider from "./components/security/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <Navbar />
        <AppRoutes />
      </AuthProvider>
    </Router>
  </StrictMode>
);
