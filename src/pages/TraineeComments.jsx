import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TraineeNavbar from "../components/TraineeNavbar";

const TraineeComments = () => {
  var [comments, setComments] = useState("");
  var { id } = useParams();
  var address = process.env.REACT_APP_IP_ADDRESS;
  useEffect(() => {
    var fetchData = async () => {
      try {
        let { data } = await axios.get(
          `${address}/notification/persenterFeedBck?reviewId=${id}`
        );
        console.log(data);
        setComments(data.data);
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
                <th>Score</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {comments &&
                comments.length &&
                comments.map((ele, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr>
                        <th>{ele.score}</th>
                        <th>{ele.comment}</th>
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

export default TraineeComments;
