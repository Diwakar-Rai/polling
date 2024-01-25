import React from "react";
import "../MeterStyle.css";

const TraineeGraph = ({ graphData }) => {
  // let address = process.env.REACT_APP_IP_ADDRESS;
  // console.log(graphData);

  //Function for getting meter color
  const getMeterColor = value => {
    if (value < 1.5) {
      return "red";
    } else if (value < 2.5) {
      return "orange";
    } else if (value < 3.5) {
      return "yellow";
    } else if (value < 4.5) {
      return "lightgreen";
    } else if (value <= 5) {
      return "green";
    }
  };

  return (
    <div>
      <div className="row my-1 border-bottom border-1 p-1">
        <div className="col-4">
          <h6>Content</h6>
        </div>
        <div className="col-8">
          <meter
            className={` ${getMeterColor(graphData?.overallContentScore)}`}
            value={graphData?.overallContentScore}
            min="0"
            max="5"
          />
          <div className="row pb-0 mb-0" style={{ fontSize: 12 }}>
            <div className="col-4 text-left">Poor</div>
            <div className="col-4 text-center">Average</div>
            <div className="col-4 text-end">Good</div>
          </div>
        </div>
      </div>
      <div className="row my-1 border-bottom border-1 p-1">
        <div className="col-4">
          <h6>Voice Modulation</h6>
        </div>
        <div className="col-8">
          <meter
            className={` ${getMeterColor(
              graphData?.overallVoiceModulationScore
            )}`}
            value={graphData?.overallVoiceModulationScore}
            min="0"
            max="5"
          />
          <div className="row pb-0 mb-0" style={{ fontSize: 12 }}>
            <div className="col-4 text-left">Poor</div>
            <div className="col-4 text-center">Average</div>
            <div className="col-4 text-end">Good</div>
          </div>
        </div>
      </div>
      <div className="row my-1 border-bottom border-1 p-1">
        <div className="col-4">
          <h6>Confidence</h6>
        </div>
        <div className="col-8">
          <meter
            className={`${getMeterColor(graphData?.overallConfidenceScore)}`}
            value={graphData?.overallConfidenceScore}
            min="0"
            max="5"
          />
          <div className="row pb-0 mb-0" style={{ fontSize: 12 }}>
            <div className="col-4 text-left">Poor</div>
            <div className="col-4 text-center">Average</div>
            <div className="col-4 text-end">Good</div>
          </div>
        </div>
      </div>
      <div className="row my-1 border-bottom border-1 p-1">
        <div className="col-4">
          <h6>Eye Contact</h6>
        </div>
        <div className="col-8">
          <meter
            className={` ${getMeterColor(graphData?.overallEyeContactScore)}`}
            value={graphData?.overallEyeContactScore}
            min="0"
            max="5"
          />
          <div className="row pb-0 mb-0" style={{ fontSize: 12 }}>
            <div className="col-4 text-left">Poor</div>
            <div className="col-4 text-center">Average</div>
            <div className="col-4 text-end">Good</div>
          </div>
        </div>
      </div>
      <div className="row my-1 border-bottom border-1 p-1">
        <div className="col-4">
          <h6>Body Language</h6>
        </div>
        <div className="col-8">
          <meter
            className={` ${getMeterColor(graphData?.overallBodyLanguageScore)}`}
            value={graphData?.overallBodyLanguageScore}
            min="0"
            max="5"
          />
          <div className="row pb-0 mb-0" style={{ fontSize: 12 }}>
            <div className="col-4 text-left">Poor</div>
            <div className="col-4 text-center">Average</div>
            <div className="col-4 text-end">Good</div>
          </div>
        </div>
      </div>
      <div className="row my-1 border-bottom border-1 p-1">
        <div className="col-4">
          <h6>Interaction</h6>
        </div>
        <div className="col-8">
          <meter
            className={`${getMeterColor(graphData?.overallInterationScore)}`}
            value={graphData?.overallInterationScore}
            min="0"
            max="5"
          />
          <div className="row pb-0 mb-0" style={{ fontSize: 12 }}>
            <div className="col-4 text-left">Poor</div>
            <div className="col-4 text-center">Average</div>
            <div className="col-4 text-end">Good</div>
          </div>
        </div>
      </div>
      <div className="row my-1 border-bottom border-1 p-1">
        <div className="col-4">
          <h6>Props Usage</h6>
        </div>
        <div className="col-8">
          <meter
            className={` ${getMeterColor(
              graphData?.overallUseageOfPropsScore
            )}`}
            value={graphData?.overallUseageOfPropsScore}
            min="0"
            max="5"
          />
          <div className="row pb-0 mb-0" style={{ fontSize: 12 }}>
            <div className="col-4 text-left">Poor</div>
            <div className="col-4 text-center">Average</div>
            <div className="col-4 text-end">Good</div>
          </div>
        </div>
      </div>
      <div className="row my-1 border-bottom border-1 p-1">
        <div className="col-4">
          <h6>Communication</h6>
        </div>
        <div className="col-8">
          <meter
            className={` ${getMeterColor(
              graphData?.overallCommunicationScore
            )}`}
            value={graphData?.overallCommunicationScore}
            min="0"
            max="5"
          />
          <div className="row pb-0 mb-0" style={{ fontSize: 12 }}>
            <div className="col-4 text-left">Poor</div>
            <div className="col-4 text-center">Average</div>
            <div className="col-4 text-end">Good</div>
          </div>
        </div>
      </div>
      <div className="row my-1 border-bottom border-1 p-1">
        <div className="col-4">
          <h6>Energy</h6>
        </div>
        <div className="col-8">
          <meter
            className={` ${getMeterColor(graphData?.overallEnergyScore)}`}
            value={graphData?.overallEnergyScore}
            min="0"
            max="5"
          />
          <div className="row pb-0 mb-0" style={{ fontSize: 12 }}>
            <div className="col-4 text-left">Poor</div>
            <div className="col-4 text-center">Average</div>
            <div className="col-4 text-end">Good</div>
          </div>
        </div>
      </div>
      <div className="row my-1 border-bottom border-1 p-1">
        <div className="col-4">
          <h6>Liveliness</h6>
        </div>
        <div className="col-8">
          <meter
            className={` ${getMeterColor(graphData?.overallLivelinessScore)}`}
            value={graphData?.overallLivelinessScore}
            min="0"
            max="5"
          />
          <div className="row pb-0 mb-0" style={{ fontSize: 12 }}>
            <div className="col-4 text-left">Poor</div>
            <div className="col-4 text-center">Average</div>
            <div className="col-4 text-end">Good</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraineeGraph;
