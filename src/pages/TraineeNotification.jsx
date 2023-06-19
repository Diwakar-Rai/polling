import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../components/GlobalContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { RatingContext } from "../components/RatingContext";

const TraineeNotification = () => {
  let [notificationData, setNotificationData] = useState();
  // let { globalData, setGlobalData } = useContext(GlobalContext);
  let { ratingData, setRatingData } = useContext(RatingContext);

  let address = process.env.REACT_APP_IP_ADDRESS;
  let traineeId = JSON.parse(sessionStorage.getItem("traineeData"));
  let expertId = JSON.parse(sessionStorage.getItem("expertData"));
  let expert = sessionStorage.getItem("expertLogin");
  // let id = localId.userId;
  let id;
  expert === "true" ? (id = expertId.userId) : (id = traineeId.userId);
  useEffect(() => {
    var fetchData = async () => {
      try {
        let { data } = await axios.get(`${address}/notification?userId=${id}`);
        setNotificationData(data.data);
        localStorage.setItem("traineeData", JSON.stringify(data.data));
        setRatingData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mx-5 mt-2">
      <h1>Notification</h1>
      <table className="table table-striped table-hover border border-1 mt-2">
        <thead>
          <tr>
            <td>Sl no.</td>
            <td>Subject</td>
            <td>Topic</td>
            <td>Date</td>
            <td>Presenter</td>
            {/* <td>Score</td> */}
          </tr>
        </thead>
        <tbody>
          {notificationData && notificationData.length ? (
            notificationData.map((ele, index) => {
              var {
                rattingDate,
                rattingId,
                rattingSubject,
                rattingTopic,
                presentarName,
                presentationStatus,
              } = ele;
              // console.log(rattingId);
              return (
                <React.Fragment key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{rattingSubject}</td>
                    <td>{rattingTopic}</td>
                    <td>{rattingDate}</td>
                    <td>{presentarName}</td>
                    <td>
                      <button
                        className="btn btn-primary px-0"
                        disabled={
                          presentationStatus !== "ACTIVE" ? true : false
                        }
                      >
                        <Link to={`/traineeRating/${index}`}>Give Rating</Link>
                      </button>
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
  );
};

export default TraineeNotification;
