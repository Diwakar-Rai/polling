import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./../components/Navbar";

const AssignPresentation = () => {
  var [assign, setAssign] = useState();
  var address = process.env.REACT_APP_IP_ADDRESS;

  useEffect(() => {
    try {
      var fetchData = async () => {
        let { data } = await axios.get(`${address}/user/getTrainees`);
        setAssign(data.data);
        // console.log(data.data);
      };
    } catch (error) {
      console.log(error);
    }

    fetchData();
  }, []);
  return (
    <div>
      <Navbar />
      <h1 className="text-center">Assign Presentation to Trainee</h1>

      <div className="row mt-3">
        <div className="col-2"></div>
        <div className="col-8">
          <table className="table border border-1 table-hover table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Assign Presentation</th>
              </tr>
            </thead>
            <tbody>
              {assign &&
                assign.length &&
                assign.map((ele, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{ele.userName}</td>
                        <td>{ele.userEmail}</td>
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
