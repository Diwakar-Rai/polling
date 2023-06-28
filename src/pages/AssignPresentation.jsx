import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./../components/Navbar";

const AssignPresentation = () => {
  var [assign, setAssign] = useState();
  let [searchFilter, setSearchFilter] = useState("");

  var address = process.env.REACT_APP_IP_ADDRESS;

  useEffect(() => {
    try {
      var fetchData = async () => {
        let { data } = await axios.get(`${address}/user/findTrainees`);
        setAssign(data.data);
        // console.log(data.data);
      };
    } catch (error) {
      console.log(error);
    }

    fetchData();
  }, []);

  const handleChange = e => {
    setSearchFilter(e.target.value);
  };

  let trainee;
  searchFilter === ""
    ? (trainee = assign)
    : (trainee = assign?.filter(ele =>
        ele.userName.toLowerCase().includes(searchFilter)
      ));
  return (
    <div>
      <Navbar />
      <h1 className="text-center">Assign Presentation to Trainee</h1>

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

      <div className="row mt-3">
        <div className="col-2"></div>
        <div className="col-8">
          <table className="table border border-1 table-hover table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Assign Presentation</th>
              </tr>
            </thead>
            <tbody>
              {trainee &&
                trainee.length &&
                trainee.map((ele, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{ele.userName}</td>
                        <td>{ele.userEmail}</td>
                        <td>{ele.userPhoneNumber}</td>
                        <td>
                          <Link
                            to={`/presentation/${ele.userId}`}
                            className="btn btn-primary"
                          >
                            Assign
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

export default AssignPresentation;
