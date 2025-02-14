import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Add the custom-scrollbar class to the body element
document.body.classList.add("custom-scrollbar");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
