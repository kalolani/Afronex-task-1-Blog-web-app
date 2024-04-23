import { PostProvider } from "./contexts/postContext";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FormAddPost from "./pages/FormAddPost";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyle } from "./themes.js";
import { useState } from "react";

const Container = styled.div`
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
`;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <section className="h-full">
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Container>
          <button
            onClick={toggleDarkMode}
            className=" fixed top-4.5 right-2 bg-green-500 border-green-500 rounded-sm hover:bg-green-400 inline-block px-3 py-2 mt-4 z-20 phone:py-2 invisible  p-tab:visible py-2  p-tab:top-0 tablet:top-0 px-4 laptop:py-3 laptop:top-0  bigdesktop:top-2 bigdesktop:px-6 bigdesktop:py-2 mt-0"
          >
            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 p-tab w-3.5 h-3.5 tablet:w-6 h-6 laptop:w-6.5 h-6.5 bigdesktop:w-10 h-12 bigdesktop:h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className="w-5 h-5 p-tab w-3.5 h-3.5 tablet:w-6 h-6 laptop:w-6.5 h-6.5 stroke-white bigdesktop:w-10 h-12 bigdesktop:h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            )}
          </button>
          <BrowserRouter>
            <PostProvider>
              <Routes>
                <Route index element={<HomePage />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="form" element={<FormAddPost />} />
                <Route path="post/:id" element={<PostPage />} />
                <Route path="edit/:id" element={<EditPost />} />
              </Routes>
            </PostProvider>
          </BrowserRouter>
        </Container>
      </ThemeProvider>
    </section>
  );
}

export default App;
