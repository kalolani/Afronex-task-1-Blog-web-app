//import { usePosts } from "../contexts/postContext";
import Results from "./Results";
import SearchPosts from "./SearchPosts";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePosts } from "../contexts/postContext";

function Header() {
  const { emailInfo, setEmailInfo } = usePosts();

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setEmailInfo(userInfo);
      });
    });
  }, []);

  function createPosts(e) {
    e.preventDefault();
  }

  function logout(e) {
    e.preventDefault();
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setEmailInfo(null);
  }

  const email = emailInfo?.emal;
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
            <Link to="/form">
              <button
                onSubmit={createPosts}
                className="bg-green-500 border-green-500 text-white rounded-sm hover:bg-green-400 inline-block px-3 py-2 "
              >
                CREATE POSTS
              </button>
            </Link>
            <Link>
              <button className="bg-green-500 border-green-500 text-white rounded-sm hover:bg-green-400 inline-block px-3 py-2 ">
                LOG OUT
              </button>
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
