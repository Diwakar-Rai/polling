import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { GlobalContext } from "../components/GlobalContext";

const PresentationRating = () => {
  var { globalData, setGlobalData } = useContext(GlobalContext);
  var navigate = useNavigate();
  var [individualData, setIndividualData] = useState("");
  var [presentationSubject, setSubject] = useState("");
  var [presentationTopic, setTopic] = useState("");

  var { id } = useParams();

  var address = process.env.REACT_APP_IP_ADDRESS;

  useEffect(() => {
    try {
      var fetchData = async () => {
        let { data } = await axios.get(`${address}/user/findById?userId=${id}`);

        setIndividualData(data.data);
        setGlobalData(data.data);
        console.log(data.data);
        sessionStorage.setItem("presComments", JSON.stringify(data.data));
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  var { userName } = individualData;

  var handleSubmit = async e => {
    e.preventDefault();

    var payload = {
      presentationSubject: presentationSubject,
      presentationTopic: presentationTopic,
      user: individualData,
    };
    let { data } = await axios.post(`${address}/presentation`, payload);
    toast.success("Success!", {
      className: "toastMessage",
    });
    setGlobalData(data);
    navigate("/voting");
  };

  var handleSubject = e => {
    setSubject(e.target.value.toUpperCase());
  };
  var handleTopic = e => {
    setTopic(e.target.value.toUpperCase());
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-center mt-3">Assign Presentation to {userName}</h1>
      <div className="row mt-3">
        <div className="col-2"></div>
        <div className="col-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="formName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="formName"
                name="userName"
                value={userName}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">
                Subject
              </label>
              <input
                type="text"
                className="form-control"
                id="subject"
                name="presentationSubject"
                value={presentationSubject}
                onChange={handleSubject}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="presTopic" className="form-label">
                Topic
              </label>
              <input
                type="text"
                className="form-control"
                id="presTopic"
                name="presentationTopic"
                value={presentationTopic}
                onChange={handleTopic}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Assign Presentation
            </button>
          </form>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default PresentationRating;
