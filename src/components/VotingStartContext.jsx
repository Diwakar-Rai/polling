// import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { GlobalContext } from "../components/GlobalContext";

export const VotingStartContext = createContext();
const VotingStartProvider = ({ children }) => {
  let [votingData, setVotingData] = useState("");
  // var address = process.env.REACT_APP_IP_ADDRESS;
  // var state = useContext(GlobalContext);
  // console.log(state);
  // var [votingStatus, setVotingStatus] = useState(false);

  // var [heading, setHeading] = useState("Presentation Ongoing");

  // const handleVotingStart = e => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   let time = sessionStorage.getItem("totalTime");
  //   // console.log(time);
  //   var fetchData = async () => {
  //     let { data } = await axios.get(
  //       `${address}/presentation/activate?presentationId=${globalData?.data?.presentationId}&presentationTime=${time}`
  //     );

  //     sessionStorage.setItem("presentationData", JSON.stringify(data.data));
  //     // console.log(sessionStorage);
  //     setVotingStatus(true);
  //     setHeading("Voting Started");
  //   };
  //   fetchData();
  // };
  // console.log(votingStatus);

  // const handleVotingEnd = e => {
  //   e.stopPropagation();

  //   e.preventDefault();
  //   var fetchData = async () => {
  //     let { data } = await axios.get(
  //       `${address}/presentation/deactivate?presentationId=${globalData?.data?.presentationId}`
  //     );

  //     setVotingStatus(false);
  //     setHeading("Voting Ended");
  //     // console.log(data);
  //   };
  //   fetchData();
  // };

  return (
    <VotingStartContext.Provider value={{ votingData, setVotingData }}>
      {children}
    </VotingStartContext.Provider>
  );
};

export default VotingStartProvider;
