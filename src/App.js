import React, { useState, useEffect } from 'react';
import './App.css';

// Rest of the code...


const TimerComponent = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerLabel, setTimerLabel] = useState('Session');
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const resetTimer = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel('Session');
    setTimeLeft(25 * 60);
    setTimerRunning(false);
    const audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
  };

  const handleBreakDecrement = () => {
    if (breakLength > 1) {
      setBreakLength((prevLength) => prevLength - 1);
    }
  };

  const handleBreakIncrement = () => {
    if (breakLength < 60) {
      setBreakLength((prevLength) => prevLength + 1);
    }
  };

  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength((previousLength) => previousLength - 1);
      if (!timerRunning) {
        setTimeLeft((previousLength) => (previousLength - 1) * 60);
      }
    }
  };

  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
      setSessionLength((prevLength) => prevLength + 1);
      if (!timerRunning) {
        setTimeLeft((previousLength) => (previousLength + 1) * 60);
      }
    }
  };

  const handleStartStop = () => {
    setTimerRunning((prevState) => !prevState);
  };

  useEffect(() => {
    let intervalId;

    if (timerRunning) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            const audio = document.getElementById('beep');
            audio.play();

            if (timerLabel === 'Session') {
              setTimerLabel('Break');
              return breakLength * 60;
            } else {
              setTimerLabel('Session');
              return sessionLength * 60;
            }
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timerRunning, timerLabel, breakLength, sessionLength]);

  useEffect(() => {
    setTimeLeft(sessionLength * 60);
  }, [sessionLength]);

  return (
    <div className="timer-container">
      <div className="length-container">
        <h3 id="break-label">Break Length</h3>
        <div>
          <button id="break-decrement" onClick={handleBreakDecrement}>
            Decrement
          </button>
          <span id="break-length">{breakLength}</span>
          <button id="break-increment" onClick={handleBreakIncrement}>
            Increment
          </button>
        </div>
      </div>
      <div className="length-container">
        <h3 id="session-label">Session Length</h3>
        <div>
          <button id="session-decrement" onClick={handleSessionDecrement}>
            Decrement
          </button>
          <span id="session-length">{sessionLength}</span>
          <button id="session-increment" onClick={handleSessionIncrement}>
            Increment
          </button>
        </div>
      </div>
      <div className="timer">
        <h2 id="timer-label">{timerLabel}</h2>
        <div id="time-left">{formatTime(timeLeft)}</div>
      </div>
      <div className="controls">
        <button id="start_stop" onClick={handleStartStop}>
          Start/Stop
        </button>
        <button id="reset" onClick={resetTimer}>
          Reset
        </button>
      </div>
      <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </div>
  );
};

export default TimerComponent;
