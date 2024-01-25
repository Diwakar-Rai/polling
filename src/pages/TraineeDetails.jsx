import React, { useEffect, useState } from "react";
import axios from "axios";
import GaugeChart from "react-gauge-chart";
import TraineeNavbar from "./../components/TraineeNavbar";
import { Link } from "react-router-dom";
import { BsGraphUp } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

import TraineeGraph from "./trainee/TraineeGraph";
import ImageDisplay from "../components/ImageDisplay";

//!Importing Modal
import { Modal, ModalHeader, ModalBody } from "reactstrap";

//! Importing Chart elements
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const TraineeDetails = () => {
  let [traineeData, setTraineeData] = useState("");
  let [score, setScore] = useState();
  let [photo, setPhoto] = useState("");
  let [review, setReview] = useState();
  let [popup, setPopup] = useState("");
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const toggle = () => setModal(!modal);
  const toggle1 = () => setModal1(!modal1);
  const toggle2 = () => setModal2(!modal2);

  let traineeSessionData = JSON.parse(localStorage.getItem("traineeData"));
  // let graph = JSON.parse(sessionStorage.getItem("graphData"));

  let userId = traineeSessionData.userId;

  // let dpStatus = JSON.parse(localStorage.getItem("dpStatus"));
  let address = process.env.REACT_APP_IP_ADDRESS;

  //! API to get the Trainee Details
  useEffect(() => {
    let fetchData = async () => {
      try {
        let { data } = await axios.get(`${address}/user/userId/${userId}`);
        setTraineeData(data.data);
        setScore(data?.data?.overAllUserScore);
        // console.log(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [score]);

  //! API to get the profile Picture
  useEffect(() => {
    let fetchData = async () => {
      try {
        let { data } = await axios.get(
          `${address}/userProfile/userId/${userId}`
        );
        setPhoto(data.data);
        if (data.status === 200) {
          localStorage.setItem("dpStatus", JSON.stringify(true));
        } else {
          localStorage.setItem("dpStatus", JSON.stringify(false));
          toggle1();
        }
        // console.log(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //!function to get all the presentation of a trainee
  useEffect(() => {
    let fetchData = async () => {
      try {
        let { data } = await axios.get(
          `${address}/presentation/allPresentation?prensenterId=${userId}`
        );
        // console.log(data.data);
        setReview(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //! function to get all the details of the particular presentation

  const handleClick = id => {
    let particularPres = async () => {
      try {
        let { data } = await axios.get(
          `${address}/rating/presentationId/${id}`
        );
        let popObj = {
          overallContentScore: data.data[0].contentScore,
          overallVoiceModulationScore: data.data[0].voiceModulationScore,
          overallConfidenceScore: data.data[0].confidenceScore,
          overallEyeContactScore: data.data[0].eyeContactScore,
          overallBodyLanguageScore: data.data[0].bodyLanguageScore,
          overallInterationScore: data.data[0].interationScore,
          overallUseageOfPropsScore: data.data[0].useageOfPropsScore,
          overallCommunicationScore: data.data[0].communicationScore,
          overallEnergyScore: data.data[0].energyScore,
          overallLivelinessScore: data.data[0].livelinessScore,
        };
        // console.log(popObj);
        // console.log(id);
        // console.log(data);
        setPopup(popObj);
      } catch (error) {
        console.log(error);
      }
    };
    particularPres();
    // toggle2();
  };

  //! Uploading a picture

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
          `${address}/userProfile/${userId}`,
          formData
        );
        // console.log(data);
        if (data.status === 200) {
          toggle1();
        }
      }
    } catch (error) {
      console.log(error);
      alert("The chosen file is more than 2MB. Choose another file");
    }
  };
  return (
    <div>
      <TraineeNavbar />
      <div className="row mt-5">
        <div className="col-1"></div>
        <div className="col-10">
          <div className="row">
            <div className="col-4">
              <div className="shadow rounded-4 pt-3">
                <div className="mb-3 d-flex justify-content-center px-2">
                  <div>
                    <FiEdit onClick={toggle1} style={{ cursor: "pointer" }} />
                  </div>
                  <div className="rounded-circle overflow-hidden">
                    <ImageDisplay byteArray={photo?.userProfile} />
                  </div>
                </div>
                <div className="border-top border-1 pt-3 overflow-hidden">
                  <div className="shadow-sm row p-1">
                    <div className="col-4 ps-4">Username</div>
                    <div className="col-8">{traineeData.userFirstName}</div>
                  </div>
                  <div className="shadow-sm row p-1">
                    <div className="col-4 ps-4">Email</div>
                    <div className="col-8">{traineeData.userEmail}</div>
                  </div>
                  <div className="row p-1">
                    <div className="col-4 ps-4">Ph. No.</div>
                    <div className="col-8">{traineeData.userPhoneNumber}</div>
                  </div>
                </div>
              </div>
              <div className="shadow rounded-4 mt-3 p-4">
                <h5 className="pb-2 border-bottom border-1">Current Rating</h5>
                <div>
                  <div className="row">
                    <div className="col-9">
                      <h6 className="py-2">Total no of presentation</h6>
                    </div>
                    <div className="col-3">{review?.length}</div>
                  </div>
                </div>
                <GaugeChart
                  id="gauge-chart2"
                  nrOfLevels={5}
                  percent={score / 5}
                  colors={["#FF5F6D", "#4cbb17"]}
                  hideText={true}
                />
                <h6 className="text-center pb-5 border-bottom border-1">
                  Overall Rating: {traineeData?.overAllUserScore}
                </h6>

                <button className="btn btn-primary w-100 mt-2" onClick={toggle}>
                  Completed Presentations
                </button>
              </div>
            </div>

            <div className="col-8 ps-3">
              <div className="shadow rounded-4 py-2 px-4">
                <h5 className="pb-3 border-bottom border-1">Overall Ratings</h5>
                <TraineeGraph graphData={traineeData} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-1"></div>
      </div>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>All Presentation</ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-12">
              {/* <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="search"
                  onChange={handleSearch}
                  placeholder="Enter Subject or Topic to search"
                />
              </div> */}
            </div>
          </div>
          <table className="table table-striped table-hover border border-1">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Topic</th>
                <th>Score</th>
                <th>Date</th>
                <th>Feedback</th>
                <th>Ratings</th>
              </tr>
            </thead>
            <tbody>
              {review &&
                review.length &&
                review?.map((ele, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr>
                        <td style={{ textTransform: "capitalize" }}>
                          {ele.presentationSubject.toLowerCase()}
                        </td>
                        <td style={{ textTransform: "capitalize" }}>
                          {ele.presentationTopic.toLowerCase()}
                        </td>
                        <td>{ele.overAllPresentationScore}</td>
                        <td>{ele.presentationDate}</td>
                        <td>
                          <Link
                            to={`/${btoa("traineeComments")}/${
                              ele.presentationId
                            }`}
                            className="btn btn-primary"
                          >
                            Trainee
                          </Link>
                          <Link
                            to={`/${btoa("expertCommentsTrainee")}/${
                              ele.presentationId
                            }`}
                            className="btn btn-primary"
                          >
                            Expert
                          </Link>
                        </td>
                        <td>
                          <BsGraphUp
                            className="fw-bold"
                            onClick={e => {
                              e.stopPropagation();
                              handleClick(ele.presentationId);
                              toggle2();
                            }}
                            style={{ cursor: "pointer" }}
                          />
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
            </tbody>
          </table>
        </ModalBody>
      </Modal>
      <Modal isOpen={modal2} toggle={toggle2}>
        <ModalHeader toggle={toggle2}>Trainee Statistics</ModalHeader>
        <ModalBody>
          <TraineeGraph graphData={popup} />
        </ModalBody>
      </Modal>

      <Modal isOpen={modal1} toggle={toggle1}>
        <ModalHeader toggle={toggle1}>Upload Picture</ModalHeader>
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
    </div>
  );
};

export default TraineeDetails;
