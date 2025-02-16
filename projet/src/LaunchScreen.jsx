import { useState, useEffect } from "react";
import SelectThemeList from "./SelectThemeList";
import bgImage from "./assets/background.png";
import "./style/LaunchScreen.css";

const LaunchScreen = ({ setDisplayedWindow, setPlayerName, setGameDuration, playerName, gameDuration, selectedTheme, setSelectedTheme}) => {
  

  useEffect(() => {
    document.body.style.backgroundImage = `url(${bgImage})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";

    return () => {
      document.body.style.backgroundImage = "";
    };
  }, []);

  const handleDurationChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setGameDuration(value);
    }
  };

  const handleValider = () => {
    if (playerName.trim() !== "" && gameDuration > 0) {
      setDisplayedWindow("playScreen");
    } else {
      alert("Veuillez entrer un pseudo et une durée valide.");
    }
  };
  return (
    <div className="main-container">
      <div id="menu-container">
        <h1 id="bienvenue">Bienvenue</h1>
        <input
          value={playerName}
          maxLength="15"
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Votre pseudo"
          className="inputs"
        />
        <input
          value={gameDuration}
          onChange={handleDurationChange}
          type="number"
          min="1"
          step="1"
          placeholder="Durée de la partie (en secondes)"
          className="inputs"
        />
        <SelectThemeList selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} />
        <button id="button-valider" onClick={handleValider}>
          Valider
        </button>

       
      </div>
    </div>
  );
};

export default LaunchScreen;
