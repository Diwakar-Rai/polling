import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../components/GlobalContext";
import axios from "axios";
import Navbar from "../components/Navbar";

const AdminDetails = () => {
  var [adminData, setAdminData] = useState("");
  var address = process.env.REACT_APP_IP_ADDRESS;
  var { globalData, setGlobalData } = useContext(GlobalContext);

  var id = globalData.data.user.userId;

  useEffect(() => {
    var payload = {
      presentationSubject: globalData.data.presentationSubject,
      presentationTopic: globalData.data.presentationTopic,
      presentationDay: globalData.data.presentationDay,
    };
    console.log(payload);
    var fetchData = async () => {
      let { data } = await axios.post(
        `${address}/notification/getComments?presenterId=${id}`,
        payload
      );
      setAdminData(data.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="row mt-3">
        <div className="col-2"></div>
        <div className="col-8">
          <table className="table table-hover table-striped border border-1">
            <thead>
              <tr>
                <th>Voter Name</th>
                <th>Score</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {adminData &&
                adminData.length &&
                adminData.map((ele, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{ele.voterName}</td>
                        <td>{ele.score}</td>
                        <td>{ele.comment}</td>
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

export default AdminDetails;
