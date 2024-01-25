import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//! import for websocket
import { over } from "stompjs";
import SockJS from "sockjs-client";
import axios from "axios";

const TraineeNotification = () => {
  let [notificationData, setNotificationData] = useState([]);
  let [socketData, setSocketData] = useState(null);

  let navigate = useNavigate();

  let traineeData = JSON.parse(localStorage.getItem("traineeData"));
  let expertData = JSON.parse(localStorage.getItem("expertData"));
  let expertLogin = JSON.parse(localStorage.getItem("expertLogin"));
  let id;

  if (expertLogin === true) {
    id = expertData.userId;
  } else {
    id = traineeData.userId;
  }

  let address = process.env.REACT_APP_IP_ADDRESS;
  useEffect(() => {
    let fetchData = async () => {
      try {
        let { data } = await axios.get(
          `${address}/presentation/presenterId/${id}`
        );

        setNotificationData(
          data.data.filter(ele => ele?.presenter?.userId !== id)
        );
        console.clear();
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [socketData]);

  useEffect(() => {
    let wakeLock = null;

    // Check if the browser supports the wakeLock API
    if ("wakeLock" in navigator) {
      // Request a wake lock to prevent the screen from sleeping
      navigator.wakeLock
        .request("screen")
        .then(lock => {
          wakeLock = lock;

          // Handle the wake lock being released
          wakeLock.addEventListener("release", () => {
            console.log("Screen wake lock released");
            console.clear();
          });
        })
        .catch(error => {
          console.error("Could not request wake lock:", error);
        });
    }

    // Clean up the wake lock when the component is unmounted
    return () => {
      if (wakeLock !== null) {
        wakeLock.release();
      }
    };
  });

  //! Creating a websocket connection
  const socket = new SockJS(`${address}/stomp-endpoint`);
  const stompClient = over(socket);

  useEffect(() => {
    stompClient.connect({}, function (frame) {
      if (stompClient.connected) {
        stompClient.subscribe("/notification-ws", function (message) {
          const response = JSON.parse(message.body);
          setSocketData(response.body.data);
          console.clear();
        });
        stompClient.subscribe("/activate-ws", function (message) {
          const response = JSON.parse(message.body);
          localStorage.setItem(
            "presentation",
            JSON.stringify(response.body.data)
          );

          setSocketData(response.body.data);
          console.clear();
        });
        stompClient.subscribe("/deactivate-ws", function (message) {
          const response = JSON.parse(message.body);
          setSocketData(response.body.data);
          console.clear();
        });
      }
    });
    console.clear();
  }, []);

  useEffect(() => {
    let inter = setInterval(() => {
      const socket = new SockJS(`${address}/stomp-endpoint`);
      const stompClient = over(socket);
      stompClient.connect({}, function (frame) {
        console.clear();
        // console.log(frame, stompClient);
        if (stompClient.connected) {
          stompClient.subscribe("/notification-ws", function (message) {
            const response = JSON.parse(message.body);
            setSocketData(response.body.data);
            console.clear();
          });
          stompClient.subscribe("/activate-ws", function (message) {
            const response = JSON.parse(message.body);
            localStorage.setItem(
              "presentation",
              JSON.stringify(response.body.data)
            );

            setSocketData(response.body.data);
            console.clear();
          });
          stompClient.subscribe("/deactivate-ws", function (message) {
            const response = JSON.parse(message.body);
            setSocketData(response.body.data);
            console.clear();
          });
        }
      });
      console.clear();
    }, 5000);
    return () => clearInterval(inter);
  });

  const setData = index => {
    localStorage.setItem(
      "presentation",
      JSON.stringify(notificationData[index])
    );
    navigate(`/${btoa("traineeRating")}/${id}`);
  };

  return (
    <div className="mx-5 mt-2">
      {notificationData.length === false ? (
        <h1 className="text-center">No notifications currently</h1>
      ) : (
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
                return (
                  <React.Fragment key={index}>
                    <tr>
                      <td>{index + 1}</td>
                      <td style={{ width: "35%" }}>
                        {ele?.presentationSubject}
                      </td>
                      <td style={{ width: "35%" }}>{ele?.presentationTopic}</td>
                      <td>{ele?.presentationDate}</td>
                      <td>{ele?.presenter?.userFirstName}</td>
                      <td>
                        <button
                          className="btn btn-primary px-0"
                          disabled={ele?.status !== "ACTIVE" ? true : false}
                          onClick={e => {
                            e.stopPropagation();
                            setData(index);
                          }}
                        >
                          {/* <Link to={`/traineeRating/${id}`}>Give Rating</Link> */}
                          Give Rating
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })
            ) : (
              <h6 className="text-center">No Data To Display</h6>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TraineeNotification;
