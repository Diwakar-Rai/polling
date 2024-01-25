import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
const CommentsExperts = () => {
  var [comments, setComments] = useState("");

  // let expComments = JSON.parse(sessionStorage.getItem("presComm"))
  var address = process.env.REACT_APP_IP_ADDRESS;
  let presentationId = localStorage.getItem("presentationId");
  useEffect(() => {
    var fetchData = async () => {
      try {
        let { data } = await axios.get(
          `${address}/rating/presentationId/${presentationId}`
        );
        setComments(data.data.filter(ele => ele.voter.role === "TRAINER"));
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  // let comments = expComments.exprtiseComments;
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
                        <td>
                          {ele.voter.userFirstName + ele.voter.userLastName}
                        </td>
                        <td>{ele.overAllRatingScore}</td>
                        <td>{ele.comments}</td>
                      </tr>
                    </React.Fragment>
                  );
                })
              ) : (
                <h5>No Data to display</h5>
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
