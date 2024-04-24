/* eslint-disable no-unused-vars */
import { useState } from "react";
import Header from "../components/Header";

export default function Register() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regError, setRegError] = useState(false);

  async function register(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      alert("registered successfully");
    } else {
      //
      setRegError(true);
    }
  }

  return (
    <main className="h-screen">
      <Header />
      {regError && (
        <p className="text-red-800 text-center">Registration failed!!</p>
      )}
      <form
        onSubmit={register}
        className="h-2/4 rounded w-2/6 bg-gray-900 shadow-sm shadow-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 text-center text-center phone:top-3/4 p-0 m w-full mr-2 ml-2 p-tab:w-3/4 m-auto tablet:top-1/2 w-8/12 laptop:w-5/12"
      >
        <h3 className="text-xl text-white border-b-2 border-white border-2-4 pb-4 px-16">
          Register
        </h3>

        <div className="flex flex-col gap-y-2 items-center mb-4 pt-4">
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            className="placeholder:text-back focus:text-black inline-block bg-slate-50 bg-slate-300-700 focus:outline-none rounded border-slate-700 w-3/4 p-tab:w-2/4 laptop:w-3/4"
          />
        </div>

        <div className="flex flex-col gap-y-2 items-center justify-items-center mb-6">
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            className="placeholder:text-back focus:text-black inline-block bg-slate-50 bg-slate-300-700 focus:outline-none rounded border-slate-700 w-3/4 p-tab:w-2/4 laptop:w-3/4"
          />
        </div>

        <div className="text-center">
          <button className="w-3/4 py-2 px-20 rounded border-green-500 bg-green-600 shadow-sm shadow-green-500 text-white p-tab:w-2/4 laptop:w-3/4">
            Register
          </button>
        </div>
      </form>
    </main>
  );
}
