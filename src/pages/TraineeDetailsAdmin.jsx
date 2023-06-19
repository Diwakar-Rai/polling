import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const TraineeDetailsAdmin = () => {
  // const [modal, setModal] = useState(false);

  var [traineeData, setTraineeData] = useState([]);
  var [id, setId] = useState("");
  // var [status, setStatus] = useState("");
  var address = process.env.REACT_APP_IP_ADDRESS;

  // const toggle = () => setModal(!modal);

  useEffect(() => {
    var fetchData = async () => {
      try {
        let { data } = await axios.get(`${address}/user/findAllTrainees`);
        setTraineeData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  var handleChange = async e => {
    // toggle();
    var id = e.target.title;
    setId(id);
    var right = e.target.checked;

    if (right == true) {
      right = "ACTIVE";
    } else {
      right = "INACTIVE";
    }

    try {
      var { data } = await axios.get(
        `${address}/user/changeStatus?userId=${id}&status=${right}`
      );
      // console.log(data);
      // if (data.status === 200) {
      //   let traineeId = data.data.userId;
      //   let trainee = traineeArray.filter((ele, index) => {
      //     if (ele.userId === traineeId) {
      //       return index;
      //     }
      //   });
      //   console.log("beforeSplice", traineeArray);
      //   traineeArray.splice(trainee, 1, data.data);
      //   console.log("updated", traineeArray);
      //   setTraineeData(traineeArray);
      // }
      if (data.status === 200) {
        try {
          let { data } = await axios.get(`${address}/user/findAllTrainees`);
          setTraineeData(data.data);
        } catch (error) {
          console.log(error);
        }
      }
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-center mt-3">Trainee Details</h1>

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
              {traineeData &&
                traineeData.length &&
                traineeData.map((ele, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{ele.userName}</td>
                        <td>{ele.userEmail}</td>
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
      {/* <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          Are you sure you want to change the status of the trainee.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Yes
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal> */}
    </div>
  );
};

export default TraineeDetailsAdmin;
