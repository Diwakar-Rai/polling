import React, { useContext, useEffect, useState } from "react";
import TraineeNavbar from "../components/TraineeNavbar";
import { RatingContext } from "../components/RatingContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ExpertNavbar from "../components/ExpertNavbar";

const TraineeRating = () => {
  var [traineeRating, setTraineeRating] = useState();
  var { ratingData, setRatingData } = useContext(RatingContext);
  var { id } = useParams();
  var navigate = useNavigate();
  var address = process.env.REACT_APP_IP_ADDRESS;

  let expert = sessionStorage.getItem("expertLogin");

  useEffect(() => {
    setTraineeRating({ ...ratingData[id] });
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
      navigate(expert === "true" ? "/expertLanding" : "/traineeLanding");
    } catch (error) {
      console.log(error);
      alert("voting closed");
      navigate("/traineeLanding");
    }
  };

  return (
    <div>
      {expert === "true" ? <ExpertNavbar /> : <TraineeNavbar />}
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
                value={traineeRating?.presentarName}
                onChange={handleChange}
                readOnly
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
                readOnly
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
                readOnly
              />
            </div>

            <p>Evaluate Presentation on the following Parameters</p>

            <div className="mb-3 border border-1 p-3 rounded-3">
              <h6 className="text-center pb-3">Content</h6>

              <div className="d-flex justify-content-between pe-5">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="contentScore"
                    id="con1"
                    value="1"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="con1">
                    1
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="contentScore"
                    id="con2"
                    value="2"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="con2">
                    2
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="contentScore"
                    id="con3"
                    value="3"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="con3">
                    3
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="contentScore"
                    id="con4"
                    value="4"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="con4">
                    4
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="contentScore"
                    id="con5"
                    value="5"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="con5">
                    5
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-3 border border-1 p-3 rounded-3">
              <h6 className="text-center pb-3">Voice Modulation</h6>

              <div className="d-flex justify-content-between pe-5">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="voiceModulationScore"
                    id="v1"
                    value="1"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="v1">
                    1
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="voiceModulationScore"
                    id="v2"
                    value="2"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="v2">
                    2
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="voiceModulationScore"
                    id="v3"
                    value="3"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="v3">
                    3
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="voiceModulationScore"
                    id="v4"
                    value="4"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="v4">
                    4
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="voiceModulationScore"
                    id="v5"
                    value="5"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="v5">
                    5
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-3 border border-1 p-3 rounded-3">
              <h6 className="text-center pb-3">Confidence</h6>

              <div className="d-flex justify-content-between pe-5">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="confidenceScore"
                    id="confidence1"
                    value="1"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="confidence1">
                    1
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="confidenceScore"
                    id="confidence2"
                    value="2"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="confidence2">
                    2
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="confidenceScore"
                    id="confidence3"
                    value="3"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="confidence3">
                    3
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="confidenceScore"
                    id="confidence4"
                    value="4"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="confidence4">
                    4
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="confidenceScore"
                    id="confidence5"
                    value="5"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="confidence5">
                    5
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-3 border border-1 p-3 rounded-3">
              <h6 className="text-center pb-3">Eye Contact</h6>

              <div className="d-flex justify-content-between pe-5">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="eyeContactScore"
                    id="eye1"
                    value="1"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="eye5">
                    1
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="eyeContactScore"
                    id="eye5"
                    value="2"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="eye5">
                    2
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="eyeContactScore"
                    id="eye5"
                    value="3"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="eye5">
                    3
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="eyeContactScore"
                    id="eye5"
                    value="4"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="eye5">
                    4
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="eyeContactScore"
                    id="eye5"
                    value="5"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="eye5">
                    5
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-3 border border-1 p-3 rounded-3">
              <h6 className="text-center pb-3">Body Language</h6>

              <div className="d-flex justify-content-between pe-5">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="bodyLanguageScore"
                    id="bl1"
                    value="1"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="bl1">
                    1
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="bodyLanguageScore"
                    id="bl2"
                    value="2"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="bl2">
                    2
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="bodyLanguageScore"
                    id="bl3"
                    value="3"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="bl3">
                    3
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="bodyLanguageScore"
                    id="bl4"
                    value="4"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="bl4">
                    4
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="bodyLanguageScore"
                    id="bl5"
                    value="5"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="bl5">
                    5
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-3 border border-1 p-3 rounded-3">
              <h6 className="text-center pb-3">Interaction</h6>

              <div className="d-flex justify-content-between pe-5">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="interationScore"
                    value="1"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="bl1">
                    1
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="interationScore"
                    value="2"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="bl2">
                    2
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="interationScore"
                    value="3"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="bl3">
                    3
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="interationScore"
                    value="4"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="bl4">
                    4
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="interationScore"
                    value="5"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label">5</label>
                </div>
              </div>
            </div>

            <div className="mb-3 border border-1 p-3 rounded-3">
              <h6 className="text-center pb-3">Usage of Props</h6>

              <div className="d-flex justify-content-between pe-5">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="useageOfPropsScore"
                    value="1"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="bl1">
                    1
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="useageOfPropsScore"
                    value="2"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="bl2">
                    2
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="useageOfPropsScore"
                    value="3"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="bl3">
                    3
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="useageOfPropsScore"
                    value="4"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="bl4">
                    4
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="useageOfPropsScore"
                    value="5"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label">5</label>
                </div>
              </div>
            </div>

            <div className="mb-3 border border-1 p-3 rounded-3">
              <h6 className="text-center pb-3">Communication</h6>

              <div className="d-flex justify-content-between pe-5">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="communicationScore"
                    value="1"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="bl1">
                    1
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="communicationScore"
                    value="2"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="bl2">
                    2
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="communicationScore"
                    value="3"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="bl3">
                    3
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="communicationScore"
                    value="4"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="bl4">
                    4
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="communicationScore"
                    value="5"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label">5</label>
                </div>
              </div>
            </div>

            <div className="mb-3 border border-1 p-3 rounded-3">
              <h6 className="text-center pb-3">Energy</h6>

              <div className="d-flex justify-content-between pe-5">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="energyScore"
                    value="1"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="bl1">
                    1
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="energyScore"
                    value="2"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="bl2">
                    2
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="energyScore"
                    value="3"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="bl3">
                    3
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="energyScore"
                    value="4"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="bl4">
                    4
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="energyScore"
                    value="5"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label">5</label>
                </div>
              </div>
            </div>

            <div className="mb-3 border border-1 p-3 rounded-3">
              <h6 className="text-center pb-3">Liveliness</h6>

              <div className="d-flex justify-content-between pe-5">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="livelinessScore"
                    value="1"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="bl1">
                    1
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="livelinessScore"
                    value="2"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="bl2">
                    2
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="livelinessScore"
                    value="3"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="bl3">
                    3
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="livelinessScore"
                    value="4"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="bl4">
                    4
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="livelinessScore"
                    value="5"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label">5</label>
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
