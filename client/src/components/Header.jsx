import Results from "./Results";
import SearchPosts from "./SearchPosts";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { usePosts } from "../contexts/postContext";
import CreatePost from "./CreatePost";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const HeaderContainer = styled.header`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  padding: 20px;
`;

function Header() {
  const { emailInfo, setEmailInfo, isOpen, setIsOpen } = usePosts();
  const navigate = useNavigate();

 useEffect(() => {
  fetch("https://blog-website-api-murex.vercel.app/profile", {
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      return response.json();
    })
    .then((userInfo) => {
      setEmailInfo(userInfo);
    })
    .catch((error) => {
      console.error("Error fetching profile:", error);
      // Handle error, e.g., set default values or show error message
    });
}, []);

  console.log(emailInfo);

  function logout() {
    fetch("https://blog-website-api-murex.vercel.app/logout", {
      method: "POST",
      credentials: "include",
    });
    setEmailInfo(null);

    navigate(`/`);
  }

  console.log(isOpen);

  const email = emailInfo?.email;
  return (
    <header
      className={` pt-4 
      mb-10 
      m-auto 
      z-10 
      px-20 
      dark:bg-slate-800 
      border-b-2 
      border-gray-950
      bg-gray-900
      max-w-screen-lg
      sticky 
      top-0 
      pb-6 
      flex 
      gap:4
      justify-around
      items-center
      phone:flex-col items-center 
      phone:gap-4 px-6 
      phone:${isOpen ? "gap-0 flex-row" : "gap-4"}
     
      tablet:flex-row items-center  gap-8 max-w-screen-2xl
      laptop:justify-between
      bigdesktop:justify-around
      `}
    >
      <Link to="/">
        <div>
          <Logo />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="fixed top-4 right-20 bg-green-500 rounded-sm hover:bg-green-400 inline-block px-4 py-2 phone:right-5 p-tab:right-20 tablet:invisible "
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
      </Link>
      <Results />
      <div>
        {email && (
          <div
            className={`opacity:100 visible phone:flex  phone:flex-col
          phone:items-center  phone:${
            isOpen ? "opacity-0 invisible h-0" : "opacity-100 visible h-full"
          }  tablet:flex-row opacity-100 tablet:visible tablet:text-sm 
            laptop:mr-4`}
          >
            <SearchPosts />
            <Link to="/form">
              <CreatePost />
            </Link>

            <a
              onClick={logout}
              className="cursor-pointer phone:py-2 px-4 bg-green-500 border-green-500 text-white rounded-sm hover:bg-green-400 inline-block px-3 py-2 tablet:px-3 laptop:px-5 bigdesktop:py-4 px-4 text-lg"
            >
              LOG OUT
            </a>
          </div>
        )}
        {!email && (
          <div
            className={`phone:gap-4 flex  phone:flex-col
            phone:items-center opacity:1 visible phone:${
              isOpen ? "opacity-0 invisible h-0" : "opacity-100 visible"
            }  tablet:flex-row opacity-100 tablet:visible laptop:gap-12 mr-12 desktop:mr-20`}
          >
            <Link to="/register">
              <button className="bg-green-500 border-green-500 text-white rounded-sm hover:bg-green-400 inline-block px-3 py-2 phone:px-3 py-1 text-md laptop:px-8 text-lg bigdesktop:px-10 py-1 text-2xl">
                Register
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-green-500 border-green-500 text-white rounded-sm hover:bg-green-400 inline-block px-5 py-2 phone:px-4.5 py-1 text-md laptop:laptop:px-8 text-lg bigdesktop:px-10 py-1 text-2xl">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
