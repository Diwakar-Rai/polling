import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BsGraphUp } from "react-icons/bs";
import axios from "axios";
import GaugeChart from "react-gauge-chart";
import ImageDisplay from "../../components/ImageDisplay";
import TraineeGraph from "../trainee/TraineeGraph";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ExpertNavbar from "./../../components/ExpertNavbar";

const ParticularTrainee = () => {
  let [searchFilter, setSearchFilter] = useState("");
  let [traineeData, setTraineeData] = useState();
  let [graphData, setGraphData] = useState();
  let [review, setReview] = useState();
  let [popup, setPopup] = useState("");
  let [score, setScore] = useState();
  let [photo, setPhoto] = useState("");
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  let navigate = useNavigate();

  let expert = JSON.parse(localStorage.getItem("expertLogin"));

  let { id } = useParams();
  sessionStorage.setItem("parID", JSON.stringify(id));
  var address = process.env.REACT_APP_IP_ADDRESS;

  const toggle = () => setModal(!modal);
  const toggle2 = () => setModal2(!modal2);

  //! API to get the user details
  useEffect(() => {
    let fetchData = async () => {
      try {
        let { data } = await axios.get(`${address}/user/userId/${id}`);
        setTraineeData(data.data);
        setGraphData(data.data);
        setScore(data?.data?.overAllUserScore);

        console.log(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [score]);

  //! API to get the profile picture
  useEffect(() => {
    let fetchData = async () => {
      try {
        let { data } = await axios.get(`${address}/userProfile/userId/${id}`);
        setPhoto(data.data);
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
          `${address}/presentation/allPresentation?prensenterId=${id}`
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
          // `${address}/review/presentationSummary?reviewId=${id}`
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

  const handleSearch = e => {
    setSearchFilter(e.target.value);
  };

  let rev;
  searchFilter === ""
    ? (rev = review)
    : (rev = review?.filter(
        ele =>
          ele.reviewSubject
            .toLowerCase()
            .includes(searchFilter.toLowerCase()) ||
          ele.reviewTopic.toLowerCase().includes(searchFilter.toLowerCase())
      ));
  return (
    <div>
      {expert === true ? <ExpertNavbar /> : <Navbar />}
      <h1 className="text-center my-2">{`${
        traineeData?.userFirstName + " " + traineeData?.userLastName
      }'s Details`}</h1>
      <div className="row mt-4 px-5">
        <div className="col-4">
          <div className="shadow rounded-4 pt-3">
            <div className="mb-3 d-flex justify-content-center px-2">
              {/* <div>
                <FiEdit onClick={toggle} style={{ cursor: "pointer" }} />
              </div> */}
              <div className="rounded-circle overflow-hidden">
                <ImageDisplay byteArray={photo?.userProfile} />
              </div>
            </div>
            <div className="border-top border-1 pt-3 overflow-hidden">
              <div className="shadow-sm row p-1">
                <div className="col-4 ps-4">Trainee Name</div>
                <div className="col-8">
                  {traineeData?.userFirstName +
                    " " +
                    (traineeData?.userLastName === null
                      ? ""
                      : traineeData?.userLastName)}
                </div>
              </div>
              <div className="shadow-sm row p-1">
                <div className="col-4 ps-4">Email</div>
                <div className="col-8">{traineeData?.userEmail}</div>
              </div>
              <div className="row p-1">
                <div className="col-4 ps-4">Phone Number</div>
                <div className="col-8">{traineeData?.userPhoneNumber}</div>
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
        <div className="col-8 shadow p-3 rounded-4">
          <TraineeGraph graphData={graphData} />
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>All Presentation</ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-12">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="search"
                  onChange={handleSearch}
                  placeholder="Enter Subject or Topic to search"
                />
              </div>
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
              {rev &&
                rev.length &&
                rev?.map((ele, index) => {
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
                          <button
                            // to={`/${btoa("comments")}/${ele.presentationId}`}
                            onClick={e => {
                              e.stopPropagation();
                              localStorage.setItem(
                                "presentationId",
                                JSON.stringify(ele.presentationId)
                              );
                              navigate(
                                `/${btoa("comments")}/${ele.presentationId}`
                              );
                            }}
                            className="btn btn-primary"
                          >
                            Feedbacks
                          </button>
                        </td>
                        <td>
                          <BsGraphUp
                            className="fw-bold"
                            onClick={e => {
                              e.stopPropagation();
                              console.log(ele.presentationId);
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
    </div>
  );
};

export default ParticularTrainee;
