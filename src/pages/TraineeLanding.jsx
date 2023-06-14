import React, { useContext } from "react";
import { GlobalContext } from "../components/GlobalContext";
import TraineeNavbar from "../components/TraineeNavbar";
import { Link, Outlet } from "react-router-dom";
const TraineeLanding = () => {
  const { globalData, setGlobalData } = useContext(GlobalContext);
  return (
    <section>
      <TraineeNavbar />
      <div className="row mt-4 border-bottom border-1 mx-5 pb-3">
        <div className="col-2"></div>
        <div className="col-8">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-4" style={{ paddingBottom: 0 }}>
              <Link
                to="traineeLanding/notification"
                className="btn btn-primary p-4 px-5 fw-bolder"
              >
                Notifications
              </Link>
            </div>
            <div className="col-4">
              <Link
                to="traineeLanding/reviews"
                className="btn btn-primary p-4 px-5 fw-bolder"
              >
                Reviews
              </Link>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
        <div className="col-2"></div>
      </div>
      <section>
        <Outlet />
      </section>
    </section>
  );
};

export default TraineeLanding;
