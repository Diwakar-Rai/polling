import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../components/GlobalContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { RatingContext } from "../components/RatingContext";

const TraineeNotification = () => {
  var [notificationData, setNotificationData] = useState();
  var { globalData, setGlobalData } = useContext(GlobalContext);
  var { ratingData, setRatingData } = useContext(RatingContext);

  var address = process.env.REACT_APP_IP_ADDRESS;
  console.log(globalData);
  useEffect(() => {
    var fetchData = async () => {
      try {
        let { data } = await axios.get(
          `${address}/notification?userId=${globalData.data.userId}`
        );
        setNotificationData(data.data);
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
          {notificationData &&
            notificationData.length &&
            notificationData.map((ele, index) => {
              var {
                rattingDate,
                rattingId,
                rattingSubject,
                rattingTopic,
                presentarName,
                presentationStatus,
              } = ele;

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
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TraineeNotification;
