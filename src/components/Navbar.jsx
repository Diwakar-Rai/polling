import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/images/alphaWhite.png";
const Navbar = () => {
  var navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };
  const changePath = a => {
    return btoa(a);
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark px-5 pt-3">
        <div className="container-fluid">
          <div className="d-flex align-items-center d-lg-none">
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
          <button
            className="navbar-toggler w-25 border-0 bg-light"
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
                  className="nav-link active py-0"
                  aria-current="page"
                  to={`/${changePath("adminLanding")}`}
                >
                  <img
                    src={logo}
                    alt=""
                    style={{
                      height: 35,
                    }}
                    className="w-100 "
                  />
                  {/* Home */}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active pe-4"
                  aria-current="page"
                  // to="/addTrainee"
                  to={`/${changePath("addTrainee")}`}
                >
                  Add User
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active pe-4"
                  aria-current="page"
                  // to="/traineeStatus"
                  to={`/${changePath("traineeStatus")}`}
                >
                  Trainee Details
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active pe-4"
                  aria-current="page"
                  // to="/ongoingPres"
                  to={`/${changePath("ongoingPres")}`}
                >
                  Ongoing Presentation
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link
                  className="nav-link active pe-4"
                  aria-current="page"
                  // to="/ongoingPres"
                  to={`/${changePath("traineePresentationOverall")}`}
                >
                  Overall Trainee Details
                </Link>
              </li> */}
            </ul>
          </div>
          <div className="d-none d-lg-block">
            <div className="row">
              <div className="col-2">
                <FaUserCircle
                  style={{ fontSize: 40, color: "white", cursor: "pointer" }}
                />
              </div>
              <div className="col-10">
                <button
                  className="btn btn-danger h-100 mx-3"
                  onClick={handleLogOut}
                >
                  LogOut
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
