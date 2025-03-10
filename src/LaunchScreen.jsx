import { useState, useEffect } from "react";
import SelectThemeList from "./SelectThemeList";
import bgImage from "./assets/background.png";
import "./style/LaunchScreen.css";

const LaunchScreen = ({
  setDisplayedWindow,
  setPlayerName,
  setGameDuration,
  playerName,
  gameDuration,
  selectedTheme,
  setSelectedTheme,
}) => {
  useEffect(() => {
    // Applique l'image de fond
    document.body.style.backgroundImage = `url(${bgImage})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";

    return () => {
      document.body.style.backgroundImage = "";
    };
  }, []);

  // Gestion du changement de durée de jeu
  const handleDurationChange = (e) => {
    const value = e.target.value;
    // Valide que la valeur contient uniquement des chiffres
    if (/^\d*$/.test(value)) {
      setGameDuration(value);
    }
  };

  // Validation du formulaire de démarrage
  const handleValider = () => {
    // Vérifie les champs obligatoires
    const isNameValid = playerName.trim() !== "";
    const isDurationValid = Number(gameDuration) > 0;

    if (isNameValid && isDurationValid) {
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
          aria-label="Entrez votre pseudo"
        />

        <input
          value={gameDuration}
          onChange={handleDurationChange}
          type="number"
          min="1"
          step="1"
          placeholder="Durée de la partie (en secondes)"
          className="inputs"
          aria-label="Durée de la partie en secondes"
        />

        <SelectThemeList
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
        />

        <button
          id="button-valider"
          onClick={handleValider}
          aria-label="Démarrer la partie"
        >
          Valider
        </button>
      </div>
    </div>
  );
};

export default LaunchScreen;
