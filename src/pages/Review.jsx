import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import ExpertNavbar from "../components/ExpertNavbar";
import ImageDisplay from "../components/ImageDisplay";
import GaugeChart from "react-gauge-chart";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import TraineeGraph from "./trainee/TraineeGraph";

import { BsGraphUp } from "react-icons/bs";

const Review = () => {
  let [photo, setPhoto] = useState("");
  var [review, setReview] = useState();
  let [score, setScore] = useState();
  let [searchFilter, setSearchFilter] = useState("");
  let [traineeData, setTraineeData] = useState("");
  let [graphData, setGraphData] = useState();
  let [popup, setPopup] = useState("");
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const toggle = () => setModal(!modal);
  const toggle2 = () => setModal2(!modal2);

  var { id } = useParams();
  sessionStorage.setItem("parID", JSON.stringify(id));
  var address = process.env.REACT_APP_IP_ADDRESS;
  let expert = JSON.parse(localStorage.getItem("expertLogin"));

  //! API to get the review detail
  useEffect(() => {
    var fetchData = async () => {
      try {
        var { data } = await axios.get(
          `${address}/presentation/allPresentation?prensenterId=${id}`
        );

        setReview(data.data);
        // sessionStorage.setItem("loginData", JSON.stringify(data.data));
        // console.log(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  //! function to get all the details of the particular presentation

  const handleClick = id => {
    let particular = review.find(ele => ele.presentationId === id);
    setPopup(particular);
    toggle2();
  };

  //! API to get the Trainee Details
  useEffect(() => {
    let fetchData = async () => {
      try {
        let { data } = await axios.get(`${address}/user/userId/${id}`);
        setTraineeData(data.data);
        setScore(data.data?.overAllUserScore);
        setGraphData(data.data);
        // console.log(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [score]);

  //!API to get the profile Picture
  useEffect(() => {
    let fetchData = async () => {
      let { data } = await axios.get(`${address}/userProfile/userId/${id}`);
      setPhoto(data.data);
      // console.log(data);
    };
    fetchData();
  }, []);

  const handleSearch = e => {
    setSearchFilter(e.target.value);
  };

  let rev;
  searchFilter === ""
    ? (rev = review)
    : (rev = review?.filter(
        ele =>
          ele.presentationSubject
            .toLowerCase()
            .includes(searchFilter.toLowerCase()) ||
          ele.presentationTopic
            .toLowerCase()
            .includes(searchFilter.toLowerCase())
      ));
  // console.log(rev);
  return (
    <div>
      {expert === true ? <ExpertNavbar /> : <Navbar />}

      <h1 className="text-center mt-3 pb-3 border-bottom border-1 shadow-sm">
        Trainer Presentation Review
      </h1>
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
                <div className="col-5 ps-4">Trainee Name</div>
                <div className="col-7">
                  {traineeData.userFirstName + traineeData.userLastName}
                </div>
              </div>
              <div className="shadow-sm row p-1">
                <div className="col-5 ps-4">Email</div>
                <div className="col-7">{traineeData.userEmail}</div>
              </div>
              <div className="row p-1">
                <div className="col-5 ps-4">Phone Number</div>
                <div className="col-7">{traineeData.userPhoneNumber}</div>
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
              See Progress
            </button>
          </div>
        </div>
        <div className="col-8 shadow p-3 rounded-4">
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
                  // console.log(ele.presentationId);
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
                            onClick={e => {
                              e.stopPropagation();
                              // sessionStorage.setItem("arrayIndex", index);
                              localStorage.setItem(
                                "presentationId",
                                JSON.stringify(ele.presentationId)
                              );
                            }}
                            to={`/${btoa("comments")}/${ele.presentationId}`}
                            className="btn btn-primary"
                          >
                            Feedbacks
                          </Link>
                        </td>
                        <td>
                          <BsGraphUp
                            className="fw-bold"
                            onClick={e => {
                              e.stopPropagation();
                              // console.log(ele.presentationId);
                              handleClick(ele.presentationId);
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
        </div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Trainee Statistics</ModalHeader>
          <ModalBody>
            <TraineeGraph graphData={graphData} />
          </ModalBody>
        </Modal>
        <Modal isOpen={modal2} toggle={toggle2}>
          <ModalHeader toggle={toggle2}>Trainee Statistics</ModalHeader>
          <ModalBody>
            <TraineeGraph graphData={popup} />
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};

export default Review;
