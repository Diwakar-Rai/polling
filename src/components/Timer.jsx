import React, { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import midBuzzer from "../assets/audio/midBuzzer.mp3";
import endBuzzer from "../assets/audio/endBuzzer.mp3";

//! import for the websocket
import { over } from "stompjs";
import SockJS from "sockjs-client";
function MyStopwatch() {
  let [startButton, setStartButton] = useState(false);
  let [stopButton, setStopButton] = useState(true);
  var address = process.env.REACT_APP_IP_ADDRESS;

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
    const socket = new SockJS(`${address}/stomp-endpoint`);
    const stompClient = over(socket);
    stompClient.connect({}, function (frame) {
      stompClient.heartbeat.incoming = 10000;
      stompClient.heartbeat.outgoing = 10000;
      if (stompClient.connected) {
        // console.log(stompClient);
      } else {
        console.log("Not connected");
      }
    });
    console.clear();
    pause();

    setStopButton(true);
    localStorage.setItem("totalTime", totalSeconds);
  };
  const formatTime = time => {
    return String(time).padStart(2, "0");
  };
  const handleStart = e => {
    start();
    setStartButton(!startButton);
    setStopButton(!stopButton);
  };

  useEffect(() => {
    // console.log(seconds);
    try {
      if (minutes === 12) {
        // const buzz = new Audio(midBuzzer);
        // buzz.play();
        let utterance = new SpeechSynthesisUtterance();
        utterance.text = "3 minutes left";
        let voices = window.speechSynthesis.getVoices();
        utterance.voice = voices[0];
        window.speechSynthesis.speak(utterance);
      }
      if (minutes === 15) {
        // const buzzer = new Audio(endBuzzer);
        // buzzer.play();
        let utterance = new SpeechSynthesisUtterance();
        utterance.text = "Time Up! Stop Presentation";
        let voices = window.speechSynthesis.getVoices();
        utterance.voice = voices[0];
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.log(error);
    }
  }, [minutes]);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "70px" }}>
        <span>{formatTime(hours)}</span>:<span>{formatTime(minutes)}</span>:
        <span>{formatTime(seconds)}</span>
      </div>
      <div className="my-3 row">
        <div className="col-2"></div>
        <div className="col-4">
          <button
            onClick={handleStart}
            className="btn btn-primary"
            disabled={startButton}
          >
            Start Presentation
          </button>
        </div>
        <div className="col-4">
          <button
            onClick={handlePause}
            className="btn btn-primary"
            disabled={stopButton}
          >
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
