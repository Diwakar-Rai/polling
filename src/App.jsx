import React from "react";
import { GlobalProvider } from "./components/GlobalContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// ! Importing pages
import Login from "./pages/Login";
import AdminTable from "./pages/AdminTable";
import PresentationRating from "./pages/PresentationRating";
import Review from "./pages/Review";
import Comments from "./pages/Comments";
import { IdProvider } from "./components/IdContext";
import AdminLanding from "./pages/AdminLanding";
import Protected from "./components/Protected";
import LivePresentation from "./pages/LivePresentation";
import AssignPresentation from "./pages/AssignPresentation";
import Voting from "./pages/Voting";
import TraineeLanding from "./pages/TraineeLanding";
import TraineeNotification from "./pages/TraineeNotification";
import TraineeReviews from "./pages/TraineeReviews";
import TraineeRating from "./pages/TraineeRating";
import { RatingProvider } from "./components/RatingContext";
import TraineeComments from "./pages/TraineeComments";
import AdminDetails from "./pages/AdminDetails";
import SignUpForAdmin from "./pages/SignUpForAdmin";
import TraineeDetailsAdmin from "./pages/TraineeDetailsAdmin";
import OngoingPresentation from "./pages/OngoingPresentation";
import SummaryRating from "./pages/SummaryRating";
import CommentsExperts from "./pages/ComentsExperts";
import ExpertLanding from "./pages/expert/ExpertLanding";
import TraineeExpertComments from "./pages/TraineeExpertComments";
const App = () => {
  let loginData = JSON.parse(localStorage.getItem("loginAdmin"));

  // let traineeStatus = JSON.parse(localStorage.getItem("loginTrainee"));

  return (
    <GlobalProvider>
      <IdProvider>
        <RatingProvider>
          <div>
            <BrowserRouter>
              <ToastContainer autoClose={2000} />
              <Routes>
                <Route path="/" element={<Login />} />
                //!ADMIN ROUTES
                <Route
                  path="/adminLanding"
                  element={
                    <Protected isLoggedIn={loginData}>
                      <AdminLanding />
                    </Protected>
                  }
                />
                <Route
                  path="/addTrainee"
                  element={
                    <Protected isLoggedIn={loginData}>
                      <SignUpForAdmin />
                    </Protected>
                  }
                />
                <Route
                  path="/adminTable"
                  element={
                    <Protected isLoggedIn={loginData}>
                      <AdminTable />
                    </Protected>
                  }
                />
                <Route
                  path="/adminDetails"
                  element={
                    <Protected isLoggedIn={loginData}>
                      <AdminDetails />
                    </Protected>
                  }
                />
                {/* <Route path="/individual/:id" element={<IndividualTrainee />} /> */}
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
                <Route
                  path="/livePresentation"
                  element={
                    <Protected isLoggedIn={loginData}>
                      <LivePresentation />
                    </Protected>
                  }
                />
                <Route
                  path="/traineeAssign"
                  element={
                    <Protected isLoggedIn={loginData}>
                      <AssignPresentation />
                    </Protected>
                  }
                />
                <Route
                  path="/voting"
                  element={
                    <Protected isLoggedIn={loginData}>
                      <Voting />
                    </Protected>
                  }
                />
                <Route
                  path="/ratingSummary"
                  element={
                    <Protected isLoggedIn={loginData}>
                      <SummaryRating />
                    </Protected>
                  }
                />
                <Route
                  path="/commentsExpert"
                  element={
                    <Protected isLoggedIn={loginData}>
                      <CommentsExperts />
                    </Protected>
                  }
                />
                <Route
                  path="/traineeStatus"
                  element={
                    <Protected isLoggedIn={loginData}>
                      <TraineeDetailsAdmin />
                    </Protected>
                  }
                />
                <Route
                  path="/ongoingPres"
                  element={
                    <Protected isLoggedIn={loginData}>
                      <OngoingPresentation />
                    </Protected>
                  }
                />
                //! TRAINEE ROUTES
                <Route path="/traineeLanding" element={<TraineeLanding />}>
                  <Route
                    path="traineeLanding/notification"
                    element={<TraineeNotification />}
                  />
                  <Route
                    path="traineeLanding/reviews"
                    element={<TraineeReviews />}
                  />
                </Route>
                <Route path="/traineeRating/:id" element={<TraineeRating />} />
                <Route
                  path="/traineeComments/:id"
                  element={<TraineeComments />}
                />
                <Route
                  path="/expertCommentsTrainee/:id"
                  element={<TraineeExpertComments />}
                />
                //! Expert Routing section
                <Route path="/expertLanding" element={<ExpertLanding />} />
              </Routes>
            </BrowserRouter>
          </div>
        </RatingProvider>
      </IdProvider>
    </GlobalProvider>
  );
};

export default App;
