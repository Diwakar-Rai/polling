import React from "react";
import { GlobalProvider } from "./components/GlobalContext";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PageRoutes from "./components/PageRoutes";

import { IdProvider } from "./components/IdContext";

import { RatingProvider } from "./components/RatingContext";

const App = () => {
  let loginData = true;
  return (
    <GlobalProvider>
      <IdProvider>
        <RatingProvider>
          <div>
            <BrowserRouter>
              <ToastContainer autoClose={2000} />
              <PageRoutes loginData={loginData} />
            </BrowserRouter>
          </div>
        </RatingProvider>
      </IdProvider>
    </GlobalProvider>
  );
};

export default App;
