import React, { useEffect, useState } from "react";
import TraineeNavbar from "./../components/TraineeNavbar";
import axios from "axios";
import GaugeChart from "react-gauge-chart";

import { FiEdit } from "react-icons/fi";
import TraineeGraph from "./trainee/TraineeGraph";

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
import { Line } from "react-chartjs-2";
import ImageDisplay from "../components/ImageDisplay";
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
  let [graphData, setGraphData] = useState("");
  const [modal, setModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const toggle = () => setModal(!modal);

  let traineeSessionData = JSON.parse(sessionStorage.getItem("traineeData"));
  let graph = JSON.parse(sessionStorage.getItem("graphData"));
  // console.log(graph);
  // console.log(traineeSessionData);
  let userId = traineeSessionData.userId;
  let address = process.env.REACT_APP_IP_ADDRESS;

  //! Data for the graph
  let allScore = [];
  let allTopics = [];
  traineeSessionData?.reviews?.forEach(ele => {
    allScore.push(ele.reviewScore);
    allTopics.push(ele.reviewTopic);
  });
  // console.log(allScore);
  // console.log(traineeSessionData.reviews);

  //! API to get the Trainee Details
  useEffect(() => {
    let fetchData = async () => {
      try {
        let { data } = await axios.get(
          `${address}/user/findById?userId=${userId}`
        );
        setTraineeData(data.data);
        // console.log(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //! API to get the performance for the meters

  useEffect(() => {
    let fetchData = async () => {
      let { data } = await axios.get(
        `${address}/review/trainee_Performance?userId=${userId}`
      );
      sessionStorage.setItem("graphData", JSON.stringify(data.data));
      setGraphData(data.data);
      // console.log(data.data);
    };
    fetchData();
  }, []);

  const lineData = {
    labels: [...allTopics],
    datasets: [
      {
        label: "Performance in each presentation",
        data: [...allScore],
        borderColor: "#FF6384",
        backgroundColor: "#FFB1C1",
        lineTension: 0.3,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        min: 0,
        max: 6,
        stepSize: 1,
      },
      x: {},
    },
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
        formData.append("file", selectedFile);
        // console.log(formData);

        let { data } = await axios.put(
          `${address}/user/upload?userId=${userId}`,
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
                    <FiEdit onClick={toggle} style={{ cursor: "pointer" }} />
                  </div>
                  <div className="rounded-circle overflow-hidden">
                    <ImageDisplay byteArray={traineeData?.phote?.userProfile} />
                  </div>
                </div>
                <div className="border-top border-1 pt-3 overflow-hidden">
                  <div className="shadow-sm row p-1">
                    <div className="col-6 ps-4">Username</div>
                    <div className="col-6">{traineeData.userName}</div>
                  </div>
                  <div className="shadow-sm row p-1">
                    <div className="col-6 ps-4">Email</div>
                    <div className="col-6">{traineeData.userEmail}</div>
                  </div>
                  <div className="row p-1">
                    <div className="col-6 ps-4">Phone Number</div>
                    <div className="col-6">{traineeData.userPhoneNumber}</div>
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
                    <div className="col-3">{graph?.totalPersentation}</div>
                  </div>
                </div>
                <GaugeChart
                  id="gauge-chart2"
                  nrOfLevels={5}
                  percent={graph?.overallPerformance / 5}
                  colors={["#FF5F6D", "#4cbb17"]}
                  hideText={true}
                />
                <h6 className="text-center pb-5 border-bottom border-1">
                  Overall Rating: {graph?.overallPerformance}
                </h6>
                {/* <a href="#linegraph" className="btn btn-primary w-100 mt-2">
                  See Progress
                </a> */}
              </div>
            </div>

            <div className="col-8 ps-3">
              <div className="shadow rounded-4 py-2 px-4">
                <h5 className="pb-3 border-bottom border-1">Overall Ratings</h5>
                <TraineeGraph graphData={graphData} />
              </div>
            </div>
          </div>

          {/* <div
            className="shadow p-5 rounded-4 mt-3"
            style={{ height: 400 }}
            id="linegraph"
          >
            <Line data={lineData} options={options} style={{ width: "100%" }} />
          </div> */}
        </div>
        <div className="col-1"></div>
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Upload Picture</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <p className="text-danger">
              *Select a photo, whose size is less than 2MB.
            </p>

            <div>
              <input
                type="file"
                name="file"
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
