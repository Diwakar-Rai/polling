import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/images/alphaWhite.png";
const ExpertNavbar = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    sessionStorage.removeItem("expertData");
    sessionStorage.removeItem("expertLogin");
    localStorage.clear();
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
                  // to="/expertLanding"
                  to={`/${btoa("expertLanding")}`}
                >
                  <img
                    src={logo}
                    alt=""
                    style={{ height: 35 }}
                    className="w-100"
                  />
                </Link>
              </li>
            </ul>
          </div>
          <div className="d-flex">
            <FaUserCircle
              style={{ fontSize: 40, color: "white", cursor: "pointer" }}
            />

            <button className="btn btn-danger mx-3" onClick={handleClick}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ExpertNavbar;
