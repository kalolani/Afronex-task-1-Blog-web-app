import { useEffect, useState } from "react";

function DarkModeButten() {
  const [isFakeDark, setIsFakeDark] = useState(false);
  // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
  useEffect(
    function () {
      document.documentElement.classList.toggle("fake-dark-mode");
    },
    [isFakeDark]
  );
  return (
    <button
      onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
      className="fixed top-9 right-2 bg-green-500 border-green-500"
    >
      {isFakeDark ? "☀️" : "🌙"}
    </button>
  );
}

export default DarkModeButten;
