import React, { useContext } from "react";
import { GlobalContext } from "../components/GlobalContext";
const Greet = () => {
  const { globalData, setGlobalData } = useContext(GlobalContext);
  return (
    <div>
      <h1>HELLO {globalData.data.userName}</h1>
      <h1>Ranga id {globalData.data.userId}</h1>
      <h1>Ranga PhoneNumber {globalData.data.userPhoneNumber}</h1>
      <h1>Ranga role {globalData.data.role}</h1>
    </div>
  );
};

export default Greet;
