import React, { useContext, useState } from "react";
import Navbar from "./../components/Navbar";
import axios from "axios";
import { GlobalContext } from "../components/GlobalContext";
import { Link } from "react-router-dom";
import Timer from "../components/Timer";

const Voting = () => {
  var address = process.env.REACT_APP_IP_ADDRESS;
  var { globalData, setGlobalData } = useContext(GlobalContext);
  var [votingStatus, setVotingStatus] = useState(false);

  var [heading, setHeading] = useState("Presentation Ongoing");

  // console.log(globalData);
  const handleVotingStart = e => {
    e.preventDefault();
    e.stopPropagation();
    let time = sessionStorage.getItem("totalTime");
    // console.log(time);
    var fetchData = async () => {
      let { data } = await axios.get(
        `${address}/presentation/activate?presentationId=${globalData?.data?.presentationId}&presentationTime=${time}`
      );

      sessionStorage.setItem("presentationData", JSON.stringify(data.data));
      // console.log(sessionStorage);
      setVotingStatus(true);
      setHeading("Voting Started");
      // console.log(data);
    };
    fetchData();
  };

  const handleVotingEnd = e => {
    e.stopPropagation();

    e.preventDefault();
    var fetchData = async () => {
      let { data } = await axios.get(
        `${address}/presentation/deactivate?presentationId=${globalData?.data?.presentationId}`
      );
      setVotingStatus(false);
      setHeading("Voting Ended");
      // console.log(data);
    };
    fetchData();
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-center my-3">{heading}</h1>
      <Timer />
      <div className="row mx-5 py-2 border border-1 rounded rounded-3 d-flex align-items-center">
        <div className="col-6">
          <h4>Presenter:&nbsp;{globalData.data.user.userName}</h4>
        </div>
        <div className="col-6">
          <h4 style={{ textTransform: "capitalize" }} className="text-center">
            Topic:&nbsp;{globalData.data.presentationTopic.toLowerCase()}
          </h4>
        </div>
      </div>
      <section className="row py-2 mx-5">
        <div className="col-7 border border-1 pt-3 rounded rounded-4">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              <div className="row">
                <div className="col-6">
                  <button
                    className="btn btn-primary"
                    onClick={handleVotingStart}
                    disabled={votingStatus}
                  >
                    Start Voting
                  </button>
                </div>
                <div className="col-6">
                  <button
                    className="btn btn-primary"
                    onClick={handleVotingEnd}
                    disabled={!votingStatus}
                  >
                    End Voting
                  </button>
                </div>
              </div>

              <div className="row">
                <div className="col-4"></div>
                <div className="col-4">
                  <Link className="btn btn-primary" to="/ratingSummary">
                    Get Rating
                  </Link>
                </div>
                <div className="col-4"></div>
              </div>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
        <div className="col-5 border border-1 rounded rounded-4 p-4">
          <div className="row ">
            <div className="col-6">
              <h4>Voting Status</h4>
            </div>
            <div className="col-6 ">
              <h3>
                {votingStatus ? (
                  <p
                    style={{
                      color: "green",
                      textShadow: "1px 1px 3px green",
                      transition: "all .5s ease",
                    }}
                  >
                    ACTIVATED
                  </p>
                ) : (
                  <p
                    style={{
                      color: "red",
                      textShadow: "1px 1px 3px red",
                      transition: "all .5s ease",
                    }}
                  >
                    DEACTIVATED
                  </p>
                )}
              </h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Voting;
