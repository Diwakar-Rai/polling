import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
const Navbar = () => {
  const handleCalc = async () => {
    var { data } = await axios.get("http://localhost:8080/review/calcReview");
    console.log(data);
    toast.success("Review Calculated", {
      className: "toastMessage",
    });
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
                <Link className="nav-link" to="#" onClick={handleCalc}>
                  Calculate Score
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <FaUserCircle
              style={{ fontSize: 20, color: "white", cursor: "pointer" }}
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
