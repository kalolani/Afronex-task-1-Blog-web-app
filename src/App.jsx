import { PostProvider } from "./contexts/postContext";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./pages/Body";
import HomePage from "./pages/HomePage";
import FormAddPost from "./pages/FormAddPost";
import DarkModeButten from "./components/DarkModeButten";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <section>
      <DarkModeButten />
      <BrowserRouter>
        <PostProvider>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="body/:i" element={<Body />} />
            <Route path="form" element={<FormAddPost />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
        </PostProvider>
      </BrowserRouter>
    </section>
  );
}

export default App;
