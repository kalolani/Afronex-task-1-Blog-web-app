import { useState } from "react";
import Header from "../components/Header";

export default function Register() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  return (
    <main className="h-screen">
      <Header />

      <form className="h-2/4 rounded w-2/6 bg-slate-100 shadow-md shadow-slate-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 text-center text-center">
        <h3 className="text-xl text-slate-800 border-b-2 border-slate-800 border-2-4 pb-4 px-16">
          Register
        </h3>

        <div className="flex flex-col gap-y-2 items-center mb-4 pt-4">
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            className="inline-block bg-slate-50 bg-slate-300-700 focus:outline-none rounded border-slate-700 w-3/4"
          />
        </div>

        <div className="flex flex-col gap-y-2 items-center justify-items-center mb-6">
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            className="inline-block bg-slate-50 bg-slate-300-700 focus:outline-none rounded border-slate-700 w-3/4"
          />
        </div>

        <div className="text-center">
          <button className="w-3/4 py-2 px-20 rounded border-green-700 bg-green-400 shadow-md shadow-green-400 text-slate-600">
            Login
          </button>
        </div>
      </form>
    </main>
  );
}
