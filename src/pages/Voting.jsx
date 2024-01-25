import React, { useContext, useEffect, useState } from "react";
import Navbar from "./../components/Navbar";
// import axios from "axios";
import { GlobalContext } from "../components/GlobalContext";
// import { VotingStartContext } from "../components/VotingStartContext";
import { Link } from "react-router-dom";
import Timer from "../components/Timer";

//! import for the websocket
import { over } from "stompjs";
import SockJS from "sockjs-client";

const Voting = () => {
  var address = process.env.REACT_APP_IP_ADDRESS;
  var { globalData, setGlobalData } = useContext(GlobalContext);

  var [votingStatus, setVotingStatus] = useState(false);
  var [endStatus, setEndStatus] = useState(false);
  var [ratingStatus, setRatingStatus] = useState(false);
  let [headState, setHeadState] = useState(false);
  var [heading, setHeading] = useState("Presentation Ongoing");
  let [socketConnection, setSocketConnection] = useState(null);
  // window.history.pushState(null, null, window.location.href);
  // window.onpopstate = function () {
  //   window.history.go(1);
  // };
  // localStorage.setItem(
  //   "presentationId",
  //   JSON.stringify(globalData?.presentationId)
  // );

  let currPresentationData = JSON.parse(
    localStorage.getItem("currPresentationData")
  );
  // console.log(currPresentationData);
  let presentationId = currPresentationData?.presentationId;
  localStorage.setItem("presentationId", JSON.stringify(presentationId));
  //! Creating a websocket connection
  const socket = new SockJS(`${address}/stomp-endpoint`);
  const stompClient = over(socket);
  useEffect(() => {
    stompClient.connect({}, function (frame) {
      stompClient.heartbeat.incoming = 10000;
      stompClient.heartbeat.outgoing = 10000;
      if (stompClient.connected) {
        // stompClient.subscribe(
        //   "/notification-ws/activatepresentation",
        //   function (message) {
        //     const response = JSON.parse(message.body);
        //   }
        // );
        console.clear();
      } else {
        console.log("Not connected");
      }
    });

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  // useEffect(() => {
  //   let inter = setInterval(() => {
  //     console.log(stompClient.connected);
  //     if (!stompClient.connected) {
  //       let socket = new SockJS(`${address}/stomp-endpoint`);
  //       let stompClient = over(socket);
  //       stompClient.connect({}, function (frame) {
  //         stompClient.heartbeat.incoming = 10000;
  //         stompClient.heartbeat.outgoing = 10000;
  //         console.log(frame, stompClient.connected);
  //       });
  //     }
  //   }, 10000);

  //   return clearInterval(inter);
  // }, []);

  // const reconnectSocket = () => {
  //   if (!stompClient || !stompClient.connected) {
  //     console.log(stompClient);
  //     stompClient.connect({}, function (frame) {
  //       console.log("connected", frame);
  //     });
  //   }
  // };

  // useEffect(() => {
  //   const reconnectInterval = setInterval(() => {
  //     reconnectSocket();
  //   }, 60000); // Attempt reconnection every 1 minute

  //   return () => {
  //     clearInterval(reconnectInterval);
  //   };
  // }, [socketConnection]);

  // console.log(globalData);
  const handleVotingStart = e => {
    e.preventDefault();
    e.stopPropagation();
    let time = JSON.parse(localStorage.getItem("totalTime"));
    // console.log(time);
    let payload = {
      presentationId: presentationId,
    };

    // console.log(stompClient.connected, stompClient);
    const socket = new SockJS(`${address}/stomp-endpoint`);
    const stompClient = over(socket);
    stompClient.connect({}, function (frame) {
      stompClient.heartbeat.incoming = 10000;
      stompClient.heartbeat.outgoing = 10000;
      if (stompClient.connected) {
        stompClient.send(
          `/presentation-ws/presentationId/${presentationId}/time/${time}`,
          {},
          JSON.stringify(payload)
        );
        console.clear();
      } else {
        console.log("Not connected");
      }
    });

    sessionStorage.setItem("presentationData", JSON.stringify(payload));
    setVotingStatus(true);
    setEndStatus(true);
    setHeading("Voting Started");
    setHeadState(true);
  };

  const handleVotingEnd = e => {
    e.stopPropagation();

    e.preventDefault();
    var fetchData = async () => {
      stompClient.send(
        `/presentation-ws/presentationId/${presentationId}/status/INACTIVE`,
        {},
        "INACTIVE"
      );
      setEndStatus(false);
      setRatingStatus(true);

      setHeading("Voting Ended");
      setHeadState(false);
      console.clear();
    };
    fetchData();
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-center my-3">{heading}</h1>
      <Timer />
      <div className="row mx-5 py-2 border border-1 rounded rounded-3 d-flex align-items-center">
        <div className="col-6">
          <h4>
            Presenter:&nbsp;{JSON.parse(localStorage.getItem("presenter"))}
          </h4>
        </div>
        <div className="col-6">
          <h4 className="text-center">
            Topic:&nbsp;
            {currPresentationData?.presentationTopic.charAt(0).toUpperCase() +
              currPresentationData?.presentationTopic.slice(1).toLowerCase()}
          </h4>
        </div>
      </div>
      <section className="row py-2 mx-5">
        <div className="col-7 border border-1 pt-3 rounded rounded-4">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              <div className="row">
                <div className="col-6">
                  <button
                    className="btn btn-primary"
                    onClick={handleVotingStart}
                    disabled={votingStatus}
                  >
                    Start Voting
                  </button>
                </div>
                <div className="col-6">
                  <button
                    className="btn btn-primary"
                    onClick={handleVotingEnd}
                    disabled={!endStatus}
                  >
                    End Voting
                  </button>
                </div>
              </div>

              <div className="row">
                <div className="col-4"></div>
                <div className="col-4">
                  <Link to={`/${btoa("ratingSummary")}`}>
                    <button
                      className="btn btn-primary"
                      disabled={!ratingStatus}
                    >
                      Get Rating
                    </button>
                  </Link>
                </div>
                <div className="col-4"></div>
              </div>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
        <div className="col-5 border border-1 rounded rounded-4 p-4">
          <div className="row ">
            <div className="col-6">
              <h4>Voting Status</h4>
            </div>
            <div className="col-6 ">
              <h3>
                {headState ? (
                  <p
                    style={{
                      color: "green",
                      textShadow: "1px 1px 3px green",
                      transition: "all .5s ease",
                    }}
                  >
                    ACTIVATED
                  </p>
                ) : (
                  <p
                    style={{
                      color: "red",
                      textShadow: "1px 1px 3px red",
                      transition: "all .5s ease",
                    }}
                  >
                    DEACTIVATED
                  </p>
                )}
              </h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Voting;
