import React from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LivePresentation = () => {
  var address = process.env.REACT_APP_IP_ADDRESS;
  var navigate = useNavigate();

  const handleClick = async () => {
    try {
      var { data } = await axios.get(`${address}/user/getPresenter
`);
      console.log(data);
      navigate(`/presentation/${data.data.userId}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="livePresentationContainer">
      <Navbar />

      <h1 className="text-center mt-5">Presentation</h1>

      <div className="row mt-4">
        <div className="col-2"></div>
        <div className="col-8">
          <section className="row border border-1 rounded rounded-2 py-2 my-3">
            <div className="col-3">
              <button className="btn btn-primary" onClick={handleClick}>
                Random Trainee
              </button>
            </div>
          </section>
          <section className="row border border-1 rounded rounded-2 py-2 my-3">
            <div className="col-3">
              <button className="btn btn-primary">
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
