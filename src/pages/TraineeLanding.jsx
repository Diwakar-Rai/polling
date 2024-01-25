import React, { useEffect, useState } from "react";
import TraineeNavbar from "../components/TraineeNavbar";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import DpAlert from "../components/DpAlert";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const TraineeLanding = () => {
  let [dpPresent, setDpPresent] = useState(true);
  const [modal, setModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  let traineeData = JSON.parse(localStorage.getItem("traineeData"));
  let expertData = JSON.parse(localStorage.getItem("expertData"));
  let expertLogin = JSON.parse(localStorage.getItem("expertLogin"));
  let id;
  // console.log(expertLogin);

  if (expertLogin === true) {
    id = expertData.userId;
  } else {
    id = traineeData.userId;
  }

  let address = process.env.REACT_APP_IP_ADDRESS;

  const toggle = () => setModal(!modal);

  useEffect(() => {
    let fetchData = async () => {
      try {
        let { data } = await axios.get(`${address}/userProfile/userId/${id}`);
        if (data.status === 200) {
          setDpPresent(true);
          localStorage.setItem("dpStatus", JSON.stringify(true));
        } else {
          setDpPresent(false);
          localStorage.setItem("dpStatus", JSON.stringify(false));
          if (!expertLogin) {
            toggle();
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = event => {
    setSelectedFile(event.target.files[0]);
  };
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      if (selectedFile) {
        // console.log(selectedFile);
        const formData = new FormData();
        formData.append("photo", selectedFile);
        // console.log(formData);

        let { data } = await axios.post(
          `${address}/userProfile/${id}`,
          formData
        );
        // console.log(data);
        if (data.status === 200) {
          toggle();
        }
      }
    } catch (error) {
      console.log(error);
      alert("The chosen file is more than 2MB. Choose another file");
    }
  };

  return (
    <section>
      <TraineeNavbar />
      {/* {dpPresent ? "" : <DpAlert />} */}
      {expertLogin === true ? (
        ""
      ) : (
        <div className="row mt-4 border-bottom border-1 mx-5 pb-3">
          <div className="col-2"></div>
          <div className="col-8">
            <div className="row">
              <div className="col-2"></div>
              <div className="col-4" style={{ paddingBottom: 0 }}>
                <Link
                  // to="traineeLanding/notification"
                  to={`${btoa("traineeLanding")}/${btoa("notification")}`}
                  className="btn btn-primary p-4 px-5 fw-bolder"
                >
                  Notifications
                </Link>
              </div>
              <div className="col-4">
                <Link
                  // to="traineeLanding/reviews"
                  to={`${btoa("traineeLanding")}/${btoa("reviews")}`}
                  className="btn btn-primary p-4 px-5 fw-bolder"
                >
                  Reviews
                </Link>
              </div>
              <div className="col-2"></div>
            </div>
          </div>
          <div className="col-2"></div>
        </div>
      )}

      <section>
        <Outlet />
      </section>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <h3>Upload Picture</h3>
          <p className="text-dark">No profile picture found</p>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <p className="text-danger">
              *Select a photo, whose size is less than 2MB.
            </p>

            <div>
              <input
                type="file"
                name="photo"
                className="form-control"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Upload
            </button>
          </form>
        </ModalBody>
        {/* <ModalFooter></ModalFooter> */}
      </Modal>
    </section>
  );
};

export default TraineeLanding;
