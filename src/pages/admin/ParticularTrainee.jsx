import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useParams, Link } from "react-router-dom";
import { BsGraphUp } from "react-icons/bs";
import axios from "axios";
import GaugeChart from "react-gauge-chart";
import ImageDisplay from "../../components/ImageDisplay";
import TraineeGraph from "../trainee/TraineeGraph";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ParticularTrainee = () => {
  let [searchFilter, setSearchFilter] = useState("");
  let [traineeData, setTraineeData] = useState();
  let [graphData, setGraphData] = useState();
  let [review, setReview] = useState();
  let [score, setScore] = useState();
  let [popup, setPopup] = useState("");
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  let { id } = useParams();
  sessionStorage.setItem("parID", JSON.stringify(id));
  var address = process.env.REACT_APP_IP_ADDRESS;

  const toggle = () => setModal(!modal);
  const toggle2 = () => setModal2(!modal2);

  //! API to get the user details
  useEffect(() => {
    let fetchData = async () => {
      try {
        let { data } = await axios.get(`${address}/user/findById?userId=${id}`);
        setTraineeData(data.data);
        setScore(data.data?.overallPerformance);

        // console.log(traineeData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [score]);

  //! API to get the performance for the meters

  useEffect(() => {
    let fetchData = async () => {
      let { data } = await axios.get(
        `${address}/review/trainee_Performance?userId=${id}`
      );
      sessionStorage.setItem("graphData", JSON.stringify(data.data));
      setGraphData(data.data);
      //   console.log(graphData);
    };
    fetchData();
  }, []);

  //!API to get the review
  useEffect(() => {
    var fetchData = async () => {
      var { data } = await axios.get(`${address}/review?userId=${id}`);

      setReview(data.data);
      sessionStorage.setItem("loginData", JSON.stringify(data.data));
      //   console.log(data.data)
    };

    fetchData();
  }, []);

  //! function to get all the details of the particular presentation

  const handleClick = id => {
    let particularPres = async () => {
      try {
        let { data } = await axios.get(
          `${address}/review/presentationSummary?reviewId=${id}`
        );
        setPopup(data.data);
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
      <Navbar />
      <h1 className="text-center my-2">{`${traineeData?.userName}'s Details`}</h1>
      <div className="row mt-4 px-5">
        <div className="col-4">
          <div className="shadow rounded-4 pt-3">
            <div className="mb-3 d-flex justify-content-center px-2">
              {/* <div>
                <FiEdit onClick={toggle} style={{ cursor: "pointer" }} />
              </div> */}
              <div className="rounded-circle overflow-hidden">
                <ImageDisplay byteArray={traineeData?.phote?.userProfile} />
              </div>
            </div>
            <div className="border-top border-1 pt-3 overflow-hidden">
              <div className="shadow-sm row p-1">
                <div className="col-5 ps-4">Trainee Name</div>
                <div className="col-7">{traineeData?.userName}</div>
              </div>
              <div className="shadow-sm row p-1">
                <div className="col-5 ps-4">Email</div>
                <div className="col-7">{traineeData?.userEmail}</div>
              </div>
              <div className="row p-1">
                <div className="col-5 ps-4">Phone Number</div>
                <div className="col-7">{traineeData?.userPhoneNumber}</div>
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
                <div className="col-3">{traineeData?.totalPersentation}</div>
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
              Overall Rating: {traineeData?.overallPerformance}
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
                          {ele.reviewSubject.toLowerCase()}
                        </td>
                        <td style={{ textTransform: "capitalize" }}>
                          {ele.reviewTopic.toLowerCase()}
                        </td>
                        <td>{ele.reviewScore}</td>
                        <td>{ele.reviewDate}</td>
                        <td>
                          <Link
                            onClick={e => {
                              e.stopPropagation();
                              sessionStorage.setItem("arrayIndex", index);
                            }}
                            to={`/comments/${ele.id}`}
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
                              console.log(ele.reviewId);
                              handleClick(ele.reviewId);
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
