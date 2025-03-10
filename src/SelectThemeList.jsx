import { useState } from "react";
import "./style/SelectThemeList.css";
import "./LaunchScreen.jsx";

const themes = [
  "Smileys & Emotion",
  "Animals & Nature",
  "Food & Drink",
  "Travel & Places",
  "Objects",
  "Sports & Activities",
  "Symbols",
  "Science & Tech",
];

const SelectThemeList = ({ selectedTheme, setSelectedTheme }) => {
  return (
    <div className="theme-select">
      <select
        value={selectedTheme}
        onChange={(e) => setSelectedTheme(e.target.value)}
      >
        {themes.map((theme, index) => (
          <option key={index} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectThemeList;
