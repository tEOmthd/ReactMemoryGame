import { useEffect, useState } from "react";
import bgImage from "./assets/background.png";
import "./style/PlayScreen.css";
import jsonData from "./data.json";
import Timer from "./Timer";

const PlayScreen = ({
  playerName,
  gameDuration,
  gameTheme,
  selectedTheme,
  setDisplayedWindow,
}) => {
  useEffect(() => {
    document.body.style.backgroundImage = `url(${bgImage})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    return () => {
      document.body.style.backgroundImage = "";
    };
  }, []);

  const [niveau, setNiveau] = useState(4);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [levelTime, setLevelTime] = useState(
    calculateLevelTime(niveau, gameDuration)
  );

  // Calcule le temps pour chaque niveau en fonction de la difficulté
  function calculateLevelTime(level, totalGameTime) {
    // Plus le niveau est élevé, moins on a de temps
    const baseTime = parseInt(totalGameTime);
    // Formule simple: temps de base / (niveau/2)
    return Math.max(Math.floor(baseTime / (level / 2)), 10); // Minimum 10 secondes
  }

  useEffect(() => {
    // Initialiser les cartes au chargement du composant
    setCards(createCards(niveau));
    setMatchedPairs([]);
    setIsLevelComplete(false);
    // Mettre à jour le temps du niveau
    setLevelTime(calculateLevelTime(niveau, gameDuration));
  }, [niveau, selectedTheme, gameDuration]);

  // Vérifier si toutes les paires ont été trouvées
  useEffect(() => {
    if (cards.length > 0 && matchedPairs.length === cards.length / 2) {
      // Toutes les paires ont été trouvées
      setIsLevelComplete(true);
      // Ajouter au score
      setScore((prevScore) => prevScore + niveau * 100);
      // Passer au niveau suivant après un délai
      setTimeout(() => {
        handleLevelComplete();
      }, 1500);
    }
  }, [matchedPairs, cards, niveau]);

  function shuffleArray(array) {
    const newArray = [...array]; // Créer une copie pour ne pas modifier l'original
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Échange des éléments
    }
    return newArray;
  }

  function createCards(niveau) {
    const category = jsonData.categories.find(
      (cat) => cat.name === selectedTheme
    );
    if (!category) {
      console.error("Thème non trouvé :", selectedTheme);
      return [];
    }
    const emojis = category.emoji; // Liste des emojis du thème choisi
    let cards = [];
    for (let y = 0; y < niveau; y++) {
      if (y >= emojis.length) break; // Évite d'accéder à un index hors limite
      cards.push({ id: y * 2, emoji: emojis[y], matched: false });
      cards.push({ id: y * 2 + 1, emoji: emojis[y], matched: false });
    }
    return shuffleArray(cards);
  }

  const handleCardClick = (cardId) => {
    // Ne pas permettre de cliquer si le niveau est terminé ou si le jeu est terminé
    if (isLevelComplete || isGameOver) {
      return;
    }

    // Ne rien faire si la carte est déjà retournée ou déjà associée
    if (flippedCards.includes(cardId) || matchedPairs.flat().includes(cardId)) {
      return;
    }

    // Si moins de 2 cartes sont retournées, ajouter cette carte
    if (flippedCards.length < 2) {
      const newFlippedCards = [...flippedCards, cardId];
      setFlippedCards(newFlippedCards);

      // Si c'est la deuxième carte retournée, vérifier s'il y a une paire
      if (newFlippedCards.length === 2) {
        const [firstCardId, secondCardId] = newFlippedCards;
        const firstCard = cards.find((card) => card.id === firstCardId);
        const secondCard = cards.find((card) => card.id === secondCardId);

        if (firstCard.emoji === secondCard.emoji) {
          // Les cartes correspondent, ajouter la paire aux matchedPairs
          setMatchedPairs([...matchedPairs, [firstCardId, secondCardId]]);
          setFlippedCards([]);
        } else {
          // Les cartes ne correspondent pas, retourner les cartes après un délai
          setTimeout(() => {
            setFlippedCards([]);
          }, 500);
        }
      }
    }
  };

  const handleLevelComplete = () => {
    console.log(`Niveau ${niveau} terminé !`);
    setNiveau((prevNiveau) => prevNiveau + 1);
    setIsLevelComplete(false);
  };

  const handleTimeUp = () => {
    setIsGameOver(true);
    console.log("Temps écoulé ! Game Over");
  };

  const handlePlayAgain = () => {
    // Réinitialiser le jeu
    setNiveau(4);
    setScore(0);
    setIsGameOver(false);
    setCards(createCards(4));
    setMatchedPairs([]);
    setFlippedCards([]);
    setLevelTime(calculateLevelTime(4, gameDuration));
  };

  const handleBackToMenu = () => {
    setDisplayedWindow("launchScreen");
  };

  // Vérifier si une carte est retournée
  const isCardFlipped = (cardId) => {
    return (
      flippedCards.includes(cardId) || matchedPairs.flat().includes(cardId)
    );
  };

  const gridSize = Math.ceil(Math.sqrt(cards.length)); // Calcul des colonnes

  return (
    <div className="play-screen-container">
      <h1 className="TopText">
        {playerName}, Niveau {niveau}
      </h1>

      {/* Afficher le score */}
      <div className="score-display">Score: {score}</div>

      {/* Intégration du timer */}
      <Timer
        initialTime={levelTime}
        onTimeUp={handleTimeUp}
        isLevelComplete={isLevelComplete}
      />

      {isLevelComplete && (
        <div className="level-complete-message">
          Niveau terminé ! Passage au niveau suivant...
        </div>
      )}

      {isGameOver && (
        <div className="game-over-overlay">
          <div className="game-over-message">
            <h2>Game Over</h2>
            <p>Votre score final: {score}</p>
            <p>Vous avez atteint le niveau {niveau}</p>
            <div className="game-over-buttons">
              <button onClick={handlePlayAgain}>Rejouer</button>
              <button onClick={handleBackToMenu}>Menu Principal</button>
            </div>
          </div>
        </div>
      )}

      <div
        className="Cards-Layout"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className={`Card ${isCardFlipped(card.id) ? "flipped" : ""}`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="card-inner">
              <div className="card-front">
                <span>?</span>
              </div>
              <div className="card-back">{card.emoji}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayScreen;
