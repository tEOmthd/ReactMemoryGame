import { useEffect, useState } from "react";
import bgImage from "./assets/background.png";
import "./style/PlayScreen.css";
import jsonData from './data.json'; 
 

const PlayScreen = ({ playerName, gameDuration, gameTheme, selectedTheme}) => {
  useEffect(() => {
    document.body.style.backgroundImage = `url(${bgImage})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    return () => {
      document.body.style.backgroundImage = "";
    };
  }, []);
  
  console.log("Theme = ", selectedTheme);
  const [niveau, setNiveau] = useState(4); 
  const [cards, setCards] = useState(createCards(niveau));

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Échange des éléments
    }
  }
  console.log(jsonData['categories']); 
  function createCards(niveau) {
    const emojis = jsonData[selectedTheme]; 
    let cards = [];

    for (let y = 0; y < niveau; y++) {
      cards.push({ id: y * 2, emoji: emojis[y] });
      cards.push({ id: y * 2 + 1, emoji: emojis[y] });
    }
    shuffleArray(cards);
    return cards;
  }

  const gridSize = Math.ceil(Math.sqrt(cards.length)); // Calcul des colonnes

  return (
    <div className="play-screen-container">
      <h1 className="TopText">{playerName}, Niveau {niveau}</h1>
      <div
        className="Cards-Layout"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {cards.map((card) => (
          <div key={card.id} className="Card">
            {card.emoji}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayScreen;