import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const IndividualTrainee = () => {
  var [individualData, setIndividualData] = useState("");
  var { id } = useParams();

  var address = process.env.REACT_APP_IP_ADDRESS;

  useEffect(() => {
    var fetchData = async () => {
      let { data } = await axios.get(`${address}/user/findById?userId=${id}`);
      // let { data } = await axios.get(
      //   `http://localhost:8080/user/findById?userId=${id}`
      // );

      setIndividualData(data.data);
      // console.log(individualData);
    };
    fetchData();
  }, []);
  var { role, userName, userEmail, userPhoneNumber } = individualData;
  return (
    <div>
      <h1>Trainee Detail</h1>
      <table>
        <thead>
          <tr>
            <th>Trainee name:</th>
            <td>{userName}</td>
          </tr>
          <tr>
            <th>Role:</th>
            <td>{role}</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>{userEmail}</td>
          </tr>
          <tr>
            <th>Phone Number:</th>
            <td>{userPhoneNumber}</td>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default IndividualTrainee;
