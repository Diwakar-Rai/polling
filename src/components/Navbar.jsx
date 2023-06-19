import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
const Navbar = () => {
  var navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("loginAdmin");
    sessionStorage.removeItem("adminData");
    navigate("/");
  };
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
                  to="/adminLanding"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active pe-4"
                  aria-current="page"
                  to="/addTrainee"
                >
                  Add Trainee
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active pe-4"
                  aria-current="page"
                  to="/traineeStatus"
                >
                  Trainee Details
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active pe-4"
                  aria-current="page"
                  to="/ongoingPres"
                >
                  Ongoing Presentation
                </Link>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center">
            <FaUserCircle
              style={{ fontSize: 40, color: "white", cursor: "pointer" }}
            />

            <button
              className="btn btn-danger h-100 mx-3"
              onClick={handleLogOut}
            >
              LogOut
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
