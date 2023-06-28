import React from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "react-toastify/dist/ReactToastify.css";
import "./global.css";
import App from "./App";
import { LoginProvider } from "./components/LoginContext";
// let login = JSON.parse(localStorage.getItem("loginAdmin"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <LoginProvider>
    <App />
  </LoginProvider>
);
