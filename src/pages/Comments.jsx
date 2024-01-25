import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import ExpertNavbar from "../components/ExpertNavbar";
import { useParams } from "react-router-dom";
import { Colors } from "chart.js";

const Comments = () => {
  var [commentState, setCommentState] = useState();
  let [fetchedData, setFetchedData] = useState();
  // let loginData = JSON.parse(sessionStorage.getItem("loginData"));
  // console.log(loginData);
  // let arrayIndex = JSON.parse(sessionStorage.getItem("arrayIndex"));
  // console.log(arrayIndex);

  let presentationId = JSON.parse(localStorage.getItem("presentationId"));
  let comments;
  commentState === "expertComm"
    ? (comments = fetchedData?.filter(ele => ele.voter.role == "TRAINER"))
    : (comments = fetchedData?.filter(ele => ele.voter.role == "TRAINEE"));
  let address = process.env.REACT_APP_IP_ADDRESS;

  let expert = JSON.parse(localStorage.getItem("expertLogin"));
  // console.log(loginData);

  useEffect(() => {
    var fetchData = async () => {
      try {
        let { data } = await axios.get(
          `${address}/rating/presentationId/${presentationId}`
        );
        setFetchedData(data.data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {expert === true ? <ExpertNavbar /> : <Navbar />}
      <h1 className="text-center mt-3">Feedback for Presentation</h1>

      <div className="row">
        <div className="col-3"></div>
        <div className="col-3">
          <button
            className="btn btn-primary"
            onClick={() => {
              setCommentState("expertComm");
            }}
          >
            Expert Comments
          </button>
        </div>
        <div className="col-3">
          <button
            className="btn btn-primary"
            onClick={() => {
              setCommentState("traineeComm");
            }}
          >
            Trainee Comments
          </button>
        </div>

        <div className="col-3"></div>
      </div>
      <div className="row mt-3">
        <div className="col-2"></div>
        <div className="col-8">
          <table className="table table-striped table-hover border border-1">
            <thead>
              <tr>
                <th>Name</th>
                <th>Score</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {comments && comments.length ? (
                comments.map((ele, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{ele.voter.userFirstName}</td>
                        <td>
                          {ele.overAllRatingScore === 0
                            ? "--"
                            : ele.overAllRatingScore}
                        </td>
                        <td>
                          {ele.comments === null ? (
                            <span style={{ color: "red" }}>
                              No comments given
                            </span>
                          ) : (
                            ele.comments
                          )}
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })
              ) : (
                <h3>No Data to display</h3>
              )}
            </tbody>
          </table>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default Comments;
