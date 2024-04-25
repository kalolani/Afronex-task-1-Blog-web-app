import Logo from "./Logo";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { usePosts } from "../contexts/postContext";
import CreatePost from "./CreatePost";

function PostHeader() {
  const { emailInfo, setEmailInfo, isOpen, setIsOpen } = usePosts();

  useEffect(() => {
    fetch("https://blog-website-api-murex.vercel.app/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setEmailInfo(userInfo);
      });
    });
  }, [emailInfo]);

  const email = emailInfo?.email;
  return (
    <header
      className={` pt-4 
    mb-10 
    m-auto 
    flex 
    justify-between
    phone:flex-col
   
    max-w-screen-lg
    sticky 
    top-0 
    pb-6 
    dark:bg-slate-800 
    border-b-2 
    border-gray-950
    z-10 
    px-20 
    phone:px-6
    phone:pr-32
    phone:${isOpen ? "" : " items-center gap-8"}
    bg-gray-900
    tablet:flex-row
    tablet:items-center
    tablet:gap-16
    laptop:max-w-screen-2xl
    `}
    >
      <Link to="/">
        <div>
          <Logo />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="fixed top-4 right-20 bg-green-500 rounded-sm hover:bg-green-400 inline-block px-4 py-2 tablet:opacity-0 "
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

      <div>
        {email && (
          <>
            <Link to="/form" className=" bigdesktop:mr-20">
              <CreatePost />
            </Link>
          </>
        )}
        {!email && (
          <>
            <Link to="/register">
              <button className="bg-green-500 border-green-500 text-white rounded-sm hover:bg-green-400 inline-block px-3 py-2 ">
                Register
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-green-500 border-green-500 text-white rounded-sm hover:bg-green-400 inline-block px-5 py-2 ">
                Login
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default PostHeader;
