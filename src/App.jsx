import React, { useContext } from "react";
import { GlobalProvider } from "./components/GlobalContext";
import { LoginContext, LoginProvider } from "./components/LoginContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// ! Importing pages
import Login from "./pages/Login";
import Greet from "./pages/Greet";
import AdminTable from "./pages/AdminTable";
import IndividualTrainee from "./pages/IndividualTrainee";
import PresentationRating from "./pages/PresentationRating";
import Review from "./pages/Review";
import Comments from "./pages/Comments";
import { IdProvider } from "./components/IdContext";
import AdminLanding from "./pages/AdminLanding";
import Protected from "./components/Protected";

const App = () => {
  var { loginData, setLoginData } = useContext(LoginContext);
  return (
    <GlobalProvider>
      <IdProvider>
        <div>
          <BrowserRouter>
            <ToastContainer autoClose={2000} />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/adminLanding"
                element={
                  <Protected isLoggedIn={loginData}>
                    <AdminLanding />
                  </Protected>
                }
              />
              <Route path="/greeting" element={<Greet />} />
              <Route
                path="/adminTable"
                element={
                  <Protected isLoggedIn={loginData}>
                    <AdminTable />
                  </Protected>
                }
              />
              <Route path="/individual/:id" element={<IndividualTrainee />} />
              <Route
                path="/presentation/:id"
                element={
                  <Protected isLoggedIn={loginData}>
                    <PresentationRating />
                  </Protected>
                }
              />
              <Route
                path="/review/:id"
                element={
                  <Protected isLoggedIn={loginData}>
                    <Review />
                  </Protected>
                }
              />
              <Route
                path="/comments/:id"
                element={
                  <Protected isLoggedIn={loginData}>
                    <Comments />
                  </Protected>
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      </IdProvider>
    </GlobalProvider>
  );
};

export default App;
