import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../components/GlobalContext";
import { Link } from "react-router-dom";

const TraineeReviews = () => {
  var [reviewData, setReviewData] = useState("");
  var { globalData, setGlobalData } = useContext(GlobalContext);
  var id = globalData.data.userId;
  var address = process.env.REACT_APP_IP_ADDRESS;
  useEffect(() => {
    var fetchData = async () => {
      try {
        let { data } = await axios.get(`${address}/review?userId=${id}`);
        setReviewData(data.data);
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
        <div className="col-2"></div>
        <div className="col-8">
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
              {reviewData &&
                reviewData.length &&
                reviewData.map((ele, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{ele.reviewSubject}</td>
                        <td>{ele.reviewTopic}</td>
                        <td>{ele.reviewScore}</td>
                        <td>
                          <Link
                            to={`/traineeComments/${ele.reviewId}`}
                            className="btn btn-primary"
                          >
                            Comments
                          </Link>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default TraineeReviews;
