//import { usePosts } from "../contexts/postContext";
import Results from "./Results";
import SearchPosts from "./SearchPosts";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
  //const { onClearPosts } = usePosts();

  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setEmail(userInfo);
      });
    });
  }, []);
  return (
    <header className="pt-4 sticky top-0 bg-slate-50 border-b-2 border-b-blue-100">
      <Link to="/">
        <Logo />
      </Link>
      <Results />
      <div>
        {email && (
          <>
            <SearchPosts />
            <Link
              className="bg-green-500 border-green-500 text-white rounded-sm hover:bg-green-400 inline-block px-3 py-2 "
              to="/form"
            >
              <p>CREATE POSTS</p>
            </Link>
            <Link className="bg-green-500 border-green-500 text-white rounded-sm hover:bg-green-400 inline-block px-3 py-2 ">
              <p>LOG OUT</p>
            </Link>
          </>
        )}
        {!email && (
          <>
            <SearchPosts />
            <Link to="/register">
              <button className="bg-green-500 border-green-500 text-white rounded-sm hover:bg-green-400">
                Register
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-green-500 border-green-500 text-white rounded-sm hover:bg-green-400">
                Login
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
