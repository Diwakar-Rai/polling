import React from "react";

import Navbar from "../components/Navbar";

const AdminDetails = () => {
  let presentationData = JSON.parse(sessionStorage.getItem("presComm"));
  let adminData = presentationData.comments;

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
