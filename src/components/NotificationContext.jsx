import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

export const NotificationContext = createContext();
const NotificationProvider = ({ children }) => {
  let [state, setState] = useState(null);
  //   let navigate = useNavigate();
  let address = process.env.REACT_APP_IP_ADDRESS;

  //           let address = process.env.REACT_APP_IP_ADDRESS;
  //   let traineeId = JSON.parse(sessionStorage.getItem("traineeData"));
  //   let expertId = JSON.parse(sessionStorage.getItem("expertData"));
  //   let expert = sessionStorage.getItem("expertLogin");

  useEffect(() => {
    let id;
    if (window.sessionStorage.getItem("traineeId")) {
      let traineeId = JSON.parse(sessionStorage.getItem("traineeData"));
      //    expert === "true" ? (id = expertId.userId) : (id = traineeId.userId);
      id = traineeId.userId;
    }
    if (window.sessionStorage.getItem("expertId")) {
      let expertId = JSON.parse(sessionStorage.getItem("expertData"));
      //    expert === "true" ? (id = expertId.userId) : (id = traineeId.userId);
      id = expertId.userId;
    }

    //   let fetchData = async () => {
    //     try {
    //       let val = JSON.parse(window.sessionStorage.getItem("traineeData"));
    //       let { data } = await axios.get(
    //         `${address}/notification?userId=${val.userId}`
    //       );
    //       setState(data.data);
    //       // console.log(data);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };
    //   fetchData();
  }, []);

  return (
    <NotificationContext.Provider value={state === null ? "" : state}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
