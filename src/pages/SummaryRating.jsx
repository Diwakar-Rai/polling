import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../components/GlobalContext";
import Navbar from "./../components/Navbar";
import TraineeComments from "./TraineeComments";
const SummaryRating = () => {
  let { globalData, setGlobalData } = useContext(GlobalContext);
  let [ratingStatus, setRatingStatus] = useState(false);
  let [ratingData, setRatingData] = useState();
  let address = process.env.REACT_APP_IP_ADDRESS;
  //   sessionStorage.setItem("presentationId", globalData.data.presentationId);
  let presentData = JSON.parse(sessionStorage.getItem("presentationData"));
  let id = presentData.presentationId;
  useEffect(() => {
    let fetchData = async () => {
      let { data } = await axios.get(
        `${address}/review/reviewSummary?presentationId=${id}`
      );
      setRatingData(data.data);
      // console.log(data);
      sessionStorage.setItem("presComm", JSON.stringify(data.data));
      setRatingStatus(true);
    };
    fetchData();
  }, []);

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
              </div>
              <div className="col-6 px-5">
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
