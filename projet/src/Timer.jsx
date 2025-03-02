import React, { useState, useEffect } from "react";
import "./style/Timer.css";

const Timer = ({ initialTime, onTimeUp, isLevelComplete }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isPaused, setIsPaused] = useState(false);

  // Pause le timer quand un niveau est complété
  useEffect(() => {
    if (isLevelComplete) {
      setIsPaused(true);
    } else {
      setIsPaused(false);
    }
  }, [isLevelComplete]);
  useEffect(() => {
    setTimeLeft(initialTime);
    setIsPaused(false);
  }, [initialTime]);

  useEffect(() => {
    if (isPaused) return;

    const timer = timeLeft > 0 && setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    if (timeLeft === 0 && onTimeUp) {
      onTimeUp();
    }

    return () => clearInterval(timer);
  }, [timeLeft, isPaused, onTimeUp]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer-container">
      <div className={`timer ${timeLeft < 10 ? 'timer-warning' : ''}`}>
        {formatTime()}
      </div>
    </div>
  );
};

export default Timer;