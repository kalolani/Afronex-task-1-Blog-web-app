import { useState } from "react";
import Header from "../components/Header";
import { Navigate } from "react-router-dom";

import { usePosts } from "../contexts/postContext";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setEmailInfo } = usePosts();
  const [loginError, setLoginError] = useState(false);

  async function login(e) {
    e.preventDefault();
    const response = await fetch("https://blog-website-api-murex.vercel.app/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      response.json().then((userInfo) => {
        setEmailInfo(userInfo);
        setRedirect(true);
      });
    } else {
      setLoginError(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <main className="h-screen">
      <Header />

      <form
        onSubmit={login}
        className="h-2/4 rounded w-2/6 bg-gray-900 shadow-sm shadow-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 text-center text-center phone:top-3/4 p-0 m w-full mr-2 ml-2 p-tab:w-3/4 m-auto tablet:top-1/2 w-8/12 laptop:w-5/12"
      >
        <h3 className="text-xl text-white border-b-2 border-white border-2-4 pb-4 px-16">
          Login
        </h3>

        <div className="flex flex-col gap-y-2 items-center mb-4 pt-4">
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            className="placeholder:text-back focus:text-black inline-block bg-slate-50 bg-slate-300-700 focus:outline-none rounded border-slate-700 w-3/4 phone:mt-0 p-tab:w-3/5 laptop:w-3/4 desktop:h-10/12"
          />
        </div>

        <div className="flex flex-col gap-y-2 items-center justify-items-center mb-6">
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            className="placeholder:text-back focus:text-black inline-block bg-slate-50 bg-slate-300-700 focus:outline-none rounded border-slate-700 w-3/4 p-tab:w-3/5 laptop:w-3/4"
          />
        </div>

        <div className="text-center mb-16">
          <button className="w-3/4 py-2 px-20 rounded border-green-500 bg-green-600 shadow-sm shadow-green-400 text-white p-tab:w-3/5 laptop:w-3/4">
            Login
          </button>
        </div>

        {loginError && <p className="text-red-800 text-l">wrong credenials!</p>}
      </form>
    </main>
  );
}
