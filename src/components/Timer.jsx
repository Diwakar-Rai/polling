import React from "react";
import { useStopwatch } from "react-timer-hook";

function MyStopwatch() {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch();

  const handlePause = () => {
    pause();
    sessionStorage.setItem("totalTime", totalSeconds);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "70px" }}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <div className="my-3 row">
        <div className="col-2"></div>
        <div className="col-4">
          <button onClick={start} className="btn btn-primary">
            Start Presentation
          </button>
        </div>
        <div className="col-4">
          <button onClick={handlePause} className="btn btn-primary">
            Stop Presentation
          </button>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
}

export default function Timer() {
  return (
    <div>
      <MyStopwatch />
    </div>
  );
}
