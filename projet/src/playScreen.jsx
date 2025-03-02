import { useEffect, useState } from "react";
import bgImage from "./assets/background.png";
import "./style/PlayScreen.css";
import jsonData from "./data.json";
import Timer from "./Timer";

const PlayScreen = ({
  playerName,
  gameDuration,
  selectedTheme,
  setDisplayedWindow,
}) => {
  // États du jeu
  const [niveau, setNiveau] = useState(1);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Configuration de l'arrière-plan
  useEffect(() => {
    document.body.style.backgroundImage = `url(${bgImage})`;
    document.body.style.backgroundSize = "cover";
    return () => (document.body.style.backgroundImage = "");
  }, []);

  // Génération des cartes quand le niveau ou le thème change
  useEffect(() => {
    if (!isGameOver) {
      const nouvellesCartes = createCards(niveau);
      setCards(nouvellesCartes);
      setMatchedPairs([]);
      setIsLevelComplete(false);
    }
  }, [niveau, selectedTheme, isGameOver]);

  // Vérification de la complétion du niveau
  useEffect(() => {
    if (cards.length > 0 && matchedPairs.length === cards.length / 2) {
      terminerNiveau();
    }
  }, [matchedPairs]);

  // Mélange des cartes
  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  // Création des paires de cartes
  const createCards = (niveauActuel) => {
    const theme = jsonData.categories.find((cat) => cat.name === selectedTheme);
    if (!theme) return [];

    const nombresDePaires = niveauActuel + 3;
    const emojisDisponibles = theme.emoji;

    const emojisPourNiveau = Array.from({ length: nombresDePaires }, (_, i) => 
      emojisDisponibles[i % emojisDisponibles.length]
    );

    return shuffleArray(
      emojisPourNiveau.flatMap((emoji, index) => [
        { id: `${index}-1-${niveauActuel}`, emoji, matched: false },
        { id: `${index}-2-${niveauActuel}`, emoji, matched: false },
      ])
    );
  };

  // Gestion du clic sur une carte
  const handleCardClick = (cardId) => {
    if (isLevelComplete || isGameOver || flippedCards.includes(cardId)) return;

    const nouvellesCartesRetournees = [...flippedCards, cardId];
    setFlippedCards(nouvellesCartesRetournees);

    if (nouvellesCartesRetournees.length === 2) {
      const [id1, id2] = nouvellesCartesRetournees;
      const carte1 = cards.find((c) => c.id === id1);
      const carte2 = cards.find((c) => c.id === id2);

      if (carte1.emoji === carte2.emoji) {
        setMatchedPairs([...matchedPairs, [id1, id2]]);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 500);
      }
    }
  };

  // Passage au niveau suivant
  const terminerNiveau = () => {
    setIsLevelComplete(true);
    setScore((prev) => prev + niveau * 100);
    
    setTimeout(() => {
      setNiveau((prev) => prev + 1);
      setIsLevelComplete(false);
    }, 1500);
  };

  // Réinitialisation complète du jeu
  const reinitialiserJeu = () => {
    setIsGameOver(false);
    setNiveau(1);
    setScore(0);
    setFlippedCards([]);
    setMatchedPairs([]);
    setCards(createCards(1));
  };

  return (
    <div className="play-screen-container">
      <h1 className="TopText">{playerName}, Niveau {niveau}</h1>
      <div className="score-display">Score: {score}</div>

      <Timer
        key={niveau} // Réinitialise le timer à chaque changement de niveau
        initialTime={gameDuration}
        onTimeUp={() => setIsGameOver(true)}
        isPaused={isLevelComplete}
      />

      {isGameOver && (
        <div className="game-over-overlay">
          <div className="game-over-message">
            <h2>Game Over</h2>
            <p>Score final: {score}</p>
            <p>Niveau atteint: {niveau}</p>
            <div className="game-over-buttons">
              <button onClick={reinitialiserJeu}>Rejouer</button>
              <button onClick={() => setDisplayedWindow("LaunchWindow")}>
                Menu Principal
              </button>
            </div>
          </div>
        </div>
      )}

      <div 
        className="Cards-Layout"
        style={{ gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(cards.length))}, 1fr)` }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className={`Card ${
              flippedCards.includes(card.id) || matchedPairs.flat().includes(card.id) 
                ? "flipped" 
                : ""
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="card-inner">
              <div className="card-front">?</div>
              <div className="card-back">{card.emoji}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayScreen;