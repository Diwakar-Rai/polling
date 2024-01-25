import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./../components/Navbar";
import "./MeterStyle.css";

const SummaryRating = () => {
  let [ratingStatus, setRatingStatus] = useState(false);
  let [ratingData, setRatingData] = useState();
  let address = process.env.REACT_APP_IP_ADDRESS;

  let id = JSON.parse(localStorage.getItem("presentationId"));
  useEffect(() => {
    let fetchData = async () => {
      let { data } = await axios.get(
        `${address}/presentation?presentationId=${id}`
      );
      setRatingData(data.data);
      // console.log(data);
      sessionStorage.setItem("presComm", JSON.stringify(data.data));
      setRatingStatus(true);
    };
    fetchData();
  }, []);

  //Function for getting meter color
  const getMeterColor = value => {
    // console.log(value);
    if (value < 1.5) {
      return "red";
    } else if (value < 2.5) {
      return "orange";
    } else if (value < 3.5) {
      return "yellow";
    } else if (value < 4.5) {
      return "lightgreen";
    } else if (value <= 5) {
      return "green";
    }
  };

  return (
    <div>
      <Navbar />
      <section className="row mt-3">
        <div className="col-12">
          {ratingStatus ? (
            <div className="row mx-5">
              <div className="col-6">
                <h3>Summary of Presentation</h3>
                <table className="table table-hover table-striped-columns table-bordered">
                  <thead>
                    <tr>
                      <th>Presenter</th>
                      <td>
                        {ratingData?.presenter?.userFirstName +
                          ratingData?.presenter.userLastName}
                      </td>
                    </tr>
                    <tr>
                      <th>Subject</th>
                      <td>{ratingData?.presentationSubject}</td>
                    </tr>
                    <tr>
                      <th>Topic</th>
                      <td>{ratingData?.presentationTopic}</td>
                    </tr>
                    <tr>
                      <th>Presentation Time</th>
                      <td>{ratingData?.presentationTime}</td>
                    </tr>
                    <tr>
                      <th>Overall Rating</th>
                      <td style={{ fontWeight: "bold" }}>
                        {ratingData?.overAllPresentationScore}
                      </td>
                    </tr>
                    {/* <tr>
                      <th>Expertise Rating</th>
                      <td style={{ fontWeight: "bold" }}>
                        {ratingData?.expertiseScore}
                      </td>
                    </tr> */}
                    <tr>
                      <th>Total no of Votes:</th>
                      <th>{ratingData.voterCount}</th>
                    </tr>
                  </thead>
                </table>
                <h3 className="mt-5">Comments </h3>
                <div className="d-flex align-items-center">
                  <Link
                    // to="/adminDetails"
                    to={`/${btoa("adminDetails")}`}
                    className="btn btn-primary"
                  >
                    TraineeComments
                  </Link>
                  <Link
                    // to="/commentsExpert"
                    to={`/${btoa("commentsExpert")}`}
                    className="btn btn-primary mx-3"
                  >
                    Expert Comments
                  </Link>
                </div>
              </div>
              <div className="col-6 px-5">
                <h4 className="mb-2">Overall Ratings</h4>
                <div>
                  <div className="row my-1 border-bottom border-1 p-1">
                    <div className="col-4">
                      <h6>Content</h6>
                    </div>
                    <div className="col-8">
                      <meter
                        className={` ${getMeterColor(
                          ratingData.overallContentScore
                        )}`}
                        value={ratingData.overallContentScore}
                        min="0"
                        max="5"
                      />
                      <div className="row pb-0 mb-0" style={{ fontSize: 12 }}>
                        <div className="col-4 text-left">Poor</div>
                        <div className="col-4 text-center">Average</div>
                        <div className="col-4 text-end">Good</div>
                      </div>
                    </div>
                  </div>
                  <div className="row my-1 border-bottom border-1 p-1">
                    <div className="col-4">
                      <h6>Voice Modulation</h6>
                    </div>
                    <div className="col-8">
                      <meter
                        className={` ${getMeterColor(
                          ratingData.overallVoiceModulationScore
                        )}`}
                        value={ratingData.overallVoiceModulationScore}
                        min="0"
                        max="5"
                      />
                      <div className="row pb-0 mb-0" style={{ fontSize: 12 }}>
                        <div className="col-4 text-left">Poor</div>
                        <div className="col-4 text-center">Average</div>
                        <div className="col-4 text-end">Good</div>
                      </div>
                    </div>
                  </div>
                  <div className="row my-1 border-bottom border-1 p-1">
                    <div className="col-4">
                      <h6>Confidence</h6>
                    </div>
                    <div className="col-8">
                      <meter
                        className={`${getMeterColor(
                          ratingData.overallConfidenceScore
                        )}`}
                        value={ratingData.overallConfidenceScore}
                        min="0"
                        max="5"
                      />
                      <div className="row pb-0 mb-0" style={{ fontSize: 12 }}>
                        <div className="col-4 text-left">Poor</div>
                        <div className="col-4 text-center">Average</div>
                        <div className="col-4 text-end">Good</div>
                      </div>
                    </div>
                  </div>
                  <div className="row my-1 border-bottom border-1 p-1">
                    <div className="col-4">
                      <h6>Eye Contact</h6>
                    </div>
                    <div className="col-8">
                      <meter
                        className={` ${getMeterColor(
                          ratingData.overallEyeContactScore
                        )}`}
                        value={ratingData.overallEyeContactScore}
                        min="0"
                        max="5"
                      />
                      <div className="row pb-0 mb-0" style={{ fontSize: 12 }}>
                        <div className="col-4 text-left">Poor</div>
                        <div className="col-4 text-center">Average</div>
                        <div className="col-4 text-end">Good</div>
                      </div>
                    </div>
                  </div>
                  <div className="row my-1 border-bottom border-1 p-1">
                    <div className="col-4">
                      <h6>Body Language</h6>
                    </div>
                    <div className="col-8">
                      <meter
                        className={` ${getMeterColor(
                          ratingData.overallBodyLanguageScore
                        )}`}
                        value={ratingData.overallBodyLanguageScore}
                        min="0"
                        max="5"
                      />
                      <div className="row pb-0 mb-0" style={{ fontSize: 12 }}>
                        <div className="col-4 text-left">Poor</div>
                        <div className="col-4 text-center">Average</div>
                        <div className="col-4 text-end">Good</div>
                      </div>
                    </div>
                  </div>
                  <div className="row my-1 border-bottom border-1 p-1">
                    <div className="col-4">
                      <h6>Interaction</h6>
                    </div>
                    <div className="col-8">
                      <meter
                        className={`${getMeterColor(
                          ratingData.overallInterationScore
                        )}`}
                        value={ratingData.overallInterationScore}
                        min="0"
                        max="5"
                      />
                      <div className="row pb-0 mb-0" style={{ fontSize: 12 }}>
                        <div className="col-4 text-left">Poor</div>
                        <div className="col-4 text-center">Average</div>
                        <div className="col-4 text-end">Good</div>
                      </div>
                    </div>
                  </div>
                  <div className="row my-1 border-bottom border-1 p-1">
                    <div className="col-4">
                      <h6>Props Usage</h6>
                    </div>
                    <div className="col-8">
                      <meter
                        className={` ${getMeterColor(
                          ratingData.overallUseageOfPropsScore
                        )}`}
                        value={ratingData.overallUseageOfPropsScore}
                        min="0"
                        max="5"
                      />
                      <div className="row pb-0 mb-0" style={{ fontSize: 12 }}>
                        <div className="col-4 text-left">Poor</div>
                        <div className="col-4 text-center">Average</div>
                        <div className="col-4 text-end">Good</div>
                      </div>
                    </div>
                  </div>
                  <div className="row my-1 border-bottom border-1 p-1">
                    <div className="col-4">
                      <h6>Communication</h6>
                    </div>
                    <div className="col-8">
                      <meter
                        className={` ${getMeterColor(
                          ratingData.overallCommunicationScore
                        )}`}
                        value={ratingData.overallCommunicationScore}
                        min="0"
                        max="5"
                      />
                      <div className="row pb-0 mb-0" style={{ fontSize: 12 }}>
                        <div className="col-4 text-left">Poor</div>
                        <div className="col-4 text-center">Average</div>
                        <div className="col-4 text-end">Good</div>
                      </div>
                    </div>
                  </div>
                  <div className="row my-1 border-bottom border-1 p-1">
                    <div className="col-4">
                      <h6>Energy</h6>
                    </div>
                    <div className="col-8">
                      <meter
                        className={` ${getMeterColor(
                          ratingData.overallEnergyScore
                        )}`}
                        value={ratingData.overallEnergyScore}
                        min="0"
                        max="5"
                      />
                      <div className="row pb-0 mb-0" style={{ fontSize: 12 }}>
                        <div className="col-4 text-left">Poor</div>
                        <div className="col-4 text-center">Average</div>
                        <div className="col-4 text-end">Good</div>
                      </div>
                    </div>
                  </div>
                  <div className="row my-1 border-bottom border-1 p-1">
                    <div className="col-4">
                      <h6>Liveliness</h6>
                    </div>
                    <div className="col-8">
                      <meter
                        className={` ${getMeterColor(
                          ratingData.overallLivelinessScore
                        )}`}
                        value={ratingData.overallLivelinessScore}
                        min="0"
                        max="5"
                      />
                      <div className="row pb-0 mb-0" style={{ fontSize: 12 }}>
                        <div className="col-4 text-left">Poor</div>
                        <div className="col-4 text-center">Average</div>
                        <div className="col-4 text-end">Good</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
    </div>
  );
};

export default SummaryRating;
