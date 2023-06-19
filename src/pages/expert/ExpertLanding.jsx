import React from "react";
import ExpertNavbar from "./../../components/ExpertNavbar";
import { Link } from "react-router-dom";

const ExpertLanding = () => {
  return (
    <div>
      <ExpertNavbar />
      <section className="landingContainer">
        <section className="row">
          <div className="col-2"></div>
          <div className="col-4 bg-secondary-subtle mx-4 p-3 rounded rounded-2 shadow">
            <p>Click on the Button below to check latest presentation</p>
            <Link
              className="btn btn-primary px-5 py-3 w-100"
              to="/traineeLanding/traineeLanding/notification"
            >
              Notifications
              {/* <MdAssignmentAdd style={{ fontSize: 30 }} /> */}
            </Link>
          </div>
          <div className="col-4 bg-secondary-subtle mx-4 p-3 rounded rounded-2 shadow">
            <p>Click on the button below to check Completed Presentations</p>
            <Link className="btn btn-primary px-5 py-3 w-100" to="/adminTable">
              Presentations Completed
              {/* <MdAssignmentTurnedIn style={{ fontSize: 30 }} /> */}
            </Link>
          </div>
          <div className="col-2"></div>
        </section>
      </section>
    </div>
  );
};

export default ExpertLanding;
