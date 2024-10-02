// index.js
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./routes/routes";

const App = () => {
  const location = useLocation();

  return (
    <>
      {!location.pathname.includes('/adminLayout') && <Navbar />}
      <AppRoutes />
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
