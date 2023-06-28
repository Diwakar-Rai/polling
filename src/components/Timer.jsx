import React, { useEffect } from "react";
import { useStopwatch } from "react-timer-hook";
// import midBuzzer from "../assets/audio/midBuzzer.mp3";
// import endBuzzer from "../assets/audio/endBuzzer.mp3";
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
  const formatTime = time => {
    return String(time).padStart(2, "0");
  };

  useEffect(() => {
    try {
      if (seconds === 9) {
        const buzz = new Audio(
          "C:/Users/Alpha/Documents/PollingApp/FE/media/midBuzzer.mp3"
        );
        buzz.play();
      }
      if (seconds === 12) {
        const buzzer = new Audio(
          "C:/Users/Alpha/Documents/PollingApp/FE/media/endBuzzer.mp3"
        );
        buzzer.play();
      }
    } catch (error) {
      console.log(error);
    }
  }, [seconds]);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "70px" }}>
        <span>{formatTime(hours)}</span>:<span>{formatTime(minutes)}</span>:
        <span>{formatTime(seconds)}</span>
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
