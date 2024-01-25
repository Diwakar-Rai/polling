import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TraineeNavbar from "../components/TraineeNavbar";

const TraineeExpertComments = () => {
  var [comments, setComments] = useState("");

  let { id } = useParams();

  var address = process.env.REACT_APP_IP_ADDRESS;

  useEffect(() => {
    var fetchData = async () => {
      try {
        let { data } = await axios.get(
          // `${address}/rating/presentationId/${id}`
          `${address}/rating/traineerating/presentationId/${id}`
        );
        // console.log("Expert Feedback", data);
        setComments(data?.data?.filter(ele => ele?.role === "TRAINER"));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <TraineeNavbar />

      <h1 className="text-center mt-2">Comments</h1>

      <div className="row mt-3">
        <div className="col-2"></div>
        <div className="col-8">
          <table className="table table-striped table-hover border border-1">
            <thead>
              <tr>
                {/* <th>Expert Name</th> */}
                <th>Score</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {comments && comments.length ? (
                comments.map((ele, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr>
                        {/* <td>
                          {ele.voter.userFirstName +
                            " " +
                            ele.voter.userLastName ===
                          null
                            ? ""
                            : ele.voter.userLastName}
                        </td> */}
                        <td>{ele.overAllRatingScore}</td>
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
                <h5>No data to display</h5>
              )}
            </tbody>
          </table>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default TraineeExpertComments;
