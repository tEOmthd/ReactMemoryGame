import React, { useState, useEffect } from "react";
import "./style/Timer.css";

const Timer = ({ initialTime, onTimeUp, isLevelComplete }) => {
  // États du timer
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isPaused, setIsPaused] = useState(false);

  // Gère la pause du timer pendant les transitions de niveau
  useEffect(() => {
    setIsPaused(isLevelComplete);
  }, [isLevelComplete]);

  // Réinitialise le timer quand la durée initiale change
  useEffect(() => {
    setTimeLeft(initialTime);
    setIsPaused(false);
  }, [initialTime]);

  // Logique principale du compte à rebours
  useEffect(() => {
    // Ne rien faire si le timer est en pause
    if (isPaused) return;

    // Configuration de l'intervalle
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;

        // Déclencher l'événement de fin de temps
        if (newTime === 0) {
          if (onTimeUp) onTimeUp();
          clearInterval(intervalId);
        }

        return newTime;
      });
    }, 1000);

    // Nettoyage de l'intervalle
    return () => clearInterval(intervalId);
  }, [isPaused, timeLeft, onTimeUp]);

  // Formate les secondes en MM:SS
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="timer-container">
      <div className={`timer ${timeLeft < 10 ? "timer-warning" : ""}`}>
        {formatTime()}
      </div>
    </div>
  );
};

export default Timer;
