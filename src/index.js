import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Router>
  </React.StrictMode>
);
