import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TraineeReviews = () => {
  var [reviewData, setReviewData] = useState("");

  let localId = JSON.parse(localStorage.getItem("traineeData"));
  let id = localId.userId;
  var address = process.env.REACT_APP_IP_ADDRESS;
  useEffect(() => {
    var fetchData = async () => {
      try {
        let { data } = await axios.get(
          `${address}/presentation/allPresentation?prensenterId=${id}`
        );
        setReviewData(data.data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="mx-5">
      <h1 className="text-center">Reviews</h1>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-12">
          <table className="table table-striped table-hover border border-1">
            <thead>
              <tr>
                <th>sl no</th>
                <th>Subject</th>
                <th>Topic</th>
                <th>Score</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {reviewData && reviewData.length ? (
                reviewData.map((ele, index) => {
                  // console.log(ele.presentationId);
                  return (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{index + 1}</td>
                        <td style={{ width: "35%" }}>
                          {ele.presentationSubject.toLowerCase()}
                        </td>
                        <td style={{ width: "35%" }}>
                          {ele.presentationTopic.toLowerCase()}
                        </td>
                        <td>{ele.overAllPresentationScore}</td>
                        <td>
                          <Link
                            to={`/${btoa("traineeComments")}/${
                              ele.presentationId
                            }`}
                            className="btn btn-primary"
                          >
                            Trainee
                          </Link>
                          <Link
                            to={`/${btoa("expertCommentsTrainee")}/${
                              ele.presentationId
                            }`}
                            className="btn btn-primary ms-2"
                          >
                            Expert
                          </Link>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })
              ) : (
                <h5>No data to display</h5>
              )}
            </tbody>
          </table>
        </div>
        <div className="col-1"></div>
      </div>
    </div>
  );
};

export default TraineeReviews;
