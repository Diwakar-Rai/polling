import React from "react";
import error from "../assets/images/error-404-6052476_1280.png";
import { Link } from "react-router-dom";

const NotAvailable = () => {
  return (
    <div>
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4">
          <img src={error} alt="error" className="w-100" />
          <p className="text-center">
            The page you are looking for is not found.
          </p>
          <Link
            to="/"
            className="btn btn-warning rounded-pill text-white w-100 fw-bolder"
          >
            Login
          </Link>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
};

export default NotAvailable;
