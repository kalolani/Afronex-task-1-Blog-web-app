import { createGlobalStyle } from "styled-components";

// Define light and dark mode themes
export const lightTheme = {
  body: "#ffffff",
  text: "#000000",
};

export const darkTheme = {
  body: "#1e1e1e",
  text: "#ffffff",
};

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};

  }
`;

// themes.js
