import React, { useEffect, useState } from "react";
import Navbar from "./../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const OngoingSummary = () => {
  let [ratingStatus, setRatingStatus] = useState(false);
  let [ratingData, setRatingData] = useState();
  let address = process.env.REACT_APP_IP_ADDRESS;
  // let presentData = JSON.parse(sessionStorage.getItem("presentationData"));
  let id = JSON.parse(sessionStorage.getItem("onPresentationId"));
  useEffect(() => {
    let fetchData = async () => {
      let { data } = await axios.get(
        `${address}/review/reviewSummary?presentationId=${id}`
      );
      setRatingData(data.data);
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
                      <td>{ratingData?.presentarName}</td>
                    </tr>
                    <tr>
                      <th>Subject</th>
                      <td>{ratingData?.subject}</td>
                    </tr>
                    <tr>
                      <th>Topic</th>
                      <td>{ratingData?.topic}</td>
                    </tr>
                    <tr>
                      <th>Presentation Time</th>
                      <td>{ratingData?.presentationTime}</td>
                    </tr>
                    <tr>
                      <th>Trainee Rating</th>
                      <td style={{ fontWeight: "bold" }}>
                        {ratingData?.score}
                      </td>
                    </tr>
                    <tr>
                      <th>Expertise Rating</th>
                      <td style={{ fontWeight: "bold" }}>
                        {ratingData?.expertiseScore}
                      </td>
                    </tr>
                    <tr>
                      <th>No of Votes:</th>
                      <th>
                        {ratingData.votedCount}/{ratingData.totalVoter}
                      </th>
                    </tr>
                  </thead>
                </table>
                <h3 className="mt-5">Comments </h3>
                <div className="d-flex align-items-center">
                  <Link to="/adminDetails" className="btn btn-primary">
                    TraineeComments
                  </Link>
                  <Link to="/commentsExpert" className="btn btn-primary mx-3">
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
                          ratingData.performance.contentScore
                        )}`}
                        value={ratingData.performance.contentScore}
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
                          ratingData.performance.voiceModulationScore
                        )}`}
                        value={ratingData.performance.voiceModulationScore}
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
                          ratingData.performance.confidenceScore
                        )}`}
                        value={ratingData.performance.confidenceScore}
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
                          ratingData.performance.eyeContactScore
                        )}`}
                        value={ratingData.performance.eyeContactScore}
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
                          ratingData.performance.bodyLanguageScore
                        )}`}
                        value={ratingData.performance.bodyLanguageScore}
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
                          ratingData.performance.interationScore
                        )}`}
                        value={ratingData.performance.interationScore}
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
                          ratingData.performance.useageOfPropsScore
                        )}`}
                        value={ratingData.performance.useageOfPropsScore}
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
                          ratingData.performance.communicationScore
                        )}`}
                        value={ratingData.performance.communicationScore}
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
                          ratingData.performance.energyScore
                        )}`}
                        value={ratingData.performance.energyScore}
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
                          ratingData.performance.livelinessScore
                        )}`}
                        value={ratingData.performance.livelinessScore}
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

export default OngoingSummary;
