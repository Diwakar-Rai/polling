import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { GlobalContext } from "../components/GlobalContext";
import { BiRefresh } from "react-icons/bi";

//! import for the websocket
import { over } from "stompjs";
import SockJS from "sockjs-client";

const PresentationRating = () => {
  var { globalData, setGlobalData } = useContext(GlobalContext);
  var navigate = useNavigate();
  var [individualData, setIndividualData] = useState("");
  let [username, setuserName] = useState("");
  var [presentationSubject, setSubject] = useState("");
  var [presentationTopic, setTopic] = useState("");

  var { id } = useParams();

  let traineeData = JSON.parse(localStorage.getItem("presentTrainee"));
  let traineeId = traineeData.userId;
  // console.log(traineeId);
  useEffect(() => {
    let traineeName =
      traineeData.userFirstName + " " + traineeData.userLastName;
    setuserName(traineeName);
    localStorage.setItem("presenter", JSON.stringify(traineeName));
  }, [traineeData]);

  var address = process.env.REACT_APP_IP_ADDRESS;

  //! Creating a websocket connection
  const socket = new SockJS(`${address}/stomp-endpoint`);
  const stompClient = over(socket);
  useEffect(() => {
    stompClient.connect({}, function (frame) {
      if (stompClient.connected) {
        console.log("Connected to WebSocket", frame);
        stompClient.subscribe("/notification-ws", function (message) {
          const response = JSON.parse(message.body);
          setGlobalData(response.body.data);
          localStorage.setItem(
            "currPresentationData",
            JSON.stringify(response.body.data)
          );
        });
      } else {
        console.log("Not connected");
      }
    });
  }, []);

  var handleSubmit = async e => {
    e.preventDefault();

    var payload = {
      presentationSubject: presentationSubject,
      presentationTopic: presentationTopic,
    };

    stompClient.send(
      `/presentation-ws/userId/${traineeId}`,
      {},
      JSON.stringify(payload)
    );
    toast.success("Success!", {
      className: "toastMessage",
    });
    navigate(`/${btoa("voting")}`);
  };

  var handleSubject = e => {
    setSubject(e.target.value);
  };
  var handleTopic = e => {
    setTopic(e.target.value);
  };

  const handleRefresh = async () => {
    try {
      var { data } = await axios.get(`${address}/user/getRandomTrainee
`);
      // console.log(data);
      localStorage.setItem("presentTrainee", JSON.stringify(data.data));

      // console.log(data);
      setIndividualData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="row">
        <div className="col-2"></div>
        <div className="col-6">
          <h1 className="text-center mt-3">
            Assign Presentation to {username}
          </h1>
        </div>
        <div className="col-2">
          <button className="btn btn-primary w-50 mt-4" onClick={handleRefresh}>
            <BiRefresh style={{ fontSize: 30 }} />
          </button>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-2"></div>
        <div className="col-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="formName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="formName"
                name="userName"
                value={username}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">
                Subject
              </label>
              <input
                type="text"
                className="form-control"
                id="subject"
                name="presentationSubject"
                value={presentationSubject}
                onChange={handleSubject}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="presTopic" className="form-label">
                Topic
              </label>
              <input
                type="text"
                className="form-control"
                id="presTopic"
                name="presentationTopic"
                value={presentationTopic}
                onChange={handleTopic}
                required
              />
            </div>
            {/* <p className="mx-0">Presentation Time</p>
            <div className="row">
              <div className="col-3">
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                    checked
                  />
                  <label class="form-check-label" for="flexCheckChecked">
                    15 mins
                  </label>
                </div>
              </div>
              <div className="col-9">
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Set presentation time in minutes"
                    value=""
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                  <span class="input-group-text p-0" id="basic-addon2">
                    <button className="btn btn-primary">Set Time</button>
                  </span>
                </div>
              </div>
            </div> */}

            <button type="submit" className="btn btn-primary">
              Assign Presentation
            </button>
          </form>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default PresentationRating;
