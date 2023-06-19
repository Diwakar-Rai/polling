import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
const CommentsExperts = () => {
  // var [comments, setComments] = useState("");

  let expComments = JSON.parse(sessionStorage.getItem("presComm"));
  // var address = process.env.REACT_APP_IP_ADDRESS;
  let comments = expComments.exprtiseComments;
  return (
    <div>
      <Navbar />

      <h1 className="text-center">Expert Comments</h1>
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <table className="table table-striped table-hover border border-1">
            <thead>
              <tr>
                <th>Expert Name</th>
                <th>Expert Score</th>
                <th>Expert Comment</th>
              </tr>
            </thead>
            <tbody>
              {comments && comments.length ? (
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
                })
              ) : (
                <h1>No Data to display</h1>
              )}
            </tbody>
          </table>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default CommentsExperts;
