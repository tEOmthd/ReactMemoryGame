import React, { useState } from "react";
import "./style/App.css";
import LaunchScreen from "./LaunchScreen";
import PlayScreen from "./playScreen";

function App() {
  const [displayedWindow, setDisplayedWindow] = useState("LaunchWindow");
  const [playerName, setPlayerName] = useState("");
  const [gameDuration, setGameDuration] = useState("");
  const [gameTheme, setGameTheme] = useState("");
  let screen;
  switch (displayedWindow) {
    case "LaunchWindow":
      screen = (
        <LaunchScreen
          setDisplayedWindow={setDisplayedWindow}
          setPlayerName={setPlayerName}
          setGameDuration={setGameDuration}
          playerName={playerName}
          gameDuration={gameDuration}
          gameTheme={gameTheme}
        />
      );
      break;
    case "playScreen":
      screen = (
        <PlayScreen playerName={playerName} gameDuration={gameDuration} gameTheme={gameTheme}/>
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
        />
      );
  }

  return <div className="App">{screen}</div>;
}

export default App;
