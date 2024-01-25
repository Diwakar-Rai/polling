import React from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "react-toastify/dist/ReactToastify.css";
import "./global.css";
import App from "./App";
import { LoginProvider } from "./components/LoginContext";
import NotificationProvider from "./components/NotificationContext";
import VotingStartProvider from "./components/VotingStartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LoginProvider>
    {/* <NotificationProvider> */}
    <VotingStartProvider>
      <App />
    </VotingStartProvider>
    {/* </NotificationProvider> */}
  </LoginProvider>
);
