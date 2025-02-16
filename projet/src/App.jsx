import React, { useState } from "react";
import "./style/App.css";
import LaunchScreen from "./LaunchScreen";
import PlayScreen from "./playScreen";

function App() {
  const [displayedWindow, setDisplayedWindow] = useState("LaunchWindow");
  const [playerName, setPlayerName] = useState("");
  const [gameDuration, setGameDuration] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("Smileys & Emotion");
  let screen;
  console.log("Themee = ", selectedTheme);
  switch (displayedWindow) {
    case "LaunchWindow":
      screen = (
        <LaunchScreen
          setDisplayedWindow={setDisplayedWindow}
          setPlayerName={setPlayerName}
          setGameDuration={setGameDuration}
          playerName={playerName}
          gameDuration={gameDuration}
          selectedTheme={selectedTheme}
setSelectedTheme={setSelectedTheme}

        />
      );
      break;
    case "playScreen":
      screen = (
        <PlayScreen playerName={playerName} gameDuration={gameDuration} selectedTheme={selectedTheme}/>
      );
      break;
    default:
      screen = (
        <LaunchScreen
          setDisplayedWindow={setDisplayedWindow}
          setPlayerName={setPlayerName}
          setGameDuration={setGameDuration}
          playerName={playerName}
          gameDuration={gameDuration}
          selectedTheme={selectedTheme}
        />
      );
  }

  return <div className="App">{screen}</div>;
}

export default App;
