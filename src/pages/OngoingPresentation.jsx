import React, { useContext, useEffect, useState } from "react";
import Navbar from "./../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../components/GlobalContext";

const OngoingPresentation = () => {
  let [ongoing, setOngoing] = useState([]);
  let { globalData, setGlobalData } = useContext(GlobalContext);
  let address = process.env.REACT_APP_IP_ADDRESS;
  let navigate = useNavigate();
  useEffect(() => {
    let fetchData = async () => {
      let { data } = await axios.get(
        `${address}/presentation/onGoingPresentation`
      );
      setOngoing(data.data);
      setGlobalData(data);
    };
    fetchData();
  }, []);

  const handleClick = e => {
    e.stopPropagation();
    let id = e.target.title;
    e.preventDefault();
    var fetchData = async () => {
      let { data } = await axios.get(
        `${address}/presentation/deactivate?presentationId=${id}`
      );
      toast.success("Voting Stoped", {
        className: "toastMessage",
      });
      // console.log(data);
    };
    fetchData();
  };
  const handleRating = e => {
    e.stopPropagation();
    e.preventDefault();

    sessionStorage.setItem("presentationId", e.target.title);
    navigate("/ratingSummary");
    // var fetchData = async () => {
    //   let { data } = await axios.get(
    //     `${address}/review/reviewSummary?presentationId=${id}`
    //   );
    //   toast.success("Rating Created", {
    //     className: "toastMessage",
    //   });
    // };
    // fetchData();
  };
  return (
    <div>
      <Navbar />
      <div className="row mt-3">
        <div className="col-2"></div>
        <div className="col-8">
          <h1 className="text-center">Ongoing Presentations</h1>
          <div className="row">
            {ongoing && ongoing.length ? (
              ongoing.map((ele, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="col-6 p-2">
                      <div className="border border-1 rounded-2">
                        <table className="table table-striped table-hover rounded-2">
                          <tbody>
                            <tr>
                              <th>Subject: </th>
                              <td>{ele.presentationSubject}</td>
                            </tr>
                            <tr>
                              <th>Topic: </th>
                              <td>{ele.presentationTopic}</td>
                            </tr>
                            <tr>
                              <th>Presenter:</th>
                              <td>{ele.user.userName}</td>
                            </tr>
                            <tr>
                              <th>Date: </th>
                              <td>{ele.presentationDay}</td>
                            </tr>
                            <tr>
                              <div
                                className="btn-group w-100 m-auto"
                                role="group"
                              >
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  title={ele.presentationId}
                                  onClick={handleClick}
                                >
                                  Stop Voting
                                </button>

                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  title={ele.presentationId}
                                  onClick={handleRating}
                                >
                                  Get Rating
                                </button>
                              </div>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })
            ) : (
              <h5 className="text-center mt-2">No data to display</h5>
            )}
          </div>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default OngoingPresentation;
