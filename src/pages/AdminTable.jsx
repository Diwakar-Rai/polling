import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../components/LoginContext";
import Navbar from "./../components/Navbar";
import ExpertNavbar from "../components/ExpertNavbar";
const AdminTable = () => {
  let [allUserData, setAllUserData] = useState();
  let expert = sessionStorage.getItem("expertLogin");
  var address = process.env.REACT_APP_IP_ADDRESS;

  useEffect(() => {
    var fetchData = async () => {
      try {
        let { data } = await axios.get(`${address}/user/getTrainees`);
        setAllUserData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {expert === "true" ? <ExpertNavbar /> : <Navbar />}
      <h1 className="text-center mt-3">Trainee Presentation Table</h1>
      <div className="row mt-5">
        <div className="col-2"></div>
        <div className="col-8">
          <table className="table border border-1 table-hover table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Reviews</th>
              </tr>
            </thead>
            <tbody className="table-striped">
              {allUserData &&
                allUserData.length &&
                allUserData.map((ele, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{ele.userName}</td>
                        <td>{ele.userEmail}</td>
                        <td>{ele.userPhoneNumber}</td>

                        <td>
                          <Link
                            to={`/review/${ele.userId}`}
                            className="btn btn-primary"
                          >
                            Reviews
                          </Link>
                        </td>
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

export default AdminTable;
