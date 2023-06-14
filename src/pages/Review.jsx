import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { LoginContext } from "../components/LoginContext";
import { IdContext } from "../components/IdContext";
import Navbar from "../components/Navbar";

const Review = () => {
  let { loginData, setLoginData } = useContext(LoginContext);
  let { idData, setIdData } = useContext(IdContext);
  var [review, setReview] = useState();
  var { id } = useParams();
  setIdData(id);

  var address = process.env.REACT_APP_IP_ADDRESS;

  useEffect(() => {
    var fetchData = async () => {
      var { data } = await axios.get(`${address}/review?userId=${id}`);

      setReview(data.data);
      setLoginData(data.data);
      console.clear();
      // console.log(data.data);
      // console.log(data);
    };

    fetchData();
  }, []);
  return (
    <div>
      <Navbar />
      <h1 className="text-center mt-3">Trainer Presentation Review</h1>
      <div className="row mt-4">
        <div className="col-2"></div>
        <div className="col-8">
          <table className="table table-striped table-hover border border-1">
            <thead>
              <tr>
                <th>Id</th>
                <th>Subject</th>
                <th>Topic</th>
                <th>Score</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {review &&
                review.length &&
                review.map((ele, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{ele.reviewId}</td>
                        <td style={{ textTransform: "capitalize" }}>
                          {ele.reviewSubject.toLowerCase()}
                        </td>
                        <td style={{ textTransform: "capitalize" }}>
                          {ele.reviewTopic.toLowerCase()}
                        </td>
                        <td>{ele.reviewScore}</td>
                        <td>{ele.reviewDate}</td>
                        <td>
                          <Link
                            to={`/comments/${ele.id}`}
                            className="btn btn-primary"
                          >
                            Feedbacks
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

export default Review;
