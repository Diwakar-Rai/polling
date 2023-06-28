import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./../components/Navbar";
import ExpertNavbar from "../components/ExpertNavbar";
const AdminTable = () => {
  let [allUserData, setAllUserData] = useState();
  let [searchFilter, setSearchFilter] = useState("");
  let expert = sessionStorage.getItem("expertLogin");
  var address = process.env.REACT_APP_IP_ADDRESS;

  useEffect(() => {
    var fetchData = async () => {
      try {
        let { data } = await axios.get(`${address}/user/getTrainees`);
        setAllUserData(data.data);
        // console.log(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleChange = e => {
    setSearchFilter(e.target.value);
  };

  let trainee;
  searchFilter === ""
    ? (trainee = allUserData)
    : (trainee = allUserData?.filter(ele =>
        ele.userName.toLowerCase().includes(searchFilter.toLowerCase())
      ));
  return (
    <div>
      {expert === "true" ? <ExpertNavbar /> : <Navbar />}
      <h1 className="text-center mt-3">Trainee Presentation Table</h1>
      <div className="row">
        <div className="col-2"></div>
        <div className="col-4">
          <div className="mb-3">
            <label htmlFor="search" className="form-label">
              Enter Trainee Name to search
            </label>
            <input
              type="text"
              className="form-control"
              id="search"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-4"></div>
        <div className="col-2"></div>
      </div>
      <div className="row mt-2">
        <div className="col-2"></div>
        <div className="col-8">
          <table className="table border border-1 table-hover table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Date </th>
                <th scope="col">Reviews</th>
              </tr>
            </thead>
            <tbody className="table-striped">
              {trainee &&
                trainee.length &&
                trainee.map((ele, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{ele.userName}</td>
                        <td>{ele.presentationDate}</td>

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
