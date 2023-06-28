import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { IdContext } from "../components/IdContext";
import ExpertNavbar from "../components/ExpertNavbar";

const Comments = () => {
  // var { loginData, setLoginData } = useContext(LoginContext);
  // var { idData, setIdData } = useContext(IdContext);
  var [commentState, setCommentState] = useState();
  let [fetchedData, setFetchedData] = useState();
  let id = JSON.parse(sessionStorage.getItem("parID"));
  let loginData = JSON.parse(sessionStorage.getItem("loginData"));
  // console.log(loginData);
  let arrayIndex = JSON.parse(sessionStorage.getItem("arrayIndex"));
  // console.log(arrayIndex);
  let comments;
  commentState === "expertComm"
    ? (comments = fetchedData?.filter(ele => ele.role == "EXPERTISE"))
    : (comments = fetchedData?.filter(ele => ele.role == "TRAINEE"));
  let address = process.env.REACT_APP_IP_ADDRESS;

  let expert = sessionStorage.getItem("expertLogin");
  // console.log(loginData);

  useEffect(() => {
    var fetchData = async () => {
      try {
        var payload = {
          presentationSubject: loginData[arrayIndex].reviewSubject,
          presentationTopic: loginData[arrayIndex].reviewTopic,
          presentationDay: loginData[arrayIndex].reviewDate,
        };
        // console.log(payload);
        let { data } = await axios.post(
          `${address}/notification/getComments?presenterId=${id}`,
          payload
        );
        setFetchedData(data.data);
        // console.log(data.data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    <div>
      {expert === "true" ? <ExpertNavbar /> : <Navbar />}
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
              {comments &&
                comments.length &&
                comments.map((ele, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{ele.voterName}</td>
                        <td>{ele.score}</td>
                        <td>{ele.comment}</td>
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

export default Comments;
