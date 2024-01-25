import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AdminLanding from "../pages/AdminLanding";
import SignUpForAdmin from "../pages/SignUpForAdmin";
import AdminTable from "../pages/AdminTable";
import AdminDetails from "../pages/AdminDetails";
import PresentationRating from "../pages/PresentationRating";
import Review from "../pages/Review";
import Comments from "../pages/Comments";
import LivePresentation from "../pages/LivePresentation";
import AssignPresentation from "../pages/AssignPresentation";
import Voting from "../pages/Voting";
import SummaryRating from "../pages/SummaryRating";
import CommentsExperts from "../pages/ComentsExperts";
import TraineeDetailsAdmin from "../pages/TraineeDetailsAdmin";
import OngoingPresentation from "../pages/OngoingPresentation";
import TraineeLanding from "../pages/TraineeLanding";
import TraineeNotification from "../pages/TraineeNotification";
import TraineeReviews from "../pages/TraineeReviews";
import TraineeRating from "../pages/TraineeRating";
import TraineeComments from "../pages/TraineeComments";
import TraineeExpertComments from "../pages/TraineeExpertComments";
import ExpertLanding from "../pages/expert/ExpertLanding";
import Protected from "./Protected";
import Login from "./../pages/Login";
import TraineeDetails from "./../pages/TraineeDetails";
import OngoingSummary from "../pages/OngoingSummary";
import ParticularTrainee from "../pages/admin/ParticularTrainee";
import NotAvailable from "./../pages/NotAvailable";
import TraineePresOverall from "../pages/admin/TraineePresOverall";

const PageRoutes = () => {
  let loginData = JSON.parse(localStorage.getItem("loginAdmin"));

  function changePath(a) {
    return btoa(a);
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotAvailable />} />
        //!ADMIN ROUTES
        <Route
          path={`/${changePath("adminLanding")}`}
          element={
            <Protected isLoggedIn={loginData}>
              <AdminLanding />
            </Protected>
          }
        />
        <Route
          path={`/${changePath("traineePresentationOverall")}`}
          element={
            <Protected isLoggedIn={loginData}>
              <TraineePresOverall />
            </Protected>
          }
        />
        <Route
          // path="/addTrainee"
          path={`/${changePath("addTrainee")}`}
          element={
            <Protected isLoggedIn={loginData}>
              <SignUpForAdmin />
            </Protected>
          }
        />
        <Route
          // path="/adminTable"
          path={`/${changePath("adminTable")}`}
          element={
            <Protected isLoggedIn={loginData}>
              <AdminTable />
            </Protected>
          }
        />
        <Route
          // path="/adminDetails"
          path={`/${changePath("adminDetails")}`}
          element={
            <Protected isLoggedIn={loginData}>
              <AdminDetails />
            </Protected>
          }
        />
        <Route
          // path="/particularTrainee/:id"
          path={`/${changePath("particularTrainee")}/:id`}
          element={
            <Protected isLoggedIn={loginData}>
              <ParticularTrainee />
            </Protected>
          }
        />
        {/* <Route path="/individual/:id" element={<IndividualTrainee />} /> */}
        <Route
          // path="/presentation/:id"
          path={`/${changePath("presentation")}/:id`}
          element={
            <Protected isLoggedIn={loginData}>
              <PresentationRating />
            </Protected>
          }
        />
        <Route
          // path="/review/:id"
          path={`/${changePath("review")}/:id`}
          element={
            <Protected isLoggedIn={loginData}>
              <Review />
            </Protected>
          }
        />
        <Route
          // path="/comments/:id"
          path={`/${changePath("comments")}/:id`}
          element={
            <Protected isLoggedIn={loginData}>
              <Comments />
            </Protected>
          }
        />
        <Route
          // path="/livePresentation"
          path={`/${changePath("livePresentation")}`}
          element={
            <Protected isLoggedIn={loginData}>
              <LivePresentation />
            </Protected>
          }
        />
        <Route
          // path="/traineeAssign"
          path={`/${changePath("traineeAssign")}`}
          element={
            <Protected isLoggedIn={loginData}>
              <AssignPresentation />
            </Protected>
          }
        />
        <Route
          // path="/voting"
          path={`/${changePath("voting")}`}
          element={
            <Protected isLoggedIn={loginData}>
              <Voting />
            </Protected>
          }
        />
        <Route
          // path="/ratingSummary"
          path={`/${changePath("ratingSummary")}`}
          element={
            <Protected isLoggedIn={loginData}>
              <SummaryRating />
            </Protected>
          }
        />
        <Route
          // path="/commentsExpert"
          path={`/${changePath("commentsExpert")}`}
          element={
            <Protected isLoggedIn={loginData}>
              <CommentsExperts />
            </Protected>
          }
        />
        <Route
          // path="/traineeStatus"
          path={`/${changePath("traineeStatus")}`}
          element={
            <Protected isLoggedIn={loginData}>
              <TraineeDetailsAdmin />
            </Protected>
          }
        />
        <Route
          // path="/ongoingPres"
          path={`/${changePath("ongoingPres")}`}
          element={
            <Protected isLoggedIn={loginData}>
              <OngoingPresentation />
            </Protected>
          }
        />
        <Route
          // path="/ratingSummaryOnGoing"
          path={`/${changePath("ratingSummaryOnGoing")}`}
          element={
            <Protected isLoggedIn={loginData}>
              <OngoingSummary />
            </Protected>
          }
        />
        //! TRAINEE ROUTES
        <Route path={`/${btoa("traineeLanding")}`} element={<TraineeLanding />}>
          <Route
            // path="traineeLanding/notification"
            path={`${btoa("traineeLanding")}/${btoa("notification")}`}
            element={<TraineeNotification />}
          />
          <Route
            // path="traineeLanding/reviews"
            path={`${btoa("traineeLanding")}/${btoa("reviews")}`}
            element={<TraineeReviews />}
          />
        </Route>
        <Route
          // path="/traineeRating/:id"
          path={`/${changePath("traineeRating")}/:id`}
          element={<TraineeRating />}
        />
        <Route
          // path="/traineeComments/:id"
          path={`/${btoa("traineeComments")}/:id`}
          element={<TraineeComments />}
        />
        <Route
          // path="/expertCommentsTrainee/:id"
          path={`/${btoa("expertCommentsTrainee")}/:id`}
          element={<TraineeExpertComments />}
        />
        <Route
          // path="/traineeDetails"
          path={`/${btoa("traineeDetails")}`}
          element={<TraineeDetails />}
        />
        //! Expert Routing section
        <Route
          path={`/${btoa("expertLanding")}`}
          element={
            <Protected isLoggedIn={loginData}>
              <ExpertLanding />
            </Protected>
          }
        />
      </Routes>
    </div>
  );
};

export default PageRoutes;
