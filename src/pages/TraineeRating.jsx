import React, { useContext, useEffect, useState } from "react";
import TraineeNavbar from "../components/TraineeNavbar";
import { RatingContext } from "../components/RatingContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const TraineeRating = () => {
  var [traineeRating, setTraineeRating] = useState();
  var { ratingData, setRatingData } = useContext(RatingContext);
  var { id } = useParams();
  var navigate = useNavigate();
  var address = process.env.REACT_APP_IP_ADDRESS;
  useEffect(() => {
    setTraineeRating({ ...ratingData[id] });

    const preventNavigation = event => {
      event.preventDefault();
      event.returnValue = "1";
    };

    const handleBeforeUnload = () => {
      window.addEventListener("beforeunload", preventNavigation);
    };

    const handleUnload = () => {
      window.removeEventListener("beforeunload", preventNavigation);
    };

    handleBeforeUnload();

    return () => {
      handleUnload();
    };
  }, []);

  const handleChange = e => {
    e.preventDefault();
    var { name, value } = e.target;
    setTraineeRating({ ...traineeRating, [name]: value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      var { data } = await axios.post(`${address}/notification`, traineeRating);
      toast.success("Vote submitted", {
        className: "toastMessage",
      });
      console.log(data);
      navigate("/traineeLanding");
    } catch (error) {
      console.log(error);
      alert("voting closed");
      navigate("/traineeLanding");
    }
  };
  return (
    <div>
      <TraineeNavbar />
      <h1 className="text-center mt-3">Rate the Presentation</h1>
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="trainer" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="trainer"
                name="voterName"
                value={traineeRating?.voterName}
                onChange={handleChange}
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
                name="rattingSubject"
                value={traineeRating?.rattingSubject}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="topic" className="form-label">
                Topic
              </label>
              <input
                type="text"
                className="form-control"
                id="topic"
                name="rattingTopic"
                value={traineeRating?.rattingTopic}
                onChange={handleChange}
              />
            </div>

            <p>Give a Rating</p>
            <div className="mb-3 border border-1 p-3 rounded-3">
              <div className="d-flex justify-content-between pe-5">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="rattingScore"
                    id="no1"
                    value="1"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="no1">
                    1
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="rattingScore"
                    id="no2"
                    value="2"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="no2">
                    2
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="rattingScore"
                    id="no3"
                    value="3"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="no3">
                    3
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="rattingScore"
                    id="no4"
                    value="4"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="no4">
                    4
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="rattingScore"
                    id="no5"
                    value="5"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="no5">
                    5
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="comment" className="form-label">
                Give Your Feedback Here
              </label>
              <textarea
                className="form-control"
                id="comment"
                rows="3"
                name="commits"
                value={traineeRating?.commits}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Share
            </button>
          </form>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default TraineeRating;
