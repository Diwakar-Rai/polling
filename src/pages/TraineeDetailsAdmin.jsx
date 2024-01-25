import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const TraineeDetailsAdmin = () => {
  let [searchFilter, setSearchFilter] = useState("");

  var [traineeData, setTraineeData] = useState([]);
  var [id, setId] = useState("");
  var address = process.env.REACT_APP_IP_ADDRESS;

  let admin = localStorage.getItem("loginAdmin");

  useEffect(() => {
    var fetchData = async () => {
      try {
        let { data } = await axios.get(`${address}/user/allTrainee`);
        setTraineeData(data.data);
        // console.log(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  var handleChange = async e => {
    var id = e.target.title;
    setId(id);
    var right = e.target.checked;

    if (right == true) {
      right = "ACTIVE";
    } else {
      right = "INACTIVE";
    }

    try {
      var { data } = await axios.put(
        `${address}/user/changeStatus?traineeId=${id}&status=${right}`
      );

      if (data.status === 200) {
        try {
          let { data } = await axios.get(`${address}/user/allTrainee`);
          setTraineeData(data.data);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = e => {
    setSearchFilter(e.target.value);
  };

  let trainee;
  searchFilter === ""
    ? (trainee = traineeData)
    : (trainee = traineeData?.filter(ele =>
        ele.userFirstName.toLowerCase().includes(searchFilter.toLowerCase())
      ));

  return (
    <div>
      <Navbar />
      <h1 className="text-center mt-3">Trainee Details</h1>
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
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="col-4"></div>
        <div className="col-2"></div>
      </div>
      <div className="row mt-3">
        <div className="col-2"></div>
        <div className="col-8">
          <table className="table table-striped table-hover border border-1">
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {trainee &&
                trainee.length &&
                trainee.map((ele, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          {admin === "true" ? (
                            <Link
                              // to={`/particularTrainee/${ele.userId}`}
                              to={`/${btoa("particularTrainee")}/${ele.userId}`}
                              className="text-dark"
                              style={{
                                fontWeight: "normal",
                              }}
                            >
                              {ele.userFirstName}
                            </Link>
                          ) : (
                            ele.userName
                          )}
                        </td>
                        <td style={{ textTransform: "none" }}>
                          {ele.userEmail}
                        </td>
                        <td>{ele.userPhoneNumber}</td>
                        <td>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id="status"
                              checked={ele.status == "ACTIVE" ? true : false}
                              onChange={handleChange}
                              title={ele.userId}
                              dataindex={index}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="status"
                            >
                              {ele.status}
                            </label>
                          </div>
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

export default TraineeDetailsAdmin;
