import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { LoginContext } from "../components/LoginContext";
import { IdContext } from "../components/IdContext";

const Comments = () => {
  var { loginData, setLoginData } = useContext(LoginContext);
  var { idData, setIdData } = useContext(IdContext);
  var [comment, setComment] = useState("");
  // console.log(idData);
  // console.log(loginData);

  var address = process.env.REACT_APP_IP_ADDRESS;

  useEffect(() => {
    var fetchData = async () => {
      var payload = {
        presentationSubject: loginData[0].reviewSubject,
        presentationTopic: loginData[0].reviewTopic,
        presentationDay: loginData[0].reviewDate,
      };
      let { data } = await axios.post(
        `${address}/notification/getComments?presenterId=${idData}`,
        payload
      );
      // let { data } = await axios.post(
      //   `http://localhost:8080/notification/getComments?presenterId=${idData}`,
      //   payload
      // );
      // console.log(data.data);
      setComment(data.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <h1 className="text-center mt-3">Feedback for Presentation</h1>
      <div className="row mt-3">
        <div className="col-2"></div>
        <div className="col-8">
          <table className="table table-striped table-hover border border-1">
            <thead>
              <tr>
                <th>Trainee Name</th>
                <th>Score</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {comment &&
                comment.length &&
                comment.map((ele, index) => {
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
