import { useState } from "react";

function DarkModeButten() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-4 right-2 bg-green-500 border-green-500  rounded-sm hover:bg-green-400 inline-block px-5 py-2 "
    >
      {isDarkMode ? "☀️" : "🌙"}
    </button>
  );
}

export default DarkModeButten;
