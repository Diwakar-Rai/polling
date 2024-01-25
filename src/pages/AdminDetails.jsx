import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import axios from "axios";

const AdminDetails = () => {
  let [adminData, setAdminData] = useState(null);
  var address = process.env.REACT_APP_IP_ADDRESS;
  let presentationId = localStorage.getItem("presentationId");

  useEffect(() => {
    var fetchData = async () => {
      try {
        let { data } = await axios.get(
          `${address}/rating/presentationId/${presentationId}`
        );
        setAdminData(data.data.filter(ele => ele.voter.role === "TRAINEE"));
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
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
              {adminData && adminData.length ? (
                adminData.map((ele, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{ele.voter.userFirstName}</td>
                        <td>{ele.overAllRatingScore}</td>
                        <td>{ele.comments}</td>
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
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default AdminDetails;
