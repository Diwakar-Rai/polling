import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
const TraineeNavbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark px-5">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active pe-4"
                  aria-current="page"
                  to="/traineeLanding"
                >
                  Home
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <FaUserCircle
              style={{ fontSize: 40, color: "white", cursor: "pointer" }}
            />

            <Link to="/" className="btn btn-danger mx-3">
              Logout
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default TraineeNavbar;
