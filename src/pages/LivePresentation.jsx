import React from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { VscQuestion } from "react-icons/vsc";
import { FaUserTie } from "react-icons/fa";

const LivePresentation = () => {
  var address = process.env.REACT_APP_IP_ADDRESS;
  var navigate = useNavigate();

  const handleClick = async () => {
    try {
      var { data } = await axios.get(`${address}/user/getPresenter
`);
      // console.log(data);
      navigate(`/presentation/${data.data.userId}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="livePresentationContainer">
      <Navbar />

      <h1 className="text-center mt-5">Choose Presenter</h1>

      <div className="row mt-4">
        <div className="col-2"></div>
        <div className="col-8 row d-flex justify-content-evenly">
          <section className=" col-5 row border border-1 shadow-sm rounded-4 py-4 m-3">
            <div className="col-12">
              <div
                style={{
                  fontSize: 200,
                  display: "grid",
                  placeContent: "center",
                }}
              >
                <VscQuestion style={{ paddingBottom: 20 }} />
              </div>
              <button
                className="btn btn-primary fw-bold shadow-sm"
                onClick={handleClick}
              >
                Random Trainee
              </button>
            </div>
          </section>
          <section className=" col-5 row border border-1 shadow-sm rounded-4 py-4 m-3">
            <div className="col-12">
              <div
                style={{
                  fontSize: 200,
                  display: "grid",
                  placeContent: "center",
                }}
              >
                <FaUserTie style={{ paddingBottom: 20 }} />
              </div>
              <button className="btn btn-primary shadow-sm">
                <Link to="/traineeAssign">Assign presentation</Link>
              </button>
            </div>
          </section>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default LivePresentation;
